function Planet(x,y,dx,dy,radius,color,orbitDist){
  this.pos = new JSVector(x,y);
  this.vel = new JSVector(dx,dy);
  this.radius = radius;
  this.color = color;
  this.orbiters = Orbiter.generateRandomOrbiters(this.pos,radius,14,28);
  this.orbitDist = 70;
}

Planet.generateRandomPlanet = function(rMin,rMax){
  let radius = Math.random()*(rMax-rMin)+rMin;
  let x = Math.random()*(cnv.width-2*radius)+radius;
  let y = Math.random()*(cnv.height-2*radius)+radius;
  let speed = Math.random()*2+2;
  let dir = Math.random()*Math.PI*2;
  let dx = Math.cos(dir)*speed;
  let dy = Math.sin(dir)*speed;
  let color = Color.generateRandomColor();
  return new Planet(x,y,dx,dy,radius,color,Math.random()*75+50);
}

Planet.prototype.checkEdges = function(){
  if(this.pos.x<=this.radius){
    this.vel.x*=-1;
  }
  else if(this.pos.x>=cnv.width-this.radius){
    this.vel.x*=-1;
  }
  if(this.pos.y<=this.radius){
    this.vel.y*=-1;
  }
  else if(this.pos.y>=cnv.height-this.radius){
    this.vel.y*=-1;
  }
}

Planet.prototype.draw = function(){
  ctx.beginPath();
  ctx.fillStyle = this.color.toString();
  ctx.arc(this.pos.x,this.pos.y,this.radius,0,2*Math.PI);
  ctx.fill();
  ctx.closePath();
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
