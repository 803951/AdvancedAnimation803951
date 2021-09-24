function Ball(x,y,dx,dy,radius,color){
  this.pos = new JSVector(x,y);
  this.vel = new JSVector(dx,dy);
  this.radius = radius;
  this.color = color;
}

Ball.prototype.draw = function(){
  ctx.beginPath();
  ctx.fillStyle = this.color.toString();
  ctx.arc(this.pos.x,this.pos.y,this.radius,0,2*Math.PI);
  ctx.fill();
  ctx.closePath();
}

Ball.prototype.checkEdges = function(){
  if(this.pos.x<this.radius){
    this.vel.x*=-1;
  }
  else if(this.pos.x>cnv.width-this.radius){
    this.vel.x*=-1;
  }
  if(this.pos.y<this.radius){
    this.vel.y*=-1;
  }
  else if(this.pos.y>cnv.height-this.radius){
    this.vel.y*=-1;
  }
}

Ball.prototype.update = function(){
  this.checkEdges();

  this.pos.add(this.vel);

  this.draw();
}
