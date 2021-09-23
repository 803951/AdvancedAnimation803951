function Ship(x,y,dx,dy,radius,color,cnv,ctx){
  let pos = new JSVector(x,y);
  let vel = new JSVector(dx,dy);
  this.color = color;
  this.ctx = ctx;
  SpaceObject.call(this,pos,vel,radius,cnv,0);
}

Ship.prototype = Object.create(SpaceObject.prototype);

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
