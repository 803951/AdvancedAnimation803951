function SquareParticle(pos,vel,size,lifeTime,scaleR,scaleG,scaleB,isMonochrome){
  this.size = size;
  Particle.call(this,pos,vel,lifeTime,scaleR,scaleG,scaleB,isMonochrome)
}

SquareParticle.prototype = new Particle();

SquareParticle.prototype.draw = function(){
  let dir = this.vel.getDirection();
  ctx.save();
  ctx.translate(this.pos.x,this.pos.y);
  ctx.rotate(dir);
  ctx.fillRect(this.pos.x-this.size/2,this.pos.y-this.size/2,this.size,this.size);
  ctx.fillStyle = this.color.toString();
  ctx.fill();
  ctx.restore();
}
