window.addEventListener("load", init);

var world;

function init(){
  world = new World(2000,2000);
  animate();
}

function animate(){
    world.update();
    requestAnimationFrame(animate);
}
