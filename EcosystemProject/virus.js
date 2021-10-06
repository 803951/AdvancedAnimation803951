function Virus(pos,radius,speed,id){
  let dir = Math.random()*Math.PI*2;//set random velocity direction
  let dx = Math.cos(dir)*speed;
  let dy = Math.sin(dir)*speed;
  let vel = new JSVector(dx,dy);
  let prey = [];
  this.theta = Math.random()*2*Math.PI;
  this.nodes = Math.round(Math.random()*5+5);
  this.color = Color.generateRandomColor(255,0,1,false);
  this.theta = dir;
  Creature.call(this,pos,vel,radius,prey,id,0,0,0,0,0);
}

Virus.prototype = new Creature();

Virus.prototype.draw = function(){
  this.rotate();
  ctx.beginPath();
  ctx.fillStyle = this.color.toString();
  ctx.arc(this.pos.x,this.pos.y,this.radius,0,2*Math.PI);
  ctx.fill();
  ctx.closePath();
}

Virus.prototype.rotate = function(){
  this.theta+=0.01;
  ctx.save();
  ctx.translate(this.pos.x,this.pos.y);
  ctx.rotate(this.theta)
  let n = this.nodes;
  for(var i = 0;i<n;i++){
    let angle = (i/n)*Math.PI*2;
    let distance = this.radius*3;
    let nodeRadius = this.radius/2;
    let clr = this.color.opposite();
    let x = Math.cos(angle)*distance;
    let y = Math.sin(angle)*distance;
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(x,y);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(x,y,nodeRadius,0,2*Math.PI);
    ctx.fillStyle = clr.toString();
    ctx.fill();
    ctx.closePath();
  }
  ctx.beginPath();
  ctx.arc(0,0,this.radius,0,2*Math.PI);
  ctx.fillStyle = this.color.toString();
  ctx.fill();
  ctx.restore();
}
