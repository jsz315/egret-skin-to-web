var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MessageId = (function () {
    function MessageId() {
    }
    MessageId.LOAD_SKINS = "load skins";
    MessageId.CHOOSE_SKIN = "choose skin";
    MessageId.MAKE_SKIN_DATA = "make skin data";
    MessageId.SET_VIEW_ATTR = "set view attr";
    MessageId.SET_XML_DATA = "set xml data";
    MessageId.CREATE_CODE = "create code";
    return MessageId;
}());
__reflect(MessageId.prototype, "MessageId");
//# sourceMappingURL=MessageId.js.map