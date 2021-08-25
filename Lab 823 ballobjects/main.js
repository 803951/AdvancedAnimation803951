window.addEventListener("load", init);

var balls,canvas,context,velocity,radius;

class Ball{
  constructor(x,y,dx,dy,r,color1,color2){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.color1 = color1;
    this.color2 = color2;
    this.color = color1;
  }
  setOverlapping = function(isOverlapping){
    if(isOverlapping){
      this.color = this.color2;
    }
    else{
      this.color = this.color1;
    }
  }
  draw = function(){
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    context.fillStyle = this.color;     // color to stroke
    context.fill();     // render the fill
  }
  checkEdges = function(){
    if(this.x<=this.r||this.x>=canvas.width-this.r){
      this.dx*=-1;
    }
    if(this.y<=this.r||this.y>=canvas.height-this.r){
      this.dy*=-1;
    }
  }
  update = function(){
    this.x+=this.dx;
    this.y+=this.dy;
    this.checkEdges();
    this.draw();
  }
}

function init(){

    canvas = document.getElementById("cnv");
    context = canvas.getContext("2d");
    radius = 20;
    velocity = 2;
    balls = [];

    createBalls(10);
    animate();      // kick off the animation
}
//creates a certain number of balls
function createBalls(ballAmount){

  for(var i = 0;i<ballAmount;i++){
    let xPos = radius+Math.random()*(canvas.width-2*radius);
    let yPos = radius+Math.random()*(canvas.height-2*radius);

    let dxVal = (1-2*Math.round(Math.random()))*randomVal(velocity);
    let dyVal = (1-2*Math.round(Math.random()))*randomVal(velocity);

    let newBall = new Ball(xPos,yPos,dxVal,dyVal,randomVal(radius),"blue","orange");
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
function ballsIntersecting(ball1,ball2){
  distX = ball1.x-ball2.x;
  distY = ball1.y-ball2.y;
  dist = Math.sqrt(distX*distX+distY*distY);
  return (dist <= ball1.r + ball2.r);
}
// move the circle to a new location
function update() {
  for(var k = 0;k<balls.length;k++){
    let isOverlapping = false;
    for(var i = 0;i<balls.length;i++){
      if(i==k) continue;
      if(ballsIntersecting(balls[i],balls[k])){
        isOverlapping = true;
        break;
      }
    }
    balls[k].setOverlapping(isOverlapping);
  }

  for(var i = 0;i<balls.length;i++){
    balls[i].update();
  }
}
