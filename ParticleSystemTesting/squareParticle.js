function SquareParticle(pos,vel,size,lifeTime,scaleR,scaleG,scaleB,isMonochrome){
  this.size = size;
  this.color = Color.generateRandomColor(scaleR,scaleG,scaleB,isMonochrome);
  Particle.call(this,pos,vel,lifeTime);
}

SquareParticle.prototype = new Particle();

SquareParticle.prototype.draw = function(){
  ctx.save();
  ctx.beginPath();
  ctx.translate(this.pos.x,this.pos.y);
  ctx.rotate(this.vel.getDirection());
  ctx.fillRect(-this.size/2,-this.size/2,this.size,this.size);
  ctx.closePath();
  ctx.restore();
  ctx.fillStyle = this.color.toString();
  ctx.fill();
}
