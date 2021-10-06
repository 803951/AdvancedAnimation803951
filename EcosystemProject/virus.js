function Virus(pos,radius,speed,id){
  let dir = Math.random()*Math.PI*2;//set random velocity direction
  let dx = Math.cos(dir)*speed;
  let dy = Math.sin(dir)*speed;
  let vel = new JSVector(dx,dy);
  let prey = [];
  this.theta = Math.random()*2*Math.PI;
  this.nodes = Math.random()*5+5;
  this.color = Color.generateRandomColor(255,1,1,false);
  Creature.call(this,pos,vel,radius,prey,id,0,0,0,0,0);
}

Virus.prototype = new Creature();

Virus.prototype.draw = function(){
  ctx.beginPath();
  ctx.fillStyle = this.color.toString();
  ctx.arc(this.pos.x,this.pos.y,this.radius,0,2*Math.PI);
  ctx.fill();
  ctx.closePath();
}

Virus.prototype.rotate = function(){
  theta++;
  for(var i = 0;i<this.nodes;i++){
    let angle = (i/this.nodes)*Math.PI*2;
    let distance = this.radius*3;
    let nodeRadius = this.radius/2;
    let clr = new Color(255,255,255,1);
    ctx.arc(Math.cos(angle)*distance,Math.sin(angle)*distance,nodeRadius,0,2*Math.PI);
    ctx.fillStyle = clr.toString();
    ctx.fill();
  }
  ctx.save();
  ctx.translate(this.pos.x,this.pos.y);
  ctx.rotate(this.theta)
  ctx.beginPath();
  ctx.arc(0,0,this.radius,0,2*Math.PI);
  ctx.fillStyle = this.color.toString();
  ctx.fill();
  ctx.restore();
}
