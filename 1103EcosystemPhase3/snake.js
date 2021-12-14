function Snake(pos,radius,vel,segments,length,color,ctxArr,worldW,worldH,head){
  this.color = color;
  this.radius = radius;
  this.vel = vel;
  this.length = length;
  this.dist = length/segments; //sets distance between each segment to the length in pixels divided by the total number of segments in the snake
  this.worldScale = new JSVector(worldW,worldH)
  if(vel==undefined)return;
  let dir = this.vel.getDirection();
  this.segment = null;//sets segment to head of snake so the nextsegment will be undefined since head does not follow any other segment
  for(var i = 0;i<segments;i++){ //builds snake from head to tail with tail as the segment saved in the snake object
    this.segment = new SnakeSegment(pos,radius,color,this.vel,this.segment,ctxArr,this.worldScale); //creates new segment pointing to segment in front of it
    pos = new JSVector(pos.x-this.dist*Math.cos(dir)*i,pos.y-this.dist*Math.sin(dir)*i);
  }
}
Snake.prototype.split = function(segmentIndex){ //snakeIndex starts at tailend - head index = n-1
  //code splitting of snake at certain segment index + return new snake segment
  let currentIndex = 0;
  let newHead = this.segment;
  for(var i = 0;i<=segmentIndex;i++){
    newHead = newHead.nextSegment;
    if(newHead == undefined||newHead == null) return;
    if(newHead.nextSegment==undefined){
      return null;
    }
  }
  let newBack = this.segment;
  this.segment = newHead.nextSegment;
  newHead.nextSegment = null;
  return Snake.generateSplitSnake(newBack,this);

}

Snake.generateRandomSnake = function(r,segments,length,ctxArr,worldW,worldH){
  let x = Math.random()*(worldW-2*r)+r-worldW/2;
  let y = Math.random()*(worldH-2*r)+r-worldH/2;
  let pos = new JSVector(x,y); //generates random position
  let speed = Math.random()*2+2;
  let dir = Math.random()*Math.PI*2;
  let dx = Math.cos(dir)*speed;
  let dy = Math.sin(dir)*speed;
  let vel = new JSVector(dx,dy) //generates random velocity;
  let color = Color.generateRandomColor(1,1,50,false); //generate random color of snake
  return new Snake(pos,r,vel,segments,length,color,ctxArr,worldW,worldH); //returns new randomly generated snake
}
Snake.generateSplitSnake = function(newBack,parent){
  let snake = new Snake();
  snake.color = parent.color;
  snake.radius = parent.radius;
  snake.vel = newBack.vel;
  snake.dist = parent.dist;
  snake.worldScale = parent.worldScale;

  snake.segment = newBack;

  return snake;
}
Snake.prototype.draw = function(){
  this.segment.draw(); //calls draw method of tail of snake which triggers draw methods of all folowing snake segments
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
