var a = 0; //real
var b = 0; //i
var maxIt = 500;
var size = 800;
var background;
var bright;

let currentX = 0;
let currentY = 0;

var lock = false;

var myReq;

function animate() {
	offCtx.clearRect(0, 0, width, height);
	requestAnimationFrame(animate);

	var imageData = offCtx.createImageData(width, height);
	const data = imageData.data;


	offsetX = map(mouseX, 0, width, -1, 1);
	offsetY = map(mouseY, 0, height, -1, 1);

	for (var i = 0; i < width; i++) {
		for (var j = 0; j < height; j++) {

			if (mandel) {
				var x = map(i, 0, width, -zoomX + offsetX, zoomX + offsetX);
				var y = map(j, 0, height, -zoomY * (height / width) + offsetY, zoomY * (height / width) + offsetY);
				currentX = x;
				currentY = y;
				
			} else {
				if (lock) {
					var x = map(i, 0, width, -zoomX + offsetX, zoomX + offsetX);
					var y = map(j, 0, height, -zoomY * (height / width) + offsetY, zoomY * (height / width) + offsetY);
				} else {
					currentX = map(juliaMouseX, 0, width, -1, 1);
					currentY = map(juliaMouseY, 0, height, -1, 1);
					var x = map(i, 0, width, -zoomX + offsetX, zoomX + offsetX);
					var y = map(j, 0, height, -zoomY * (height / width) + offsetY, zoomY * (height / width) + offsetY);
				}
			}

			for (var k = 0; k < maxIt; k++) {
				if (x*x + y*y > 4) {
					break;
				}
				let nxtx = x*x - y*y;
				let nxty = 2*x*y;
				x = nxtx + currentX;
				y = nxty + currentY;
			}
			
			if (k == maxIt) {
				bright = 0;
				pix = (i + j * width) * 4;
				data[pix] = bright;
				data[pix + 1] = bright;
				data[pix + 2] = bright;
				data[pix + 3] = 255;
			} else {
				bright = map(k, 0, maxIt, 0, 1);
				bright = map(Math.sqrt(bright), 0, 1, 0, 255);
				pix = (i + j * width) * 4;
				data[pix] = bright;
				data[pix + 1] = bright;
				data[pix + 2] = bright;
				data[pix + 3] = 255;
			}
		}
	}
	k = 0;
	bright = map(k, 0, maxIt, 0, 4);
	bright = map(Math.sqrt(bright), 0, 1, 0, 255);
	offCtx.fillStyle = "rgb("+ bright +"," + bright + "," + bright + ")";
	offCtx.fill();
	offCtx.putImageData(imageData, 0, 0);
	c.drawImage(offScreenCanvas, 0, 0);
}
animate();