class WebCenter{
    private _window:any = window;
    constructor(){

    }

    public init(){
        EventCenter.instance.on(MessageId.LOAD_SKINS, this.loadSkins, this);
        EventCenter.instance.on(MessageId.SET_VIEW_ATTR, this.setViewAttr, this);
        EventCenter.instance.on(MessageId.SET_XML_DATA, this.setXmlData, this);
        EventCenter.instance.on(MessageId.CREATE_CODE, this.createCode, this);
    }

    private loadSkins(e:egret.Event){
        this._window.WEB.loadSkins(e.data);
    }

    private setViewAttr(e:egret.Event){
        this._window.WEB.setViewAttr(e.data);
    }

    private setXmlData(e:egret.Event){
        this._window.WEB.setXmlData(e.data);
    }

    private createCode(e:egret.Event){
        this._window.WEB.createCode();
    }
}