var snakeSegments,canvas,context,direction,length,directionSet,snakeColor,apple,appleColor,score,gameover,timeInterval;
class Vector2{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}
class SnakeSegment{
  constructor(x,y,length){
      this.position = new Vector2(x,y);
      this.length = length;
  }
}
window.addEventListener("load", init);
document.addEventListener('keydown', function(event) {
    if(!directionSet){
      directionSet = true;
      //left
      if(event.keyCode == 37&&direction.x==0) {
        direction.x = -1;
        direction.y = 0;
      }
      //up
      else if(event.keyCode == 38&&direction.y==0) {
        direction.x = 0;
        direction.y = -1;
      }
      //right
      else if(event.keyCode == 39&&direction.x==0) {
        direction.x = 1;
        direction.y = 0;
      }
      //down
      else if(event.keyCode == 40&&direction.y==0) {
        direction.x = 0;
        direction.y = 1;
      }
      else{
        directionSet = false;
      }
    }
});

function init(){
    document.getElementById("restart").style.visibility = "hidden";
    canvas = document.getElementById("cnv");
    context = canvas.getContext("2d");
    score = 0;
    timeInterval = 50;
    length = 10;
    snakeColor = "blue";
    appleColor = "green";
    gameover = false;

    let randomDirection = Math.floor(Math.random()*4)+1;
    var randomXVal = randomDirection%2*(randomDirection-2);
    var randomYVal = (-1*randomDirection%2+1)*(randomDirection-3);
    direction = new Vector2(randomXVal,randomYVal);
    directionSet = true;
    snakeSegments = [];

    for(var i = 0;i<10;i++){
      let newX = -length*i*randomXVal+(canvas.width/2);
      let newY = -length*i*randomYVal+(canvas.height/2);
      let newSegment = new SnakeSegment(newX,newY,length);
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
          document.getElementById("restart").style.visibility = "visible";
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
  context.clearRect(0,0,canvas.width,canvas.height);
  context.fillStyle = "black";
  context.fillRect(0,0,canvas.width,canvas.height);
  if(checkForApplePickup()){
      generateNewApple();
  }
  else{
      moveSnake();
  }
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

  let x = snakeSegments[0].position.x+direction.x*length;
  let y = snakeSegments[0].position.y+direction.y*length;

  if(x<0){
    x = canvas.width-length;
  }
  else if(x>canvas.width-length){
    x = length;
  }
  if(y<0){
    y = canvas.height-length;
  }
  else if(y>canvas.height-length){
    y = length;
  }
  snakeSegments[0].position = new Vector2(x,y);
}
function drawSnake(){
  for(var i = 0;i<snakeSegments.length;i++){
    context.fillStyle = snakeColor;
    context.fillRect(snakeSegments[i].position.x,snakeSegments[i].position.y,length,length);
  }
}
function drawApple(){
  context.fillStyle = appleColor;
  context.fillRect(apple.x,apple.y,length,length);
}
function generateNewApple(){
  let success = false;
  while(!success){
    success = true;
    let x = Math.floor(Math.random()*((canvas.width-2*length)/length))*length+length;
    let y = Math.floor(Math.random()*((canvas.height-2*length)/length))*length+length;
    for(var i = 0;i<snakeSegments.length;i++){
      if(snakeSegments[i].x==x&&snakeSegments[i].y==y){
        success = false;
      }
    }
    if(success)apple = new Vector2(x,y);
  }
}
function checkForApplePickup(){
  if(snakeSegments[0].position.x==apple.x&&snakeSegments[0].position.y==apple.y){
    let newX = snakeSegments[0].position.x+direction.x*length;
    let newY = snakeSegments[0].position.y+direction.y*length;
    let newSegment = new SnakeSegment(newX,newY,length);
    snakeSegments.splice(0,0,newSegment);
    score++;
    return true;
  }
}
function updateScore(){
  context.font = "30px Comic Sans MS";
  context.fillStyle = "white";
  context.textAlign = "left";
  context.fillText("Score: "+score, 20, 40);
}
