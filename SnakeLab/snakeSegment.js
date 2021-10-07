function SnakeSegment(pos,radius,color,vel,nextSegment){
  this.pos = pos;
  this.radius = radius;
  this.color = color;
  this.vel = vel;
  this.nextSegment = nextSegment;
}

SnakeSegment.prototype.draw = function(){
  ctx.lineTo(this.pos.x,this.pos.y);
  //ctx.arc(this.pos.x,this.pos.y,this.radius, 0, 2 * Math.PI);
  //ctx.fillStyle = this.color.toString();
  //ctx.fill();
  //ctx.closePath();

  if(this.nextSegment!=undefined){
    this.nextSegment.draw();
  }
}

SnakeSegment.prototype.update = function(dist){
  if(this.nextSegment!=undefined){
    this.follow(this.nextSegment,dist);
    this.nextSegment.update(dist);
  }
  else{
    this.move();
  }
}

SnakeSegment.prototype.move = function(){
  this.pos.add(this.vel);

  if(this.pos.x<=this.radius){
    this.vel.x*=-1;
  }
  if(this.pos.x>=cnv.width-this.radius){
    this.vel.x*=-1;
  }
  if(this.pos.y<=this.radius){
    this.vel.y*=-1;
  }
  if(this.pos.y>=cnv.height-this.radius){
    this.vel.y*=-1;
  }
}

SnakeSegment.prototype.follow = function(other,dist){
  let delta = JSVector.subGetNew(other.pos,this.pos);
  delta.setMagnitude(dist);
  this.pos = JSVector.subGetNew(other.pos,delta);
}

SnakeSegment.prototype.repel = function(other){
  let force = JSVector.subGetNew(this.pos,other.pos);
  force.normalize();
  let tempVel = this.vel.getMagnitude();
  this.vel.add(force);
  this.vel.setMagnitude(tempVel);
}

SnakeSegment.prototype.attract = function(other){
  let force = JSVector.subGetNew(other.pos,this.pos);
  force.normalize();
  let tempVel = this.vel.getMagnitude();
  this.vel.add(force);
  this.vel.setMagnitude(tempVel);
}
