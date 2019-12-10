

class Flake {
  constructor(pokeFn, width, height) {
    this.width = width;
    this.height = height;
    this.pokeFn = pokeFn;
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.type = Math.random() * 2;
  }
  update() {
    this.x += Math.random() * 2 - 1;
    this.y += Math.random();
    if(this.x < 0) this.x = this.width + this.x;
    if(this.x >= this.width) this.x = this.x - this.width;
    if(this.y >= this.height) this.y = 0;
  }
  draw(canvas) {
    if(this.type < 1) {
      this.pokeFn(canvas, this.x, this.y, 255, 255, 255, 255);
      this.pokeFn(canvas, this.x-1, this.y, 255, 255, 255, 255);
      this.pokeFn(canvas, this.x+1, this.y, 255, 255, 255, 255);
      this.pokeFn(canvas, this.x, this.y-1, 255, 255, 255, 255);
      this.pokeFn(canvas, this.x, this.y+1, 255, 255, 255, 255);
    } else {
      this.pokeFn(canvas, this.x, this.y, 255, 255, 255, 255);
      this.pokeFn(canvas, this.x-1, this.y-1, 255, 255, 255, 255);
      this.pokeFn(canvas, this.x+1, this.y+1, 255, 255, 255, 255);
      this.pokeFn(canvas, this.x+1, this.y-1, 255, 255, 255, 255);
      this.pokeFn(canvas, this.x-1, this.y+1, 255, 255, 255, 255);
    }
  }

}

class App {

  constructor() {
    document.body.style.backgroundColor = "black";
    this.parent = document.body;
    this.el = document.createElement('canvas');
    this.el.style.position = 'absolute';
    this.el.style.top = '0px';
    this.el.style.left = '0px';
    this.el.style.width = '100%';
    this.el.style.height = '100%';
    this.el.width = window.innerWidth / 2;
    this.el.height = window.innerHeight / 2;
    this.el.style.zIndex = 0xFE;
    this.parent.appendChild(this.el);
    this.canvasCtx = this.el.getContext('2d');
    this.canvasCtx.fillStyle = 'blue';
    this.width = this.el.width;
    this.height = this.el.height;
    this.canvasCtx.scale(1,1);
    this.canvasCtx.font = '32px sans';
    this.canvasCtx.textAlign = 'center';

    this.count = 300;
    this.flakes = [];
    for(var i=0; i<this.count; i++) {
      this.flakes.push(new Flake(this.poke, this.width, this.height));
    }
  }

  start() {
    this.updateFn = this.update.bind(this);
    this.animId = requestAnimationFrame(this.updateFn); 
    this.update();
  }

  poke(canvas, x, y, r, g, b, a) {
      // const alpha = Math.floor(Math.random()*256);
      if(x >=0 && x < this.width && y >= 0 && y < this.height) {
        var index = (Math.floor(x) + Math.floor(y) * this.width) * 4;
        canvas.data[index + 0] = r
        canvas.data[index + 1] = g
        canvas.data[index + 2] = b
        canvas.data[index + 3] = a
      }
  }

  update() {
    this.canvasCtx.clearRect(0, 0, this.width, this.height);
    this.canvasData = this.canvasCtx.getImageData(0, 0, this.width, this.height);

    for(var i=0; i<this.count; i++) {
      this.flakes[i].update();
      // if(i == 0) console.log(this.flakes[i].x, this.flakes[i].y);
      this.flakes[i].draw(this.canvasData);
    }
    this.canvasCtx.putImageData(this.canvasData, 0, 0);
    this.animId = requestAnimationFrame(this.updateFn);
  }


}

function onReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
} 

onReady(function() {
  const app = new App();
  app.start();
});

  
