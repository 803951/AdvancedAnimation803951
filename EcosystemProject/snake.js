function Snake(pos,radius,vel,segments,length,color){
  this.color = color;
  this.pos = pos;
  this.radius = radius;
  this.vel = vel;
  let dir = Math.random()*Math.PI*2;

  this.segmentArr = [];
  for(var i = 0;i<segments;i++){
    let x = (1-i/segments*length)*Math.cos(dir);
    let y = (1-i/segments*length)*Math.sin(dir);
    let pos = new JSVector(x,y);
    let segment = new snakeSegment(pos,radius,color);
    segmentArr.push(segment);
  }
}

Snake.prototype.draw = function(){
  for(var i = 0;i<segmentArr.length;i++){

  }
}
