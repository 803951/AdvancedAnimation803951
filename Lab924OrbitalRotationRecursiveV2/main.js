window.addEventListener("load", init);

var cnv,ctx,planets,background;

function init(){

  planets = [];
  background = new Color(0,0,0,0.06);

  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");
  resetCanvas();

  let totalPlanetsR = 1;
  let totalPlanetsG = 1;
  let totalPlanetsB = 1;

  generateCustomPlanets(3,totalPlanetsR,255,1,1);
  generateCustomPlanets(3,totalPlanetsG,1,255,1);
  generateCustomPlanets(3,totalPlanetsB,1,1,255);

  animate();
}

function generateCustomPlanets(orbits,n,scaleR,scaleG,scaleB){
  let minR = 30;
  let maxR = 50;
  let minOrbits = 3;
  let maxOrbits = 5;
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

function update(){
  for(var i = 0;i<planets.length;i++){
    planets[i].update();
  }
}
