function ParticleEmitter(particleType,pos,minSpeed,maxSpeed,lifeTime,minSize,maxSize,scaleR,scaleG,scaleB,isMonochrome,spawnRate,angleSpray){
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
  this.angleSpray = angleSpray;
  this.spawnCache = 0;
  this.particles = [];
}

ParticleEmitter.prototype.update = function(){
  this.generateNewParticles();
  this.updateParticles();
}

ParticleEmitter.prototype.generateNewParticles = function(targetDir){
  this.spawnCache += this.spawnRate;

  let n = this.spawnCache;

  for(var i = 0;i<n;i++){

    let size = Math.random()*(this.maxSize-this.minSize)+this.minSize;
    let dir = targetDir+2*(Math.random()-0.5)*this.angleSpray;
    let speed = Math.random()*(this.maxSpeed-this.minSpeed)+this.minSpeed;
    let vel = new JSVector(speed*Math.cos(dir),speed*Math.sin(dir));
    var newParticle;

    if(this.particleType == particleTypes.CIRCLE){
      newParticle = new CircleParticle(new JSVector(this.pos.x,this.pos.y),vel,size/2,this.lifeTime,this.scaleR,this.scaleG,this.scaleB,this.isMonochrome);
    }
    else if(this.particleType == particleTypes.SQUARE){
      newParticle = new SquareParticle(new JSVector(this.pos.x,this.pos.y),vel,size,this.lifeTime,this.scaleR,this.scaleG,this.scaleB,this.isMonochrome);
    }
    else if(this.particleType == particleTypes.TRIANGLE){
      newParticle = new TriangleParticle(new JSVector(this.pos.x,this.pos.y),vel,size,this.lifeTime,this.scaleR,this.scaleG,this.scaleB,this.isMonochrome);
    }
    this.particles.push(newParticle);

    this.spawnCache--;
  }
}

ParticleEmitter.prototype.updateParticles = function(){
  for(var i = 0;i<this.particles.length;i++){
    let isAlive = this.particles[i].update();
    this.particles[i].draw();
    if(!isAlive){//checks if past life time
      this.particles.splice(i,1);
      i--;
    }
  }
}
