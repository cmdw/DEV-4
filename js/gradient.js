// Gradient Animation start
let $body = document.getElementsByClassName('gradient')[0];
let colors = [
  [ 37,  81, 186], //blue
  [  9, 199, 125], //green
  [223,  44,  60], //red
  [168,  17,  99], //purple
  [ 45, 175, 230]  //light blue
];
let colorLen = colors.length;
let step = 0;
let colorIndices = new Array(colorLen - 1).join().split(',').map((v, i) => i);
let gradientSpeed = 0.001; //transition speed

let getColor = (color1, color2) => {
  let r_step = 1 - step;
  let rgb = color1.map((v, i) => {
    return ~~(r_step * color1[i] + step * color2[i]);
  }).join();
  return `rgb(${rgb})`;
};

let upodateColorIdx = () => {
  colorIndices.forEach((v, i) => {
    if (i % 2) {
      colorIndices[i] = ~~(colorIndices[i - 1] + Math.random() * (colorLen - 1) + 1) % colorLen;
    } else {
      colorIndices[i] = colorIndices[(i + 1) % (colorLen - 1)];
    }
  });
};

let Gradient = () => {
  let colorNow = colorIndices.map((v) => colors[v]);
  let color1 = getColor(colorNow[0], colorNow[1]);
  let color2 = getColor(colorNow[2], colorNow[3]);

  $body.style.backgroundImage = `linear-gradient(to right bottom, ${color1}, ${color2})`;

  step += gradientSpeed;
  if (step >= 1) {
    step %= 1;
    upodateColorIdx();
  }
};

window.requestAnimFrame = (function() {
  return  window.requestAnimationFrame        ||
          window.webkitRequestAnimationFrame  ||
          window.mozRequestAnimationFrame     ||
          function(callback) {
            window.setTimeout(callback, 1000 / 60);
          };
})();

(function animloop() {
  requestAnimFrame(animloop);
  Gradient();
})();
