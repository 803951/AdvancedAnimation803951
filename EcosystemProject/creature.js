function Creature(pos,vel,radius,predators,prey,sex,id,matingProb,matingRad){
  this.pos = pos;
  this.vel = vel;
  this.radius = radius;
  this.predators = predators;
  this.prey = prey;
  this.sex = sex;
  this.id = id;
  this.matingProb = matingProb;
  this.matingRad = matingRad;
  this.inHeat = false;
}

Creature.prototype.update = function(){
  this.pos.add(this.vel);
  this.checkEdges();
  if(Math.random()>1-this.matingProb){
    this.inHeat = true;
  }
}

Creature.prototype.checkEdges = function(){
  if(this.pos.x<=this.radius){
    this.vel.x*=-1;
  }
  if(this.pos.x>=cnv.width-this.radius){
    this.vel.x*=-1;
  }
  if(this.pos.y<=this.radius){
    this.vel.y*=-1;
  }
  if(this.pos.y>=cnv.height-this.radius){
    this.vel.y*=-1;
  }
}

Creature.prototype.attract = function(other){
  let force = JSVector.subGetNew(other.pos,this.pos);
  force.setMagnitude(0.5);
  let tempMag = this.vel.getMagnitude();
  this.vel.add(force);
  this.vel.setMagnitude(tempMag);
}
