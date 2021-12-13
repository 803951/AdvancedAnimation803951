var targetPos;

function World(w,h){

  this.dimensions = new JSVector(w,h);
  this.cnv1 = document.getElementById("cnv1");
  this.ctx1 = cnv1.getContext("2d");
  this.zoomScale = new JSVector(1,1);
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

  let ctxArr = [this.ctx1,this.ctx2];
  //generation of species

  //*****SNAKES*****//
  this.snakes = [];
  let n = 10; //number of snakes
  let r = 7; //radius of snake segments
  let dist = 10; //distance between each segment in snakes
  for(var i = 0;i<n;i++){
    let length = Math.random()*150+100; //random length in pixels of snake
    let segments = length/dist; //sets segments of snake to the length divided by the distance between each segment
    let snake = Snake.generateRandomSnake(r,segments,length,ctxArr,this.dimensions.x,this.dimensions.y);
    this.snakes.push(snake); //adds new snake to snake array
  }
  //***************//

  //generation of flocks

  //*****FLOCKS*****//
  this.flocks = [];
  n = 5;
  let cohStrength = 0.08;
  let sepStrength = 0.1;
  let alignRange = 200;
  let sepDist = 20;
  let numBoids = 20;
  let boidScale = 5;

  for(var i = 0;i<n;i++){
    let speed = Math.random()*1+2;
    let color = Color.generateRandomColor(1,0.5,0.5,false);
    let flock = new Flock(speed,color,cohStrength,sepStrength,alignRange,sepDist,numBoids,boidScale,this.dimensions.x,this.dimensions.y,ctxArr);
    this.flocks.push(flock);
  }
  //****************//

  //generation of orbitals

  //****ORBITALS****//
  this.planets = [];
  n = 5;
  for(var i = 0;i<n;i++){
    let planet = Planet.generateRandomPlanet(25,50,this.dimensions.x,this.dimensions.y,ctxArr);
    this.planets.push(planet);
  }
  //****************//

  //generation of food(orbs)

  //****ORBS********//
  this.orbs = [];
  n = 50;
  for(var i = 0;i<n;i++){
    let radius = Math.random()*10+5;
    let orb = Orb.generateRandomOrb(radius,this.dimensions.x,this.dimensions.y,ctxArr);
    this.orbs.push(orb);
  }
  //****************//
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
  this.ctx1.scale(this.zoomScale.x,this.zoomScale.y);
  this.ctx2.save();

  let xScale = this.cnv2.width/this.dimensions.x;
  let yScale = this.cnv2.height/this.dimensions.y;

  this.ctx2.scale(xScale,yScale);
  this.ctx2.translate(this.dimensions.x/2,this.dimensions.y/2);

  //SNAKES
  for(var i = 0;i<this.snakes.length;i++){ //runs through snake array
    this.snakes[i].move(); //move function to update all segment positions
    for(var k = 0;k<this.snakes.length;k++){ //snakes interact with eachother
      if(i==k) continue;
      if(i%4!=k%4){ //each snake is attracted to 75% of other snakes with a smaller attracting force than the repelling force
        this.snakes[i].attract(this.snakes[k]);
      }
      else{ //each snake is repelled by 25% of other snakes with a larger repelling force than the attracting force
        this.snakes[i].repel(this.snakes[k]);
      }
    }
    this.snakes[i].draw();
  }
  //flocks
  for(var i = 0;i<this.flocks.length;i++){
    this.flocks[i].cohesion();
    this.flocks[i].seperation();
    this.flocks[i].align();
    this.flocks[i].display();
  }

  //orbitals
  for(var i = 0;i<this.planets.length;i++){
    this.planets[i].update();
  }

  //orbs
  let minDist = 300;
  for(var i = 0;i<this.orbs.length;i++){
    if(this.orbs[i].radius>minDist/4){
      this.orbs[i].radius*=0.5;
    }
    for(var k = 0;k<this.orbs.length;k++){
      if(i==k) continue;
      if(this.orbs[i].radius>this.orbs[k].radius){
        let success = this.orbs[i].attract(this.orbs[k],minDist);
        this.orbs[k].repel(this.orbs[i],minDist);
        if(success){
          if(this.orbs[i].pos.distance(this.orbs[k].pos)<=this.orbs[i].radius+this.orbs[k].radius){
            this.orbs[i].radius = Math.sqrt(this.orbs[i].radius*this.orbs[i].radius+this.orbs[k].radius*this.orbs[k].radius);
            let radius = Math.random()*10+5;
            this.orbs[k] = Orb.generateRandomOrb(radius,this.dimensions.x,this.dimensions.y,this.orbs[k].ctxArr);
          }
          break;
        }
      }
    }
    this.orbs[i].update();
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
  let zoomDelta = 0.01;
  if(controls.zoomIn){
    this.zoomScale.x*=1.01;
    this.zoomScale.y*=1.01;
  }
  if(controls.zoomOut){
    this.zoomScale.x/=1.01;
    this.zoomScale.y/=1.01;
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
  this.ctx1.scale(this.zoomScale.x,this.zoomScale.y);

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
  this.ctx2.strokeRect(this.ctx1Pos.x/this.zoomScale.x, this.ctx1Pos.y/this.zoomScale.y, this.cnv1.width/this.zoomScale.x, this.cnv1.height/this.zoomScale.x);
  this.ctx2.restore();

}

World.prototype.clamp = function clamp(val,min,max){
  return val>max?max:(val<min?min:val);
}
