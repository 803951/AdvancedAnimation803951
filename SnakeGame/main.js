var snakeSegments,canvas,context,direction,length,directionSet,color;
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

    canvas = document.getElementById("cnv");
    context = canvas.getContext("2d");
    color = "blue";

    let randomDirection = Math.floor(Math.random()*4)+1;
    var randomXVal = randomDirection%2*(randomDirection-2);
    var randomYVal = (-1*randomDirection%2+1)*(randomDirection-3);
    direction = new Vector(randomXVal,randomYVal);
    directionSet = true;
    length = 20;
    snakeSegments = [];

    for(var i = 0;i<10;i++){
      let newX = length*i*randomXVal+(canvas.width/2);
      let newY = length*i*randomYVal+(canvas.height/2);
      let newSegment = new SnakeSegment(newX,newY,length);
      snakeSegments.push(newSegment);
    }

    animate();      // kick off the animation
}

function animate() {
    update();
    setTimeout(animate,100);
    directionSet = false;
}
function update(){
  moveSnake();
  drawSnake();
}
function moveSnake(){
  for(var i = snakeSegments.length-1;i>0;i--){
    snakeSegments[i].x = snakeSegments[i-1].x;
    snakeSegments[i].y = snakeSegments[i-1].y;
  }
  snakeSegments[0].x+=direction.x*snakeSegments[0].length;
  snakeSegments[0].y+=direction.y*snakeSegments[0].length;

  if(snakeSegments[0].x<snakeSegments[0].length){
    snakeSegments[0].x = canvas.width-snakeSegments[0].length;
  }
  else if(snakeSegments[0].x>canvas.width-snakeSegments[0].length){
    snakeSegments[0].x = snakeSegments[0].length;
  }
  if(snakeSegments[0].y<snakeSegments[0].length){
    snakeSegments[0].y = canvas.height-snakeSegments[0].length;
  }
  else if(snakeSegments[0].y>canvas.height-snakeSegments[0].length){
    snakeSegments[0].y = snakeSegments[0].length;
  }
}
function drawSnake(){
  context.clearRect(0,0,canvas.width,canvas.height);
  for(var i = 0;i<snakeSegments.length;i++){
    context.fillRect(snakeSegments[i].x,snakeSegments[i].y,snakeSegments[i].length,snakeSegments[i].length);
    context.fillStyle = color;
  }
}
