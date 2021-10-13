function Particle(pos,vel,lifeTime){
  this.pos = pos;
  this.vel = vel;
  this.lifeTime = lifeTime;
}

Particle.prototype.update = function(){

  this.pos.add(this.vel);
  this.draw();
  this.lifeTime --;
  return this.lifeTime>0;
}
