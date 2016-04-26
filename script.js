/**
 * Created by 明多牧 on 2016/1/28.
 */
var total=3,all= 0,again=0,text_sum= 0,//总的选项数
    r=10,shake_statue= 0,option=[],isYesOrNo=0;//所生成的小球
var color=["#123","#456","#789"];
var planet=document.getElementsByClassName("planet");
var planet_r=[70,95,120,140,165,190,215,240];
var planet_start=[0.1,0.3,0.2,0.7,0.8,0.6,0.5,0.4];
var scene=document.getElementsByClassName("scene");
var stage, textStage, input;
var circles;
var offsetX, offsetY, text;
var colors = ['#f5c7b5', '#92b1d7', '#d1dee8', '#727d94', '#fde6cd'];


//加载监听摇动时间
window.onload = function() {
    document.getElementById("main").style.width=window.innerWidth+"px";
    document.getElementById("main").style.height=window.innerHeight+"px";
    var myShakeEvent = new Shake({
        threshold: 15
    });
    plus();
    plus();
    plus();
    myShakeEvent.start();
    window.addEventListener('shake', shake_event, false);
    init_all();
};

function createText(text){
    document.getElementById("resultText").innerHTML=text;
    $("#resultText").fadeIn(500);
}

//摇一摇触发函数
function shake_event () {
    var result;
    if(shake_statue) {
        $("#back2").fadeOut(500);
        result = get_result();
        $("#shake_img").fadeOut(500, function () {
            $("#result").fadeIn(500, function () {
                    createText(option[result]);
                    $("#re_button").fadeIn(1000);
                }
            )
        });
        again++;
        shake_statue=0;
    }
}

//得到结果
function get_result(){
    var i;
    do{
        i=Math.random()*all;
    }while(i==all);
    return parseInt(i);
}

//画布绘制
function get_text(){
    var i,j;
    j=0;
    for(i=0;i<text_sum;i++){
        if(document.getElementsByClassName("option_text")[i].style.display==""){
            if(document.getElementsByClassName("option")[i].value!=""){
                option[j]=document.getElementsByClassName("option")[i].value;
                j++;
            }
        }
    }
    if(j>=2) {
        scene[1].style.display = "none";
        scene[2].style.display = "";
        document.getElementById("title2").innerHTML=document.getElementById("title").innerHTML
        all=j;
        total=j;
        //create_circle();
        shake_statue=1;
    }else
    {
        alert("两项以上才能选呢");
    }
}

function get_ready(h){
    var k;
    if(h==1){
        k=document.getElementById("input");
        if(k.value==k.defaultValue){
            alert("在纠结什么？说一说呗、")
        }else{
            document.getElementById("title").innerHTML= k.value;
            scene[0].style.display = "none";
            scene[1].style.display = "";
        }
    }else{
        switch (h){
            case 2:
                document.getElementById("title2").innerHTML= "Yes/No";
                scene[0].style.display = "none";
                scene[2].style.display = "";
                option[0]="yes";
                option[1]="no";
                all=2;
                total=2;
                shake_statue=1;
                isYesOrNo=1;
                break;
            case 3:
                document.getElementById("title").innerHTML= "吃什么？";
                scene[0].style.display = "none";
                scene[1].style.display = "";
                break;
            case 4:
                document.getElementById("title").innerHTML= "去哪里？";
                scene[0].style.display = "none";
                scene[1].style.display = "";
                break;
            case 5:
                document.getElementById("title").innerHTML= "选哪个？";
                scene[0].style.display = "none";
                scene[1].style.display = "";
                break;
            case 6:
                document.getElementById("title").innerHTML= "穿什么？";
                scene[0].style.display = "none";
                scene[1].style.display = "";
                break;
            case 7:
                document.getElementById("title").innerHTML= "玩什么？";
                scene[0].style.display = "none";
                scene[1].style.display = "";
                break;
        }
    }
}

function init(){
    if(again==4){
        alert("不要再欺骗你自己了！！！");
        again++;
    }else{
        $("#back2").fadeIn(500);
    $("#re_button").fadeOut(500,function()
    {
        $("#resultText").fadeOut(500);
        $("#shake_img ").fadeIn(500);
        shake_statue=1;
    });
    }
}

function get_back(h){
    if(h==2){
        if(isYesOrNo){
            scene[h].style.display = "none";
            scene[h-2].style.display = "";
            isYesOrNo=0;
        }else{
            scene[h].style.display = "none";
            scene[h-1].style.display = "";
        }
    }else {
        scene[h].style.display = "none";
        scene[h-1].style.display = "";
        var h=document.getElementsByClassName("option_text");
        for(var i=h.length-2;i>=0 ;i--){
            document.getElementsByClassName("scene")[1].removeChild(h[i]);
        }
        plus();
        plus();
        plus();
    }

}


