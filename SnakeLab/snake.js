function Snake(pos,radius,vel,segments,length,color){
  this.color = color;
  this.radius = radius;
  this.vel = vel;
  this.length = length;
  this.dist = length/segments; //sets distance between each segment to the length in pixels divided by the total number of segments in the snake

  let dir = this.vel.getDirection();

  this.segment = undefined;//sets segment to head of snake so the nextsegment will be undefined since head does not follow any other segment
  for(var i = 0;i<segments;i++){ //builds snake from head to tail with tail as the segment saved in the snake object
    let x = pos.x-i*2*this.dist*Math.cos(dir);
    let y = pos.y-i*2*this.dist*Math.sin(dir);
    let tempPos = new JSVector(x,y); //sets position along direction of random velocity
    this.segment = new SnakeSegment(tempPos,radius,color,this.vel,this.segment); //creates new segment pointing to segment in front of it
  }
}

Snake.prototype.split = function(segmentIndex){ //snakeIndex starts at tailend - head index = n-1
 //code splitting of snake at certain segment index + return new snake segment
}

Snake.generateRandomSnake = function(r,segments,length){
  let x = Math.random()*(cnv.width-2*r)+r;
  let y = Math.random()*(cnv.height-2*r)+r;
  let pos = new JSVector(x,y); //generates random position
  let speed = Math.random()*2+2;
  let dir = Math.random()*Math.PI*2;
  let dx = Math.cos(dir)*speed;
  let dy = Math.sin(dir)*speed;
  let vel = new JSVector(dx,dy) //generates random velocity;
  let color = Color.generateRandomColor(1,1,50,false); //generate random color of snake
  return new Snake(pos,r,vel,segments,length,color); //returns new randomly generated snake
}

Snake.prototype.draw = function(){
  //ctx.beginPath();
  //ctx.moveTo(this.segment.pos.x,this.segment.pos.y);
  //******************************************//

  this.segment.draw(); //calls draw method of tail of snake which triggers draw methods of all folowing snake segments

  //******************************************// Other Drawing Method through stroke, not fill
  //ctx.strokeStyle = this.color.toString();
  //ctx.lineCap = "round";
  //ctx.lineWidth = this.radius*2;
  //ctx.stroke();
  //ctx.closePath();
}

Snake.prototype.move = function(){
  this.segment.update(this.dist); //calls update method of segment with distance between each following segment as this.dist
}

Snake.prototype.repel = function(other){
  this.segment.repel(other.segment); //repels one snake segment from another
}

Snake.prototype.attract = function(other){
  this.segment.attract(other.segment); //attracts one snake segment to another
}
