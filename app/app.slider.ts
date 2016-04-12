import {Component} from 'angular2/core';
const electron = require('electron');
const ipc = require('electron').ipcRenderer;
@Component({
  selector: 'slider',
  templateUrl: './app/html/app.slider.html',
  inputs: ['sliderMessage', 'sliderShow']
})
export class Slider {
  public sliderMessage = '';
  public sliderShow = false;
}