function plus(){
    var max,i;
    max=0;
    if(all<9) {
        for(i=0;i<document.getElementsByClassName("option_text").length-1;i++){
            if(document.getElementsByClassName("option_text")[i].style.display!="none"){
                max=parseInt(document.getElementsByClassName("option")[i].defaultValue);
            }
        }
        add_text();
        document.getElementsByClassName("option")[i].defaultValue=max+1;
        total++;
    }else{
        for(i=0;i<document.getElementsByClassName("option_text").length-1;i++){
            if(document.getElementsByClassName("option_text")[i].style.display!="none"){
                max=parseInt(document.getElementsByClassName("option")[i].defaultValue);
            }
        }
        add_text();
        document.getElementsByClassName("option")[i].defaultValue=max+1;
        document.getElementById("a_plus").style.display="none";
    }
}

function init_all() {
    initStages();
    initText();
    initCircles();
    animate();
}

// Init Canvas
function initStages() {
    offsetX = window.innerWidth;
    offsetY = 0;
    textStage = new createjs.Stage("text");
    textStage.canvas.width = 600;
    textStage.canvas.height = 400;

    stage = new createjs.Stage("stage");
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = 600;
}


function initText() {
    text = new createjs.Text("t", "80px ", "#eee");
    text.textAlign = 'center';
    text.x = 300;
}

function initCircles() {
    circles = [];
    for(var i=0; i<300; i++) {
        var circle = new createjs.Shape();
        var r = 7;
        var x = window.innerWidth*Math.random();
        var y = window.innerHeight*Math.random();
        var color = colors[Math.floor(i%colors.length)];
        var alpha = 0.4 + Math.random()*0.1;
        circle.alpha = alpha;
        circle.radius = r;
        circle.graphics.beginFill(color).drawCircle(0, 0, r);
        circle.x = x;
        circle.y = y;
        circles.push(circle);
        stage.addChild(circle);
        circle.movement = 'float';
        tweenCircle(circle);
    }
}


// animating circles
function animate() {
    stage.update();
    requestAnimationFrame(animate);
}

function tweenCircle(c, dir) {
    if(c.tween) c.tween.kill();
    if(dir == 'in') {
        c.tween = TweenLite.to(c, 0.4, {x: c.originX, y: c.originY, ease:Quad.easeInOut, alpha: 0.7, radius: 5, scaleX: 0.4, scaleY: 0.4, onComplete: function() {
            c.movement = 'jiggle';
            tweenCircle(c);
        }});
    } else if(dir == 'out') {
        c.tween = TweenLite.to(c, 0.8, {x: window.innerWidth*Math.random(), y: window.innerHeight*Math.random(), ease:Quad.easeInOut, alpha: 0.0 + Math.random()*0.5, scaleX: 1, scaleY: 1, onComplete: function() {
            c.movement = 'float';
            tweenCircle(c);
        }});
    } else {
        if(c.movement == 'float') {
            c.tween = TweenLite.to(c, 5 + Math.random()*3.5, {x: c.x + -100+Math.random()*200, y: c.y + -100+Math.random()*200, ease:Quad.easeInOut, alpha: 0.0 + Math.random()*0.5,
                onComplete: function() {
                    tweenCircle(c);
                }});
        } else {
            c.tween = TweenLite.to(c, 0.05, {x: c.originX + Math.random()*3, y: c.originY + Math.random()*3, ease:Quad.easeInOut,
                onComplete: function() {
                    tweenCircle(c);
                }});
        }
    }
}

function on_text_blur(i){
    if(document.getElementsByClassName('option')[i].value.length<1) {
        document.getElementsByClassName('option')[i].value=document.getElementsByClassName('option')[i].defaultValue;
    }
    document.getElementsByClassName('img_delete')[i].style.display='none';
}

function on_text_focus(i){
    if(document.getElementsByClassName('option')[i].value==document.getElementsByClassName('option')[i].defaultValue)
    {document.getElementsByClassName('option')[i].value='';}
    document.getElementsByClassName('img_delete')[i].style.display='';
}

function on_img_click(i){
    document.getElementsByClassName('option')[i].value=document.getElementsByClassName('option')[i].defaultValue;
    document.getElementsByClassName('option')[i].focus();
}




function add_text(){
    var new_option,new_input,new_img;
    new_option=document.createElement("div");
    new_option.className="option_text";
    document.getElementsByClassName("scene")[1].appendChild(new_option);
    new_input=document.createElement("input");
    new_input.setAttribute("onblur","on_text_blur("+text_sum+")");
    new_input.setAttribute("onfocus","on_text_focus("+text_sum+")");
    new_input.setAttribute("type","text");
    new_input.className="option";
    new_input.defaultValue=text_sum+1;
    new_img=document.createElement("img");
    new_img.src="delete.png";
    new_img.className="img_delete";
    new_img.style.width="20px";
    new_img.style.height="20px";
    new_img.style.display="none";
    new_img.setAttribute("onmouseover","on_img_click("+text_sum+")");
    new_option.appendChild(new_input);
    new_option.appendChild(new_img);
    touch.on(new_option, 'swipeleft swiperight', function(ev){
        if(all>2) {
            new_option.style.display = "none";
            if(all>9){
                document.getElementById("a_plus").style.display="";
            }
            all--;
        }else{
            alert("请至少输入两项")
        }
    });
    document.getElementsByClassName("scene")[1].appendChild(document.getElementById("a_plus"));
    text_sum++;
    all++;
}