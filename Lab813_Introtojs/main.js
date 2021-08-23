window.addEventListener("load", init);

var colors,balls,walls,canvas,context,velocity,radius;

class Wall{
  constructor(x,y,w,h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  draw = function(){
    context.fillStyle = "gray";
    context.fillRect(this.x,this.y,this.w,this.h);
  }
}

class Ball{
  constructor(x,y,dx,dy,r,color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.color = color;
    this.isBouncingOffWall = false;
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

    for(var i = 0;i<walls.length;i++){
      let distX = Math.abs(this.x-walls[i].x-walls[i].w/2);
      let distY = Math.abs(this.y-walls[i].y-walls[i].h/2);

      if (distX > (walls[i].w / 2 + this.r)) {
        continue;
      }
      if (distY > (walls[i].h / 2 + this.r)) {
        continue;
      }

      if (distX <= (walls[i].w / 2)) {
        if(!this.isBouncingOffWall){
          this.isBouncingOffWall = true;
          this.dy*=-1;
        }
        return true;
      }
      if (distY <= (walls[i].h / 2)) {
        if(!this.isBouncingOffWall){
          this.isBouncingOffWall = true;
          this.dx*=-1;
        }
        return true;
      }

      var dx = distX - walls[i].w / 2;
      var dy = distY - walls[i].h / 2;

      if (dx * dx + dy * dy <= (this.r * this.r)){
        if(!this.isBouncingOffWall){
          this.isBouncingOffWall = true;
          this.dx*=-1;
          this.dy*=-1;
        }
        return true;
      }
    }
    return false;
  }
  update = function(){
    if(!this.checkEdges()){
       this.isBouncingOffWall = false;
    }
    this.x+=this.dx;
    this.y+=this.dy;
    this.draw();
  }
}

function init(){

    canvas = document.getElementById("cnv");
    context = canvas.getContext("2d");
    radius = 20;
    velocity = 7;
    colors = ["#7FFFD4","#FF7F50","#D2691E","#9932CC","#E9967A","#FFD700","#FF69B4","#90EE90"];
    balls = [];

    let x1 = canvas.width/2-30;
    let y1 = 0;
    let w1 = 40;
    let h1 = 160;
    let wall1 = new Wall(x1,y1,w1,h1);

    let x2 = 70;
    let y2 = canvas.height/4;
    let w2 = 40;
    let h2 = canvas.height*3/4;
    let wall2 = new Wall(x2,y2,w2,h2);

    let x3 = canvas.width-150;
    let y3 = canvas.height/3;
    let w3 = 40;
    let h3 = canvas.height*2/3;
    let wall3 = new Wall(x3,y3,w3,h3);

    walls = [wall1,wall2,wall3];

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
      balls[i].update();
    }
    for(var i = 0;i<walls.length;i++){
      walls[i].draw();
    }
}
