
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
function image(sz, fi){
  return new Array(sz).fill(0).map(() => new Array(sz).fill(fi));
}  
function rotate(matrix, r, c) {
    const radians = r * Math.PI / 180;
    const cosAngle = Math.cos(radians);
    const sinAngle = Math.sin(radians);
    const n = matrix.length;
    const rotatedMatrix = image(n, c);

    const centerX = (n - 1) / 2;
    const centerY = (n - 1) / 2;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const x = i - centerX;
            const y = j - centerY;
            const newX = Math.round(x * cosAngle - y * sinAngle + centerX);
            const newY = Math.round(x * sinAngle + y * cosAngle + centerY);
            if (newX >= 0 && newX < n && newY >= 0 && newY < n) {
                rotatedMatrix[newX][newY] = matrix[i][j];
            }
        }
    }
    return rotatedMatrix;
}
var inter = null;
document.getElementById("userForm").addEventListener("submit", function(event){
  event.preventDefault();
  let userData = document.getElementById("userData").value;
  console.log(userData);
  let rand = Math.seedrandom(userData);
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
let t = 0;
const c1 = uf()*360
const c2 = limit(c1/360 + unif(0.1, 0.5))*360
console.log(c1, c2)
let stars = image(scene, false);
for (let x = 0; x < scene; x++) {
  for (let y = 0; y < scene; y++){
    stars[x][y] = uf() < 0.01;
  } 
}   
let pla = image(size, null);
const rl = rint(2,7);
for (let x = 0; x < size; x++) {
    t = x/rl
    for (let y = 0; y < size; y++) {
      const s = unif(0.8,1);
      const v = unif(0.8,1);
      const prob = (sin(t)+1)/2;
      let c = c1;
      if (uf() < prob){
        c = c2;
      } 
      pla[x][y] = hsv(c, s, v);
      t += 0.5;
    }
}
const rzero = rgb(0,0,0);
let rot = 0;
function create(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let temp = stars[0];
  stars.splice(0, 1);
  stars.push(temp);
  const rpla = rotate(pla, rot, hsv(c2, 0.9,0.9));
  rot += 2;
  for (let x = 0; x < scene; x++){
    for (let y = 0; y < scene; y++){
      var color = rzero;
      const rmin = scene/2-size/2;
      const rmax = scene/2+size/2;
      if (pow(x-scene/2,2)+pow(y-scene/2,2) < size*size/4 && rpla[x-rmin][y-rmin] != null){
        color = rpla[x-rmin][y-rmin];
      }
      else if (stars[x][y] == true){
        color = rgb(255, 255, 255);
      }
      ctx.fillStyle = color;
      ctx.fillRect(x*rsize, y*rsize, rsize, rsize);
    }
  }
}
if (inter != null)
  clearInterval(inter);
inter = setInterval(create, 100);
}); 