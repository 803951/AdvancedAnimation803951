var snake,canvas,context,direction;

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
  snake.updateSnake();
}
