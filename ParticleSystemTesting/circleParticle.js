function CircleParticle(pos,vel,radius,lifeTime,scaleR,scaleG,scaleB,isMonochrome){
  this.radius = radius;
  Particle.call(this,pos,vel,lifeTime,scaleR,scaleG,scaleB,isMonochrome)
}

CircleParticle.prototype = new Particle();

CircleParticle.prototype.draw = function(){
  ctx.arc(this.pos.x,this.pos.y,this.radius, 0, 2 * Math.PI);
  ctx.fillStyle = this.color.toString();
  ctx.fill();
}
