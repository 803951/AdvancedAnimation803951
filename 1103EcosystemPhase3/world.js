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
}

World.prototype.update = function(){

  this.updatePosition();
  this.lerpPosition(0.18)
  this.draw();

}

World.prototype.updatePosition = function(){

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
  this.ctx1TargetPos.x = targetPos.x*this.dimensions.x/this.cnv2.width-this.cnv1.width/2;
  this.ctx1TargetPos.y = targetPos.y*this.dimensions.y/this.cnv2.height-this.cnv1.height/2;
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

  this.ctx1.lineWidth = 5;
  this.ctx1.strokeStyle = "red";
  this.ctx1.save();
  this.ctx1.translate(-this.ctx1Pos.x,-this.ctx1Pos.y);

  this.ctx1.beginPath();
  this.ctx1.moveTo(0,this.dimensions.y/2);
  this.ctx1.lineTo(0,-this.dimensions.y/2);
  this.ctx1.moveTo(this.dimensions.x/2,0);
  this.ctx1.lineTo(-this.dimensions.x/2,0);
  this.ctx1.stroke();
  this.ctx1.restore();

  let xScale = this.cnv2.width/this.dimensions.x;
  let yScale = this.cnv2.height/this.dimensions.y;

  this.ctx2.save();
  this.ctx2.scale(xScale,yScale);
  this.ctx2.translate(this.dimensions.x/2,this.dimensions.y/2);
  this.ctx2.lineWidth = 5;
  this.ctx2.strokeStyle = "red";
  this.ctx2.beginPath();
  this.ctx2.moveTo(0,this.dimensions.y/2);
  this.ctx2.lineTo(0,-this.dimensions.y/2);
  this.ctx2.moveTo(this.dimensions.x/2,0);
  this.ctx2.lineTo(-this.dimensions.x/2,0);
  this.ctx2.stroke();
  this.ctx2.strokeRect(this.ctx1Pos.x, this.ctx1Pos.y, this.cnv1.width, this.cnv1.height);
  this.ctx2.restore();

}
