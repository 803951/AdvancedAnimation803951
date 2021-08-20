window.addEventListener("load", init);

class Ball{
  constructor(x,y,dx,dy,r,color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.color = color;
  }
  update = function(){
    this.x+=this.dx;
    this.y+=this.dy;
  }
  draw = function(){
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    context.strokeStyle = "black";  // color to fill
    context.fillStyle = this.color;     // color to stroke
    context.fill();     // render the fill
    context.stroke();
  }
  checkEdges = function(){
    if(this.x<=this.r||this.x>=canvas.width-this.r){
      this.dx*=-1;
    }
    if(this.y<=this.r||this.y>=canvas.height-this.r){
      this.dy*=-1;
    }
  }
}

var colors,balls,canvas,context,velocity,radius;

function init(){

    canvas = document.getElementById("cnv");
    context = canvas.getContext("2d");
    radius = 20;
    velocity = 7;
    colors = ["orange","blue","red","green","yellow"];
    balls = [];

    createBalls(5);
    animate();      // kick off the animation
}
//creates a certain number of balls
function createBalls(ballAmount){

  for(var i = 0;i<ballAmount;i++){
    let xPos = radius+Math.random()*(canvas.width-2*radius);
    let yPos = radius+Math.random()*(canvas.height-2*radius);

    let dxVal = (1-2*Math.round(Math.random()))*randomVal(velocity);
    let dyVal = (1-2*Math.round(Math.random()))*randomVal(velocity);
    let ballColor = colors[Math.floor(Math.random()*colors.length)];

    let newBall = new Ball(xPos,yPos,dxVal,dyVal,randomVal(radius),ballColor);
    balls.push(newBall);

  }

}
function randomVal(value){
    return Math.floor((value-1)*Math.random())+value/2;
}
// every animation cycle
function animate() {
    // erase the HTMLCanvasElement
    context.clearRect(0,0,canvas.width,canvas.height);
    update();   // update location   // render
    requestAnimationFrame(animate); // next cycle
}
// move the circle to a new location
function update() {
    for(var i = 0;i<balls.length;i++){
      balls[i].checkEdges();
      balls[i].update();
      balls[i].draw();
    }
}
