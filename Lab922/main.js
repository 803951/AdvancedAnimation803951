window.addEventListener("load", init);

var cnv,ctx;
var ship,planet;

function init(){

  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");
  let radius = 25;
  let x = Math.random()*(cnv.width-2*radius)+radius;
  let y = Math.random()*(cnv.height-2*radius)+radius;
  let speed = 2;
  let dir = Math.random()*Math.PI*2;
  let dx = Math.cos(dir)*speed;
  let dy = Math.sin(dir)*speed;
  let color = new Color(50,150,50,1);
  ship = new Ship(x,y,dx,dy,10,color);

  x = cnv.width - x;
  y = cnv.height - y;

  color = new Color(150,50,150,1);
  planet = new Planet(x,y,radius,color);

  animate();
}

function update(){
  ctx.clearRect(0,0,cnv.width,cnv.height);

  let respawn = ship.attract(planet);
  if(respawn){
    planet.pos = new JSVector(Math.random()*cnv.width,Math.random()*cnv.height);
  }
  planet.draw();
  ship.update();
}

function animate(){

  update();

  requestAnimationFrame(animate);
}
