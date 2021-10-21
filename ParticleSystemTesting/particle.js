function Particle(pos,vel,lifeTime){
  this.pos = pos;
  this.vel = vel;
  this.acc = new JSVector(0,.2);
  this.lifeTime = lifeTime;
  this.currentLife = lifeTime;
}

Particle.prototype.update = function(){
  this.vel.add(this.acc);
  this.pos.add(this.vel);
  this.currentLife --;
  return this.currentLife>0;
}
