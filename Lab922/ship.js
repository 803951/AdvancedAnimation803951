function Ship(x,y,dx,dy,radius,color){
  this.pos = new JSVector(x,y);
  this.vel = new JSVector(dx,dy);
  this.radius = radius;
  this.color = color;
  this.cnv = document.getElementById("cnv");
  this.ctx = this.cnv.getContext("2d");
}

Ship.prototype = Object.create(SpaceObject.prototype);

Ship.prototype.checkEdges = function(){
  if(this.pos.x<=this.radius){
    this.pos.x = this.cnv.width-this.radius;
  }
  else if(this.pos.x>=this.cnv.width-this.radius){
    this.pos.x = this.radius;
  }
  if(this.pos.y<=this.radius){
    this.pos.y = this.cnv.height-this.radius;
  }
  else if(this.pos.y>=this.cnv.height-this.radius){
    this.pos.y = this.radius;
  }
}

Ship.prototype.draw = function(){
  this.ctx.lineWidth = 5;
  this.ctx.strokeStyle = this.color.toString();
  this.ctx.fillStyle = this.color.toString();
  this.ctx.save();
  this.ctx.translate(this.pos.x,this.pos.y);
  this.ctx.rotate(this.vel.getDirection());
  this.ctx.beginPath();
  this.ctx.moveTo(this.radius,0);
  this.ctx.lineTo(-this.radius,this.radius);
  this.ctx.lineTo(-this.radius/2,0);
  this.ctx.lineTo(-this.radius,-this.radius);
  this.ctx.closePath();
  this.ctx.stroke();
  this.ctx.fill();
  this.ctx.restore();
}

Ship.prototype.attract = function(planet){
  let force = JSVector.subGetNew(planet.pos,this.pos);
  force.normalize();
  force.divide(15);
  let mag = this.vel.getMagnitude();
  this.vel.add(force);
  this.vel.setMagnitude(mag);

  return (this.pos.distance(planet.pos)<=this.radius*5);
}

Ship.prototype.update = function(){
  this.pos.add(this.vel);
  ship.checkEdges();
  this.draw();


Object.defineProperty(Ship.prototype, 'constructor', {
    value: Ship,
    enumerable: false, // so that it does not appear in 'for in' loop
    writable: true });
}
