window.addEventListener("load",init);

var cnv,ctx,emitter;
const particleTypes = {
  SQUARE: "square",
  CIRCLE: "circle"
}

function init(){
  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");

  let pos = new JSVector(cnv.width/2,cnv.height/2);
  let minSpeed = 2;
  let maxSpeed = 4;
  let lifeTime = 150;
  let minSize = 10;
  let maxSize = 25;
  let rScale = 1;
  let gScale = 1;
  let bScale = 255;
  let spawnRate = 1;
  emitter = new ParticleEmitter(particleTypes.CIRCLE,pos,minSpeed,maxSpeed,lifeTime,minSize,maxSize,rScale,gScale,bScale,false,spawnRate);

  animate();
}

function animate(){
  ctx.clearRect(0,0,cnv.width,cnv.height);
  update();

  requestAnimationFrame(animate);
}

function update(){

  emitter.update();

}
