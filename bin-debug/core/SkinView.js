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
var SkinView = (function (_super) {
    __extends(SkinView, _super);
    function SkinView() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    SkinView.prototype.init = function () {
        var list = [];
        var obj = RES.config.config.alias;
        for (var i in obj) {
            if (obj[i].indexOf("/skins/") != -1) {
                list.push(obj[i]);
            }
        }
        EventCenter.instance.emit(MessageId.LOAD_SKINS, list);
        EventCenter.instance.on(MessageId.CHOOSE_SKIN, this.chooseSkin, this);
    };
    SkinView.prototype.chooseSkin = function (e) {
        this.removeChildren();
        this.clearStage();
        var skin = new eui.Component();
        skin.skinName = e.data;
        var xml = RES.getRes(e.data);
        xml = xml.split("?>")[1];
        EventCenter.instance.emit(MessageId.SET_XML_DATA, xml);
        if (skin.skinName.indexOf("FontSkin") == -1) {
            skin.addEventListener(egret.Event.ADDED_TO_STAGE, this.addView, this);
        }
        else {
            skin.addEventListener(egret.Event.ADDED_TO_STAGE, this.addFont, this);
        }
        this.addChild(skin);
    };
    SkinView.prototype.clearStage = function () {
        this.graphics.clear();
        this.graphics.beginFill(0xffffff);
        this.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        this.graphics.endFill();
    };
    SkinView.prototype.addView = function (e) {
        this.checkGroup(e.currentTarget);
        EventCenter.instance.emit(MessageId.CREATE_CODE, {});
    };
    SkinView.prototype.addFont = function (e) {
        var view = e.currentTarget;
        var img = view.getChildAt(0);
        if (egret.is(img, "eui.Image")) {
            // data["background"] = `url("${this.getImage(img.source)}") no-repeat center`;
            // data["background-size"] = "contain";
        }
        else {
            alert("底图应为图片");
            return;
        }
        var total = view.numChildren;
        for (var i = 1; i < total; i++) {
            var mc = view.getChildAt(i);
            if (egret.is(mc, "eui.Rect")) {
                var rect = mc;
                var data = {
                    "width": mc.width + "px",
                    "height": mc.height + "px"
                };
                data["background"] = "url(\"" + this.getImage(img.source) + "\") no-repeat center";
                data["background-size"] = img.width + "px " + img.height + "px";
                data["background-position"] = 0 - rect.x + "px " + rect.y + "px";
                var path = [];
                while (mc.parent != this) {
                    path.push(mc.parent.getChildIndex(mc));
                    mc = mc.parent;
                }
                data["path"] = path.reverse();
                EventCenter.instance.emit(MessageId.SET_VIEW_ATTR, data);
            }
        }
        EventCenter.instance.emit(MessageId.CREATE_CODE, {});
    };
    SkinView.prototype.checkGroup = function (view) {
        var total = view.numChildren;
        for (var i = 0; i < total; i++) {
            var mc = view.getChildAt(i);
            if (egret.is(mc, "eui.Group")) {
                this.checkGroup(mc);
            }
            this.getAttr(mc);
        }
    };
    SkinView.prototype.getColor = function (n) {
        var str = ("000000" + n.toString(16)).substr(-6);
        return "#" + str;
    };
    SkinView.prototype.getAlphaColor = function (color, alpha) {
        var temp = this.getColor(color);
        var reg = /\d\d/g;
        var match;
        var list = [];
        while (match = reg.exec(temp)) {
            var c = match[0];
            list.push(Number(c)).toString(16);
        }
        list.push(alpha);
        var aim = "rgba(" + list.join(",") + ")";
        console.log(aim);
        return aim;
    };
    SkinView.prototype.getImage = function (url) {
        if (!url) {
            return "";
        }
        return "./resource/assets/h5/" + url.replace(/_(png|jpg|gif)$/, ".$1");
    };
    SkinView.prototype.getAttr = function (mc) {
        var data = {
            "width": mc.width + "px",
            "height": mc.height + "px"
        };
        var isTransform = mc.rotation || mc.scaleX != 1 || mc.scaleY != 1;
        if (isTransform) {
            var transforms = [];
            if (mc.rotation) {
                transforms.push("rotate(" + mc.rotation + "deg)");
            }
            if (mc.scaleX != 1 || mc.scaleY != 1) {
                transforms.push("scale(" + mc.scaleX + ", " + mc.scaleY + ")");
            }
            data["transform"] = transforms.join(" ");
            data["transform-origin"] = mc.anchorOffsetX + "px " + mc.anchorOffsetY + "px";
        }
        data["left"] = (mc.x - mc.anchorOffsetX) + "px";
        data["top"] = (mc.y - mc.anchorOffsetY) + "px";
        if (egret.is(mc, "eui.Rect")) {
            var rect = mc;
            if (rect.fillAlpha == 1) {
                data["background-color"] = this.getColor(rect.fillColor);
            }
            else {
                data["background-color"] = this.getAlphaColor(rect.fillColor, rect.fillAlpha);
            }
            if (rect.ellipseWidth) {
                data["border-radius"] = rect.ellipseWidth + "px";
            }
            if (rect.strokeWeight) {
                data["border"] = "solid " + rect.strokeWeight + "px " + this.getColor(rect.strokeColor);
            }
            console.log("alpha: " + rect.fillAlpha);
        }
        else if (egret.is(mc, "eui.Label")) {
            var label = mc;
            data["color"] = this.getColor(label.textColor);
            data["font-size"] = label.size + "px";
            data["text-align"] = label.textAlign;
            data["line-height"] = Math.min(label.height, label.size * 1.54) + "px";
            data["height"] = Math.max(label.height, label.size) + "px";
            if (label.background) {
                data["background-color"] = this.getColor(label.backgroundColor);
            }
        }
        else if (egret.is(mc, "eui.Image")) {
            var image = mc;
            data["background"] = "url(\"" + this.getImage(image.source) + "\") no-repeat center";
            data["background-size"] = "contain";
        }
        data["position"] = "absolute";
        var path = [];
        while (mc.parent != this) {
            path.push(mc.parent.getChildIndex(mc));
            mc = mc.parent;
        }
        data["path"] = path.reverse();
        EventCenter.instance.emit(MessageId.SET_VIEW_ATTR, data);
    };
    return SkinView;
}(egret.Sprite));
__reflect(SkinView.prototype, "SkinView");
//# sourceMappingURL=SkinView.js.map