function SpaceObject(pos,vel,radius,cnv,alpha){
  this.pos = pos;
  this.vel = vel;
  this.alpha = alpha;
  this.radius = radius;
  this.cnv = cnv;
}

SpaceObject.prototype.checkEdges = function(){
  if(this.pos.x<=this.radius){
    this.pos.x = this.cnv.width-this.radius;
  }
  else if(this.pos.x>=this.cnv.width-this.radius){
    this.pos.x = this.radius;
  }
  if(this.pos.y<=this.radius){
    this.pos.y = this.cnv.height-this.radius;
  }
  else if(this.pos.y>=this.cnv.height-this.radius){
    this.pos.y = this.radius;
  }
}

SpaceObject.prototype.interact = function(other,scale,constantMag){
  let force = JSVector.subGetNew(this.pos,other.pos);
  force.normalize();
  force.multiply(scale);
  let mag = this.vel.getMagnitude();
  this.vel.add(force);
  if(constantMag) this.vel.setMagnitude(mag);
}

SpaceObject.prototype.update = function(){
  let dir = this.vel.getDirection();
  let friction = new JSVector(this.alpha*Math.cos(dir),this.alpha*Math.sin(dir));
  this.vel.sub(friction);
  if(dir!=this.vel.getDirection()){
    vel = new JSVector(0,0);
  }
  this.pos.add(this.vel);
  this.checkEdges();
}
