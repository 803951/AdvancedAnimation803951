window.addEventListener("load", init);

var cnv, ctx, repeller, attractor, molecules;

function init(){
  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");
  molecules = [];

  ctx.fillStyle = "black";
  ctx.fillRect(0,0,cnv.width,cnv.height);

  repeller = generateRandomMolecule(new Color(255,0,0,1),15);
  attractor = generateRandomMolecule(new Color(0,0,255,1),15);

  for(var i = 0;i<100;i++){
    molecules.push(generateRandomMolecule(new Color(0,255,0,1),13));
  }

  animate();
}
function animate(){
  update();
  requestAnimationFrame(animate);
}
function update(){
  let background = "rgb("+0+","+0+","+0+","+0.1+")";
  ctx.fillStyle = background;
  ctx.fillRect(0,0,cnv.width,cnv.height);

  repeller.update();
  attractor.update();

  for(var i = 0;i<molecules.length;i++){
    molecules[i].interact(attractor,true);
    molecules[i].interact(repeller,false);
    molecules[i].update();
  }
}
function generateRandomMolecule(color,radius){
  let x = Math.random()*(cnv.width-2*radius)+radius;
  let y = Math.random()*(cnv.height-2*radius)+radius;
  let pos = new JSVector(x,y);
  let speed = 2.5;
  let direction = Math.random()*2*Math.PI;
  let vel = new JSVector(speed*Math.cos(direction),speed*Math.sin(direction));
  let acc = new JSVector(0,0);
  let molecule = new Molecule(pos,vel,acc,radius,color);
  return molecule;
}
