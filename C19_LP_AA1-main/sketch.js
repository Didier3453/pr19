var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadAnimation("ghost-standing.png","ghost-jumping.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(300,300);
  ghost.addAnimation("ghost",ghostImg);
  ghost.scale = 0.3;

  climbersGroup = new Group();
  doorsGroup = new Group();
  invisibleBlockGroup = new Group();

  spookySound.loop(); 
 
}

function draw() {
  background(0);
  
  if(gameState === "play"){

   if(keyDown("W")){
   ghost.velocityY = -10;
    }
  
    ghost.velocityY=ghost.velocityY +0.5;
  
     if(keyDown("D")){
      ghost.velocityX = +5
      }
      
    if(keyDown("A")){
    ghost.velocityX = -5
    }

    if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
    }
         
    if(tower.y > 400){
      tower.y = 300
    }

    if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState = "over";
    }

    drawSprites();  
    puertitas();

  }

  if(gameState === "over"){
  textFont("Chiller");
  fill("white");
  stroke("red");  
  textSize(80);
  text('Game Over',200,300);

  if(keyDown("R")){
   ghost.y = 300; 
   gameState = "play";
  }
  }

}

function puertitas(){
if(frameCount%200 === 0){


door = createSprite(200,-30)
door.addImage("door",doorImg);
door.velocityY = +3;
door.x = Math.round(random(250,400));

climber = createSprite(200,20)
climber.addImage("climber",climberImg);
climber.velocityY = door.velocityY;
climber.x = door.x;

invisibleBlock = createSprite(200,20)
invisibleBlock.velocityY = door.velocityY;
invisibleBlock.x = door.x;
invisibleBlock.width = climber.width;
invisibleBlock.height = 5;
invisibleBlock.debug = true;

ghost.depth = door.depth;
ghost.depth +=1;

door.lifetime = 200;
climber.lifetime = door.lifetime;
invisibleBlock.lifetime = 200;

doorsGroup.add(door);
climbersGroup.add(climber);
invisibleBlockGroup.add(invisibleBlock);
}





}




