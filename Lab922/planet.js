function Planet(x,y,radius,color){
  this.pos = new JSVector(x,y);
  this.radius = radius;
  this.color = color;
  this.cnv = document.getElementById("cnv");
  this.ctx = this.cnv.getContext("2d");
}

Planet.prototype.draw = function(){
  this.ctx.fillStyle = this.color.toString();
  this.ctx.arc(this.pos.x,this.pos.y,this.radius,0,2*Math.PI);
  this.ctx.fill();
}
