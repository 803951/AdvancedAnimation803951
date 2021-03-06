window.addEventListener("load", init);

var world,controls;
var fps,lastCalledTime;

window.addEventListener("keydown", function(event){
  if(event.code==="KeyW"){
    controls.up = true;
    controls.down = false;
  }
  else if(event.code==="KeyS"){
    controls.down = true;
    controls.up = false;
  }
  if(event.code==="KeyA"){
    controls.left = true;
    controls.right = false;
  }
  else if(event.code==="KeyD"){
    controls.right = true;
    controls.left = false;
  }
  if(event.code==="KeyP"){
    controls.performance = !controls.performance;
  }
});
window.addEventListener("keyup", function(event){
  if(event.code==="KeyW"){
    controls.up = false;
  }
  else if(event.code==="KeyS"){
    controls.down = false;
  }
  if(event.code==="KeyA"){
    controls.left = false;
  }
  else if(event.code==="KeyD"){
    controls.right = false;
  }
});
function init(){
  controls = {left:false,right:false,up:false,down:false,performance:true};
  world = new World(5000,5000,50);
  animate();
}

function updateFPS(){
  if(!lastCalledTime) {
    lastCalledTime = performance.now();
    fps = 0;
    return;
  }
  delta = (performance.now() - lastCalledTime)/1000;
  lastCalledTime = performance.now();
  fps = 1/delta;
}

function animate(){
    world.update();
    updateFPS();
    requestAnimationFrame(animate);
}
