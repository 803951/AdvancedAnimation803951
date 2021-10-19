window.addEventListener("load",init);
document.addEventListener("click", generateParticleSystem);

var cnv,ctx,emitters,currentEmitterType;
var particleRateSlider,rateOutput,squareRadioButton,circleRadioButton,triangleRadioButton;

const particleTypes = {
  SQUARE: "square",
  CIRCLE: "circle",
  TRIANGLE: "triangle"
}

function init(){
  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");
  emitters = [];
  particleRateSlider = document.getElementById("particleRateSlider");
  rateOutput = document.getElementById("rate");
  squareRadioButton = document.getElementById("square");
  circleRadioButton = document.getElementById("circle");
  triangleRadioButton = document.getElementById("triangle");
  squareRadioButton.checked = true;
  currentEmitterType = particleTypes.SQUARE;

  ctx.fillStyle = "black";
  ctx.fillRect(0,0,cnv.width,cnv.height);
  animate();
}

function generateParticleSystem(event){
  if(event.clientX-cnv.width*3/4>cnv.width||event.clientX-cnv.width*3/4<0) return;
  if(event.clientY>cnv.height||event.clientY<0) return;
  let pos = new JSVector(event.clientX-cnv.width*3/4,event.clientY);
  let minSpeed = 2;
  let maxSpeed = 4;
  let lifeTime = 80;
  let minSize = 10;
  let maxSize = 25;
  let rScale = 1.2;
  let gScale = 1.2;
  let bScale = 255;
  let spawnRate = 1;
  let emitter = new ParticleEmitter(currentEmitterType,pos,minSpeed,maxSpeed,lifeTime,minSize,maxSize,rScale,gScale,bScale,false,spawnRate);
  emitters.push(emitter);
}

function animate(){
  //ctx.clearRect(0,0,cnv.width,cnv.height);
  let background = new Color(0,0,0,0.05);
  ctx.fillStyle=background.toString();
  ctx.fillRect(0,0,cnv.width,cnv.height);
  update();

  requestAnimationFrame(animate);
}

function update(){

  rateOutput.innerHTML = particleRateSlider.value;
  if(circleRadioButton.checked){
    currentEmitterType = particleTypes.CIRCLE;
  }
  else if(squareRadioButton.checked){
    currentEmitterType = particleTypes.SQUARE;
  }
  else if(triangleRadioButton.checked){
    currentEmitterType = particleTypes.TRIANGLE;
  }
  for(var i = 0;i<emitters.length;i++){
    emitters[i].spawnRate = particleRateSlider.value/30;
    emitters[i].update();
  }

}
