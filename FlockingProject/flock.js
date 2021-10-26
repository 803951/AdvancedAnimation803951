function Flock(speed,color,cohStrength,sepStrength,alignRange,sepDist,numBoids,boidScale){
  this.cohStrength = cohStrength;
  this.sepStrength = sepStrength;
  this.alignRange = alignRange;
  this.sepDist = sepDist;
  this.boids = [];

  for(var i = 0;i<numBoids;i++){
    let pos = new JSVector(Math.random()*cnv.width,Math.random()*cnv.height);
    let dir = Math.random()*Math.PI*2;
    let vel = new JSVector(Math.cos(dir)*speed,Math.sin(dir)*speed);
    let boid = new Boid(pos,vel,boidScale,color)
    this.boids.push(boid);
  }
}

Flock.prototype.cohesion = function(){
  for(var i = 0;i<this.boids.length;i++){
    let dist = undefined;
    let closestBoid = undefined;
    for(var k = 0;k<this.boids.length;k++){
      if(i==k) continue;
      if(this.boids[i].pos.distance(this.boids[k].pos)<dist||dist==undefined){
        closestBoid = this.boids[k];
      }
    }
    //if(count>0) avgPos.divide(count);
    let force = JSVector.subGetNew(closestBoid.pos,this.boids[i].pos);
    force.setMagnitude(this.cohStrength)
    let mag = this.boids[i].vel.getMagnitude();
    this.boids[i].vel.add(force);
    this.boids[i].vel.setMagnitude(mag);
  }
}

Flock.prototype.seperation = function(){
  for(var i = 0;i<this.boids.length;i++){
    for(var k = 0;k<this.boids.length;k++){
      if(i==k) continue;
      if(this.boids[i].pos.distance(this.boids[k].pos)<=this.sepDist){
        this.boids[i].interact(this.boids[k],this.sepStrength,-1);
      }
    }
  }
}

Flock.prototype.align = function(){
  for(var i = 0;i<this.boids.length;i++){
    let count = 0;
    let avgPos = new JSVector(0,0);
    for(var k = 0;k<this.boids.length;k++){
      let dist = this.boids[i].pos.distance(this.boids[k].pos);
      if(i==k) continue;
      if(dist<=this.alignRange){
        avgPos.add(this.boids[k].pos);
        count++;
      }
    }
    //if(count>0) avgPos.divide(count);
    let force = JSVector.subGetNew(avgPos,this.boids[i].pos);
    force.setMagnitude(this.cohStrength)
    let mag = this.boids[i].vel.getMagnitude();
    this.boids[i].vel.add(force);
    this.boids[i].vel.setMagnitude(mag);
  }
}

Flock.prototype.display = function(){
  for(var i = 0;i<this.boids.length;i++){
    this.boids[i].update();
  }
}
