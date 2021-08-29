function Ball(x=0,y=0,dx=0,dy=0,r=20,color1="blue",color2="orange"){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.r = r;
  this.color1 = color1;
  this.color2 = color2;
  this.color = color1;
  this.colorSet = false;
  this.canvas = document.getElementById("cnv");
  this.context = this.canvas.getContext("2d");
}

Ball.prototype.setOverlapping = function(isOverlapping){
  this.color = isOverlapping?this.color2:this.color1;
}

Ball.prototype.checkEdges = function(){
  if(this.x<=this.r||this.x>=canvas.width-this.r){
    this.dx*=-1;
  }
  if(this.y<=this.r||this.y>=canvas.height-this.r){
    this.dy*=-1;
  }
}

Ball.prototype.checkForCollision = function(other){
  Comparisons.totalComparisons++;
  let distX = this.x-other.x;
  let distY = this.y-other.y;
  let distSqrd = distX*distX+distY*distY;
  return (distSqrd <= this.r*this.r + other.r*other.r + 2*other.r*other.r);
}

Ball.prototype.draw = function(){
  this.context.beginPath();
  this.context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
  this.context.fillStyle = this.color;     // color to stroke
  this.context.fill();     // render the fill
  this.colorUpdated = false;
}

Ball.prototype.update = function(){
  this.checkEdges();

  this.x+=this.dx;
  this.y+=this.dy;

  this.draw();
}
