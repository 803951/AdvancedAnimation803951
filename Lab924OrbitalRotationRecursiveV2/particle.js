function Particle(pos,vel,lifeTime){
  this.pos = pos;
  this.vel = vel;
  this.lifeTime = lifeTime;
  this.currentLife = lifeTime;
}

Particle.prototype.update = function(){
  this.pos.add(this.vel);
  this.currentLife --;
  return this.currentLife>0;
}
