function TriangleParticle(pos,vel,height,lifeTime,scaleR,scaleG,scaleB,isMonochrome){
  this.height = height
  this.color = Color.generateRandomColor(scaleR,scaleG,scaleB,isMonochrome);
  Particle.call(this,pos,vel,lifeTime);
}

TriangleParticle.prototype = new Particle();

TriangleParticle.prototype.draw = function(){
  ctx.save();
  ctx.beginPath();
  ctx.translate(this.pos.x,this.pos.y);
  ctx.rotate(Math.PI+this.vel.getDirection());
  ctx.moveTo(0,this.height/2);
  ctx.lineTo(this.height/Math.sqrt(3),-this.height/2);
  ctx.lineTo(-this.height/Math.sqrt(3),-this.height/2);
  ctx.closePath();
  ctx.restore();
  ctx.fillStyle = this.color.toString();
  ctx.fill();
  this.color.a=this.currentLife/this.lifeTime;
}
