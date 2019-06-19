var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WebCenter = (function () {
    function WebCenter() {
        this._window = window;
    }
    WebCenter.prototype.init = function () {
        EventCenter.instance.on(MessageId.LOAD_SKINS, this.loadSkins, this);
        EventCenter.instance.on(MessageId.SET_VIEW_ATTR, this.setViewAttr, this);
        EventCenter.instance.on(MessageId.SET_XML_DATA, this.setXmlData, this);
        EventCenter.instance.on(MessageId.CREATE_CODE, this.createCode, this);
    };
    WebCenter.prototype.loadSkins = function (e) {
        this._window.WEB.loadSkins(e.data);
    };
    WebCenter.prototype.setViewAttr = function (e) {
        this._window.WEB.setViewAttr(e.data);
    };
    WebCenter.prototype.setXmlData = function (e) {
        this._window.WEB.setXmlData(e.data);
    };
    WebCenter.prototype.createCode = function (e) {
        this._window.WEB.createCode();
    };
    return WebCenter;
}());
__reflect(WebCenter.prototype, "WebCenter");
//# sourceMappingURL=WebCenter.js.map