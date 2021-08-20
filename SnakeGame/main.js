var snake,canvas,context,direction;
class Snake{
  constructor(segments){
    this.segments = segments;
  }
  move = function(){
    if(this.segments.length>0){
      this.segments[0].x+=this.length*direction.x;
      this.segments[0].y+=this.length*direction.y;

      if(this.segments[0].x<this.length){
        this.segments[0].x = canvas.width-this.length;
      }
      else if(this.segments[0].x>canvas.width-this.length){
        this.segments[0].x = this.length;
      }
      if(this.segments[0].yy<this.length){
        this.segments[0].y = canvas.height-this.length;
      }
      else if(this.segments[0].y>canvas.height-this.length){
        this.segments[0].y = this.length;
      }
    }
    for(var i = 1;i<this.segments.length;i++){
      this.segments[i].x = this.segments[i-1].x;
      this.segments[i].y = this.segments[i-1].y;
    }
  }
}
class SnakeSegment{
  constructor(x,y,length,color){
      this.x = x;
      this.y = y;
      this.length = length;
      this.color = color;
  }
  draw = function(){
    context.fillRect(this.x,this.y,this.length,this.length);
    context.fillStyle = this.color;
  }
}
class Vector{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}

window.addEventListener("load", init);
document.addEventListener('keydown', function(event) {
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
});

function init(){

    canvas = document.getElementById("cnv");
    context = canvas.getContext("2d");

    let randomDirection = Math.floor(Math.random()*4)+1;
    var randomXVal = randomDirection%2*(randomDirection-2);
    var randomYVal = (-1*randomDirection%2+1)*(randomDirection-3);
    direction = new Vector(randomXVal,randomYVal);

    let snakeSegments = [];

    for(var i = 0;i<3;i++){
      let length = 20;
      let newX = canvas.width/2*Math.abs(randomYVal)+length*i*randomXVal;
      let newY = canvas.height/2*Math.abs(randomXVal)+length*i*randomYVal;
      let newSegment = new SnakeSegment(newX,newY,length,"blue");
      snakeSegments.push(newSegment);
    }

    snake = new Snake(snakeSegments);
    animate();      // kick off the animation
}

function animate() {
    update();
    setTimeout(animate,150);
}
function update(){
  context.clearRect(0,0,canvas.width,canvas.height);
  snake.move();
}
