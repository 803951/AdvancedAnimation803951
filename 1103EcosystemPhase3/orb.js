function Orb(x,y,dx,dy,color,radius,ctxArr){
  this.pos = new JSVector(x,y);
  this.vel = new JSVector(dx,dy);
  this.color = color;
  this.radius = radius;
  this.ctxArr = ctxArr;
}

Orb.generateRandomOrb = function(radius,worldW,worldH,ctxArr){
  let x = Math.random()*(worldW-2*radius)+radius-worldW/2;
  let y = Math.random()*(worldH-2*radius)+radius-worldH/2;
  let speed = Math.random()*2+2;
  let dir = Math.random()*Math.PI*2;
  let dx = Math.cos(dir)*speed;
  let dy = Math.sin(dir)*speed;
  let color = Color.generateRandomColor(1,1,1,false);
  return new Orb(x,y,dx,dy,color,radius,ctxArr);
}

Orb.prototype.update = function(){
  this.pos.add(this.vel);
  if(this.vel.getMagnitude()>10) this.vel.multiply(0.9);
  this.checkEdges();
  this.draw();
}
Orb.prototype.repel = function(predator,minDist){
  if(this.pos.distance(predator.pos)>minDist) return false;
  let force = JSVector.subGetNew(this.pos,predator.pos);
  force.setMagnitude(0.01);
  this.vel.add(force);
  return true;
}
Orb.prototype.attract = function(prey,minDist){
  if(this.pos.distance(prey.pos)>minDist) return false;
  let force = JSVector.subGetNew(prey.pos,this.pos);
  force.setMagnitude(0.05);
  this.vel.add(force);
  return true;
}
Orb.prototype.draw = function(){
  for(var i = 0;i<this.ctxArr.length;i++){
    let ctx = this.ctxArr[i];
    ctx.beginPath();
    ctx.fillStyle = this.color.toString();
    ctx.arc(this.pos.x,this.pos.y,this.radius,0,Math.PI*2);
    ctx.fill();
  }
}
Orb.prototype.checkEdges = function(){
  if(this.pos.x<=-world.dimensions.x/2+this.radius){
    this.vel.x*=-1;
  }
  if(this.pos.x>=world.dimensions.x/2-this.radius){
    this.vel.x*=-1;
  }
  if(this.pos.y<=-world.dimensions.y/2+this.radius){
    this.vel.y*=-1;
  }
  if(this.pos.y>=world.dimensions.y/2-this.radius){
    this.vel.y*=-1;
  }
}
