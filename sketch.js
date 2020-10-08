var sword,swordImage;
var fruit1,fruit1Image,fruitGroup;
var fruit2,fruit2Image;
var fruit3,fruit3Image;
var fruit4,fruit4Image;
var alien,alienAnimation,alienGroup;
var gameOver,gameOverImage;
var score=0;
var END=0;
var PLAY=1;
var gameState=PLAY;
var gameOverSound;
var knifeSwooshSound;
function preload() {
  swordImage = loadImage("sword.png");
  fruit1Image = loadImage("fruit1.png");
  fruit2Image = loadImage("fruit2.png");
  fruit3Image = loadImage("fruit3.png");
  fruit4Image = loadImage("fruit4.png");
  alienAnimation= loadAnimation("alien1.png","alien2.png");
  gameOverImage= loadImage("gameover.png");
  gameOverSound= loadSound("gameover.mp3");
  knifeSwooshSound= loadSound("knifeSwooshSound.mp3")
}

function setup() {
  createCanvas(500,500);
  sword=createSprite(250,250,100,100);
  sword. addImage(swordImage);
  sword. scale=0.7;
  
  fruitGroup= createGroup();
  alienGroup= createGroup(); 
}

function draw() {
  background("lightGreen");
  
if(gameState===PLAY){
  var select=Math.round(random(1,5));
  console.log(select);
  createFruit();
  monster();
  if(fruitGroup.isTouching(sword)){
  fruitGroup.destroyEach();
  score= score+1;
  knifeSwooshSound.play();
  }
  sword.y=World.mouseY;
  sword.x=World.mouseX;
      if(alienGroup.isTouching(sword)){
        gameState=END;
        gameOverSound.play();
      }
}
  else if(gameState===END){
    sword.addImage(gameOverImage);
    sword.x=250;
    sword.y=250;
    alienGroup.destroyEach();
    fruitGroup.destroyEach();
    
  }
  
  drawSprites();
  textSize(15);
  text("score="+ score,400,20);
}
function createFruit(){
 if (frameCount % 60 === 0){
   var fruit = createSprite(600,165,10,40);
   var p = Math.round(random(1,2));
   if(p===1){
   fruit.x=600;
   fruit.velocityX = -(6 + score/10);
   }
   if(p===2){
   fruit.x=0;
   fruit.velocityX = (6 + score/10);
   }
      
    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: fruit.addImage(fruit1Image);
              break;
      case 2: fruit.addImage(fruit2Image);
              break;
      case 3: fruit.addImage(fruit3Image);
              break;
      case 4: fruit.addImage(fruit4Image);
              break;
      default: break;
    }

 fruit. scale= 0.2
 fruit. lifetime=166;
 fruitGroup.add(fruit);
 }
}
function monster(){
  if(frameCount%100===0){
  alien=createSprite(500,Math.round(random(0,500)),10,10);
  alien. addAnimation("alien",alienAnimation); 
  alien. velocityX=-(5+score/10);
  alien. lifetime=166;
  alienGroup.add(alien);
}
}