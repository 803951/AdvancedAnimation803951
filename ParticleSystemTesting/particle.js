function Particle(pos,vel,lifeTime,scaleR,scaleG,scaleB,isMonochrome){
  this.pos = pos;
  this.vel = vel;
  this.lifeTime = lifeTime;
  this.color = Color.generateRandomColor(scaleR,scaleG,scaleB,isMonochrome);
}

Particle.prototype.update = function(){

  this.pos.add(this.vel);

  this.lifeTime --;
  return this.lifeTime>0;
}
