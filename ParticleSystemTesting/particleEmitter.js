function ParticleEmitter(particleType,pos,minSpeed,maxSpeed,lifeTime,minSize,maxSize,scaleR,scaleG,scaleB,isMonochrome,spawnRate){
  this.particleType = particleType;
  this.pos = pos;
  this.minSpeed = minSpeed;
  this.maxSpeed = maxSpeed;
  this.lifeTime = lifeTime;
  this.minSize = minSize;
  this.maxSize = maxSize;
  this.scaleR = scaleR;
  this.scaleG = scaleG;
  this.scaleB = scaleB;
  this.isMonochrome = isMonochrome;
  this.spawnRate = spawnRate; //rate is particles per frame
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

    let size = Math.random()*(this.maxSize-this.minSize)+this.minSize;
    let dir = Math.random()*2*Math.PI;
    let speed = Math.random()*(this.maxSpeed-this.minSpeed)+this.minSpeed;
    let vel = new JSVector(speed*Math.cos(dir),speed*Math.sin(dir));

    var newParticle;

    if(this.particleType == particleTypes.CIRCLE){
      newParticle = new CircleParticle(this.pos,vel,size,this.lifeTime,this.scaleR,this.scaleG,this.scaleB,this.isMonochrome);
    }
    else if(this.particleType == particleTypes.SQUARE){
      newParticle = new SquareParticle(this.pos,vel,size,this.lifeTime,this.scaleR,this.scaleG,this.scaleB,this.isMonochrome);
    }

    this.particles.push(newParticle);

    this.spawnCach--;
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
