function Paddle(x,y,w,h,color,cnv,ctx){
  this.pos = new JSVector(x,y);
  this.size = new JSVector(w,h);
  this.color = color;
  this.cnv = cnv;
  this.ctx = ctx;
}

Paddle.prototype.draw = function(){
  this.ctx.fillStyle = this.color.toString();
  this.ctx.fillRect(x,y,w,h);
}
