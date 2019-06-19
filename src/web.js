$(function(){
    $(".page").delegate(".btn", "click", function(){
        EventCenter.instance.emit(MessageId.CHOOSE_SKIN, $(this).attr("data-key"));
    })

    $(".mask").click(function(){
        $(".mask").hide();
    })

    $(".start").click(function(){
        var str = $(".txt.less").val();
        var find = $(".find.input").val();
        var reg = new RegExp(find, "g");
        str = str.replace(reg, $(".replace.input").val());
        $(".txt.less").val(str);
    })
})

function resizeStage(){
    var tid;
    resize();
    $(window).on("resize", resize);

    function resize(){
        var $parent = $(".egret-player");
        var $canvas = $("canvas");
        $parent.css({
            "position": "relative",
            "text-align": "center"
        });
        $canvas.css({
            "width": "auto",
            "height": "100%",
            "left": "0px",
            "top": "0px",
            "margin": "auto",
            "transform": "scale(0.8)",
            "transform-origin": "50% 50%",
            "position": "relative"
        });

        $parent.css({opacity: 0});
        clearTimeout(tid);

        tid = setTimeout(function() {
            $parent.css({opacity: 1});
            $parent.css({
                "position": "relative",
                "text-align": "center",
                "width": "480px"
            });
            $canvas.css({
                "width": "100%",
                "height": "auto",
                "left": "0px",
                "top": "0px",
                "bottom": "0px",
                "right": "0px",
                "margin": "auto",
                "transform": "scale(0.7)",
                "transform-origin": "50% 50%",
                "position": "absolute"
            });
        }, 300);
    }
}

var CLASS_SPACE = "  ";
var ATTR_SPACE = "    ";
window.WEB = {
    xml: "",
    less: []
};

window.WEB.loadSkins = function(list){
    var divs = [];
    list.forEach(val=>{
        var match = /\/([a-zA-Z]+)\.exml/.exec(val);
        divs.push(`<div data-key="${val}" class="btn">${match[1]}</div>`);
    })
    $(".page").html(divs.join(""));
    $("canvas").css({
        "left": "0px",
        "margin": "auto",
        "width": "750px",
        "height": "1206px"
    });
    
    resizeStage();
    $(".page .btn").eq(0).click();
}

window.WEB.setViewAttr = function(data){
    var div = $(this.xml)[0];
    var aim = div;
    var id = 0;
    while(id < data.path.length){
        aim = aim.children[data.path[id]];
        id++;
    }
    if(!aim.getAttribute("id")){
        aim.setAttribute("id", "dom" + data.path.join("_"));
    }
    data.class = aim.getAttribute("id");
    
    this.xml = div;
    this.less.push(data);
}

window.WEB.setXmlData = function(xml){
    this.xml = xml;
    this.less = [];
}

window.WEB.createCode = function(){
    var dom = toDom(this.xml.outerHTML);
    $(".dom").val(dom);
    var less = toLess(this.less);
    less = addNamespace(less, dom);
    less = clearLines(less);
    $(".less").val(less);

    $(".preview").attr("src", "preview.html?v=" + 2);
    setTimeout(()=>{
        var scale = window.innerHeight * 0.8 / 1206;
        $(".mask, .preview").show();
        $(".preview")[0].contentWindow.postMessage({
            dom: dom,
            less: less
        }, "/");
        $(".preview").css({
            "transform": `scale(${scale})`
        });
    }, 600);
}

function toLess(less){
    var list = [];
    less.forEach(val=>{
        var style = [];
        style.push(`${CLASS_SPACE}.${val.class}{`);
        for(var i in val){
            if(i != "path" && i != "class"){
                style.push(`${ATTR_SPACE}${i}: ${val[i]};`);
            }
        }
        //style.push(`${ATTR_SPACE}position: absolute;`);
        style.push(`${CLASS_SPACE}}`);
        list.push(style.join("\n"));
    })
    return list.join("\n");
}

function clearLines(str){
    return str.replace(/\n+/g, "\n");
}

function addNamespace(less, dom){
    var ns = $(dom).attr("class");
    var list = [];
    list.push(`.${ns}{`);
    list.push(less);
    list.push(`}`);
    return list.join("\n");
}

function toDom(str){
    str = str.replace(/e:[a-zA-Z]+/g, "div");
    str = str.replace(/id=/g, "class=");
    str = str.replace(/\/>/g, "></div>");
    var $dom = $(str);
    var list = $dom.find("div");
    for(var i = 0; i < list.length; i++){
        var div = list[i];
        if(div.getAttribute("text")){
            div.innerHTML = div.getAttribute("text");
        }
    }
    var dom = $dom[0].outerHTML;
    dom = dom.replace(/<div.*?class="(\w+?)".*?>/g, "<div class='$1'>");
    return dom;
}