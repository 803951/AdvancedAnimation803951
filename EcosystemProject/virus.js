function Virus(pos,radius,transmissionRadius,speed,id){
  let dir = Math.random()*Math.PI*2;//set random velocity direction
  let dx = Math.cos(dir)*speed;
  let dy = Math.sin(dir)*speed;
  let vel = new JSVector(dx,dy);
  let prey = [0];
  this.theta = Math.random()*2*Math.PI;
  this.nodes = Math.round(Math.random()*5+5);
  this.color = Color.generateRandomColor(255,0,1,false);
  this.theta = dir;
  this.transmissionRadius = transmissionRadius;
  //particleType,pos,minSpeed,maxSpeed,lifeTime,minSize,maxSize,scaleR,scaleG,scaleB,isMonochrome,spawnRate,angleSpray)
  Creature.call(this,pos,vel,radius,prey,id,0,0,0,0,0);
  let minSpeed = 5;
  let maxSpeed = 7;
  let lifeTime = 30;
  let minSize = 7;
  let maxSize = 12;
  let scaleR = 255;
  let scaleG = 1;
  let scaleB = 1;
  let isMonochrome = false;
  let spawnRate = 0.5;
  let angleSpray = Math.PI/12;
  this.emitter = new ParticleEmitter(particleTypes.CIRCLE,this.pos,minSpeed,maxSpeed,lifeTime,minSize,maxSize,scaleR,scaleG,scaleB,isMonochrome,spawnRate,angleSpray);
}

Virus.prototype = new Creature();

Virus.prototype.draw = function(){
  this.rotate();
  ctx.beginPath();
  ctx.fillStyle = this.color.toString();
  ctx.arc(this.pos.x,this.pos.y,this.radius,0,2*Math.PI);
  ctx.fill();
  ctx.closePath();
  this.emitter.updateParticles();
}

Virus.prototype.targetTransmission = function(other){
  let targetPointer = JSVector.subGetNew(other.pos,this.pos);
  this.emitter.pos = this.pos;
  if(targetPointer.getMagnitude()<=this.transmissionRadius){
    this.emitter.generateNewParticles(targetPointer.getDirection());
  }
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
    ctx.lineWidth = 2;
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
