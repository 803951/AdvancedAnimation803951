function SnakeSegment(pos,radius,color,vel,nextSegment){
  this.pos = pos;
  this.radius = radius;
  this.color = color;
  this.vel = vel;
  this.nextSegment = nextSegment; //segment object points to the next segment in snake segment linked list
}

SnakeSegment.prototype.draw = function(){
  ctx.beginPath();
  //ctx.lineTo(this.pos.x,this.pos.y);
  ctx.arc(this.pos.x,this.pos.y,this.radius, 0, 2 * Math.PI);
  ctx.fillStyle = this.color.toString();
  ctx.fill();
  ctx.closePath();

  if(this.nextSegment!=undefined){
    this.nextSegment.draw(); //calls draw function of next segment if defined, meaning if this segment is not the head
  }
}

SnakeSegment.prototype.update = function(dist){
  if(this.nextSegment!=undefined){ //follows the next segment if it is not the head of the snake
    this.nextSegment.update(dist); //calls update function of next segment
    this.follow(this.nextSegment,dist);
  }
  else{ //moves only if it is the head of the snake
    this.move();
  }
}

SnakeSegment.prototype.move = function(){
  this.pos.add(this.vel);

  //checks edges of canvas
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
  let delta = JSVector.subGetNew(other.pos,this.pos); //finds vector between two segments
  delta.setMagnitude(dist);
  this.pos = JSVector.subGetNew(other.pos,delta); //makes the distance between the two segments set to variable "dist"
}

SnakeSegment.prototype.repel = function(other){
  let force = JSVector.subGetNew(this.pos,other.pos); //finds vectors between two segments
  force.setMagnitude(0.3);
  let tempVel = this.vel.getMagnitude();
  this.vel.add(force); //adds force to velocity
  this.vel.setMagnitude(tempVel); //sets velocity to old velocity
}

SnakeSegment.prototype.attract = function(other){
  let force = JSVector.subGetNew(other.pos,this.pos); //finds vector between two segments
  force.setMagnitude(0.1);
  let tempVel = this.vel.getMagnitude();
  this.vel.add(force); //adds force to velocity
  this.vel.setMagnitude(tempVel); //sets velocity to old velocity
}
