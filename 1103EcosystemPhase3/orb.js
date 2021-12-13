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
  this.draw();
}
Orb.prototype.repel = function(predator,minDist){
  if(this.pos.distance(predator.pos)>minDist) return;
  let force = JSVector.subGetNew(this.pos,predator.pos);
  force.setMagnitude(0.1);
  this.vel.add(force);
}
Orb.prototype.draw = function(){
  for(var i = 0;i<this.ctxArr.length;i++){
    let ctx = this.ctxArr[i];
    ctx.fillStyle = this.color.toString();
    ctx.arc(this.pos.x,this.pos.y,this.radius,0,Math.PI*2);
    ctx.fill();
  }
}
