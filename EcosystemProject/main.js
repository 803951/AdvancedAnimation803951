window.addEventListener("load",init);

var cnv,ctx,species,matingProb,matingRad;

function init(){

  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");

  species = [];

  let mice = 10; //id = 0
  let snakes = 0; //id = 1;
  matingProb = 0.001;
  matingRad = 300;

  for(var i = 0;i<mice;i++){
    let radius = Math.random()*5+17.5;
    let x = Math.random()*(cnv.width-2*radius)+radius;
    let y = Math.random()*(cnv.height-2*radius)+radius;
    let pos = new JSVector(x,y);
    let mouse = new Mouse(pos,radius,1,0,matingProb,matingRad);
    species.push(mouse);
  }

  animate();
}

function animate(){
  ctx.clearRect(0,0,cnv.width,cnv.height);
  update();

  requestAnimationFrame(animate);
}

function update(){
  for (var i = 0;i<species.length;i++){
    species[i].update();
    species[i].draw();
    for(var k = 0;k<species.length;k++){
      if(i==k) continue;
      let dist = species[i].pos.distance(species[k].pos);
      if(dist<=species[i].matingRad&&species[i].inHeat&&species[k].inHeat&&species[i].sex!=species[k].sex){
        species[i].attract(species[k]);
        if(dist<=species[i].radius+species[k].radius){
          species[i].inHeat = false;
          species[k].inHeat = false;
          let pos = JSVector.addGetNew(species[i].pos,species[k].pos);
          pos.divide(2);
          let newMouse = new Mouse(pos,Math.random()*5+17.5,1,0,matingProb,matingRad);
          species.unshift(newMouse);
          break;
        }
      }
    }
  }
}
