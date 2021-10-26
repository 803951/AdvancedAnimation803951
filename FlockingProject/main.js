window.addEventListener("load",init);

var cnv,ctx,flocks; //define global variables for context, canvas, and snakes array

function init(){
  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");
  cnv.width = window.innerWidth;
  cnv.height = window.innerHeight;
  flocks = [];


  let n = 3;
  let cohStrength = 0.08;
  let sepStrength = 0.1;
  let alignRange = 200;
  let sepDist = 20;
  let numBoids = 100;
  let boidScale = 5;

  for(var i = 0;i<n;i++){
    let speed = Math.random()*1+2;
    let color = Color.generateRandomColor(1,0.5,0.5,false);
    let flock = new Flock(speed,color,cohStrength,sepStrength,alignRange,sepDist,numBoids,boidScale)
    flocks.push(flock);
  }

  animate();
}

function animate(){
  //ctx.clearRect(0,0,cnv.width,cnv.height); //clears canvas every frame
  let clr = new Color(150,150,255,1);
  ctx.fillStyle = clr.toString();
  ctx.fillRect(0,0,cnv.width,cnv.height);
  update(); //calls update method

  requestAnimationFrame(animate); //new animation from by calling animation function again
}

function update(){
  for(var i = 0;i<flocks.length;i++){
    flocks[i].cohesion();
    flocks[i].seperation();
    flocks[i].align();
    flocks[i].display();
  }
}
