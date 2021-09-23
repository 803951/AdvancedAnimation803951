SpaceObject = function(pos,vel,radius){
  this.pos = pos;
  this.vel = vel;
  this.radius = radius
  this.cnv = document.getElementById("cnv");
}
SpaceObject.prototype.checkEdges(){
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
Spaceobject.prototype.attract(other){
  this.interact(other,1);
}
SpaceObject.protoype.repel(other){
  this.ineract(other,-1);
}
SpaceObject.prototype.interact(other,scale){
  let force = JSVector.subGetNew(this.pos,ship.pos);
  force.normalize();
  force.multiply(scale);
  let mag = this.vel.getMagnitude();
  this.vel.add(force);
  this.vel.setMagnitude(mag);
}
