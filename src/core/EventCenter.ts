class EventCenter extends egret.EventDispatcher{

    private static _instance:EventCenter;

    constructor(){
        super();
        EventCenter._instance = this;
    }

    public emit(type:string, data:any):void{
        var event:egret.Event = new egret.Event(type);
        event.data = data;
        this.dispatchEvent(event);
    }

    public on(type:string, callback:Function, thisObj:any):void{
        this.addEventListener(type, callback, thisObj);
    }

    public remove(type:string, callback:Function, thisObj:any):void{
        this.removeEventListener(type, callback, thisObj);
    }

    public static get instance():EventCenter{
        return EventCenter._instance || new EventCenter();
    }
}