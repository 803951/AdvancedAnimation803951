function Mouse(pos,radius,speed,id,matingProb,matingRad,growthTime){

  this.color = new Color(100,100,100,1); //sets color of animal to sheep

  let dir = Math.random()*Math.PI*2;//set random velocity direction
  let dx = Math.cos(dir)*speed;
  let dy = Math.sin(dir)*speed;
  let vel = new JSVector(dx,dy);
  let prey = [];
  let deathProb = 0;//0.0005
  Creature.call(this,pos,vel,radius,prey,id,matingProb,matingRad,growthTime,deathProb,1000); //calls parent class constructor to initialize as a creature type object
}

Mouse.prototype = new Creature();

Mouse.prototype.draw = function(){ //draws mouse as a circle

  let dir = this.vel.getDirection();
  let tailSegments = 3;
  let tailLength = this.radius*0.9;
  let scale = (this.currentFrame<this.growthTime)? this.currentFrame/this.growthTime:1;
  tailLength*=scale;
  let x = this.pos.x-Math.cos(dir)*tailLength*1.5;
  let y = this.pos.y-Math.sin(dir)*tailLength*1.5;
  let tailAngle = Math.PI/24*Math.sin(Date.now()/30); //angle of tail zigZags
  let tailColor = new Color(150,150,150,1);

  //body
  ctx.beginPath();
  //ctx.arc(this.pos.x,this.pos.y,this.radius*scale, 0, 2 * Math.PI);
  ctx.ellipse(this.pos.x, this.pos.y, this.radius*scale*1.5, this.radius*scale, dir, 0, 2*Math.PI);
  ctx.fillStyle = this.color.toString();
  if(this.inHeat){
    if(this.sex) ctx.fillStyle = "red";
    else ctx.fillStyle = "blue";
  }
  ctx.fill();
  ctx.closePath();

  for(var i = 0;i<tailSegments;i++){
    ctx.beginPath();
    ctx.moveTo(x,y);
    tailAngle*=-(1+i%2);
    dir+=2*tailAngle; //zigzag tail
    x-=Math.cos(dir)*tailLength;
    y-=Math.sin(dir)*tailLength;
    ctx.lineTo(x,y);
    ctx.strokeStyle = tailColor.toString();
    ctx.lineWidth = 5-3*i/tailSegments;
    ctx.stroke();
    ctx.closePath();
    tailAngle*=1.2;
  }

}
