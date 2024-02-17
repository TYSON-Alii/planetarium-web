
// Canvas elementini ve 2D bağlamını al
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

function rgb(r, g, b){
  return "rgb("+r+","+g+","+b+")";
}
function hsv(h, s, v){
  const c = chroma.hsv(h, s, v).rgb();
  return rgb(c[0], c[1], c[2]);
}
function limit(x){
  if (x < 0) return x + 1;
  else if (x > 1) return x - 1;
  return x;
}
document.getElementById("userForm").addEventListener("submit", function(event){
  event.preventDefault();
  var userData = document.getElementById("userData").value;
  console.log(userData);
  var rand = Math.seedrandom(userData);
const uf = Math.random
function rint(min, max) {
  return floor(uf() * (max - min + 1)) + min;
}
function unif(min, max){
  return min + (max - min) * uf();
}
const floor = Math.floor
const sin = Math.sin
const sqrt = Math.sqrt
const pow = Math.pow
const rsize = 5
const scene = 96
const size = 32
var t = 0;
const c1 = uf()*360
const c2 = limit(c1/360 + unif(0.1, 0.5))*360
console.log(c1, c2)
for (var x = 0; x < scene; x++) {
  for (var y = 0; y < scene; y++){
    const c = uf()*360;
    var s = 0;
    var v = 0;
    if (uf() < 0.01){
      s = unif(0.05,0.1);
      v = 1;
    }
    const color = hsv(c, s, v);
    ctx.fillStyle = color;
    ctx.fillRect(x*rsize, y*rsize, rsize, rsize);
  } 
} 
for (var x = 0; x < scene; x++) {
  t = x/7
  for (var y = 0; y < scene; y++) {
    if (pow(x-scene/2,2)+pow(y-scene/2,2) < size*size/4+1) {
      const prob = (sin(t)+1)/2;
      var s = unif(0.8,1);
      var v = unif(0.8,1);
      var c = c1;
      if (uf() < prob){
        c = c2;
      }  
      var color = hsv(c,s,v);
      ctx.fillStyle = color;
      ctx.fillRect(x*rsize, y*rsize, rsize, rsize);
    }
    t += 0.5;
  }
}
}); 