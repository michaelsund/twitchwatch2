System.register(['angular2/platform/browser', './app.twitchwatch2'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, app_twitchwatch2_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_twitchwatch2_1_1) {
                app_twitchwatch2_1 = app_twitchwatch2_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_twitchwatch2_1.TwitchWatch2);
        }
    }
});
//# sourceMappingURL=main.js.map