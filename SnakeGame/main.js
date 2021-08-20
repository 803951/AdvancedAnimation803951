window.addEventListener("load", init);

class SnakeSegment{
  constructor(x,y,color){
    this.x = x;
    this.y = y;
    this.color = color;
  }
}

var snakeSegments,speed,canvas,context;

function init(){

    canvas = document.getElementById("cnv");
    context = canvas.getContext("2d");
    speed = 5;
    snakeSegments = [];

    createBalls(5);
    animate();      // kick off the animation
}

function animate() {
    // erase the HTMLCanvasElement
    context.clearRect(0,0,canvas.width,canvas.height);
    update();   // update location   // render
    requestAnimationFrame(animate); // next cycle
}

function update(){

}
