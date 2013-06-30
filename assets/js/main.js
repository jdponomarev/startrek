var starbenderActor;
var starbenderImage;

function __scene(director) {
	
	var scene= director.createScene();
 
	var bg= new CAAT.ActorContainer().
			setBounds(0,0,director.width,director.height).
			setFillStyle('#000');
 
	scene.addChild(bg);
 
	var resetAniimation=function(spriteImage, time){
		//alert("stopped");
		spriteImage.playAnimation("stop");
	};

	starbenderImage= new CAAT.SpriteImage().
			initialize(director.getImage('stars'), 3,4 ).
			addAnimation("stop",[0],0).
			addAnimation("moveright",[0,8,9,10,3,7,3,10,9,8,0],100,resetAniimation).
			addAnimation("moveleft",[0,1,2,4,5,6,5,4,2,1,0],100,resetAniimation);
	

	starbenderActor= new CAAT.Actor().setBackgroundImage(
					starbenderImage.getRef(), true ).
					setSpriteIndex( 0 ).centerOn(100,100).
					enableEvents(true);

	bg.addChild(starbenderActor);
 


	scene.createTimer(
			0,
			Number.MAX_VALUE,
			function(scene_time, timer_time, timertask_instance)  {   // timeout
			},
			function(scene_time, timer_time, timertask_instance)  {   // tick
				//alert();
				var x=Math.floor(Math.random()*director.width);
				var path= new CAAT.Path().
			        beginPath(x,-100).
			        addLineTo(x,1000).
			        endPath();	


				var bubble = new CAAT.ShapeActor().
	                setLocation(x, 100).
	                setSize(2, 6).
	                setShape(CAAT.ShapeActor.prototype.SHAPE_RECTANGLE).
	                enableEvents(false).
	                setCompositeOp('lighter').
	                setFrameTime(scene.time, 1000).
	                setFillStyle( "white" ).addBehavior( new CAAT.PathBehavior().setPath(path).setFrameTime(scene.time,1000) );
	            bg.addChild(bubble);
			},
			function(scene_time, timer_time, timertask_instance)  {   // cancel
			}
	);

	CAAT.registerKeyListener( function(keyEvent) {
		if ( keyEvent.getKeyCode()===CAAT.Keys.LEFT ) {
			moveShip({direction:"left"});
		}else if ( keyEvent.getKeyCode()===CAAT.Keys.RIGHT ) {
			moveShip({direction:"right"});
		}
	});  
}

function moveShip(params){
	if(params.direction=="left"){
		starbenderActor.playAnimation("moveleft");
		starbenderActor.x-=50;
	}else if(params.direction=="right"){
		starbenderActor.playAnimation("moveright");
		starbenderActor.x+=50;      
	}
};

function __init()   {
 
	var director = new CAAT.Director().
			initialize(document.width,document.height, document.getElementById('_c1')).
			setClear(false);
 
	new CAAT.ImagePreloader().loadImages(
		[
			{id:'stars',    url:'assets/css/skybender-sprite-small.png'}
		],
		function( counter, images ) {
			director.setImagesCache(images);
			__scene(director);
		}
	);

	setInterval(function(){
		moveShip({direction:"right"});
	},5000);
	/*
	$(document).swipeLeft(function(e){
		moveShip({direction:"left"});
	});
	$(document).swipeRight(function(e){
		moveShip({direction:"right"});
	});
	*/
 
	CAAT.loop(0);
}


window.addEventListener( "load", __init, false );

/*
function onDeviceReady(){
	__init();
};
document.addEventListener("deviceready", onDeviceReady, true);
*/

/*
if((window.location+"").indexOf("Document")!==-1){

$(document).ready(function(){
	//alert("doc ready");
	document.addEventListener("deviceready", onDeviceReady, true);
	if((window.location+"").indexOf("Document")!==-1){
		onDeviceReady();           
	}
});
}else{
	__init();
}
*/

