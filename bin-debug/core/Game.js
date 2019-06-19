var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Game = (function () {
    function Game() {
        this._webCenter = new WebCenter();
        Game._instance = this;
    }
    Game.prototype.init = function () {
        this._webCenter.init();
    };
    Object.defineProperty(Game, "instance", {
        get: function () {
            return Game._instance || new Game();
        },
        enumerable: true,
        configurable: true
    });
    return Game;
}());
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map