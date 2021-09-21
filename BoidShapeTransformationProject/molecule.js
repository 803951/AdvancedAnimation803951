function Molecule(pos,vel,acc,radius,color,alpha,minSpeed,maxSpeed){
  this.pos = pos;
  this.vel = vel;
  this.acc = acc;
  this.radius = radius;
  this.color = color;
  this.alpha = alpha;
  this.minSpeed = minSpeed;
  this.maxSpeed = maxSpeed;
  this.cnv = document.getElementById("cnv");
  this.ctx = cnv.getContext("2d");
}
Molecule.prototype.checkEdges = function(){
  if(this.pos.x<=-this.radius*2){
    this.pos.x = this.cnv.width+this.radius*2
  }
  else if(this.pos.x>=this.cnv.width+this.radius*2){
    this.pos.x = -this.radius*2;
  }
  if(this.pos.y<=-this.radius*2){
    this.pos.y = this.cnv.height+this.radius*2
  }
  else if(this.pos.y>=this.cnv.height+this.radius*2){
    this.pos.y = -this.radius*2;
  }
}
Molecule.prototype.interact = function(other,attract,scale){
  if(attract) scale*=-1;
  let force = JSVector.subGetNew(this.pos,other.pos);
  force.normalize();
  force.multiply(scale);
  let tempMag = this.vel.getMagnitude();
  this.vel.add(force);
  this.vel.setMagnitude(tempMag);
}
Molecule.prototype.move = function(){
  this.pos.add(this.vel);
}
Molecule.prototype.draw = function(){
  /*this.ctx.beginPath();
  this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
  this.ctx.fillStyle = "rgb("+this.color.r+","+this.color.g+","+this.color.b+")";  // color to stroke
  this.ctx.fill();     // render the fill*/
  ctx.beginPath();

  this.ctx.lineWidth = 5;
  this.ctx.strokeStyle =  "rgb("+this.color.r+","+this.color.g+","+this.color.b+")";  // color to stroke
  this.ctx.save();
  this.ctx.translate(this.pos.x,this.pos.y);
  this.ctx.rotate(this.vel.getDirection());
  this.ctx.moveTo(this.radius,0);
  this.ctx.lineTo(-this.radius,-this.radius/2);
  this.ctx.lineTo(-this.radius,this.radius/2);
  this.ctx.closePath();
  this.ctx.closePath();
  this.ctx.stroke();
  this.ctx.restore();
  this.colorUpdated = false;
}
Molecule.prototype.update = function(){
  this.checkEdges();
  this.vel.add(this.acc);
  if(this.vel.getMagnitude>this.maxSpeed) this.vel.setMagnitude(this.maxSpeed);
  if(this.vel.getMagnitude<this.minSpeed) this.vel.setMagnitude(this.minSpeed);
  let dir = this.vel.getDirection();
  let friction = new JSVector(Math.cos(dir)*this.alpha,Math.sin(dir)*this.alpha);
  this.vel.sub(friction);
  this.move();
  this.draw();
}
