var canvas, context,lastDateTime,deltaTime,score,gameover,restartButton;
var birdY,birdX,radius,color,velocity,movementSpeed,jumpSpeed,maxSpeed,gravity;
var obstacles,obstacleWidth,obstacleColor;
var obstacleSpawnDistance,obstaclePositionFactor,obstaclePositionShift;

window.addEventListener("load", init);
document.addEventListener('keydown', function(event) {
  //space bar
  if(event.keyCode == 32) {
    jump();
  }
});

function init(){
  canvas = document.getElementById("cnv");
  context = canvas.getContext("2d");
  restartButton = document.getElementById("restart");
  restartButton.style.visibility = "hidden";

  birdY = canvas.height/2;
  birdX = canvas.width/2;
  score = 0;
  radius = 20;
  velocity = 0;
  jumpSpeed = 6;
  movementSpeed = 120;
  maxSpeed = 180;
  gravity = 20;
  deltaTime = 0;
  obstacleWidth = 50;
  obstacleSpawnDistance = 100;
  obstaclePositionFactor = 3;
  obstaclePositionShift = 0;
  obstacleColor = "gray";
  color = "orange";
  gameover = false;
  lastDateTime = new Date().getTime();
  obstacles = [];

  animate();
}

function animate(){
  context.fillStyle = "black";
  context.fillRect(0,0,canvas.width,canvas.height);
  update();
  drawObstacles();
  drawBird();
  if(detectCollisions()){
    updateScore();
    restartButton.style.visibility = "visible";
    return;
  }
  updateScore();
  requestAnimationFrame(animate);
}
function update(){
  calculateDeltaTime();
  spawnObstacles();
  move();
  implementGravity();
}
function spawnObstacles(){
  let conditionsMet = obstacles.length==0;
  if(!conditionsMet){
    conditionsMet = obstacles[obstacles.length-1].x<=canvas.width-obstacleSpawnDistance;
  }
  if(conditionsMet){
    let x = canvas.width+obstacleWidth;
    let y1 = Math.random()*(canvas.height/obstaclePositionFactor-obstaclePositionShift)+obstaclePositionShift-canvas.height/2+radius;
    let y2 = canvas.height/2+Math.random()*(canvas.height/obstaclePositionFactor-obstaclePositionShift)+obstaclePositionShift;
    let obstacle1 = new Obstacle(x,y1,obstacleWidth,canvas.height/2,obstacleColor);
    let obstacle2 = new Obstacle(x,y2,obstacleWidth,canvas.height/2,obstacleColor);
    obstacles.push(obstacle1);
    obstacles.push(obstacle2);

    for(var i = 0;i<2;i++){
      if(obstacles.length>0){
        if(obstacles[0].x<0){
          obstacles.splice(0,1)
        }
      }
    }
    obstaclePositionFactor-=deltaTime;
    movementSpeed+=deltaTime*10;
    obstaclePositionShift+=deltaTime*10;
    //shifting distance so it continues to appear random
    if(obstaclePositionShift>canvas.height/obstaclePositionFactor-radius*4){
      obstaclePositionShift = canvas.height/obstaclePositionFactor-radius*6;
    }
    if(movementSpeed>maxSpeed){
      movementSpeed = maxSpeed;
    }
  }
}
function implementGravity(){
  birdY+=velocity;

  if(birdY-radius<=0){
    velocity = 0;
    birdY = radius;
  }
  else{
    velocity -= gravity*deltaTime;
  }
}
function move(){
  for(var i = 0;i<obstacles.length;i++){
    obstacles[i].x-=movementSpeed*deltaTime;
    if(!obstacles[i].scoreCounted&&obstacles[i].x<birdX-radius-obstacleWidth){
      score+=0.5;
      obstacles[i].scoreCounted = true;
    }
  }
}
function jump(){
  velocity=jumpSpeed;
}
function drawBird(){
  context.beginPath();
  context.arc(birdX, canvas.height-birdY, radius, 0, 2 * Math.PI);
  context.fillStyle = color;     // color to stroke
  context.fill();  // render the fill
}
function drawObstacles(){
  for(var i = 0;i<obstacles.length;i++){
    context.beginPath();
    context.fillStyle = obstacles[i].color;
    context.fillRect(obstacles[i].x,obstacles[i].y,obstacles[i].width,obstacles[i].height);
  }
}
function calculateDeltaTime(){
  deltaTime = (new Date().getTime()-lastDateTime)/1000;
  lastDateTime = new Date().getTime();
}
function detectCollisions(){
  for(var i = 0;i<obstacles.length;i++){

    if(canvas.height-birdY<radius){
      return true;
    }

    let distX = Math.abs(birdX-obstacles[i].x-obstacles[i].width/2);
    let distY = Math.abs((canvas.height-birdY)-obstacles[i].y-obstacles[i].height/2);

    if (distX > (obstacles[i].width / 2 + radius)) {
      continue;
    }
    if (distY > (obstacles[i].height / 2 + radius)) {
      continue;
    }

    if (distX <= (obstacles[i].width / 2)) {
      return true;
    }
    if (distY <= (obstacles[i].height / 2)) {
      return true;
    }

    var dx = distX - obstacles[i].width / 2;
    var dy = distY - obstacles[i].height / 2;

    return (dx * dx + dy * dy <= (radius * radius));
  }
  return false;
}
function updateScore(){
  context.font = "40px Comic Sans MS";
  context.fillStyle = "white";
  context.textAlign = "center";
  context.fillText(score, canvas.width/2, 50);
}
