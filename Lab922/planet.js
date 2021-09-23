function Planet(x,y,radius,color,cnv,ctx){
  let pos = new JSVector(x,y);
  let vel = new JSVector(0,0);
  this.color = color;
  this.ctx = ctx;
  SpaceObject.call(this,pos,vel,radius,cnv,0.1);
}

Planet.prototype = Object.create(SpaceObject.prototype);

Planet.prototype.draw = function(){
  this.ctx.beginPath();
  this.ctx.fillStyle = this.color.toString();
  this.ctx.arc(this.pos.x,this.pos.y,this.radius,0,2*Math.PI);
  this.ctx.fill();
  this.ctx.closePath();
}
