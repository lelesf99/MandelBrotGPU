class Vector2 {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	add(v) {
		this.x = this.x + v.x;
		this.y = this.y + v.y;
		return this
	}
	sub(v) {
		this.x = (this.x - v.x);
		this.y = (this.y - v.y);
		return this
	}
	static subV1V2(v1, v2) {
		return new Vector2((v1.x - v2.x), (v1.y - v2.y));
	}
	multS(k) {
		this.x = this.x * k;
		this.y = this.y * k;
		return this
	}
	divS(k) {
		this.x = this.x / k;
		this.y = this.y / k;
		return this;
	}
	dist(v){
		return Math.sqrt((this.x - v.x) * (this.x - v.x) + (this.y - v.y) * (this.y - v.y));
	}
	magSq() {
		const x = this.x;
		const y = this.y;
		return x * x + y * y;
	};
	mag(){
		return Math.sqrt(this.magSq());
	}
	normalize(){
		const len = this.mag();
		if (len !== 0) this.multS(1 / len);
		return this;
	}
	setMag(k) {
		return this.normalize().multS(k);
	}
	limit(max) {
		const mSq = this.magSq();
		if (mSq > max * max) {
			this.divS(Math.sqrt(mSq)).multS(max);
		}
		return this;
	};
	dot(v) {
		return this.x * v.x + this.y * v.y;
	};
	static angleBetween(v1, v2){
			return Math.acos(v1.dot(v2) / (v1.mag() * v2.mag()));
	}
	angle(){
		return (this.y < 0) ? -Vector2.angleBetween(this, new Vector2(1,0)) : Vector2.angleBetween(this, new Vector2(1,0));
	}
}

function constrain(n, low, high) {
  return Math.max(Math.min(n, high), low);
};

function map(n, start1, stop1, start2, stop2, withinBounds) {
  const newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
  if (!withinBounds) {
    return newval;
  }
  if (start2 < stop2) {
    return this.constrain(newval, start2, stop2);
  } else {
    return this.constrain(newval, stop2, start2);
  }
};

function getRandomArb(min, max) {
  return Math.random() * (max - min) + min;
}

function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

var canvas = document.querySelector('canvas');
var c = canvas.getContext("2d");

canvas.setAttribute('width', window.innerWidth);
canvas.setAttribute('height', window.innerHeight);

var width = canvas.width;
var height = canvas.height;

var offScreenCanvas = new OffscreenCanvas(width, height);
var offCtx = offScreenCanvas.getContext('2d');


var mouseX = width/2;
var mouseY = height/2;
var imMouseX = width/2;
var imMouseY = height/2;
var juliaMouseX = width/2;
var juliaMouseY = height/2;
var deltaX = mouseX;
var deltaY = mouseY;
var offsetX = 0;
var offsetY = 0;
var zoomX = 2;
var zoomY = 2;

c.lineWidth = 4;

window.addEventListener("resize", () => {
	canvas.setAttribute('width', window.innerWidth);
	canvas.setAttribute('height', window.innerHeight);
	width = canvas.width;
	height = canvas.height;
});