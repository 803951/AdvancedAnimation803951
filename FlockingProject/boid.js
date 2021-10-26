function Boid(pos,vel,length,color){
  this.pos = pos;
  this.vel = vel;
  this.length = length;
  this.color = color;
}

Boid.prototype.interact = function(other,strength,sign){
  let force = JSVector.subGetNew(other.pos,this.pos);
  force.setMagnitude(strength);
  force.multiply(sign);
  let mag = this.vel.getMagnitude();
  this.vel.add(force);
  this.vel.setMagnitude(mag);
}

Boid.prototype.update = function(){
  this.pos.add(this.vel);
  this.checkEdges();
  this.draw();
}

Boid.prototype.checkEdges = function(){
  if(this.pos.x<0){
    this.pos.x = cnv.width;
  }
  else if(this.pos.x>cnv.width){
    this.pos.x = 0;
  }
  if(this.pos.y<0){
    this.pos.y = cnv.height;
  }
  if(this.pos.y>cnv.height){
    this.pos.y = 0;
  }
}

Boid.prototype.draw = function(){
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
