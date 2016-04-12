System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Cfg;
    return {
        setters:[],
        execute: function() {
            Cfg = (function () {
                function Cfg(notificationsEnabled, notificationSoundEnabled, streams) {
                    if (notificationsEnabled === void 0) { notificationsEnabled = true; }
                    if (notificationSoundEnabled === void 0) { notificationSoundEnabled = true; }
                    if (streams === void 0) { streams = []; }
                    this.notificationsEnabled = notificationsEnabled;
                    this.notificationSoundEnabled = notificationSoundEnabled;
                    this.streams = streams;
                }
                return Cfg;
            }());
            exports_1("Cfg", Cfg);
        }
    }
});
//# sourceMappingURL=cfg-model.js.map