window.addEventListener("load", init);
//I like cheese!
var world,controls;

const particleTypes = {
  SQUARE: "square",
  CIRCLE: "circle",
  TRIANGLE: "triangle"
}

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
  if(event.code==="ArrowUp"){
    controls.zoomIn = true;
    controls.zoomOut = false;
  }
  else if(event.code==="ArrowDown"){
    controls.zoomOut = true;
    controls.zoomIn = false;
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
  if(event.code==="ArrowUp"){
    controls.zoomIn = false;
  }
  else if(event.code==="ArrowDown"){
    controls.zoomOut = false;
  }
});
function init(){
  controls = {left:false,right:false,up:false,down:false,zoomIn:false,zoomOut:false};
  world = new World(2000,2000);
  animate();
}

function animate(){
    world.update();
    requestAnimationFrame(animate);
}
