function Creature(pos,vel,radius,prey,id,matingProb,matingRad,growthTime,deathProb,minAge){
  this.pos = pos;
  this.vel = vel;
  this.radius = radius;
  this.prey = prey;
  this.sex = Math.random()>0.5;
  this.id = id;
  this.matingProb = matingProb;
  this.matingRad = matingRad;
  this.inHeat = false;
  this.growthTime = growthTime;
  this.currentFrame = 0;
  this.deathProb = deathProb;
  this.minAge = minAge;
  this.living = true;
}

Creature.prototype.update = function(){
  this.pos.add(this.vel);
  this.checkEdges();
  if(Math.random()>1-this.matingProb&&this.currentFrame>=this.growthTime){
    this.inHeat = true;
  }
  this.currentFrame++;
  if(Math.random()>1-0.00001){ //infant mortality
    this.living = false;
  }
  if(this.currentFrame>this.minAge){
    if(Math.random()>1-this.deathProb){
      this.living = false;
    }
  }
}

Creature.prototype.checkEdges = function(){
  if(this.pos.x<=this.radius+minX){
    this.vel.x*=-1;
  }
  if(this.pos.x>=boundX-this.radius){
    this.vel.x*=-1;
  }
  if(this.pos.y<=this.radius+minY){
    this.vel.y*=-1;
  }
  if(this.pos.y>=boundY-this.radius){
    this.vel.y*=-1;
  }
}

Creature.prototype.attract = function(other){
  let force = JSVector.subGetNew(other.pos,this.pos);
  force.setMagnitude(0.1);
  let tempMag = this.vel.getMagnitude();
  this.vel.add(force);
  this.vel.setMagnitude(tempMag);
}

Creature.prototype.consume = function(other){
  this.radius+=other.radius/2;
  this.inHeat = true;
}
