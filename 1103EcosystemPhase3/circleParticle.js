function CircleParticle(pos,vel,radius,lifeTime,scaleR,scaleG,scaleB,isMonochrome,ctx){
  this.radius = radius;
  this.color = Color.generateRandomColor(scaleR,scaleG,scaleB,isMonochrome);
  Particle.call(this,pos,vel,lifeTime);
  this.ctx = ctx;
}

CircleParticle.prototype = new Particle();

CircleParticle.prototype.draw = function(){
  this.ctx.beginPath();
  this.ctx.arc(this.pos.x,this.pos.y,this.radius, 0, 2 * Math.PI);
  this.ctx.fillStyle = this.color.toString();
  this.ctx.fill();
  this.ctx.closePath();
  this.color.a=this.currentLife/this.lifeTime;
}
