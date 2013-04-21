var Trek={};
var renders=0;

var world={
	skybenderWidth:110,
	skybenderHeight:128
};
var background={

};

var starscanvas={
	stars:[]
};

var skybender={
	$el:undefined,
	directionSprite:"center",
	directionSpriteNum:0,
	directionBack:false,
	direction:"center",
	position:0,
	isMoving:false,
	transforms:{

	},
	width:undefined,
	height:undefined,
	x:undefined,
	y:undefined,
	xShift:undefined,
	yShift:undefined,
	delayStep:0
};

document.addEventListener("deviceready", onDeviceReady, true);
function onDeviceReady(){
	init();
	render();
};

function init(){
	skybender.$el=$("#skybender");
	background.$el=$("#background-1");
	//alert($(window).width());
	world.width=$(window).width();
	world.height=$(window).height();
	
	world.coeff=(world.width/6)/world.skybenderWidth;
	
	//alert(world.width);
	world.laneWidth=(world.width/7);

	//alert(world.laneWidth);

	skybender.width=world.coeff*world.skybenderWidth;
	skybender.height=world.coeff*world.skybenderHeight;

	world.skybenderY=(world.height-world.skybenderHeight);

	skybender.x=(world.width-world.skybenderWidth)/2;
	
	skybender.transforms.translated3d="translate3d("+ skybender.x +'px,'+world.skybenderY+"px,0px)";
	skybender.transforms.scale="scale("+world.coeff+","+world.coeff+")";    
	//skybender.transforms.rotate="rotate(360deg)";
	//skybender.$el.css("-webkit-transform",generateTransformString(skybender.transforms));


	skybender.$el.css("-webkit-transform","matrix("+world.coeff+",0,0,"+world.coeff+","+skybender.x+","+world.skybenderY+") rotate(360deg)");

	skybender.$el.css({ 
		width:world.skybenderWidth+"px",
		height:world.skybenderHeight+"px"
	});


	starsInit();

	$(document).swipeLeft(function(e){
		moveShip({direction:"left"});
	});
	$(document).swipeRight(function(e){
		moveShip({direction:"right"});
	});

};

function starsInit(){
	starscanvas.$el=document.getElementById("starscanvas");
	starscanvas.ctx=starscanvas.$el.getContext("2d");

	//alert(starscanvas.ctx);

	for(var i=0;i<25;i++){
		starscanvas.stars.push({
			x:Math.round(Math.random()*starscanvas.$el.width),
			y:Math.round(Math.random()*starscanvas.$el.height),
			z:Math.round(Math.random()*3+1)
		});
	}


};

function generateTransformString(transforms){
	var transformString="";
	for(var t in transforms){
		transformString+=" "+transforms[t];
	}
	return transformString;
};

