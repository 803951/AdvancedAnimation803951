var targetPos;

function World(w,h){

  this.dimensions = new JSVector(w,h);
  this.cnv1 = document.getElementById("cnv1");
  this.ctx1 = cnv1.getContext("2d");
  this.cnv2 = document.getElementById("cnv2");
  this.ctx2 = cnv2.getContext("2d");

  this.ctx1Pos = new JSVector(-this.cnv1.width/2,-this.cnv1.height/2);
  this.ctx1TargetPos = new JSVector(this.ctx1Pos.x,this.ctx1Pos.y);
  targetPos = new JSVector(0,0);
  this.movementSpeed = 1;

  this.cnv2.addEventListener("click",function(event){
    let x = event.offsetX;
    let y = event.offsetY;
    let targetX = x-this.width/2;
    let targetY = y-this.height/2;
    targetPos.x = targetX;
    targetPos.y = targetY;
  });

  //generation of species

  //*****SNAKES*****//
  snakes = [];
  let n = 25; //number of snakes
  let r = 10; //radius of snake segments
  let dist = 15; //distance between each segment in snakes
  let ctxArr = [this.ctx1,this.ctx2];
  for(var i = 0;i<n;i++){
    let length = Math.random()*150+100; //random length in pixels of snake
    let segments = length/dist; //sets segments of snake to the length divided by the distance between each segment
    let snake = Snake.generateRandomSnake(r,segments,length,ctxArr,this.dimensions.x,this.dimensions.y);
    snakes.push(snake); //adds new snake to snake array
  }
  //***************//
}

World.prototype.update = function(){

  this.processInput();
  this.updatePosition();
  this.lerpPosition(0.18)
  this.draw();
  this.updateSpecies();

}

World.prototype.updateSpecies = function(){
  this.ctx1.save();
  this.ctx1.translate(-this.ctx1Pos.x,-this.ctx1Pos.y);
  this.ctx2.save();

  let xScale = this.cnv2.width/this.dimensions.x;
  let yScale = this.cnv2.height/this.dimensions.y;

  this.ctx2.scale(xScale,yScale);
  this.ctx2.translate(this.dimensions.x/2,this.dimensions.y/2);

  for(var i = 0;i<snakes.length;i++){ //runs through snake array
    snakes[i].move(); //move function to update all segment positions
    for(var k = 0;k<snakes.length;k++){ //snakes interact with eachother
      if(i==k) continue;
      if(i%4!=k%4){ //each snake is attracted to 75% of other snakes with a smaller attracting force than the repelling force
        snakes[i].attract(snakes[k]);
      }
      else{ //each snake is repelled by 25% of other snakes with a larger repelling force than the attracting force
        snakes[i].repel(snakes[k]);
      }
    }
    snakes[i].draw();
  }

  this.ctx1.restore();
  this.ctx2.restore();
}

World.prototype.processInput = function(){

  let delta = new JSVector(0,0);
  if(controls.up){
    delta.y -= this.movementSpeed;
  }
  else if(controls.down){
    delta.y += this.movementSpeed;
  }
  if(controls.left){
    delta.x -= this.movementSpeed;
  }
  else if(controls.right){
    delta.x += this.movementSpeed;
  }

  if(delta.getMagnitude()>0) delta.setMagnitude(this.movementSpeed);
  targetPos.add(delta);
}

World.prototype.updatePosition = function(){

  targetPos.x = this.clamp(targetPos.x,-this.cnv2.width/2,this.cnv2.width/2);
  targetPos.y = this.clamp(targetPos.y,-this.cnv2.height/2,this.cnv2.height/2);

  let x = targetPos.x*this.dimensions.x/this.cnv2.width-this.cnv1.width/2;
  let y = targetPos.y*this.dimensions.y/this.cnv2.height-this.cnv1.height/2;

  this.ctx1TargetPos.x = x;
  this.ctx1TargetPos.y = y;
}

World.prototype.lerpPosition = function(scale){

  let diff = JSVector.subGetNew(this.ctx1TargetPos,this.ctx1Pos);
  let mag = diff.getMagnitude();
  diff.setMagnitude(mag*scale);
  this.ctx1Pos.add(diff);

}

World.prototype.draw = function(){

  this.ctx1.clearRect(0,0,this.dimensions.x,this.dimensions.y);
  this.ctx2.clearRect(0,0,this.dimensions.x,this.dimensions.y);

  this.ctx1.lineWidth = 4;
  this.ctx1.strokeStyle = "black";
  this.ctx1.save();
  this.ctx1.translate(-this.ctx1Pos.x,-this.ctx1Pos.y);
  this.ctx1.beginPath();
  this.ctx1.moveTo(0,this.dimensions.y/2);
  this.ctx1.lineTo(0,-this.dimensions.y/2);
  this.ctx1.moveTo(this.dimensions.x/2,0);
  this.ctx1.lineTo(-this.dimensions.x/2,0);
  this.ctx1.stroke();
  this.ctx1.strokeRect(-this.dimensions.x/2,-this.dimensions.y/2,this.dimensions.x,this.dimensions.y);
  this.ctx1.restore();

  let xScale = this.cnv2.width/this.dimensions.x;
  let yScale = this.cnv2.height/this.dimensions.y;

  this.ctx2.save();
  this.ctx2.scale(xScale,yScale);
  this.ctx2.translate(this.dimensions.x/2,this.dimensions.y/2);
  this.ctx2.lineWidth = 5;
  this.ctx2.strokeStyle = "black";
  this.ctx2.beginPath();
  this.ctx2.moveTo(0,this.dimensions.y/2);
  this.ctx2.lineTo(0,-this.dimensions.y/2);
  this.ctx2.moveTo(this.dimensions.x/2,0);
  this.ctx2.lineTo(-this.dimensions.x/2,0);
  this.ctx2.stroke();
  this.ctx2.strokeStyle = "red";
  this.ctx2.strokeRect(this.ctx1Pos.x, this.ctx1Pos.y, this.cnv1.width, this.cnv1.height);
  this.ctx2.restore();

}

World.prototype.clamp = function clamp(val,min,max){
  return val>max?max:(val<min?min:val);
}
