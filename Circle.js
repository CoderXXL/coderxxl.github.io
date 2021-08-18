export default class Circle {
    constructor(x, y, r, dx, dy, colorArray) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.dx = dx;
        this.dy = dy;
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    }
  
  
    draw = (c) => {
      c.beginPath();
      c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
    };
    
    move = (maxRadius, mouseTrack) => {
      if (this.x + this.r > innerWidth || this.x - this.r < 0) {
        this.dx = -this.dx;
      }
  
      if (this.y + this.r > innerHeight || this.y - this.r < 0) {
        this.dy = -this.dy;
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
