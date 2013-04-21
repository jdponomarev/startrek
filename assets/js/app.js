var Trek={};
var renders=0;

var world={
	skybenderWidth:110,
	skybenderHeight:128,
	gameFinished:false
};
var background={

};

var enemies=[];

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
	
	//skybender.transforms.translated3d="translate3d("+ skybender.x +'px,'+world.skybenderY+"px,0px)";
	//skybender.transforms.scale="scale("+world.coeff+","+world.coeff+")";    
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


function createEnemy(){
	//alert();
	if(world.gameFinished==true){
		return;
	}


	setTimeout(createEnemy,Math.floor(1000+Math.random()*5000));

	var type="asteroid";

	var enemy={
		$el:undefined,
		type:type,
		directionSprite:"center",
		directionSpriteNum:0,
		directionBack:false,
		direction:"center",
		position:Math.floor(-2+5*Math.random()),
		isMoving:false,
		transforms:{

		},
		width:undefined,
		height:undefined,
		x:undefined,
		y:-100,
		xShift:undefined,
		yShift:15, //speed
		delayStep:0,
		rotationCoeff:Math.floor(Math.random()*5)
	};
	enemy.$el=$("<div></div>",{class:"enemy "+type});
	
	//alert(enemy.position);
	//enemy.position=-2;

	enemy.x=(world.width-world.skybenderWidth)/2+enemy.position*world.laneWidth;
	enemy.$el.css("-webkit-transform","matrix(1,0,0,1,"+enemy.x+",-100) rotate(360deg)");


	$("#enemiesContainer").append(enemy.$el);
	enemies.push(enemy);

	/*
	var line="";
	for(var i=0;i<5;i++){
		for(var j=0;j<5;j++){
			line+=".asteroid_"+((i*5)+j)+"{width:64px;height:64px;background-position:"+(i*-64)+"px "+(j*-64)+"px;}";
		}
	}
	console.log(line);
	*/

};

setTimeout(createEnemy,2000);


function renderEnemies(){
	for(var i=enemies.length-1; i>=0;i--){
		//console.log("i="+i);
		if(enemies[i].type==="asteroid"){

			if(enemies[i].yShift){
				enemies[i].y+=enemies[i].yShift;
			}
			console.log(enemies[i].y);
			enemies[i].$el.css("-webkit-transform","matrix(1,0,0,1,"+enemies[i].x+","+enemies[i].y+") rotate(360deg)");
		
			if((enemies[i].y+150)>world.height){
				if(enemies[i].position==skybender.position){
					
					alert("ты проебал!");
					world.gameFinished=true;
				}
			}
			if((enemies[i].y)>world.height){
				enemies[i].$el.remove();		
				enemies.splice(i,1);		
			}
			
			
			if(enemies[i].delayStep<enemies[i].rotationCoeff){
				enemies[i].delayStep++;
				continue;
			}
			enemies[i].delayStep=0;
			enemies[i].$el.removeClass();
			enemies[i].$el.addClass("asteroid asteroid_"+enemies[i].directionSpriteNum); 		
			if(enemies[i].directionSpriteNum>23){
				enemies[i].directionSpriteNum=0;	
			}
			enemies[i].directionSpriteNum++;
			


		}
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
	if(world.gameFinished===true){
		return;
	}

	window.requestAnimationFrame(function() {
		//setTimeout(function() {
			render();
		//},1000/30);
	}); 
	
	var mod=renders%3;
	if(mod==0){
		renderStars();
	}else if(mod==1){
		renderShip();
	}else{
		renderEnemies();
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