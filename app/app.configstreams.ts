import {Component} from 'angular2/core';
import {Streamer} from './streamer-model';
import {Slider} from './app.slider';
const electron = require('electron');
const ipc = require('electron').ipcRenderer;
@Component({
  selector: 'configstreams',
  templateUrl: './app/html/app.configstreams.html',
  inputs: ['doneLoading', 'streams'],
  directives: [Slider]
})
export class ConfigStreams {
  public newStreamName = "";
  public streams = [];
  public streamAllreadyAdded = false;
  public sliderMessage = 'test';
  public sliderShow = false;
  public doneLoading = false;
  private timer;

  openStream(name, web) {
    var s = {
      'name': name,
      'web': web,
    };
    ipc.send('openStream', s);
    if (web) {
      this.showSliderMessage('Opening stream in browser');
    }
    else {
      this.showSliderMessage('Opening stream in livestreamer');
    }
  }
  addStream() {
    this.newStreamName = this.newStreamName.toLowerCase();
    if (this.newStreamName !== '') {
      var newStreamObj = new Streamer();
      this.streamAllreadyAdded = false;
      for (var x in this.streams) {
        if (this.streams[x].name === this.newStreamName) {
          this.streamAllreadyAdded = true;
          this.showSliderMessage('Stream allready added!');
        }
      }
      if (this.streamAllreadyAdded === false) {
        newStreamObj.name = this.newStreamName;
        this.streams.unshift(newStreamObj);
        var cfgToChange = {
          'prop': 'addStream',
          'val': newStreamObj
        }
        ipc.send('cfg', cfgToChange);
        this.newStreamName = '';
      }
      else {
        console.log('stream duplicate, not adding');
      }
    }
  }
  delStream(name, index) {
    this.streams.splice(index, 1);
    var cfgToChange = {
      'prop': 'delStream',
      'val': name
    }
    ipc.send('cfg', cfgToChange);
  }
  showSliderMessage(message) {
    this.sliderMessage = message;
    this.sliderShow = true;
    this.timer = setTimeout(() => this.sliderShow = false, 3000);
  }
}
