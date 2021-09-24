function Orbiter(x,y,omega,radius,color){
  this.pos = new JSVector(x,y);
  this.omega = omega;
  this.theta = Math.random()*Math.PI*2;
  this.radius = radius;
  this.color = color;
}

Orbiter.generateRandomOrbiters = function(pos,radius,min,max){
  let n = Math.round(Math.random(max-min)+min);
  let orbiters = [];

  for(var i = 0;i<n;i++){
      let color = Color.generateRandomColor();
      let dir = Math.random()*Math.PI*2;
      let r = Math.random()*radius/5+radius/4;
      let x = pos.x+Math.cos(dir)*r*6;
      let y = pos.y+Math.sin(dir)*r*6;
      let omega = Math.random()/25+0.02;
      orbiters.push(new Orbiter(x,y,omega,r,color));
  }

  return orbiters;
}

Orbiter.prototype.orbit = function(planet,dist){
  this.theta+=this.omega;

  this.pos.x = planet.pos.x+Math.cos(this.theta)*dist;
  this.pos.y = planet.pos.y+Math.sin(this.theta)*dist;
}

Orbiter.prototype.draw = function(){
  ctx.beginPath();
  ctx.fillStyle = this.color.toString();
  ctx.arc(this.pos.x,this.pos.y,this.radius,0,2*Math.PI);
  ctx.fill();
  ctx.closePath();
}
