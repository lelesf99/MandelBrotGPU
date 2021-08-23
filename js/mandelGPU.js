const gpu = new GPU();
const render = gpu.createKernel(function(
		mandel, 
		zoomCenter, 
		zoomSize, 
		offsetX, 
		offsetY, 
		maxIt, 
		a, 
		b
	) {
	let x = [0,0];
	let c = [
		zoomCenter[0] + ((this.thread.x / this.output.x) * 2 - 1) * (zoomSize) + (offsetX) ,
		zoomCenter[1] + ((this.thread.y / this.output.y) * 2 - 1) * (this.output.y / this.output.x) * (zoomSize) - (offsetY) 
	];
	if (!mandel) {
		x = [
			zoomCenter[0] + (((this.thread.x / this.output.x) * 2 - 1) * (zoomSize)) + (offsetX),
			zoomCenter[1] + (((this.thread.y / this.output.y) * 2 - 1) * (this.output.y / this.output.x) * (zoomSize)) - (offsetY)
		];
		c = [
			(a),
			(b) * (this.output.y / this.output.x)
		];
	}
	let diverge = false;
	let itCount = 0;

    for (let i = 0; i < maxIt; i++) {
    	itCount = i;
    	if (Math.sqrt((x[0] * x[0]) + (x[1] * x[1])) > 2) {
			diverge = true;
			break;
		}
    	x = [
    		(x[0] * x[0]) - (x[1] * x[1]) + c[0],
			2 * (x[0] * x[1]) + c[1]
		];
		
    }
    if (!diverge) {
    	this.color(0, 0, 0, 1);
    } else {
    	let pix = itCount*10/maxIt;
    	pix = Math.sqrt(pix);

    	this.color(pix, pix, pix, 1);
    }
})
  .setOutput([width,height])
  .setGraphical(true);
const canvas = render.canvas;

var mandel = true;

document.querySelector(".container").appendChild(canvas);
function animate() {
	requestAnimationFrame(animate);

	var a = map(juliaMouseX, 0, width, -1, 1);
	var b = map(juliaMouseY, 0, height, -1, 1);

	offsetX = map(mouseX, 0, width, -0.5, 0.5);
	offsetY = map(mouseY, 0, height, -0.5, 0.5);

	zoomCenter[0] = + offsetX;
  zoomCenter[1] = - offsetY;

	render(mandel, zoomCenter, zoomSize, offsetX, offsetY, maxIt, a, b);
}
animate();