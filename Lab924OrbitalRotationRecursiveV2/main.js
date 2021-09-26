window.addEventListener("load", init);

var cnv,ctx,planets,background;

function init(){

  planets = [];

  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");

  let totalPlanetsR = 1;
  let totalPlanetsG = 1;
  let totalPlanetsB = 1;
  let minR = 40;
  let maxR = 60;
  let orbits = 3;
  for(var i = 0;i<totalPlanetsR;i++){
    var planet = Planet.generateRandomPlanet(minR,maxR,4,6,orbits,255,1,1);
    planets.push(planet);
  }
  for(var i = 0;i<totalPlanetsG;i++){
    var planet = Planet.generateRandomPlanet(minR,maxR,4,6,orbits,1,255,1);
    planets.push(planet);
  }
  for(var i = 0;i<totalPlanetsB;i++){
    var planet = Planet.generateRandomPlanet(minR,maxR,4,6,orbits,1,1,255);
    planets.push(planet);
  }

  background = new Color(0,0,0,0.06);
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,cnv.width,cnv.height);

  animate();
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
