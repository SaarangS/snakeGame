var snakeParts, food, sh, se, sb;
var bodyImg, headImg, endImg;
var fruitImg1, fruitImg2, fruitImg3, fruitImg4;
var foodGroup, end;

var foodEaten = 0;
var trajectory = [];

var xVel = 2;
var yVel = 2;
var frmcnt = 200;
var gameState = 0;

function preload() {
  fruitImg1 = loadImage("snakeApple.png")
  fruitImg2 = loadImage("snakeBanana.png")
  fruitImg3 = loadImage("snakeGrape.png")
  fruitImg4 = loadImage("snakeOrange.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight)
  snakeParts = [{x:width/2,y:height/2},{x:width/2 - 10,y:height/2},{x:width/2 - 20,y:height/2}]

  //snake head creation
  sh = createSprite(snakeParts[0].x,snakeParts[0].y,20,20)
  sh.setCollider("circle", 0, 0, 20);
  sh.debug = true
  
  foodGroup = new Group()
  edges = createEdgeSprites();
}

function draw() {
  background(0,0,0);
 
  //score 
  textSize(14)
  fill(rgb(255,255,255))
  text("Score: " + foodEaten,width-75,25)
   
  //border
  strokeWeight(5)
  stroke(rgb(255,0,0))
  line(2,2,width-2,2)
  line(2,2,2,width-2)
  line(width-2,2,width-2,height-2)
  line(2,height-2,width-2,height-2)

  if(gameState === end){
    textSize(35)
    text("GAME OVER - Score: " + foodEaten, 0,150)
  }
  
  snakeParts.shapeColor = "red";
  
  randFood();
  move();
  
  if(foodGroup.isTouching(sh)) {
    foodEaten++;
    foodGroup.destroyEach();
    console.log("foodEaten = " + foodEaten)
    
    if(foodEaten == 3 && gameState == 0)
      gameState = 1;
      
    if(foodEaten == 6 && gameState == 1)
      gameState = 2;
  }
  
  //gamme state 0; bounces edges
  if(gameState == 0){
    sh.bounceOff(edges);
  }

  //game state 1; snake goes to other side
  if(gameState == 1){
     xVel = 4;
     yVel = 4;
     food.lifetime = 175;
     frmcnt = 150;
     
     if(sh.x > 400 || sh.x < 0 || sh.y > 400 || sh.y < 0) {
       drawSnake(sh.x,sh.y);
     } 
  }
  
  //game state 2; ends game if snake touches edge
  if(gameState == 2){
     xVel = 6;
     yVel = 6;
     food.lifetime = 150;
     frmcnt = 100;
     
    if(sh.isTouching(edges)) {
      gameState = end;
    }
  }
  
  drawSprites();
}

function move() {
  if(keyIsDown(UP_ARROW) || touches.length < 0) {
     sh.velocityX = 0;
     sh.velocityY = -yVel;
  }
  if(keyIsDown(DOWN_ARROW) || touches.length < 0) {
     sh.velocityX = 0;
     sh.velocityY = yVel;
  }
  if(keyIsDown(LEFT_ARROW) || touches.length < 0) {    
     sh.velocityX = -xVel;
     sh.velocityY = 0;
  }
  if(keyIsDown(RIGHT_ARROW) || touches.length < 0) {
     sh.velocityX = +xVel;
     sh.velocityY = 0;
  }
  touches = []
}

function randFood() {
  randX = Math.round(random(1, width-1));
  randY = Math.round(random(1, height-1));
  
  if(frameCount%frmcnt==0) {
    food = createSprite(randX, randY, 20, 20);
    food.lifetime = 200;
    food.shapeColor = "green";
    foodGroup.add(food);
  
  randFruit = Math.round(random(1,4));
    switch(randFruit) {
      case 1:
        food.addImage(fruitImg1)
        break;
      case 2:
        food.addImage(fruitImg2)
        break;
      case 3:
        food.addImage(fruitImg3)
        break;
      case 4:
        food.addImage(fruitImg4)
        break;
    }
  food.scale = 0.2;
  }
  
}

function drawSnake(shx,shy) {
  if(sh.x > width)
  {
    sh.x = 0;
    sh.y = shy;
    sh.velocityX = 2;
  }
   if(sh.x < 0)
  {
    sh.x = width;
    sh.y = shy;
    sh.velocityX = -2;
  }
   if(sh.y < 0)
  {
    sh.x = shx;
    sh.y = height;
    sh.velocityY = -2;
  }
   if(sh.y > height)
  {
    sh.x = shx;
    sh.y = 0;
    sh.velocityY = 2;
  }
}