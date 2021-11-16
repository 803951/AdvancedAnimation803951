function Orbiter(x,y,omega,theta,radius,color,ctxArr){
  this.pos = new JSVector(x,y);
  this.omega = omega;
  this.theta = theta;
  this.radius = radius;
  this.color = color;
  this.ctxArr = ctxArr;
}

Orbiter.generateRandomOrbiters = function(pos,radius,min,max,ctxArr){
  let n = Math.round(Math.random(max-min)+min);
  let orbiters = [];
  let omega = Math.random()/25+0.02;
  let color = Color.generateRandomColor(1,1,1,false);
  for(var i = 0;i<n;i++){
    let dir = Math.PI*2*i/n;
    let r = Math.random()*radius/6+radius/5;
    let x = pos.x+Math.cos(dir)*r*6;
    let y = pos.y+Math.sin(dir)*r*6;
    orbiters.push(new Orbiter(x,y,omega,dir,r,color,ctxArr));
  }

  return orbiters;
}

Orbiter.prototype.orbit = function(planet,orbital_radius){

  this.theta+=this.omega; //add angular velocity to angle
  this.pos.x = planet.pos.x+Math.cos(this.theta)*orbital_radius; //calculate x of rotated position around pivot point: planet
  this.pos.y = planet.pos.y+Math.sin(this.theta)*orbital_radius; //calculate y of rotated position around pivot point: planet

  for(var i = 0;i<this.ctxArr.length;i++){
    let ctx = this.ctxArr[i];
    ctx.beginPath();
    ctx.moveTo(this.pos.x,this.pos.y);
    ctx.lineTo(planet.pos.x,planet.pos.y);
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.color.toString();
    ctx.stroke();
  }
}

Orbiter.prototype.draw = function(){
  for(var i = 0;i<this.ctxArr.length;i++){
    let ctx = this.ctxArr[i];
    ctx.beginPath();
    ctx.fillStyle = this.color.toString();
    ctx.arc(this.pos.x,this.pos.y,this.radius,0,2*Math.PI);
    ctx.fill();
  }
}
