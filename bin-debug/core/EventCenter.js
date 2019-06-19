var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var EventCenter = (function (_super) {
    __extends(EventCenter, _super);
    function EventCenter() {
        var _this = _super.call(this) || this;
        EventCenter._instance = _this;
        return _this;
    }
    EventCenter.prototype.emit = function (type, data) {
        var event = new egret.Event(type);
        event.data = data;
        this.dispatchEvent(event);
    };
    EventCenter.prototype.on = function (type, callback, thisObj) {
        this.addEventListener(type, callback, thisObj);
    };
    EventCenter.prototype.remove = function (type, callback, thisObj) {
        this.removeEventListener(type, callback, thisObj);
    };
    Object.defineProperty(EventCenter, "instance", {
        get: function () {
            return EventCenter._instance || new EventCenter();
        },
        enumerable: true,
        configurable: true
    });
    return EventCenter;
}(egret.EventDispatcher));
__reflect(EventCenter.prototype, "EventCenter");
//# sourceMappingURL=EventCenter.js.map