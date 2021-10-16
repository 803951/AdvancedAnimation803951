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
  this.particles = [];
}

ParticleEmitter.prototype.update = function(){
  this.generateNewParticles();
  this.updateParticles();
}

ParticleEmitter.prototype.generateNewParticles = function(){

  //for(var i = this.particles.length;i<this.spawnRate;i++){
  if(this.particles.length<this.spawnRate){
    var newParticle = this.generateNewParticle();

    this.particles.push(newParticle);
  }
}

ParticleEmitter.prototype.generateNewParticle=function(){

  let size = Math.random()*(this.maxSize-this.minSize)+this.minSize;
  let dir = Math.random()*2*Math.PI;
  let speed = Math.random()*(this.maxSpeed-this.minSpeed)+this.minSpeed;
  let vel = new JSVector(speed*Math.cos(dir),speed*Math.sin(dir));

  if(this.particleType == particleTypes.CIRCLE){
    return new CircleParticle(new JSVector(this.pos.x,this.pos.y),vel,size/2,this.lifeTime,this.scaleR,this.scaleG,this.scaleB,this.isMonochrome);
  }
  else if(this.particleType == particleTypes.SQUARE){
    return new SquareParticle(new JSVector(this.pos.x,this.pos.y),vel,size,this.lifeTime,this.scaleR,this.scaleG,this.scaleB,this.isMonochrome);
  }
  else if(this.particleType == particleTypes.TRIANGLE){
    return new TriangleParticle(new JSVector(this.pos.x,this.pos.y),vel,size,this.lifeTime,this.scaleR,this.scaleG,this.scaleB,this.isMonochrome);
  }
}

ParticleEmitter.prototype.updateParticles = function(){
  for(var i = 0;i<this.particles.length;i++){
    let isAlive = this.particles[i].update();
    this.particles[i].draw();
    if(!isAlive){//checks if past life time
      let particle = this.particles[i];
      particle.pos = new JSVector(this.pos.x,this.pos.y);
      particle.currentLife = particle.lifeTime;
      //this.particles.splice(i,1);
      //i--;
    }
  }
}
