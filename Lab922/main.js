window.addEventListener("load", init);

var cnv,ctx;
var ship,planet,background;

function init(){

  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");
  let radius = 25;
  let x = Math.random()*(cnv.width-2*radius)+radius;
  let y = Math.random()*(cnv.height-2*radius)+radius;
  let speed = 4;
  let dir = Math.random()*Math.PI*2;
  let dx = Math.cos(dir)*speed;
  let dy = Math.sin(dir)*speed;
  let color = new Color(50,150,50,1);
  ship = new Ship(x,y,dx,dy,10,color,cnv,ctx);

  x = cnv.width - x;
  y = cnv.height - y;

  color = new Color(150,50,150,1);
  planet = new Planet(x,y,radius,color,cnv,ctx);

  background = new Color(0,0,0,0.1);
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,cnv.width,cnv.height);

  animate();
}

function update(){
  ctx.fillStyle = background.toString();
  ctx.fillRect(0,0,cnv.width,cnv.height);

  ship.interact(planet,-ship.vel.getMagnitude()/30,true);

  let r = planet.radius;

  let distance = ship.pos.distance(planet.pos);
  if(distance <= cnv.width/8){
    planet.pos = new JSVector(Math.random()*(cnv.width-2*r)+r,Math.random()*(cnv.height-2*r)+r);
    planet.vel = new JSVector(0,0);
  }
  else if(distance <= cnv.width/4){
    planet.interact(ship,0.175,false);
  }

  planet.update();
  ship.update();

  planet.draw();
  ship.draw();
}

function animate(){

  update();

  requestAnimationFrame(animate);
}
