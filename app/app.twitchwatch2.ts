import {Component, NgZone, enableProdMode} from 'angular2/core'
import {LoadingCfg} from './app.loadingcfg';
import {Cfg} from './cfg-model';
import {ConfigOptions} from './app.configoptions';
import {ConfigStreams} from './app.configstreams';
const electron = require('electron');
const ipc = require('electron').ipcRenderer;
enableProdMode();

@Component({
  selector: 'twitchwatch2',
  templateUrl: './app/html/app.twitchwatch2.html',
  directives: [LoadingCfg, ConfigOptions, ConfigStreams]
})

export class TwitchWatch2 {
  public doneLoadingCfg = false;
  cfg = new Cfg();

  constructor(private zone: NgZone) {
    // tell main that were done loading
    var c = {
      'prop': 'firstRun',
    };
    // listen for cfg updates
    ipc.send('cfg', c);
    ipc.on('cfg', (event, arg) => {
      console.log('recieved new config');
      zone.run(() => {
      // move online streams to beginning of array
        for (var x in arg.streams) {
          if (arg.streams[x].state) {
            var tmp = arg.streams[x];
            arg.streams.splice(x, 1);
            arg.streams.unshift(tmp);
          }
        }
        this.doneLoadingCfg = true;
        this.cfg = arg;
      });
    });
  }
}
