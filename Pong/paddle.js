function Paddle(x,y,w,h,color,offset){
  this.pos = new JSVector(x,y);
  this.size = new JSVector(w,h);
  this.color = color;
  this.offset = offset;
}

Paddle.prototype.draw = function(){
  ctx.fillStyle = this.color.toString();
  ctx.fillRect(this.pos.x,this.pos.y,this.size.x,this.size.y);
}

Paddle.prototype.checkEdges = function(){
  if(this.pos.y>cnv.height-this.size.y-this.offset){
    this.pos.y = cnv.height-this.size.y-this.offset;
  }
  else if(this.pos.y<this.offset){
    this.pos.y = this.offset;
  }
}

Paddle.prototype.update = function(){
  this.checkEdges();
  this.draw();
}
