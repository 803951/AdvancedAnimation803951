var snakeSegments,canvas,context,direction,length,directionSet,color,apple,appleColor,score,gameover;
class Vector{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}
class SnakeSegment{
  constructor(x,y,length){
      this.x = x;
      this.y = y;
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
    color = "blue";
    appleColor = "green";
    gameover = false;

    let randomDirection = Math.floor(Math.random()*4)+1;
    var randomXVal = randomDirection%2*(randomDirection-2);
    var randomYVal = (-1*randomDirection%2+1)*(randomDirection-3);
    direction = new Vector(randomXVal,randomYVal);
    directionSet = true;
    length = 20;
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
        if(snakeSegments[i].x==snakeSegments[j].x&&snakeSegments[i].y==snakeSegments[j].y){
          gameover = true
          document.getElementById("restart").style.visibility = "visible";
          return;
        }
      }
    }
    if(!gameover){
      directionSet = false;
      setTimeout(animate,90);
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
  updateScore();
  drawSnake();
  drawApple();
}
function moveSnake(){
  for(var i = snakeSegments.length-1;i>0;i--){
    snakeSegments[i].x = snakeSegments[i-1].x;
    snakeSegments[i].y = snakeSegments[i-1].y;
  }
  snakeSegments[0].x+=direction.x*length;
  snakeSegments[0].y+=direction.y*length;

  if(snakeSegments[0].x<0){
    snakeSegments[0].x = canvas.width-length;
  }
  else if(snakeSegments[0].x>canvas.width-length){
    snakeSegments[0].x = length;
  }
  if(snakeSegments[0].y<0){
    snakeSegments[0].y = canvas.height-length;
  }
  else if(snakeSegments[0].y>canvas.height-length){
    snakeSegments[0].y = length;
  }
}
function drawSnake(){
  for(var i = 0;i<snakeSegments.length;i++){
    context.fillStyle = color;
    context.fillRect(snakeSegments[i].x,snakeSegments[i].y,length,length);
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
    if(success)apple = new Vector(x,y);
  }
}
function checkForApplePickup(){
  if(snakeSegments[0].x==apple.x&&snakeSegments[0].y==apple.y){
    let newX = snakeSegments[0].x+direction.x*length;
    let newY = snakeSegments[0].y+direction.y*length;
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
