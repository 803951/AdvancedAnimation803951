window.addEventListener("load", init);

var cnv,ctx,planets,background;

function init(){

  planets = [];

  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");

  let totalPlanetsR = 1;
  let totalPlanetsG = 1;
  let totalPlanetsB = 1;

  generateCustomPlanets(3,totalPlanetsR,255,1,1);
  generateCustomPlanets(3,totalPlanetsG,1,255,1);
  generateCustomPlanets(3,totalPlanetsB,1,1,255);

  background = new Color(0,0,0,0.06);
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,cnv.width,cnv.height);

  animate();
}

function generateCustomPlanets(orbits,n,scaleR,scaleG,scaleB){
  let minR = 30;
  let maxR = 50;
  let minOrbits = 4;
  let maxOrbits = 6;
  for(var i = 0;i<n;i++){
    var planet = Planet.generateRandomPlanet(minR,maxR,minOrbits,maxOrbits,orbits,scaleR,scaleG,scaleB);
    planets.push(planet);
  }
}

function animate(){
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
