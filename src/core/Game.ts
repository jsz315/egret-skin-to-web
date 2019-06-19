class Game{

    private _webCenter:WebCenter;
    private static _instance:Game;

    constructor(){
        this._webCenter = new WebCenter();
        Game._instance = this;
    }

    public init(){
        this._webCenter.init();
    }

    public static get instance() : Game {
        return Game._instance || new Game();
    }
    
}