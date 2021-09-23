function Planet(x,y,radius,color){
  this.pos = new JSVector(x,y);
  this.vel = new JSVector(0,0);
  this.radius = radius;
  this.color = color;
  this.cnv = document.getElementById("cnv");
  this.ctx = this.cnv.getContext("2d");
}

Planet.prototype = Object.create(SpaceObject.prototype);

Planet.prototype.draw = function(){
  this.ctx.beginPath();
  this.ctx.fillStyle = this.color.toString();
  this.ctx.arc(this.pos.x,this.pos.y,this.radius,0,2*Math.PI);
  this.ctx.fill();
  this.ctx.closePath();
}

Planet.prototype.repel = function(ship){
  let force = JSVector.subGetNew(this.pos,ship.pos);
  force.normalize();
  let mag = this.vel.getMagnitude();
  this.vel.add(force);
  this.vel.setMagnitude(mag);
}

Planet.prototype.update = function(){
  this.pos.add(this.vel);
  this.draw();
}
