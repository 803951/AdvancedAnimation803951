function ParticleEmitter(particleType,pos,minSpeed,maxSpeed,lifeTime,minSize,maxSize,rScale,gScale,bScale,spawnRate){
  //rate is particles per frame
  this.particleType = particleType;
  this.pos = pos;
  this.minSpeed = minSpeed;
  this.maxSpeed = maxSpeed;
  this.lifeTime = lifeTime;
  this.minSize = minSize;
  this.maxSize = maxSize;
  this.rScale = rScale;
  this.gScale = gScale;
  this.bScale = bScale;
  this.spawnRate = spawnRate;
  this.spawnCache = 0;
  this.particles = [];
}

ParticleEmitter.prototype.update = function(){
  this.generateNewParticles();
  this.updateParticles();
}

ParticleEmitter.prototype.generateNewParticles = function(){
  this.spawnCache += this.spawnRate;

  let n = this.spawnCache;
  for(var i = 0;i<n;i++){

    let dir = Math.random()*2*Math.PI;
    let speed = Math.random()*(this.maxSpeed-this.minSpeed)+this.minSpeed;
    let vel = new JSVector(speed*Math.cos(dir),speed*Math.sin(dir));

    var newParticle;

    switch(particleType){
      case particleTypes.CIRCLE:
      //generate square particles
      case particleTypes.SQUARE:
      //generate square particles
    }

    this.particles.push(newParticle);

    this.spawnCache -= 1;
  }
}

ParticleEmitter.prototype.updateParticles = function(){
  for(var i = 0;i<this.particles.length;i++){
    if(this.particles[i].update()){//checks if past life time
      this.particles.splice(i,1);
      i--;
    }
  }
}
