
var HN= {};
var starbenderActor;
var starbenderImage;
var scene;
var bg;

var starbender={
	isMoving:false,
	position:0
};
var world={
	laneWidth:50,
	touchX:0,
	touchY:0,
	gameOver:false
};

var asteroidImage;
var explosionImage;

var enemiesArray=[];
var lcarsUi={
	container:undefined,
	topPanel:undefined,
	isPulled:false
};
var director=undefined;

var heroes={
	worf:undefined
};

var sceneActions={
	asteroidsStarted:false
};

var menu={

};

var touchAreas=[

];


(function() {

	function __scene(director) {    
		//CAAT.TOUCH_BEHAVIOR=CAAT.TOUCH_BEHAVIOR;
		//CAAT.TOUCH_BEHAVIOR = CAAT.TOUCH_AS_MOUSE;

		//alert(CAAT.TOUCH_BEHAVIOR);
		//CAAT.DEBUG= 1;



		//CocoonJS.App.enableTouchInCocoonJS();
		
		scene= director.createScene();

		bg= new CAAT.ActorContainer().
			setBounds(0,0,director.width,director.height).
			setFillStyle('#000');

		lcarsUi.container= new CAAT.ActorContainer().
			setBounds(0,-100,director.width,director.height).
			setFillStyle('transparent');

		scene.addChild(bg);
		scene.addChild(lcarsUi.container);
		//bg.touch
		//bg.mouseClick=function(){
		//  window.alert("click");
		//};
	 
		var resetAnimation=function(spriteImage, time){
			spriteImage.playAnimation("stop");
			starbender.isMoving=false;
			
			/*
			if(starbender.failedDirection!=null){
				moveShip({direction:starbender.failedDirection});
				starbender.failedDirection=null;
			}
			*/

		};

		starbenderImage= new CAAT.SpriteImage().
			initialize(director.getImage('starbender'), 3,4 ).addAnimation("stop",[0],0).
			addAnimation("moveright",[0,8,9,10,3,7,3,10,9,8,0],50,resetAnimation).
			addAnimation("moveleft",[0,1,2,4,5,6,5,4,2,1,0],50,resetAnimation);
		
		asteroidImage=new CAAT.SpriteImage().
			initialize(director.getImage("asteroid"),6,5).addAnimation("stop",[0],0).
			addAnimation("rotation",[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],500,function(){
				alert("reset");
			});

		explosionImage=new CAAT.SpriteImage().
			initialize(director.getImage("explosion"),5,5).
			addAnimation("stop",[24],0).
			addAnimation("explode",[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],70,function(spriteImage,time){
				spriteImage.playAnimation("stop");
			});

		starbenderActor= new CAAT.Actor().setBackgroundImage(
						starbenderImage.getRef(), true ).
						setSpriteIndex( 0 ).
						enableEvents(true);

		starbenderActor.centerOn(director.width/2,director.height-starbenderActor.height/2);
		world.laneWidth=(director.width-starbenderActor.width)/5;





		drawLcars();
		drawMenu({animation:true});
		//startGame();


		scene.createTimer(0,Number.MAX_VALUE,function(scene_time, timer_time, timertask_instance)  {
		
		},function(scene_time, timer_time, timertask_instance)  {
			//Stars
			var x=Math.floor(Math.random()*director.width);
			var path= new CAAT.Path().
				beginPath(x,-100).
				addLineTo(x,director.height+100).
				endPath();  

			var starColor="#333333";
			var rndColor=Math.random();
			var starType=0;
			if(rndColor<0.3){
				starColor="#333";
				starType=1;
			}else if(rndColor<0.6){
				starColor="#777";
				starType=2;
			}else{
				starColor="#ccc";
				starType=3;
			}

			//Drawing stars
			var star = new CAAT.ShapeActor().
				setLocation(x, 100).
				setSize(2, 15*starType).
				setShape(CAAT.ShapeActor.prototype.SHAPE_RECTANGLE).
				enableEvents(false).
				setCompositeOp('lighter').
				setFrameTime(scene.time, 2000).
				setFillStyle( ""+starColor ).addBehavior( new CAAT.PathBehavior().setPath(path).setFrameTime(scene.time,2000/starType) );
			bg.addChild(star);
			bg.setZOrder(star,0);			
		});
	}

	function drawMenu(params){

		menu.star_trek_logo_big= new CAAT.Foundation.Actor().
			setBackgroundImage( director.getImage('star_trek_logo_big'), true );
		menu.danger_ahead= new CAAT.Foundation.Actor().
			setBackgroundImage( director.getImage('danger_ahead'), true );			
		menu.start_game= new CAAT.Foundation.Actor().
			setBackgroundImage( director.getImage('start_game'), true );	


		//alert(menu.star_trek_logo_big.width);
		menu.star_trek_logo_big.centerOn(director.width/2,director.height/5+menu.star_trek_logo_big.height);
		menu.danger_ahead.centerOn(director.width/2,director.height/5+menu.star_trek_logo_big.height+menu.danger_ahead.height+50);
		menu.start_game.centerOn(director.width/2,director.height/5+menu.danger_ahead.y+50);

		//100%
		var scaleCoeff=director.width/menu.star_trek_logo_big.width;
		scaleCoeff=scaleCoeff*0.8;

		//100%
		var scaleCoeff_danger_ahead=director.width/menu.danger_ahead.width;
		scaleCoeff_danger_ahead=scaleCoeff_danger_ahead*0.8;

		//100%
		var scaleCoeff_start_game=director.width/menu.start_game.width;
		scaleCoeff_danger_ahead=scaleCoeff_start_game*0.8;



		menu.star_trek_logo_big.setScale(scaleCoeff,scaleCoeff);
		menu.danger_ahead.setScale(scaleCoeff_danger_ahead,scaleCoeff_danger_ahead);
		menu.start_game.setScale(scaleCoeff_start_game,scaleCoeff_start_game);

		if(params.animation==true){
			lcarsUi.container.addChild(menu.star_trek_logo_big);
			var rb= new CAAT.ScaleBehavior().
				setValues(3, 1, 3, 1).
				setFrameTime(0, 300);

			menu.star_trek_logo_big.addBehavior(rb);

			setTimeout(function(){
				lcarsUi.container.addChild(menu.danger_ahead);
				var rb_danger_ahead= new CAAT.ScaleBehavior().
					setValues(6, 1, 6, 1).
					setFrameTime(scene.time, 300);
				menu.danger_ahead.addBehavior(rb_danger_ahead);
			},500);
		
			setTimeout(function(){
				lcarsUi.container.addChild(menu.start_game);
				var rb_start_game= new CAAT.ScaleBehavior().
					setValues(6, 1, 6, 1).
					setFrameTime(scene.time,300);
				menu.start_game.addBehavior(rb_start_game);
			},1500);		

		}

		try{
			//CocoonJS.App.enableTouchInCocoonJS();
			//lcarsUi.container.setZOrder(menu.star_trek_logo_big,0);
			
			addTouchArea({
				object:menu.start_game,
				func:function(){
					lcarsUi.container.removeChild(menu.start_game);
					lcarsUi.container.removeChild(menu.star_trek_logo_big);
					lcarsUi.container.removeChild(menu.danger_ahead);

					startGame();
				},
				shiftX:0,
				shiftY:100
			});


			//uncomment when bug is fixed
			//https://github.com/hyperandroid/CAAT/issues/144

			
			menu.start_game.setAsButton(director.getImage('start_game'),0,0,0,0,function(){
				lcarsUi.container.removeChild(menu.start_game);
				lcarsUi.container.removeChild(menu.star_trek_logo_big);
				lcarsUi.container.removeChild(menu.danger_ahead);
				startGame();
			});
			
			//menu.star_trek_logo_big.enableEvents(true);
			//menu.star_trek_logo_big.setGestureEnabled(true);
		}catch(e){
			window.alert("e="+e);
		}
		
		/*
		menu.star_trek_logo_big.mouseClick=function(){
			window.alert("mouseClick");
			lcarsUi.container.removeChild(menu.star_trek_logo_big);
			startGame();
		};
		
		menu.star_trek_logo_big.mouseUp=function(){
			window.alert("mouseUp");
			lcarsUi.container.removeChild(menu.star_trek_logo_big);
			startGame();
		};
		
		menu.star_trek_logo_big.touchMove=function(){
			window.alert("mouseTouchMove");
			lcarsUi.container.removeChild(menu.star_trek_logo_big);
			startGame();
		};
		menu.star_trek_logo_big.touchEnd=function(){
			window.alert("mouseTouchEnd");
			lcarsUi.container.removeChild(menu.star_trek_logo_big);
			startGame();
		};
		
		menu.star_trek_logo_big.touchStart=function(){
			window.alert("mouseTouchStart");
			lcarsUi.container.removeChild(menu.star_trek_logo_big);
			startGame();
		};
		*/

	};
	function addTouchArea(params){
		//alert("params="+params);
		touchAreas.push({
			x1:params.object.x+params.shiftX,
			x2:params.object.x+params.object.width+params.shiftX,
			y1:params.object.y+params.shiftY,
			y2:params.object.y+params.object.height+params.shiftY,
			func:params.func
		});
	};

	function startGame(){

		bg.addChild(starbenderActor);
		bg.setZOrder(starbenderActor,0);

		scene.createTimer(0,Number.MAX_VALUE,function(scene_time, timer_time, timertask_instance)  {
		
		},function(scene_time, timer_time, timertask_instance)  {
			//alert();
			var currentSecond=Math.floor(scene_time/1000);
			var tick=false;
			if(currentSecond!=world.last_second){
				world.last_second=currentSecond;
				tick=true;
			}


			var entitiesCollision= new CAAT.Module.Collision.QuadTree().create( 0,0,director.width,director.height, enemiesArray );
			var collides= entitiesCollision.getOverlappingActors(
							(new CAAT.Math.Rectangle()).setBounds( starbenderActor.x, starbenderActor.y, starbenderActor.width, starbenderActor.height ) );

			if(collides.length===0){
				
			}else{
				//alert(collides);
				//alert("трахбабах!");
				if(world.gameOver===true){
					return;
				}
				starbenderActor.emptyBehaviorList();
				starbenderActor.setBackgroundImage(
					explosionImage.getRef(), true ).playAnimation("stop").playAnimation("explode");
				world.gameOver=true;
				//starbenderActor.playAnimation("stop");
			}



			if(sceneActions.asteroidsStarted===true){

			}else{
				sceneActions.asteroidsStarted=true;

				setTimeout(function(){
					officerMessage({
						officer:"worf",
						needToPull:true,
						messages:[
							"Captain, I've spotted a large asteroid field ahead",
							"Advicing you to raise shields and lower speed",
							"Or we will get blown into pieces"
						]
					},function(){
						pullTopPanel(false);
					});
				},1000);

				setTimeout(function(){
					officerMessage({
						officer:"laforge",
						needToPull:true,
						messages:[
							"Captain, We'got a problem with our warp drive",
							"We can't stop the engines",
							"Our engineers are working on it"
						]
					},function(){
						officerMessage({
							officer:"pikard",
							needToPull:false,
							messages:[
								"Red alert!",
								"Waiting for all seniour officers in my office now."
							]
						},function(){
							pullTopPanel(false);
						});
					});
				},30000);				
			}

			if((currentSecond>5)&&tick&&!world.gameOver){
				console.log("beginning asteroids");
				var asteroidx=director.width/2+world.laneWidth*(-2+Math.floor(+Math.random()*5));

				var asteroidPath= new CAAT.Path().
					beginPath(asteroidx,-100).
					addLineTo(asteroidx,director.height+100).
					endPath();  
				try{
					var asteroid = new CAAT.Actor().setBackgroundImage(
									asteroidImage.getRef(), true ).
									setSpriteIndex( 0 ).
									enableEvents(true).centerOn(asteroidx,-100).
									addBehavior( new CAAT.PathBehavior().setPath(asteroidPath).setFrameTime(scene.time,2000) ).playAnimation("rotation");
					asteroid.playAnimation("rotation");
					bg.addChild(asteroid);
					asteroid.playAnimation("rotation");
					enemiesArray.push(asteroid);
				}catch(e){
					alert("err="+e);
				}
			}
		},function(scene_time, timer_time, timertask_instance)  {
		
		});

		CAAT.registerKeyListener( function(keyEvent) {
			if ( keyEvent.getKeyCode()===CAAT.Keys.LEFT ) {
				moveShip({direction:"left"});
			}else if ( keyEvent.getKeyCode()===CAAT.Keys.RIGHT ) {
				moveShip({direction:"right"});
			}
		}); 

	};

	function drawHeroes(){
		heroes.worfImage=new CAAT.SpriteImage().
			initialize(director.getImage("worf"),1,2).
			addAnimation("stop",[0],0).
			addAnimation("speak",[0,0,0,1,1,0,1,1],200,function(spriteImage,time){
				//spriteImage.playAnimation("stop");
			});
		heroes.worf= new CAAT.Actor().setBackgroundImage(
						heroes.worfImage.getRef(), true ).
						setSpriteIndex( 0 ).
						enableEvents(true);
		heroes.worf.playAnimation("speak");
		lcarsUi.container.addChild(heroes.worf);



		heroes.laforgeImage=new CAAT.SpriteImage().
			initialize(director.getImage("laforge"),1,2).
			addAnimation("stop",[0],0).
			addAnimation("speak",[0,0,0,1,1,0,1,1],200,function(spriteImage,time){
				//spriteImage.playAnimation("stop");
			});
		heroes.laforge= new CAAT.Actor().setBackgroundImage(
						heroes.laforgeImage.getRef(), true ).
						setSpriteIndex( 0 ).
						enableEvents(true);
		heroes.laforge.playAnimation("speak");
		lcarsUi.container.addChild(heroes.laforge);



		heroes.pikardImage=new CAAT.SpriteImage().
			initialize(director.getImage("pikard"),1,2).
			addAnimation("stop",[0],0).
			addAnimation("speak",[0,0,0,1,1,0,1,1],200,function(spriteImage,time){
				//spriteImage.playAnimation("stop");
			});
		heroes.pikard= new CAAT.Actor().setBackgroundImage(
						heroes.pikardImage.getRef(), true ).
						setSpriteIndex( 0 ).
						enableEvents(true);
		heroes.pikard.playAnimation("speak");
		lcarsUi.container.addChild(heroes.pikard);		

	};

	function drawLcars(){
		//alert();
		lcarsUi.topPanel = new CAAT.Foundation.UI.ShapeActor().
				setLocation(0, 0).
				setSize(director.width, 100).
				setShape(CAAT.Foundation.UI.ShapeActor.SHAPE_RECTANGLE).
				enableEvents(false).
				setFillStyle( "#FE9900");
		lcarsUi.container.addChild(lcarsUi.topPanel);
		lcarsUi.container.setZOrder(lcarsUi.topPanel,100);



		drawHeroes();


		//alert(director.width-150);
		var textSize=Math.floor(director.width/30);
		//alert(textSize);
		lcarsUi.text = new CAAT.TextActor().
			setFont(textSize+"px sans-serif").
			setText("").
			setTextAlign("left").
			setTextBaseline("top").
			setTextFillStyle("#ffffff").setBounds(110,10+(100-textSize)/2-textSize/2,director.width-150,100);
		//lcarsUi.text.x=110;
		//lcarsUi.text.y=10;
		lcarsUi.container.addChild(lcarsUi.text);

	};

	function pullTopPanel(direction){
		if(direction===true){
			var lcarsPathDown= new CAAT.Path().
				beginPath(0,-100).
				addLineTo(0,0).
				endPath();  

			lcarsUi.container.addBehavior( new CAAT.PathBehavior().setPath(lcarsPathDown).setFrameTime(scene.time,300) );

		}else{
			var lcarsPathUp= new CAAT.Path().
				beginPath(0,0).
				addLineTo(0,-100).
				endPath();  

			lcarsUi.container.addBehavior( new CAAT.PathBehavior().setPath(lcarsPathUp).setFrameTime(scene.time,300) );

		}
	};

	function officerMessage(params,callback){

		if(params.needToPull===true){
			if(lcarsUi.isPulled===false){
				//alert("pull!");
				pullTopPanel(true);

			}
		}

		for(var i in heroes){
			try{
				//Тут баг, пытаемся применить метод для спрайта
				heroes[i].setVisible(false);
			}catch(e){
				//alert("err = "+e);
			}
		}

		try{
			heroes[params.officer].setVisible(true);
		}catch(e){
			alert("wrong officer! "+e);
		}



		(function officerCycle(message_id){
			if(params.messages.length>message_id){
				lcarsUi.text.setText(""+params.messages[message_id]);
				//lcarsUi.text.x=110;
				//lcarsUi.text.y=10;
				setTimeout(function(){
					officerCycle(++message_id);
				},2000);
				
			}else{
				//alert("callback");
				lcarsUi.text.setText("");
				lcarsUi.text.x=110;
				lcarsUi.text.y=10;				
				callback();
			}
		})(0);
				
	};

	function moveShip(params){
		if(starbender.isMoving===true){
			starbender.failedDirection=params.direction;
			return;
		}
		if((params.direction=="left")&&(starbender.position===-2)){
			console.log("left restricted");
			return;
		}
		if((params.direction=="right")&&(starbender.position===2)){
			console.log("right restricted");
			return;
		}

		starbender.isMoving=true;

		var x1=starbenderActor.x;
		var x2=x1;


		if(params.direction=="left"){
			starbenderActor.playAnimation("moveleft");
			x2-=world.laneWidth;
			starbender.position--;
		}else if(params.direction=="right"){
			starbenderActor.playAnimation("moveright");
			x2+=world.laneWidth;      
			starbender.position--;
		}

		//alert(starbenderActor.y);
		
		//alert(x1+"  "+x2);

		//var path= new CAAT.Path().
		//  setLinear( x1,starbenderActor.y, x2,starbenderActor.y );
		var path=new CAAT.Path().
			beginPath(x1,starbenderActor.y).
			addLineTo(x2,starbenderActor.y).endPath();

		starbenderActor.addBehavior( new CAAT.PathBehavior().setPath(path).setInterpolator(
							new CAAT.Interpolator().createExponentialInOutInterpolator(1,false) ).
							setFrameTime(scene.time,400) );    
	};

	function __init()   {
		//alert(CAAT.ModuleManager);
		//window.alert("init");
		director = new CAAT.Director().
			initialize(window.innerWidth,window.innerHeight,document.getElementById('_c1')).
			setClear(false);
	 
			CAAT.ModuleManager.
		 
		// define the baseURL, a base URL component for all
			baseURL("src/").
		 
		// define some module
			setModulePath("CAAT.Module",            "Modules").

		// get modules, and solve their dependencies.
			bring(
			[
				"CAAT.Module.Collision.Quadtree"
			]).
			onReady(function () {
				new CAAT.ImagePreloader().loadImages(
					[
						{id:'starbender',    url:'resources/images/skybender-sprite-small.png'},
						{id:'asteroid',    url:'resources/images/asteroid.png'},
						{id:"explosion",url:"resources/images/explosion_opaque.png"},
						{id:"worf",url:"resources/images/worf_sprite.png"},
						{id:"laforge",url:"resources/images/laforge_sprite.png"},
						{id:"pikard",url:"resources/images/pikard_sprite.png"},
						//{id:"worf",url:"resources/images/worf.png"},
						//{id:"worf2",url:"resources/images/worf_1.png"},
						{id:"star_trek_logo_big",url:"resources/images/star_trek_logo_big.png"},
						{id:"danger_ahead",url:"resources/images/danger_ahead.png"},
						{id:"start_game",url:"resources/images/start_game.png"}
					],
					function( counter, images ) {
						

						if ( counter===images.length ) {
							director.setImagesCache(images);
							__scene(director);
						}
					}
				);
				CAAT.loop(0);

				var canvas=document.getElementById("_c1");



				
				canvas.addEventListener("touchstart",function(touchEvent) {
					//window.alert("touch");
					
					var touch= touchEvent.targetTouches[0];
					world.touchX=touch.pageX;
					world.touchY=touch.pageY;


					for(var i in touchAreas){
						//alert("touchAreas="+JSON.stringify(touchAreas[i])+"     "+touch.pageX+"   "+touch.pageY);
						if((touchAreas[i].x1<touch.pageX)&&(touchAreas[i].x2>touch.pageX)){
							//alert(1);
							if((touchAreas[i].y1<touch.pageY)&&(touchAreas[i].y2>touch.pageY)){

								//alert("ok!");

								touchAreas[i].func();
								touchAreas.splice(i,1);
								return;
							}
						}
					}
					        
				});
				canvas.addEventListener("touchmove",function(touchEvent) {
					//window.alert("touchmove");
					var touch=touchEvent.targetTouches[0];
					//window.alert(touch.pageX+"   "+world.touchX+"    ");
					if(touch.pageX>world.touchX+70){
						//window.alert("touchmove right = "+world.touchX+"  "+touch.pageX);
						moveShip({direction:"right"});
					}else if(touch.pageX+70<world.touchX){
						//window.alert("left!"+world.touchX+"  "+touch.pageX);
						moveShip({direction:"left"});
					}
				});

				
		  });   


	}



	window.addEventListener( "load", __init, false );
})();