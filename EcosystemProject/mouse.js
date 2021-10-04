function Mouse(pos,radius,speed,id,matingProb,matingRad,growthTime){

  this.color = new Color(100,100,100,1); //sets color of animal to sheep

  let dir = Math.random()*Math.PI*2;//set random velocity direction
  let dx = Math.cos(dir)*speed;
  let dy = Math.sin(dir)*speed;
  let vel = new JSVector(dx,dy);
  let prey = [];
  Creature.call(this,pos,vel,radius,prey,id,matingProb,matingRad,growthTime,0.0005,1000); //calls parent class constructor to initialize as a creature type object
}

Mouse.prototype = new Creature();

Mouse.prototype.draw = function(){ //draws mouse as a circle
  ctx.beginPath();
  ctx.arc(this.pos.x,this.pos.y,this.radius, 0, 2 * Math.PI);
  ctx.fillStyle = this.color.toString();
  if(this.inHeat){
    if(this.sex) ctx.fillStyle = "red";
    else ctx.fillStyle = "blue";
  }
  ctx.fill();
  ctx.closePath();
}
