var ground, groundimg;
var cat, catAnimation;
var ghost, ghostImg;
var ghostGroup;
var gameState = "play";
var score = 0
var reset, resetImg
var catCollided
var catMeow

function preload(){
groundimg = loadImage("ground.png")

catAnimation = loadAnimation("1.png", "2.png","3.png", "4.png", "5.png", "6.png", "7.png")

ghostImg = loadImage("ghost.png")

resetImg = loadImage("resetbutton.png")

catCollided = loadAnimation("7.png")

catMeow = loadSound("catmeow.mp3");
}

function setup() {
createCanvas(800,300)

    ground = createSprite(400, 280, 800, 20)
    ground.addImage(groundimg)
    
    cat = createSprite(90, 240, 60, 40)
    cat.addAnimation("catrunning", catAnimation)
    cat.addAnimation("collided", catCollided)
    cat.setCollider("circle", 0,-40,120)

    invisibleGround = createSprite(400, 240, 800, 20)
    invisibleGround.visible = false;
    
    reset = createSprite(width/2, height/2)
    reset.addImage(resetImg)
    reset.scale = 0.1
    reset.visible = false
    ghostGroup = new Group();

    catMeow.play();
    catMeow.setVolume(0.3);
}

function draw() {
 background("white")
 textSize(25)
 text("Score:"+score, 650, 50)
 if( gameState ==="play"){
     cat.changeAnimation("catrunning")
     score += 3*Math.round(getFrameRate()/60)
 ground.velocityX = -3
 if (ground.x<=200){
     ground.x = ground.width/4
 }
 if (keyDown("space")&& cat.y>100){
 cat.velocityY = -10
 }
 cat.velocityY +=0.8
 spawnGhost()
 if(ghostGroup.isTouching(cat)){
     gameState = "end";
 }
}
if (gameState === "end"){
    reset.visible = true
    ground.velocityX = 0
    ghostGroup.setVelocityXEach(0)
    ghostGroup.setLifetimeEach(-1)
   cat.changeAnimation("collided")
 if(mousePressedOver(reset)){
    reset1()
 }

}
cat.collide(invisibleGround)
drawSprites();
}

function spawnGhost(){
if (frameCount%200===0){
    ghost = createSprite(800, 260)
    ghost.addImage(ghostImg)
    ghost.scale = 0.15
    ghost.velocityX = -6
    ghost.lifetime = 400
    ghostGroup.add(ghost)
    
}



}
function reset1(){
    score = 0
    ghostGroup.destroyEach()
    gameState = "play"
   reset.visible = false
}