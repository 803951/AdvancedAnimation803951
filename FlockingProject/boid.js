function Boid(pos,vel,length,color){
  this.pos = pos;
  this.vel = vel;
  this.length = length;
  this.color = color;
}

Boid.prototype.attract(other,strength){
  let force = JSVector.subGetNew(other.pos,this.pos);
  force.setMagnitude(strength);
  let mag = this.vel.getMagnitude();
  this.vel.add(force);
  this.vel.setMagnitude(mag);
}

Boid.prototype.repel(other,strength){

}

Boid.prototype.interact(other,strength,sign){
  let force = JSVector.subGetNew(other.pos,this.pos);
  force.setMagnitude(strength);
  let mag = this.vel.getMagnitude();
  this.vel.add(force);
  this.vel.setMagnitude(mag);
}

Boid.prototype.draw(){

  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.strokeStyle =  this.color.toString();
  ctx.save();
  ctx.translate(this.pos.x,this.pos.y);
  ctx.rotate(this.vel.getDirection());
  ctx.moveTo(this.length,0);
  ctx.lineTo(-this.length,-this.length/2);
  ctx.lineTo(-this.length,this.length/2);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}
