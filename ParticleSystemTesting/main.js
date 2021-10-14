window.addEventListener("load",init);

var cnv,ctx,emitter;
var particleRateSlider,rateOutput,squareRadioButton,circleRadioButton,triangleRadioButton;

const particleTypes = {
  SQUARE: "square",
  CIRCLE: "circle",
  TRIANGLE: "triangle"
}

function init(){
  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");
  particleRateSlider = document.getElementById("particleRateSlider");
  rateOutput = document.getElementById("rate");
  squareRadioButton = document.getElementById("square");
  circleRadioButton = document.getElementById("circle");
  triangleRadioButton = document.getElementById("triangle");
  squareRadioButton.checked = true;
  let pos = new JSVector(cnv.width/2,cnv.height/2);
  let minSpeed = 2;
  let maxSpeed = 4;
  let lifeTime = 150;
  let minSize = 10;
  let maxSize = 25;
  let rScale = 1.2;
  let gScale = 1.2;
  let bScale = 255;
  let spawnRate = 1;
  emitter = new ParticleEmitter(particleTypes.SQUARE,pos,minSpeed,maxSpeed,lifeTime,minSize,maxSize,rScale,gScale,bScale,false,spawnRate);

  animate();
}

function animate(){
  //ctx.clearRect(0,0,cnv.width,cnv.height);
  ctx.fillStyle="black";
  ctx.fillRect(0,0,cnv.width,cnv.height);
  update();

  requestAnimationFrame(animate);
}

function update(){

  rateOutput.innerHTML = particleRateSlider.value;
  emitter.spawnRate = particleRateSlider.value/30;
  if(circleRadioButton.checked){
    emitter.particleType = particleTypes.CIRCLE;
  }
  else if(squareRadioButton.checked){
    emitter.particleType = particleTypes.SQUARE;
  }
  else if(triangleRadioButton.checked){
    emitter.particleType = particleTypes.TRIANGLE;
  }
  emitter.update();

}
