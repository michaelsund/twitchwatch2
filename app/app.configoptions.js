System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var electron, ipc, ConfigOptions;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            electron = require('electron');
            ipc = require('electron').ipcRenderer;
            ConfigOptions = (function () {
                function ConfigOptions() {
                    this.notificationsEnabled = true;
                    this.notificationSoundEnabled = true;
                    this.showModal = false;
                }
                ConfigOptions.prototype.toggleNotifications = function () {
                    this.notificationsEnabled = !this.notificationsEnabled;
                    var cfgToChange = {
                        'prop': 'notificationsEnabled',
                        'val': this.notificationsEnabled
                    };
                    ipc.send('cfg', cfgToChange);
                };
                ConfigOptions.prototype.toggleSoundEnable = function () {
                    this.notificationSoundEnabled = !this.notificationSoundEnabled;
                    var cfgToChange = {
                        'prop': 'notificationSoundEnabled',
                        'val': this.notificationSoundEnabled
                    };
                    ipc.send('cfg', cfgToChange);
                };
                ConfigOptions.prototype.openUrl = function (url) {
                    ipc.send('openUrl', url);
                };
                ConfigOptions = __decorate([
                    core_1.Component({
                        selector: 'configoptions',
                        templateUrl: './app/html/app.configoptions.html',
                        inputs: ['notificationsEnabled'],
                    }), 
                    __metadata('design:paramtypes', [])
                ], ConfigOptions);
                return ConfigOptions;
            }());
            exports_1("ConfigOptions", ConfigOptions);
        }
    }
});
//# sourceMappingURL=app.configoptions.js.map