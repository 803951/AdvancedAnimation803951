window.addEventListener("load", init);

var cnv, ctx, repeller, attractor, molecules;

function init(){
  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");
  molecules = [];

  ctx.fillStyle = "black";
  ctx.fillRect(0,0,cnv.width,cnv.height);

  repeller = generateRandomMolecule(new Color(255,0,0,1),25,2);
  attractor = generateRandomMolecule(new Color(0,0,255,1),25,1.5);

  for(var i = 0;i<50;i++){
    molecules.push(generateRandomMolecule(new Color(100,170,50,1),20,Math.random()*0.5+1));
  }

  animate();
}
function animate(){
  update();
  requestAnimationFrame(animate);
}
function update(){

  let background = "rgb("+0+","+0+","+0+","+0.05+")";
  ctx.fillStyle = background;
  ctx.fillRect(0,0,cnv.width,cnv.height);
  //ctx.clearRect(0,0,cnv.width,cnv.height);
  repeller.update();
  attractor.update();

  for(var i = 0;i<molecules.length;i++){
    molecules[i].interact(attractor,true,0.5);
    molecules[i].interact(repeller,false,0.5);

    for(var k = 0;k<molecules.length;k++){
      if (i == k) continue;
      if(molecules[i].pos.distance(molecules[k].pos)>2*molecules[i].radius+2*molecules[k].radius) continue;
      //molecules[i].interact(molecules[k],false,0.25);
    }

    molecules[i].update();
  }

  attractor.interact(repeller,false,0.01);
  repeller.interact(attractor,false,0.01);
}
function generateRandomMolecule(color,radius,speed){
  let x = Math.random()*(cnv.width-2*radius)+radius;
  let y = Math.random()*(cnv.height-2*radius)+radius;
  let pos = new JSVector(x,y);
  let direction = Math.random()*2*Math.PI;
  let vel = new JSVector(speed*Math.cos(direction),speed*Math.sin(direction));
  let acc = new JSVector(0,0);
  let alpha = 0;
  let molecule = new Molecule(pos,vel,acc,radius,color,alpha,1,10);
  return molecule;
}
