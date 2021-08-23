var canvas,context,restartButton;
var snakeSegments,snakeColor,apple,appleColor,pixelSize;
var score,gameover,timeInterval,direction,directionSet;

window.addEventListener("load", init);
document.addEventListener('keydown', function(event) {
    if(!directionSet){
      directionSet = true;
      //left
      if(event.keyCode == 37&&direction.x==0) {
        direction = new Vector2(-1,0);
      }
      //down
      else if(event.keyCode == 38&&direction.y==0) {
        direction = new Vector2(0,-1);
      }
      //right
      else if(event.keyCode == 39&&direction.x==0) {
        direction = new Vector2(1,0);
      }
      //up
      else if(event.keyCode == 40&&direction.y==0) {
        direction  = new Vector2(0,1);
      }
      else{
        directionSet = false;
      }
    }
});

function init(){
    restartButton = document.getElementById("restart");
    restartButton.style.visibility = "hidden";
    canvas = document.getElementById("cnv");
    context = canvas.getContext("2d");
    score = 0;
    timeInterval = 50;
    pixelSize = 15;
    gameover = false;
    appleColor = "white";

    snakeColor = {r:0,g:255,b:0};

    let randomDirection = Math.floor(Math.random()*4)+1;
    var randomXVal = randomDirection%2*(randomDirection-2);
    var randomYVal = (-1*randomDirection%2+1)*(randomDirection-3);
    direction = new Vector2(randomXVal,randomYVal);
    directionSet = true;
    snakeSegments = [];

    for(var i = 0;i<10;i++){
      let newX = -pixelSize*i*randomXVal+(canvas.width/2);
      let newY = -pixelSize*i*randomYVal+(canvas.height/2);
      let newSegment = new SnakeSegment(newX,newY,pixelSize);
      snakeSegments.push(newSegment);
    }

    generateNewApple();

    animate();      // kick off the animation
}

function animate() {
    if(!gameover)update();
    for(var i = 0;i<snakeSegments.length-1;i++){
      for(var j = i+1;j<snakeSegments.length;j++){
        if(snakeSegments[i].position.x==snakeSegments[j].position.x&&snakeSegments[i].position.y==snakeSegments[j].position.y){
          restartButton.style.visibility = "visible";
          gameover = true
          return;
        }
      }
    }
    if(!gameover){
      directionSet = false;
      setTimeout(animate,timeInterval);
    }
}

function update(){
  if(checkForApplePickup()){
      generateNewApple();
  }
  else{
      moveSnake();
  }
  context.clearRect(0,0,canvas.width,canvas.height);
  context.fillStyle = "black";
  context.fillRect(0,0,canvas.width,canvas.height);
  drawSnake();
  drawApple();
  updateScore();
}

function moveSnake(){

  for(var i = snakeSegments.length-1;i>0;i--){
    let x = snakeSegments[i-1].position.x;
    let y = snakeSegments[i-1].position.y;
    snakeSegments[i].position = new Vector2(x,y)
  }

  let x = snakeSegments[0].position.x+direction.x*pixelSize;
  let y = snakeSegments[0].position.y+direction.y*pixelSize;

  if(x<0){
    x = canvas.width-pixelSize;
  }
  else if(x>canvas.width-pixelSize){
    x = 0;
  }
  if(y<0){
    y = canvas.height-pixelSize;
  }
  else if(y>canvas.height-pixelSize){
    y = 0;
  }
  snakeSegments[0].position = new Vector2(x,y);
}
function drawSnake(){
  for(var i = 0;i<snakeSegments.length;i++){
    let alpha = 1-i*1.0/(snakeSegments.length+1)

    context.fillStyle = "rgb(255, 255, 255, 0.5)";
    context.fillRect(snakeSegments[i].position.x,snakeSegments[i].position.y,pixelSize*0.9,pixelSize*0.9);
    context.fillStyle = "rgb("+snakeColor.r+", "+snakeColor.g+", "+snakeColor.b+", "+alpha+")";
    context.fillRect(snakeSegments[i].position.x,snakeSegments[i].position.y,pixelSize*0.9,pixelSize*0.9);
  }
}
function drawApple(){
  context.fillStyle = appleColor;
  context.fillRect(apple.x,apple.y,pixelSize*0.9,pixelSize*0.9);
}
function randomPosition(){
  let x = Math.floor(Math.random()*((canvas.width-pixelSize)/pixelSize))*pixelSize;
  let y = Math.floor(Math.random()*((canvas.height-pixelSize)/pixelSize))*pixelSize;
  return new Vector2(x,y);
}
function generateNewApple(){
    let applePos = randomPosition();
    for(var i = 0;i<snakeSegments.length;i++){
      if(snakeSegments[i].position.x == applePos.x&&snakeSegments[i].position.y==applePos.y){
        generateNewApple();
        return;
      }
    }
    apple = applePos;
}
function checkForApplePickup(){
  if(snakeSegments[0].position.x==apple.x&&snakeSegments[0].position.y==apple.y){
    let newX = snakeSegments[0].position.x+direction.x*pixelSize;
    let newY = snakeSegments[0].position.y+direction.y*pixelSize;
    let newSegment = new SnakeSegment(newX,newY,pixelSize);
    snakeSegments.splice(0,0,newSegment);
    score++;
    return true;
  }
  return false;
}
function updateScore(){
  context.font = "30px Comic Sans MS";
  context.fillStyle = "white";
  context.textAlign = "left";
  context.fillText("Score: "+score, 20, 40);
}
