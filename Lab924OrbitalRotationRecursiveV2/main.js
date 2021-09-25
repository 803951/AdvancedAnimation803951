window.addEventListener("load", init);

var cnv,ctx,planets,background;

function init(){

  planets = [];

  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");

  let totalPlanets = 1;
  for(var i = 0;i<totalPlanets;i++){
    let orbits = 3;
    planet = Planet.generateRandomPlanet(75,100,4,6,orbits);
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
