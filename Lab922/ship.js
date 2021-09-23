function Ship(x,y,dx,dy,radius,color){
  this.pos = new JSVector(x,y);
  this.vel = new JSVector(dx,dy);
  this.radius = radius;
  this.color = color;
  this.cnv = document.getElementById("cnv");
  this.ctx = this.cnv.getContext("2d");
}

Ship.prototype.checkEdges = function(){
  if(this.pos.x<=0){
    this.pos.x = this.cnv.width;
  }
  else if(this.pos.x>=this.cnv.width){
    this.pos.x = 0;
  }
  if(this.pos.y<=0){
    this.pos.y = this.cnv.height;
  }
  else if(this.pos.y>=this.cnv.height){
    this.pos.y = -this.radius*2;
  }
}

Ship.prototype.draw = function(){
  this.ctx.lineWidth = 5;
  this.ctx.strokeStyle = this.color.toString();
  this.ctx.fillStyle = this.color.toString();
  this.ctx.save();
  this.ctx.translate(this.pos.x,this.pos.y);
  this.ctx.rotate(this.vel.getDirection());
  this.ctx.beginPath();
  this.ctx.moveTo(this.radius,0);
  this.ctx.lineTo(-this.radius,this.radius);
  this.ctx.lineTo(-this.radius/2,0);
  this.ctx.lineTo(-this.radius,-this.radius);
  this.ctx.closePath();
  this.ctx.stroke();
  this.ctx.fill();
  this.ctx.restore();
}

Ship.prototype.attract = function(planet){
  let force = JSVector.subGetNew(planet.pos,this.pos);
  force.normalize();
  let mag = this.vel.getMagnitude();
  this.vel.add(force);
  this.vel.setMagnitude(mag);

  return (this.pos.distance(planet.pos)<=this.radius*5);
}

Ship.prototype.update = function(){
  this.pos.add(this.vel);
  ship.checkEdges();
  this.draw();
}
