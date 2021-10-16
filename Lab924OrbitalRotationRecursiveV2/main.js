window.addEventListener("load", init);

var cnv,ctx,planets,background,downloadLink;

const particleTypes = {
  SQUARE: "square",
  CIRCLE: "circle",
  TRIANGLE: "triangle"
}

function init(){

  planets = [];
  //background = new Color(0,0,0,0.06);
  background = new Color(0,0,0,1);
  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");
  downloadLink = document.createElement('a');

  resetCanvas();

  let totalPlanetsR = 1;
  let totalPlanetsG = 1;
  let totalPlanetsB = 1;

  generateCustomPlanets(2,totalPlanetsR,255,1,1);
  generateCustomPlanets(2,totalPlanetsG,1,255,1);
  generateCustomPlanets(2,totalPlanetsB,1,1,255);

  animate();
}

function generateCustomPlanets(orbits,n,scaleR,scaleG,scaleB){
  let minR = 50;
  let maxR = 75;
  let minOrbits = 5;
  let maxOrbits = 7;
  for(var i = 0;i<n;i++){
    var planet = Planet.generateRandomPlanet(minR,maxR,minOrbits,maxOrbits,orbits,scaleR,scaleG,scaleB);
    planets.push(planet);
  }
}
function resetCanvas(){
  cnv.width = window.innerWidth;
  cnv.height = window.innerHeight;
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,cnv.width,cnv.height);
}
function animate(){
  if(window.innerWidth!=cnv.width||window.innerHeight!=cnv.height){
    resetCanvas();
  }
  ctx.fillStyle = background.toString();
  ctx.fillRect(0,0,cnv.width,cnv.height);
  update();

  requestAnimationFrame(animate);
}

function downloadCanvasAsImage(){

    downloadLink.setAttribute('download', 'img_'+Date.now()+'.png');
    let dataURL = cnv.toDataURL('image/png');
    let url = dataURL.replace(/^data:image\/png/,'data:application/octet-stream');
    downloadLink.setAttribute('href', url);
    downloadLink.click();
}

function update(){
  for(var i = 0;i<planets.length;i++){
    planets[i].update();
  }
}
