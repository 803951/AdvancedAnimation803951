function Boid(pos,vel,length,color,worldScale,ctxArr){
  this.pos = pos;
  this.vel = vel;
  this.length = length;
  this.color = color;
  this.worldScale = worldScale;
  this.ctxArr = ctxArr;
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
  if(this.pos.x<-this.worldScale.x/2){
    this.pos.x = this.worldScale.x/2;
  }
  if(this.pos.x>this.worldScale.x/2){
    this.pos.x = -this.worldScale.x/2;
  }
  if(this.pos.y<-this.worldScale.y/2){
    this.pos.y = this.worldScale.y/2;
  }
  if(this.pos.y>this.worldScale.y/2){
    this.pos.y = -this.worldScale.y/2;
  }
}

Boid.prototype.draw = function(){
  for(var i = 0;i<this.ctxArr.length;i++){
    let ctx = this.ctxArr[i];
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
}
