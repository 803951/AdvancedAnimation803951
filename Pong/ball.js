function Ball(x,y,dx,dy,radius,color,cnv,ctx){
  this.pos = new JSVector(x,y);
  this.vel = new JSVector(dx,dy);
  this.radius = radius;
  this.color = color;
  this.cnv = cnv;
  this.ctx = ctx;
}

Ball.prototype.draw = function(){
  this.ctx.beginPath();
  this.ctx.fillStyle = this.color.toString();
  this.ctx.arc(this.pos.x,this.pos.y,this.radius,0,2*Math.PI);
  this.ctx.fill();
  this.ctx.closePath();
}

Ball.prototype.checkEdges = function(){
  if(this.pos.x<this.radius){
    this.vel.x*=-1;
  }
  else if(this.pos.x>this.cnv.width-this.radius){
    this.vel.x*=-1;
  }
  if(this.pos.y<this.radius){
    this.vel.y*=-1;
  }
  else if(this.pos.y>this.cnv.height-this.radius){
    this.vel.y*=-1;
  }
}

Ball.prototype.update = function(){
  this.checkEdges();

  this.pos.add(this.vel);

  this.draw();
}
