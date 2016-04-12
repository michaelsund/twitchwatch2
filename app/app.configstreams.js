System.register(['angular2/core', './streamer-model', './app.slider'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, streamer_model_1, app_slider_1;
    var electron, ipc, ConfigStreams;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (streamer_model_1_1) {
                streamer_model_1 = streamer_model_1_1;
            },
            function (app_slider_1_1) {
                app_slider_1 = app_slider_1_1;
            }],
        execute: function() {
            electron = require('electron');
            ipc = require('electron').ipcRenderer;
            ConfigStreams = (function () {
                function ConfigStreams() {
                    this.newStreamName = "";
                    this.streams = [];
                    this.streamAllreadyAdded = false;
                    this.sliderMessage = 'test';
                    this.sliderShow = false;
                    this.doneLoading = false;
                }
                ConfigStreams.prototype.openStream = function (name, web) {
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
                };
                ConfigStreams.prototype.addStream = function () {
                    this.newStreamName = this.newStreamName.toLowerCase();
                    if (this.newStreamName !== '') {
                        var newStreamObj = new streamer_model_1.Streamer();
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
                            };
                            ipc.send('cfg', cfgToChange);
                            this.newStreamName = '';
                        }
                        else {
                            console.log('stream duplicate, not adding');
                        }
                    }
                };
                ConfigStreams.prototype.delStream = function (name, index) {
                    this.streams.splice(index, 1);
                    var cfgToChange = {
                        'prop': 'delStream',
                        'val': name
                    };
                    ipc.send('cfg', cfgToChange);
                };
                ConfigStreams.prototype.showSliderMessage = function (message) {
                    var _this = this;
                    this.sliderMessage = message;
                    this.sliderShow = true;
                    this.timer = setTimeout(function () { return _this.sliderShow = false; }, 3000);
                };
                ConfigStreams = __decorate([
                    core_1.Component({
                        selector: 'configstreams',
                        templateUrl: './app/html/app.configstreams.html',
                        inputs: ['doneLoading', 'streams'],
                        directives: [app_slider_1.Slider]
                    }), 
                    __metadata('design:paramtypes', [])
                ], ConfigStreams);
                return ConfigStreams;
            }());
            exports_1("ConfigStreams", ConfigStreams);
        }
    }
});
//# sourceMappingURL=app.configstreams.js.map