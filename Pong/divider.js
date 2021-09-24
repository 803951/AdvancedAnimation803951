function Divider(x,y,dx,dy,w,h,maxX,maxY,color){
  this.pos = new JSVector(x,y);
  this.delta = new JSVector(dx,dy);
  this.size = new JSVector(w,h);
  this.max = new JSVector(maxX,maxY);
  this.color = color;
}

Divider.prototype.draw = function(){

  var rectPos = new JSVector(this.pos.x,this.pos.y);

  while(rectPos.x<this.max.x&&rectPos.y<this.max.y){
    ctx.fillStyle = this.color.toString();
    ctx.fillRect(rectPos.x,rectPos.y,this.size.x,this.size.y);
    ctx.fill();

    rectPos.x+=this.delta.x;
    rectPos.y+=this.delta.y;
  }
}
