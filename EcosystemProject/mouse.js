function Mouse(pos,radius,speed,id){

  this.color = new Color(100,100,100,1);

  let dir = Math.random()*Math.PI*2;
  let dx = Math.cos(dir)*speed;
  let dy = Math.sin(dir)*speed;
  let vel = new JSVector(dx,dy);
  let sex = Math.random()>0.5;
  let predators = [];
  let prey = [];

  Creature.call(this,pos,vel,radius,predators,prey,sex,id);
}

Mouse.prototype = new Creature();

Mouse.prototype.draw = function(){
  ctx.beginPath();
  ctx.arc(this.pos.x,this.pos.y,this.radius, 0, 2 * Math.PI);
  ctx.fillStyle = this.color.toString();
  ctx.fill();
  ctx.closePath();
}
