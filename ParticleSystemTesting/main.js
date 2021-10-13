window.addEventListener("load",init);

var cnv,ctx,emitters;
const particleTypes = {
  SQUARE: "square",
  CIRCLE: "circle"
}

function init(){
  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");

  emitters = [];

  let pos = new JSVector(cnv.width/2,cnv.height/2);
  let speed = 1;
  let lifeTime = 150;
  let minSize = 10;
  let maxSize = 25;
  let rScale = 1;
  let gScale = 1;
  let bScale = 1;
  let spawnRate = 10;
  let e = new Particle();
  let emitter = new ParticleEmitter(particleTypes.CIRCLE,pos,speed,lifeTime,minSize,maxSize,rScale,gScale,bScale);

  animate();
}

function animate(){
  ctx.clearRect(0,0,cnv.width,cnv.height);
  update();

  requestAnimationFrame(animate);
}

function update(){

  for(var i = 0;i<emitters.length;i++){
    emitters.update();
  }

}
