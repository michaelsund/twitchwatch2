System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Streamer;
    return {
        setters:[],
        execute: function() {
            Streamer = (function () {
                function Streamer(name, game, logo, viewers, state, checked) {
                    if (name === void 0) { name = ""; }
                    if (game === void 0) { game = ""; }
                    if (logo === void 0) { logo = ""; }
                    if (viewers === void 0) { viewers = 0; }
                    if (state === void 0) { state = false; }
                    if (checked === void 0) { checked = false; }
                    this.name = name;
                    this.game = game;
                    this.logo = logo;
                    this.viewers = viewers;
                    this.state = state;
                    this.checked = checked;
                }
                return Streamer;
            }());
            exports_1("Streamer", Streamer);
        }
    }
});
//# sourceMappingURL=streamer-model.js.map