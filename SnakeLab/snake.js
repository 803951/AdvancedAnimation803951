function Snake(pos,radius,vel,segments,length,color){
  this.color = color;
  this.radius = radius;
  this.vel = vel;
  this.length = length;
  this.segments = segments;
  let dir = this.vel.getDirection();

  this.segment = undefined;
  for(var i = 0;i<segments;i++){
    let x = pos.x+(1-i/segments*length)*Math.cos(dir);
    let y = pos.y+(1-i/segments*length)*Math.sin(dir);
    tempPos = new JSVector(x,y);
    this.segment = new SnakeSegment(tempPos,radius,color,this.vel,this.segment);
  }
}

Snake.generateRandomSnake = function(r,segments,length){
  let x = Math.random()*(cnv.width-2*r)+r;
  let y = Math.random()*(cnv.height-2*r)+r;
  let pos = new JSVector(x,y);
  let speed = Math.random()*2+2;
  let dir = Math.random()*Math.PI*2;
  let dx = Math.cos(dir)*speed;
  let dy = Math.sin(dir)*speed;
  let vel = new JSVector(dx,dy)
  let color = Color.generateRandomColor(1,1,50,false);
  return new Snake(pos,r,vel,segments,length,color);
}

Snake.prototype.draw = function(){
  //ctx.beginPath();
  //ctx.moveTo(this.segment.pos.x,this.segment.pos.y);
  this.segment.draw();
  //ctx.strokeStyle = this.color.toString();
  //ctx.lineCap = "round";
  //ctx.lineWidth = this.radius*2;
  //ctx.stroke();
  //ctx.closePath();
}

Snake.prototype.move = function(){
  this.segment.update(this.length/this.segments);
}

Snake.prototype.repel = function(other){
  this.segment.repel(other.segment);
}

Snake.prototype.attract = function(other){
  this.segment.attract(other.segment);
}
