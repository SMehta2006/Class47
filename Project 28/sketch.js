const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;	

var engine,world;
var player,boy1,boy2,boy3;
var playerImage,boy1Image,boy2Image,boy3Image;
var hoop;
var hoopImage;
var backdrop,backdropImage;
var wood,woodImage;
var wall2;
var ball2;
var ballImage;
var PLAY = 0;
var END = 1;
var gameState = PLAY;
var count = 0;
var ground;

function preload(){
	
	backdropImage = loadImage("images/background.jpeg");
	hoopImage = loadImage("images/hoop.png");
	playerImage = loadImage("images/player1.png");
	boy1Image = loadImage("images/boy1.png");
	boy2Image = loadImage("images/boy2.png");
	boy3Image = loadImage("images/boy3.png");
	woodImage = loadImage("images/wood2.png");
	ballImage = loadImage("images/basketball.png");
}

function setup(){
	createCanvas(1270,600);

	engine = Engine.create();
	world = engine.world;

	ground = createSprite(635,590,1270,5);
	backdrop = createSprite(635,300,1300,600);
	backdrop.addImage("background",backdropImage);
	backdrop.scale = 4.6;
	hoop = createSprite(1200,300,10,40);
	hoop.scale = 0.3;
	hoop.addImage("basketball_hoop",hoopImage);
	player = createSprite(200,490,10,20);
	player.addImage("PC",playerImage);
	player.scale = 0.5;
	boy1 = createSprite(620,490,10,20);
	boy1.addImage("defender1",boy1Image);
	boy1.scale = 0.5;
	boy2 = createSprite(800,490,10,20);
	boy2.addImage("defender2",boy2Image);
	boy2.scale = 0.5;
	boy3 = createSprite(980,490,10,20);
	boy3.addImage("defender3",boy3Image);
	boy3.scale = 0.5;
	wood = createSprite(635,100,20,10);
	wood.addImage("wood",woodImage);
	wood.velocityX = -5;
	wall2 = createSprite(1150,230,80,10);

	var options = {
		isStatic: false,
		'restitution': 1,
		'density': 1.2,
	}
	ball2 = Bodies.rectangle(100,490,20,20,options);
	World.add(world,ball2);	
	chain = new Chain(ball2,{x:170,y:505});

	wall = new Wall(1219,195,15,100);
	wall3 = new Wall(1260,300,10,600);
	ground1 = new Wall(625,590,1270,5);
	ground1.fillStyle = "#000000";

	Engine.run(engine);
}

function draw(){

	Engine.update(engine);

	edges = createEdgeSprites();
	wood.bounceOff(edges[0]);
	wood.bounceOff(edges[1]);

	boy1.velocityY = boy1.velocityY + 0.8;
	boy2.velocityY = boy2.velocityY + 0.8;
	boy3.velocityY = boy3.velocityY + 0.8;
	
	boy1.collide(ground);
	boy2.collide(ground);
	boy3.collide(ground);


	playerJump();
		
	drawSprites();

	textSize(15);
	text('Three shots to make as many points as possible!',1000,100);

	chain.display();
	wall3.display();
	wall.display();
	ground1.display();

	imageMode(CENTER);
	image(ballImage,ball2.position.x,ball2.position.y,60,60);
}


function playerJump(){
	if(frameCount % 80 === 0) {
		boy1.velocityY = -15;
	}

	if(frameCount % 150 === 0) {
		boy2.velocityY = -16;
	}

	if(frameCount % 250 === 0) {
		boy3.velocityY = -16;
	}
}

function mouseDragged(){
	Matter.Body.setPosition(ball2,{x:mouseX,y:mouseY});
}

function mouseReleased(){
	chain.fly();
}

function keyPressed(){
	if(keyCode === 32){
		Matter.Body.setPosition(ball2,{x:100,y:490});
		chain.attach(ball2);
		//count++;
	}
}