function Orbiter(x,y,omega,theta,radius,color){
  this.pos = new JSVector(x,y);
  this.omega = omega;
  this.theta = theta;
  this.radius = radius;
  this.color = color;
}

Orbiter.generateRandomOrbiters = function(pos,radius,min,max){
  let n = Math.round(Math.random(max-min)+min);
  let orbiters = [];
  let omega = Math.random()/25+0.02;
  for(var i = 0;i<n;i++){
    let color = Color.generateRandomColor();
    let dir = Math.PI*2*i/n;
    let r = Math.random()*radius/6+radius/5;
    let x = pos.x+Math.cos(dir)*r*6;
    let y = pos.y+Math.sin(dir)*r*6;
    orbiters.push(new Orbiter(x,y,omega,dir,r,color));
  }

  return orbiters;
}

Orbiter.prototype.orbit = function(planet,dist){
  this.theta+=this.omega;

  ctx.beginPath();

  this.pos.x = planet.pos.x+Math.cos(this.theta)*dist;
  this.pos.y = planet.pos.y+Math.sin(this.theta)*dist;
  ctx.moveTo(this.pos.x,this.pos.y);
  ctx.lineTo(planet.pos.x,planet.pos.y);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "white";
  ctx.stroke();
  ctx.closePath();
}

Orbiter.prototype.draw = function(){
  ctx.beginPath();
  ctx.fillStyle = this.color.toString();
  ctx.arc(this.pos.x,this.pos.y,this.radius,0,2*Math.PI);
  ctx.fill();
  ctx.closePath();
}
