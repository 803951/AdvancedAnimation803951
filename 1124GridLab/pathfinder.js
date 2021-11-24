function PathFinder(grid){
  this.start = null;
  this.end = null;
  this.current = null;
  this.grid = grid;
  this.frontier = [];
  this.reached = [];
}

PathFinder.prototype.calculateNewPath = function(){
  if(this.start==null||this.end==null) return;

  this.resetGrid();
  this.breadthFirstSearch(this.start);
  let path = this.buildPath();

  for(var i = 1;i<path.length-1;i++){
    path[i].isPath = true;
  }
}

PathFinder.prototype.breadthFirstSearch = function(cell){
  this.frontier = [];
  this.reached = [];
  this.start.isSelected = false;
  this.end.isSelected = false;

  let isRunning = true;
  this.frontier.push(cell);
  this.reached.push(cell);

  while(this.frontier.length > 0 && isRunning){
    this.current = this.frontier[0];
    this.frontier.splice(0,1);
    this.current.isExplored = true;
    this.exploreNeighbors();
    if(this.current.pos == this.end.pos){
      isRunning = false;
    }
  }
}

PathFinder.prototype.exploreNeighbors = function(){
  let neighbors = this.current.neighbors;
  let neighborArr = [
    neighbors.n,
    neighbors.ne,
    neighbors.nw,
    neighbors.s,
    neighbors.se,
    neighbors.sw,
    neighbors.e,
    neighbors.w,
  ];

  for(var i = 0;i<neighborArr.length;i++){
    let neighbor = neighborArr[i];
    if(neighbor==null) continue;
    if(this.reached.indexOf(neighbor)<0&&!neighbor.isSelected){
      neighbor.connectedTo = this.current;
      this.reached.push(neighbor);
      this.frontier.push(neighbor);
    }
  }
}

PathFinder.prototype.buildPath = function(){
  let path = [];
  let currentNode = this.end;

  currentNode.isPath = true;
  let counter = 0;
  while(currentNode.connectedTo != null){
    currentNode = currentNode.connectedTo;
    path.push(currentNode);
    currentNode.isPath = true;
  }

  path.reverse();
  return path;
}

PathFinder.prototype.resetGrid = function(){
  for(var i = 0;i<this.grid.length;i++){
    this.grid[i].isExplored = false;
    this.grid[i].isPath = false;
  }
}
