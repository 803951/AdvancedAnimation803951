function Ball(x,y,dx,dy,radius,color){
  this.pos = new JSVector(x,y);
  this.vel = new JSVector(dx,dy);
  this.radius = radius;
  this.color = color;
}

Ball.prototype.draw = function(){
  ctx.fillStyle = this.color.toString();
  ctx.arc(this.pos.x,this.pos.y,this.radius,0,2*Math.PI);
  ctx.fill();
}

Ball.prototype.checkEdges = function(){
  if(this.pos.x<this.radius){
    this.vel.x*=-1;
  }
  else if(this.pos.x>cnv.width-this.radius){
    this.vel.x*=-1;
  }
  if(this.pos.y<this.radius){
    this.vel.y*=-1;
  }
  else if(this.pos.y>cnv.height-this.radius){
    this.vel.y*=-1;
  }
}

Ball.prototype.detectCollision = function(paddle){

  let distX = Math.abs(this.pos.x-paddle.pos.x-paddle.size.x/2);
  let distY = Math.abs(this.pos.y-paddle.pos.y-paddle.size.y/2);

  if (distX > (paddle.size.x / 2 + this.radius)) {
    return;
  }
  if (distY > (paddle.size.y / 2 + this.radius)) {
    return;
  }

  if (distX <= (paddle.size.x / 2)) {
    this.vel.x*=-1;
    return;
  }
  if (distY <= (paddle.size.y / 2)) {
    this.vel.x*=-1;
    return;
  }

  var dx = distX - paddle.size.x / 2;
  var dy = distY - paddle.size.y / 2;

  if(dx * dx + dy * dy <= (this.radius * this.radius)){
    this.vel.x*=-1;
  }
}

Ball.prototype.update = function(){
  this.checkEdges();

  this.pos.add(this.vel);

  this.draw();
}
