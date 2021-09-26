function Planet(x,y,dx,dy,radius,color,orbits,omega,theta,minOrbiters,maxOrbiters,scaleR,scaleG,scaleB){
  this.pos = new JSVector(x,y);
  this.vel = new JSVector(dx,dy);
  this.radius = radius;
  this.color = color;
  this.theta = theta;
  this.omega = omega;
  this.orbiters = [];
  this.orbitDist = 2.5*radius;
  if(orbits>0){
    this.orbiters = Planet.generateRandomOrbiters(this.pos,radius,minOrbiters,maxOrbiters,orbits-1,scaleR,scaleG,scaleB);
  }

}

Planet.prototype.orbit = function(other,dist){
  this.theta+=this.omega;

  ctx.beginPath();
  this.pos.x = other.pos.x+Math.cos(this.theta)*dist;
  this.pos.y = other.pos.y+Math.sin(this.theta)*dist;
  ctx.moveTo(this.pos.x,this.pos.y);
  ctx.lineTo(other.pos.x,other.pos.y);
  ctx.lineWidth = 2;
  ctx.strokeStyle = this.color.toString();
  //ctx.stroke();
  ctx.closePath();
}

Planet.generateRandomOrbiters = function(pos,radius,min,max,orbits,scaleR,scaleG,scaleB){
  let n = Math.round(Math.random(max-min)+min);
  let orbiters = [];
  let sign = (Math.random()>0.5)?1:-1;
  let omega = (Math.random()/50+0.005)*sign;
  let color = Color.generateRandomColor(scaleR,scaleG,scaleB);
  for(var i = 0;i<n;i++){
    let theta = Math.PI*2*i/n;
    let r = Math.pow((Math.random()+1)/2,2)*radius/2;
    let x = pos.x+Math.cos(theta)*r*6;
    let y = pos.y+Math.sin(theta)*r*6;
    let orbiter = new Planet(x,y,0,0,r,color,orbits,omega,theta,min*2,max*2,scaleR,scaleG,scaleB);

    orbiter.draw();
    orbiters.push(orbiter);
  }

  return orbiters;
}

Planet.generateRandomPlanet = function(rMin,rMax,minOrbiters,maxOrbiters,orbits,scaleR,scaleG,scaleB){
  let radius = Math.random()*(rMax-rMin)+rMin;
  let x = Math.random()*(cnv.width-2*radius)+radius;
  let y = Math.random()*(cnv.height-2*radius)+radius;
  let speed = Math.random()+2;
  let dir = Math.random()*Math.PI*2;
  let dx = Math.cos(dir)*speed;
  let dy = Math.sin(dir)*speed;
  let color = Color.generateRandomColor();
  return new Planet(x,y,dx,dy,radius,color,orbits,0,0,minOrbiters,maxOrbiters,scaleR,scaleG,scaleB);
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

Planet.prototype.draw = function(color){
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(this.pos.x,this.pos.y,this.radius,0,2*Math.PI);
  ctx.fill();
  ctx.closePath();
}

Planet.prototype.update = function(){

  this.pos.add(this.vel);

  if(this.vel.getMagnitude()>0) this.checkEdges(); //checks if it is initial planet

  for(var i = 0;i<this.orbiters.length;i++){
    this.orbiters[i].update();
    this.orbiters[i].orbit(this,this.orbitDist);
  }

  if(this.orbiters.length==0)this.draw(this.color.toString());
}
