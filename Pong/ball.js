function Ball(x,y,dx,dy,radius,color,ctx){
  this.pos = new JSVector(x,y);
  this.vel = new JSVector(dx,dy);
  this.radius = radius;
  this.color = color;
  this.ctx = ctx;
}

Ball.prototype.draw = function(){
  this.ctx.beginPath();
  this.ctx.fillStyle = this.color.toString();
  this.ctx.arc(this.pos.x,this.pos.y,this.radius,0,2*Math.PI);
  this.ctx.fill();
  this.ctx.closePath();
}
