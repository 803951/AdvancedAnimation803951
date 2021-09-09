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

  //Implement physics: V_lj(r) = 4 * epsilon [(sigma/r)^12-(sigma/r)^6]
  //r is distance between particles
  //sigma is distance where particle-particle potential energy V is 0 => sigma = 2*r1+2*r2

  let sigma = this.r+other.r;
  let epsilon = 1;
  let r = this.pos.distance(other.pos);
  let lj_potential = 4*epsilon*(Math.pow(sigma/r,12)-Math.pow(sigma/r,6));
  let direction = JSVector.subGetNew(this.pos,other.pos).getDirection();
  if(lj_potential>Number.EPSILON&&lj_potential<=r/sigma){
    this.delta.x=Math.cos(direction)*lj_potential;
    this.delta.y=Math.sin(direction)*lj_potential;
  }

  Comparisons.totalComparisons++;
  let distSqrd = this.pos.distanceSquared(other.pos);
  return (distSqrd <= (this.r+other.r)*(this.r+other.r));
}

Ball.prototype.draw = function(){
  //let maxDist = Math.sqrt(canvas.width*canvas.width/4+canvas.height*canvas.height/4);
  //let currentDist = this.pos.distance(new JSVector(canvas.width/2,canvas.height/2));
  //let lerpColor = this.color.lerp(currentDist, maxDist,0.2);
  this.context.beginPath();
  this.context.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
  this.context.fillStyle = "rgb("+this.color.r+","+this.color.g+","+this.color.b+")";  // color to stroke
  this.context.fill();     // render the fill
  this.colorUpdated = false;
}

Ball.prototype.update = function(){
  this.checkEdges();

  this.pos.x+=this.delta.x;
  this.pos.y+=this.delta.y;

  this.draw();
}
