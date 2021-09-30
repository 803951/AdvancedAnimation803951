window.addEventListener("load",init);

var cnv,ctx,species,matingProb,matingRad;

function init(){

  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");

  species = [];

  let mice = 10; //id = 0
  matingProb = 0.001;//sets probability of being in heat to 0.1%
  matingRad = 300; //radius where species is attracted to other in heat species

  for(var i = 0;i<mice;i++){ //initializes mice
    let radius = Math.random()*5+17.5;
    let x = Math.random()*(cnv.width-2*radius)+radius;
    let y = Math.random()*(cnv.height-2*radius)+radius;
    let pos = new JSVector(x,y); //sets position to random position on the canvas
    let mouse = new Mouse(pos,radius,1,0,matingProb,matingRad,10000); //calls mouse constructor
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
    species[i].update(); //runs creature update method for movement
    species[i].draw();
    for(var k = 0;k<species.length;k++){
      if(i==k) continue;
      let dist = species[i].pos.distance(species[k].pos);
      if(dist<=species[i].matingRad&&species[i].inHeat&&species[k].inHeat&&species[i].sex!=species[k].sex){ //checks if species within mating distance of eachother and if both in heat
        species[i].attract(species[k]);
        if(dist<=species[i].radius+species[k].radius){ //mates if touching
          species[i].inHeat = false; //no longer in heat after mating
          species[k].inHeat = false;
          let pos = JSVector.addGetNew(species[i].pos,species[k].pos); //new mouse goes to position interpolation
          pos.divide(2);
          let newMouse = new Mouse(pos,Math.random()*5+17.5,1,0,matingProb,matingRad,10000);
          species.push(newMouse); //adds mouse to list of species
          break;
        }
      }
    }
  }
}
