function Flock(vel,color,cohStrength,sepStrength,sepDist){
  this.vel = vel;
  this.color = color;
  this.cohStrength = cohStrength;
  this.sepStrength = sepStrength;
  this.sepDist = sepDist;
}

Flock.prototype.cohesion(){
  for(var i = 0;i<this.boids.length;i++){
    for(var k = 0;k<this.boids.length;k++){
      if(i==k) continue;
      this.boids[i].attract(this.boids[k],this.cohStrength);
    }
  }
}

Flock.prototype.seperation(){

}

Flock.prototype.align(){

}
