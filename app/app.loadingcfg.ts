import {Component} from 'angular2/core';
@Component({
  selector: 'loadingcfg',
  templateUrl: './app/html/app.loadingcfg.html',
  inputs: ['doneLoading'],
})
export class LoadingCfg {
  public doneLoading = false;
}
