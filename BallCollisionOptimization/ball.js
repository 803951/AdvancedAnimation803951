function Ball(x=0,y=0,dx=0,dy=0,r=20,color1="blue",color2="orange"){
  this.pos = new JSVector(x,y);
  this.delta = new JSVector(dx,dy);
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
  if(this.pos.x<=this.r||this.pos.x>=canvas.width-this.r){
    this.delta.x*=-1;
  }
  if(this.pos.y<=this.r||this.pos.y>=canvas.height-this.r){
    this.delta.y*=-1;
  }
}

Ball.prototype.checkForCollision = function(other){
  Comparisons.totalComparisons++;
  let distSqrd = this.pos.distanceSquared(other.pos);
  return (distSqrd <= (this.r+other.r)*(this.r+other.r));
}

Ball.prototype.draw = function(){
  this.context.beginPath();
  this.context.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
  this.context.fillStyle = this.color;     // color to stroke
  this.context.fill();     // render the fill
  this.colorUpdated = false;
}

Ball.prototype.update = function(){
  this.checkEdges();

  this.pos.x+=this.delta.x;
  this.pos.y+=this.delta.y;

  this.draw();
}
