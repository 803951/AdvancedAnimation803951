function Molecule(pos,vel,acc,radius,color){
  this.pos = pos;
  this.vel = vel;
  this.acc = acc;
  this.radius = radius;
  this.color = color;
  this.cnv = document.getElementById("cnv");
  this.ctx = cnv.getContext("2d");
}
Molecule.prototype.checkEdges = function(){
  if(this.pos.x<=-this.radius||this.pos.x>=this.cnv.width+this.radius){
    this.pos.x = Math.abs(this.pos.x-this.cnv.width);
  }
  if(this.pos.y<=-this.radius||this.pos.y>=this.cnv.height+this.radius){
    this.pos.y = Math.abs(this.pos.y-this.cnv.height);
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
  this.ctx.beginPath();
  this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
  this.ctx.fillStyle = "rgb("+this.color.r+","+this.color.g+","+this.color.b+")";  // color to stroke
  this.ctx.fill();     // render the fill
  this.colorUpdated = false;
}
Molecule.prototype.update = function(){
  this.checkEdges();
  this.vel.add(this.acc);
  this.move();
  this.draw();
}