setInterval(function(){
	console.log("renders="+renders);
},5000);
function render(){
	window.requestAnimationFrame(function() {
		//setTimeout(function() {
			render();
		//},1000/30);
	}); 
	

	if(renders%3!=0){
		renderStars();
	}else{
		renderShip();
	}


	renders++;


};
function renderShip(){
	if(skybender.direction!="center"){
		if(skybender.directionBack===true){
			skybender.directionSpriteNum--;
		}else{
			skybender.directionSpriteNum++;
		}
		console.log(skybender.directionBack+"     skybender-skybender_"+skybender.direction+"_"+skybender.directionSpriteNum);

		if(skybender.xShift){
			skybender.x+=skybender.xShift;
		}

		var degrees=skybender.directionSpriteNum*3;

		
		/*
		if(skybender.direction=="right"){
			degrees*=-1;
		}
		if(skybender.directionBack===true){
			degrees*=-1;
		}else{
			degrees*=-1;
		}
		*/      


		//skybender.$el.removeClass("skybender-skybender_center skybender-skybender_left_1 skybender-skybender_left_2 skybender-skybender_left_3 skybender-skybender_left_4 skybender-skybender_left_5 skybender-skybender_right_1 skybender-skybender_right_2 skybender-skybender_right_3 skybender-skybender_right_4 skybender-skybender_right_5");
		//skybender.$el.addClass("skybender skybender-skybender_"+skybender.direction+"_"+skybender.directionSpriteNum);
		
		
		skybender.$el.css("-webkit-transform","matrix("+world.coeff+",0,0,"+world.coeff+","+skybender.x+","+world.skybenderY+")");
		//skybender.$el.css("-webkit-transform","matrix("+world.coeff+",0,0,"+world.coeff+","+skybender.x+","+world.skybenderY+") rotate("+degrees+"deg)");


		if(skybender.delayStep==0){
			//alert();
			skybender.$el.removeClass("skybender-skybender_center skybender-skybender_left_1 skybender-skybender_left_2 skybender-skybender_left_3 skybender-skybender_left_4 skybender-skybender_left_5 skybender-skybender_right_1 skybender-skybender_right_2 skybender-skybender_right_3 skybender-skybender_right_4 skybender-skybender_right_5");
			skybender.$el.addClass("skybender skybender-skybender_"+skybender.direction+"_"+skybender.directionSpriteNum);      
		}
		if(skybender.directionSpriteNum==5){
			skybender.directionBack=true;
		}

		if((skybender.directionBack)&&(skybender.directionSpriteNum<2)){
			skybender.direction="center";
			skybender.xShift=0;
			//alert("back");
			skybender.delayStep=0;
			skybender.directionBack=false;
			skybender.directionSpriteNum=0;
			skybender.isMoving=false;
			skybender.$el.removeClass("skybender-skybender_center skybender-skybender_left_1 skybender-skybender_left_2 skybender-skybender_left_3 skybender-skybender_left_4 skybender-skybender_left_5 skybender-skybender_right_1 skybender-skybender_right_2 skybender-skybender_right_3 skybender-skybender_right_4 skybender-skybender_right_5");
			skybender.$el.addClass("skybender-skybender_center");
			skybender.$el.css("-webkit-transform","matrix("+world.coeff+",0,0,"+world.coeff+","+skybender.x+","+world.skybenderY+") rotate(0deg)");

		}
	}
};
function renderStars(){
	starscanvas.ctx.fillStyle="black";
	starscanvas.ctx.fillRect(0,0,starscanvas.$el.width,starscanvas.$el.height);
	// Draw the stars.
	starscanvas.ctx.fillStyle="white";
	for(i=0;i<starscanvas.stars.length;i++){
		starscanvas.ctx.fillRect(starscanvas.stars[i].x,starscanvas.stars[i].y,1,3);
	}
	for(i=0;i<starscanvas.stars.length;i++){
		starscanvas.stars[i].y+=starscanvas.stars[i].z;
		if(starscanvas.stars[i].y>starscanvas.$el.height){
			starscanvas.stars[i].y=0;
		}
	}     
};

function moveShip(params){
	if(skybender.isMoving===true){
		console.log("skybender is already moving");
		return;
	}
	
	console.log("move ship = "+JSON.stringify(params));
	if(params.direction==="left"){
		if(skybender.position==-2){
			console.log("cannot move, border");
			return;
		}
		skybender.xShift=-world.laneWidth/5*world.coeff;
		skybender.position--;
	}
	if(params.direction==="right"){
		if(skybender.position==2){
			console.log("cannot move, border");
			return;
		}
		skybender.xShift=world.laneWidth/5*world.coeff;
		//alert(skybender.xShift);
		skybender.position++;
	}
	skybender.direction=params.direction;
	skybender.isMoving=true;


	
	//skybender.$el.removeClass("position-0 position-1 position-2 position-3 position-4");
	//skybender.$el.addClass("position-"+(skybender.position+2));
};
$(document).ready(function(){
	//alert("doc ready");
	document.addEventListener("deviceready", onDeviceReady, true);

	if((window.location+"").indexOf("Document")!==-1){
		onDeviceReady();     


		//$(document).trigger("swipeRight");

		$(document).keydown(function(e) {
			//console.log(e.keyCode);
			if (e.keyCode == 39){
				//alert("right");
				moveShip({direction:"right"});
			}
			if(e.keyCode==37){
				//alert("left");
				moveShip({direction:"left"});
			}
			if (e.keyCode == 77 && e.ctrlKey) {
				alert('ctrl A');
				Main.backbuttonFunc();


			}
		});        
	}

});