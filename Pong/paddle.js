function Paddle(x,y,w,h,color,cnv,ctx,offset){
  this.pos = new JSVector(x,y);
  this.size = new JSVector(w,h);
  this.color = color;
  this.cnv = cnv;
  this.ctx = ctx;
  this.offset = offset;
}

Paddle.prototype.draw = function(){
  this.ctx.fillStyle = this.color.toString();
  this.ctx.fillRect(this.pos.x,this.pos.y,this.size.x,this.size.y);
}

Paddle.prototype.checkEdges = function(){
  if(this.pos.y>this.cnv.height-this.size.y-this.offset){
    this.pos.y = this.cnv.height-this.size.y-this.offset;
  }
  else if(this.pos.y<this.offset){
    this.pos.y = this.offset;
  }
}

Paddle.prototype.update = function(){
  this.checkEdges();
  this.draw();
}
