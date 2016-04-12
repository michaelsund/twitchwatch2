System.register(['angular2/core', './app.loadingcfg', './cfg-model', './app.configoptions', './app.configstreams'], function(exports_1, context_1) {
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
    var core_1, app_loadingcfg_1, cfg_model_1, app_configoptions_1, app_configstreams_1;
    var electron, ipc, TwitchWatch2;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (app_loadingcfg_1_1) {
                app_loadingcfg_1 = app_loadingcfg_1_1;
            },
            function (cfg_model_1_1) {
                cfg_model_1 = cfg_model_1_1;
            },
            function (app_configoptions_1_1) {
                app_configoptions_1 = app_configoptions_1_1;
            },
            function (app_configstreams_1_1) {
                app_configstreams_1 = app_configstreams_1_1;
            }],
        execute: function() {
            electron = require('electron');
            ipc = require('electron').ipcRenderer;
            core_1.enableProdMode();
            TwitchWatch2 = (function () {
                function TwitchWatch2(zone) {
                    var _this = this;
                    this.zone = zone;
                    this.doneLoadingCfg = false;
                    this.cfg = new cfg_model_1.Cfg();
                    // tell main that were done loading
                    var c = {
                        'prop': 'firstRun',
                    };
                    // listen for cfg updates
                    ipc.send('cfg', c);
                    ipc.on('cfg', function (event, arg) {
                        console.log('recieved new config');
                        zone.run(function () {
                            // move online streams to beginning of array
                            for (var x in arg.streams) {
                                if (arg.streams[x].state) {
                                    var tmp = arg.streams[x];
                                    arg.streams.splice(x, 1);
                                    arg.streams.unshift(tmp);
                                }
                            }
                            _this.doneLoadingCfg = true;
                            _this.cfg = arg;
                        });
                    });
                }
                TwitchWatch2 = __decorate([
                    core_1.Component({
                        selector: 'twitchwatch2',
                        templateUrl: './app/html/app.twitchwatch2.html',
                        directives: [app_loadingcfg_1.LoadingCfg, app_configoptions_1.ConfigOptions, app_configstreams_1.ConfigStreams]
                    }), 
                    __metadata('design:paramtypes', [core_1.NgZone])
                ], TwitchWatch2);
                return TwitchWatch2;
            }());
            exports_1("TwitchWatch2", TwitchWatch2);
        }
    }
});
//# sourceMappingURL=app.twitchwatch2.js.map