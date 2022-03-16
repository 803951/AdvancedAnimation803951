function Wall(ctx,x,y,angle,length,clr){
  this.ctx = ctx;
  this.pos = new JSVector(x,y);
  this.angle = angle;
  this.length = length;
  this.clr = clr;
}
Wall.prototype.displayLine = function(){ //displays wall as a line
  this.ctx.beginPath();
  this.ctx.moveTo(this.pos.x,this.pos.y);
  this.ctx.lineTo(this.pos.x+this.length*Math.cos(this.angle), this.pos.y+this.length*Math.sin(this.angle));
  this.ctx.lineWidth = this.width;
  this.ctx.strokeStyle = this.clr.toString();
  this.ctx.stroke();
}
Wall.prototype.getDist = function(pos){
  let dist = pos.x*Math.tan(this.angle)-pos.y+this.pos.y-this.pos.x*Math.tan(this.angle);
  dist*= Math.abs(Math.cos(this.angle));
  // https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line

  return dist;
}
Wall.prototype.isColliding = function(other){
  let x1_1 = this.pos.x;
  let y1_1 = this.pos.y;
  let x2_1 = this.pos.x+Math.cos(this.angle)*this.length;
  let y2_1 = this.pos.y+Math.sin(this.angle)*this.length;

  let p1 = new JSVector(x1_1,y1_1);
  let q1 = new JSVector(x2_1,y2_1);

  let x1_2 = other.pos.x;
  let y1_2 = other.pos.y;
  let x2_2 = other.pos.x+Math.cos(other.angle)*other.length;
  let y2_2 = other.pos.y+Math.sin(other.angle)*other.length;

  let p2 = new JSVector(x1_2,y1_2);
  let q2 = new JSVector(x2_2,y2_2);

  return Wall.doIntersect(p1,q1,p2,q2);
}


// Given three collinear points p, q, r, the function checks if
// point q lies on line segment 'pr'
Wall.onSegment=function(p, q, r)
{
    if (q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) &&
        q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y))
    return true;

    return false;
}

// To find orientation of ordered triplet (p, q, r).
// The function returns following values
// 0 --> p, q and r are collinear
// 1 --> Clockwise
// 2 --> Counterclockwise
Wall.orientation=function(p, q, r)
{

    // See https://www.geeksforgeeks.org/orientation-3-ordered-points/
    // for details of below formula.
    let val = (q.y - p.y) * (r.x - q.x) -
            (q.x - p.x) * (r.y - q.y);

    if (val == 0) return 0; // collinear

    return (val > 0)? 1: 2; // clock or counterclock wise
}

// The main function that returns true if line segment 'p1q1'
// and 'p2q2' intersect.
Wall.doIntersect=function(p1, q1, p2, q2)
{

    // Find the four orientations needed for general and
    // special cases
    let o1 = Wall.orientation(p1, q1, p2);
    let o2 = Wall.orientation(p1, q1, q2);
    let o3 = Wall.orientation(p2, q2, p1);
    let o4 = Wall.orientation(p2, q2, q1);

    // General case
    if (o1 != o2 && o3 != o4)
        return true;

    // Special Cases
    // p1, q1 and p2 are collinear and p2 lies on segment p1q1
    if (o1 == 0 && Wall.onSegment(p1, p2, q1)) return true;

    // p1, q1 and q2 are collinear and q2 lies on segment p1q1
    if (o2 == 0 && Wall.onSegment(p1, q2, q1)) return true;

    // p2, q2 and p1 are collinear and p1 lies on segment p2q2
    if (o3 == 0 && Wall.onSegment(p2, p1, q2)) return true;

    // p2, q2 and q1 are collinear and q1 lies on segment p2q2
    if (o4 == 0 && Wall.onSegment(p2, q1, q2)) return true;

    return false; // Doesn't fall in any of the above cases
}
