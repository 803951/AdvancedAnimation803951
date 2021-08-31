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
    this.colorUpdated = false;
    this.canvas = document.getElementById("cnv");
    this.context = canvas.getContext("2d");
  }
  setOverlapping = function(isOverlapping){
    if(isOverlapping){
      this.color = this.color2;
      this.colorUpdated = true;
    }
    else{
      this.color = this.color1;
    }
  }
  draw = function(){
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    this.context.fillStyle = this.color;     // color to stroke
    this.context.fill();     // render the fill
    this.colorUpdated = false;
  }
  checkEdges = function(){
    if(this.x<=this.r||this.x>=canvas.width-this.r){
      this.dx*=-1;
    }
    if(this.y<=this.r||this.y>=canvas.height-this.r){
      this.dy*=-1;
    }
  }
  ballsIntersecting = function(ball){
    Counter.totalComparisons++;
    let distX = this.x-ball.x;
    let distY = this.y-ball.y;
    let distSqrd = distX*distX+distY*distY;
    return (distSqrd <= this.r*this.r + ball.r*ball.r + 2*this.r*ball.r); // efficient distance comparison since does not take sqrt
  }
  update = function(){
    this.x+=this.dx;
    this.y+=this.dy;
    this.checkEdges();
    this.draw();
  }
}
