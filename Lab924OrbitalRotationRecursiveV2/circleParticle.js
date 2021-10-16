function CircleParticle(pos,vel,radius,lifeTime,scaleR,scaleG,scaleB,isMonochrome){
  this.radius = radius;
  this.color = Color.generateRandomColor(scaleR,scaleG,scaleB,isMonochrome);
  Particle.call(this,pos,vel,lifeTime);
}

CircleParticle.prototype = new Particle();

CircleParticle.prototype.draw = function(){
  ctx.beginPath();
  ctx.arc(this.pos.x,this.pos.y,this.radius, 0, 2 * Math.PI);
  ctx.fillStyle = this.color.toString();
  ctx.fill();
  ctx.closePath();
  this.color.a=this.currentLife/this.lifeTime;
}
