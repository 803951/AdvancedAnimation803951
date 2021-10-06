window.addEventListener("load",init);

var cnv,ctx,species,matingProb,matingRad,currentFrame,matingTime,lastPopCheck,minX,minY,boundX,boundY;

function resetCanvas(){
  cnv.width = window.innerWidth*0.9;
  cnv.height = window.innerHeight*0.9;
}

function init(){

  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");
  resetCanvas();
  species = [];

  let mice = 10; //id = 0
  let viruses = 5; //id = 1
  matingProb = 0.002;//sets probability of being in heat to 0.1%
  matingRad = 300; //radius where species is attracted to other in heat species
  currentFrame = 0;
  matingTime = 300;
  boundX = cnv.width;
  boundY = cnv.height;
  minX = cnv.width-boundX;
  minY = cnv.height-boundY;

  for(var i = 0;i<mice;i++){ //initializes mice
    let radius = 20;
    let x = Math.random()*(boundX-2*radius)+radius;
    let y = Math.random()*(boundY-2*radius)+radius;
    let pos = new JSVector(x,y); //sets position to random position on the canvas
    let mouse = new Mouse(pos,radius,1,0,matingProb,matingRad,matingTime); //calls mouse constructor
    species.push(mouse);
  }

  for(var i = 0;i<viruses;i++){
    let radius = 10;
    let x = Math.random()*(boundX-2*radius)+radius;
    let y = Math.random()*(boundY-2*radius)+radius;
    let pos = new JSVector(x,y);
    let virus = new Virus(pos,radius,2,1);
    species.push(virus);
  }

  lastPopCheck = species.length;
  animate();
}

function animate(){
  resetCanvas();
  ctx.clearRect(0,0,cnv.width,cnv.height);
  update();

  requestAnimationFrame(animate);
}

function update(){
  for (var i = 0;i<species.length;i++){
    if(!species[i].living){
      species.splice(i,1);
      i--
      console.log(species.length);
      continue;
    }
    species[i].update(); //runs creature update method for movement
    species[i].draw();
    for(var k = 0;k<species.length;k++){
      if(i==k) continue;
      let dist = species[i].pos.distance(species[k].pos);
      //mating
      if(species[i].id == species[k].id){
        if(dist<=species[i].matingRad&&species[i].inHeat&&species[k].inHeat&&species[i].sex!=species[k].sex){ //checks if species within mating distance of eachother and if both in heat
          species[i].attract(species[k]);
          if(dist<=species[i].radius+species[k].radius){ //mates if touching
            species[i].inHeat = false; //no longer in heat after mating
            species[k].inHeat = false;
            let pos = JSVector.addGetNew(species[i].pos,species[k].pos); //new mouse goes to position interpolation
            pos.divide(2);
            let newMouse = new Mouse(pos,Math.random()*5+17.5,1,0,matingProb,matingRad,matingTime);
            species.push(newMouse); //adds mouse to list of species
            break;
          }
        }
      }
      //eating
      else{
        for(var w = 0;w<species[i].prey.length;w++){
          if(species[i].prey[w]==species[k].id){
            if(dist<=species[i].matingRad){ //checks if species within mating distance of eachother and if both in heat
              species[i].attract(species[k]);
              if(dist<=species[i].radius+species[k].radius){ //mates if touching
                species[i].consume(species[k]);
                species.splice(k,1);
                k--;
              }
            }
          }
        }
      }
    }
  }
  currentFrame++;
  if(currentFrame>matingTime){
    currentFrame = 0;
    console.log(species.length/lastPopCheck);
    lastPopCheck = species.length;
  }
}
