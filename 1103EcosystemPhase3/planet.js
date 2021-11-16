function Planet(x,y,dx,dy,radius,color,orbitDist,worldW,worldH,ctxArr){
  this.pos = new JSVector(x,y);
  this.vel = new JSVector(dx,dy);
  this.radius = radius;
  this.color = color;
  this.worldScale = new JSVector(worldW,worldH);
  this.ctxArr = ctxArr;
  this.orbiters = Orbiter.generateRandomOrbiters(this.pos,radius,14,28,ctxArr);
  this.orbitDist = 70;
}

Planet.generateRandomPlanet = function(rMin,rMax,worldW,worldH,ctxArr){
  let radius = Math.random()*(rMax-rMin)+rMin;
  let x = Math.random()*(worldW-2*radius)+radius-worldW/2;
  let y = Math.random()*(worldH-2*radius)+radius-worldH/2;
  let speed = Math.random()*2+2;
  let dir = Math.random()*Math.PI*2;
  let dx = Math.cos(dir)*speed;
  let dy = Math.sin(dir)*speed;
  let color = Color.generateRandomColor(1,1,1,false);
  return new Planet(x,y,dx,dy,radius,color,Math.random()*75+50,worldW,worldH,ctxArr);
}

Planet.prototype.checkEdges = function(){
  if(this.pos.x<=-this.worldScale.x/2+this.radius){
    this.vel.x*=-1;
  }
  if(this.pos.x>=this.worldScale.x/2-this.radius){
    this.vel.x*=-1;
  }
  if(this.pos.y<=-this.worldScale.y/2+this.radius){
    this.vel.y*=-1;
  }
  if(this.pos.y>=this.worldScale.y/2-this.radius){
    this.vel.y*=-1;
  }
}

Planet.prototype.draw = function(){
  for(var i = 0;i<this.ctxArr.length;i++){
    let ctx = this.ctxArr[i];
    ctx.fillStyle = this.color.toString();
    ctx.beginPath();
    ctx.arc(this.pos.x,this.pos.y,this.radius,0,2*Math.PI);
    ctx.fill();
  }
}

Planet.prototype.update = function(){
  this.pos.add(this.vel);
  this.checkEdges();

  for(var i = 0;i<this.orbiters.length;i++){
    this.orbiters[i].orbit(this,this.orbitDist);
    this.orbiters[i].draw();
  }

  this.draw();
}
