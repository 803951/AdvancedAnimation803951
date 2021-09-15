function Molecule(pos,vel,acc,radius,color){
  this.pos = pos;
  this.vel = vel;
  this.acc = acc;
  this.radius = radius;
  this.color = color;
  this.cnv = document.getElementById("cnv");
  this.ctx = cnv.getContext("2d");
}
