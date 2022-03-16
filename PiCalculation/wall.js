function Wall(ctx,x,y,angle,length,clr){
  this.ctx = ctx;
  this.pos = new JSVector(x,y);
  this.angle = angle;
  this.length = length;
  this.clr = clr;
}
Wall.prototype.displayLine = function(){ //displays wall as a line
  this.ctx.beginPath();
  this.ctx.moveTo(this.pos.x,this.pos.y);
  this.ctx.lineTo(this.pos.x+this.length*Math.cos(this.angle), this.pos.y+this.length*Math.sin(this.angle));
  this.ctx.lineWidth = this.width;
  this.ctx.strokeStyle = this.clr.toString();
  this.ctx.stroke();
}
Wall.prototype.isColliding = function(wall){ //works only iff current wall is a right angle, but good enough for the program at the moment

  let distY = Math.abs(this.pos.y-(wall.pos.y+Math.sin(wall.angle)*wall.legnth));
  if(distY<=Math.abs(Math.sin(wall.angle))*wall.length/2){
    return true;
  }
  return true;
}
