var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
var mouse = {
  x: undefined,
  y: undefined
};
var maxRadius = 30;
var mouseTrack = 100;
var colorArray = ["#331144", "#C1A0E5", "#7A306C", "#D8B4E2", "#AE759F"];
var circleArray = [];
var clicked;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("mousemove", event => {
  mouse.x = event.x;
  mouse.y = event.y;
});
window.addEventListener("click", event => {
  clicked = true;
});
window.addEventListener("touchmove", event => {
  mouse.x = event.touches[0].clientX;
  mouse.y = event.touches[0].clientY;
});
window.addEventListener("touchend", () => {
  mouse.x = -100;
  mouse.y = -100;
});

function Circle(x, y, r, dx, dy) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.dx = dx;
  this.dy = dy;

  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = () => {
    c.beginPath();
    c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  };

  this.move = () => {
    if (this.x + this.r > innerWidth || this.x - this.r < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.r > innerHeight || this.y - this.r < 0) {
      if (!clicked) {
        this.dy = -this.dy;
      } else {
        this.dy = -this.dy * 0.5;
      }
    } else if (clicked) {
      this.dy += 1;
    }
    this.x += this.dx;
    this.y += this.dy;

    if (
      mouse.x - this.x < mouseTrack &&
      mouse.x - this.x > -mouseTrack &&
      mouse.y - this.y < mouseTrack &&
      mouse.y - this.y > -mouseTrack
    ) {
      if (this.r < maxRadius) {
        this.r += 3;
      }
    } else if (this.r > r + 1) {
      this.r -= 0.2;
    }

    this.draw();
  };
}

for (let i = 0; i < 5000; i++) {
  var r = Math.random() * 5;
  var x = Math.random() * (innerWidth - r * 2) + r;
  var y = Math.random() * (innerHeight - r * 2) + r;
  var dx = Math.random() - 0.5;
  var dy = Math.random() - 0.5;
  circleArray.push(new Circle(x, y, r, dx, dy));
}

function animate() {
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].move();
  }
	requestAnimationFrame(animate);
}
animate();
