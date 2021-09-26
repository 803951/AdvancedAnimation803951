function Ball(x,y,dx,dy,radius,color,acc){
  this.pos = new JSVector(x,y);
  this.vel = new JSVector(dx,dy);
  this.radius = radius;
  this.color = color;
  this.acc = acc;
}

Ball.prototype.draw = function(){
  ctx.fillStyle = this.color.toString();
  ctx.arc(this.pos.x,this.pos.y,this.radius,0,2*Math.PI);
  ctx.fill();
}

Ball.prototype.checkEdges = function(){
  if(this.pos.x<this.radius){
    this.reset(0);
    score2.increaseScore();
  }
  else if(this.pos.x>cnv.width-this.radius){
    this.reset(1);
    score1.increaseScore();
  }
  if(this.pos.y<this.radius){
    this.vel.y*=-1;
  }
  else if(this.pos.y>cnv.height-this.radius){
    this.vel.y*=-1;
  }
}

Ball.prototype.reset = function(player){
  this.pos.x = cnv.width/2;
  this.pos.y = cnv.height/2;
  this.vel.x = (1-player*2)*velMag;
  this.vel.y = 0;

  player1.pos.y = cnv.height/2-player2.size.y/2;
  player2.pos.y = cnv.height/2-player2.size.y/2;
}

Ball.prototype.detectCollision = function(paddle){

  let rebound = false;

  let distX = Math.abs(this.pos.x-paddle.pos.x-paddle.size.x/2);
  let distY = Math.abs(this.pos.y-paddle.pos.y-paddle.size.y/2);

  if (distX > (paddle.size.x / 2 + this.radius)) {
    return;
  }
  if (distY > (paddle.size.y / 2 + this.radius)) {
    return;
  }

  if (distX <= (paddle.size.x / 2)) {
    rebound = true;
  }
  if (distY <= (paddle.size.y / 2)) {
    reboung = true;
  }

  var dx = distX - paddle.size.x / 2;
  var dy = distY - paddle.size.y / 2;

  if(dx * dx + dy * dy <= (this.radius * this.radius)){
    rebound = true;
  }

  if(rebound){
    let dir = (this.pos.y-paddle.pos.y-paddle.size.y/2)/(paddle.size.y/2)*Math.PI/3;
    if(this.vel.x>0){
      dir = Math.PI-dir;
      this.pos.x = paddle.pos.x-this.radius;
    }
    else{
      this.pos.x = paddle.pos.x+paddle.size.x+this.radius;
    }

    this.vel.setDirection(dir);
    let mag = this.vel.getMagnitude()+this.acc;
    this.vel.setMagnitude(mag);
  }
}

Ball.prototype.update = function(){
  this.pos.add(this.vel);
  this.detectCollision(player1);
  this.detectCollision(player2);
  this.checkEdges();
  this.draw()
}
