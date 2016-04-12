import {Component} from 'angular2/core'
const electron = require('electron');
const ipc = require('electron').ipcRenderer;
@Component({
  selector: 'configoptions',
  templateUrl: './app/html/app.configoptions.html',
  inputs: ['notificationsEnabled'],
})
export class ConfigOptions {
  public notificationsEnabled = true;
  public notificationSoundEnabled = true;
  public showModal = false;
  toggleNotifications() {
    this.notificationsEnabled = !this.notificationsEnabled;
    var cfgToChange = {
      'prop': 'notificationsEnabled',
      'val': this.notificationsEnabled
    }
    ipc.send('cfg', cfgToChange);
  }
  toggleSoundEnable() {
    this.notificationSoundEnabled = !this.notificationSoundEnabled;
    var cfgToChange = {
      'prop': 'notificationSoundEnabled',
      'val': this.notificationSoundEnabled
    }
    ipc.send('cfg', cfgToChange);
  }
  openUrl(url) {
    ipc.send('openUrl', url);
  }
}
