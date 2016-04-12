/* jshint esversion: 6 */
/* jslint node: true */
'use strict';
const async = require('async');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const appver = "TwitchWatch2 1.0.0";
const fs = require('fs');
const request = require('request');
const shell = require('electron').shell;
const child_process = require('child_process');

var debug = false;
var ipc = require("electron").ipcMain;
var notifier = require('node-notifier');
var path = require('path');
var icon = path.join(__dirname, '/pics/tw2-ico-48x48.png');
var cfg;
var cfgDir = process.env.APPDATA + '\\TwitchWatch2\\';

function checkConfig(callback) {
  var stats;
  if (process.platform == 'darwin') {
    cfgDir = process.env.HOME + '/Library/Preferences/TwitchWatch2/';
  } else if (process.platform == 'linux') {
    cfgDir = process.env.HOME + '/.TwitchWatch2/';
  }

  if (fs.existsSync(cfgDir)) {
    if (fs.existsSync(cfgDir + 'tw2config.json')) {
    } else {
      cfg = {
        "notificationsEnabled": true,
        "notificationSoundEnabled": true,
        "streams": []
      };
      saveToConfig(cfg);
    }
  } else {
    fs.mkdirSync(cfgDir);
    //crate empty cfg object to write to the new config
    cfg = {
      "notificationsEnabled": true,
      "notificationSoundEnabled": true,
      "streams": []
    };
    saveToConfig(cfg);
  }
  callback();
}

function readConfig(callback) {
  fs.readFile(cfgDir + 'tw2config.json', 'utf8', function(err, data) {
    if (err) throw err;
    cfg = JSON.parse(data);
    callback();
  });
}

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    'width': 400,
    'height': 535,
    'accept-first-mouse': true,
    'title-bar-style': 'hidden',
    'frame': false,
    'icon': path.join(__dirname, '/pics/tw2-ico-48x48.png')
  });
  mainWindow.setResizable(false);
  mainWindow.setMenuBarVisibility(true);
  if (process.platform === 'linux') {
    mainWindow.setSkipTaskbar(false);
  } else {
    mainWindow.setSkipTaskbar(true);
  }
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  // mainWindow.webContents.openDevTools();
  mainWindow.on('close', function(e) {
    e.preventDefault();
    mainWindow.hide();
  });

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

if (process.platform !== 'darwin') {
  const Menu = electron.Menu;
  const Tray = electron.Tray;
  var icon = path.join(__dirname, 'pics', 'tw2-ico-48x48.png');
  var appIcon = null;
  app.on('ready', function() {
    appIcon = new Tray(icon);
    var contextMenu = Menu.buildFromTemplate([{
      label: 'Open',
      click: function() {
        mainWindow.show();
      }
    }, {
      label: 'Quit',
      click: function() {
        app.quit();
      }
    }]);
    appIcon.setToolTip(appver);
    appIcon.setContextMenu(contextMenu);
  });
}
ipc.on('openStream', function(event, arg) {
  if (arg.web) {
    shell.openExternal('https://twitch.tv/' + arg.name);
  } else {
    // open with livestreamer
    child_process.spawn('livestreamer', ['twitch.tv/' + arg.name, 'best']);
  }
});

ipc.on('openUrl', function(event, arg) {
  shell.openExternal(arg);
});


ipc.on('cfg', function(event, arg) {
  if (arg.prop === 'firstRun') {
    checkTwitch(true, true);
  } else if (arg.prop === 'notificationsEnabled') {
    cfg.notificationsEnabled = arg.val;
  } else if (arg.prop === 'notificationSoundEnabled') {
    cfg.notificationSoundEnabled = arg.val;
  } else if (arg.prop === 'addStream') {
    cfg.streams.unshift(arg.val);
    checkTwitch(false, false);
  } else if (arg.prop === 'delStream') {
    for (var x in cfg.streams) {
      if (cfg.streams[x].name === arg.val) {
        cfg.streams.splice(x, 1);
      }
    }
  }
  saveToConfig(cfg);
});

function saveToConfig(config) {
  var pp = JSON.stringify(config, null, 4);
  fs.writeFile(cfgDir + 'tw2config.json', pp, 'utf8', function(err) {
    if (err) {
      // handle write errors
    }
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  mainWindow.removeAllListeners('close');
  mainWindow.close();
});

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow();
  }
});

var popup = function(name, state, firstrun) {
  if (!firstrun) {
    var onoff = 'offline';
    if (state) {
      onoff = 'online';
    }
    var messageon = 'https://twitch.tv/' + name;
    notifier.notify({
      'title': name + ' is ' + onoff,
      'message': messageon,
      'icon': icon,
      'sound': cfg.notificationSoundEnabled
    });
  } else {
    var messageoff = name;
    notifier.notify({
      'title': 'Online streams!',
      'message': messageoff,
      'icon': icon,
      'sound': cfg.notificationSoundEnabled
    });
  }
};

function checkTwitch(firstrun, runForever) {
  var streamlist = '';
  var firstRunList = '';
  for (var z in cfg.streams) {
    streamlist += cfg.streams[z].name + ',';
  }
  streamlist = streamlist.slice(0, -1);
  request('https://api.twitch.tv/kraken/streams?channel=' + streamlist, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var parsed = JSON.parse(body);
      if (parsed.streams.length === 0) {
        for (var z in cfg.streams) {
          cfg.streams[z].state = false;
        }
      } else {
        for (var x in cfg.streams) {
          for (var y in parsed.streams) {
            if (!cfg.streams[x].checked) {
              if (cfg.streams[x].name == parsed.streams[y].channel.name) {
                cfg.streams[x].checked = true;
                cfg.streams[x].game = parsed.streams[y].channel.game;
                cfg.streams[x].logo = parsed.streams[y].channel.logo;
                cfg.streams[x].viewers = parsed.streams[y].viewers;
                if (!cfg.streams[x].state) {
                  cfg.streams[x].state = true;
                  if (cfg.notificationsEnabled && !firstrun) {
                    popup(cfg.streams[x].name, true, false);
                  } else {
                    firstRunList += cfg.streams[x].name + ', ';
                  }
                }
              }
            }
          }
        }
        for (var i in cfg.streams) {
          // streams that was not online this run
          if (!cfg.streams[i].checked) {
            // indentify streams that is offline, but was online last run
            if (cfg.streams[i].state) {
              // show offline notification
              if (cfg.notificationsEnabled) {
                popup(cfg.streams[i].name, false, false);
              }
            }
            cfg.streams[i].state = false;
            cfg.streams[i].game = '';
            cfg.streams[i].logo = '';
            cfg.streams[i].viewers = 0;
          }
        }
      }
      for (var j in cfg.streams) {
        cfg.streams[j].checked = false;
      }
      // on firstrun, recheck notificationsEnabled and show all online streams in one notification
      if (cfg.notificationsEnabled) {
        firstRunList = firstRunList.slice(0, -2);
        popup(firstRunList, true, true);
      }
      mainWindow.webContents.send('cfg', cfg);
      saveToConfig(cfg);
    }
    if (runForever) {
      checkTwitchWithTimer();
    }

  });
}

// main checkloop with timer
function checkTwitchWithTimer() {
  setTimeout(function() {
    checkTwitch(false, true);
  }, 30000);
}

//read the config first
checkConfig(function() {
  readConfig(function() {
    // reset all streams to offline
    for (var x in cfg.streams) {
      cfg.streams[x].state = false;
      cfg.streams[x].game = '';
      cfg.streams[x].logo = '';
    }
  });
});
