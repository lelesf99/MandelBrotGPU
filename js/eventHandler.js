var itSlider = document.querySelector("#itSlider");
var lockCheck = document.querySelector("#lock");
var radio1 = document.querySelector("#selectM");
var radio2 = document.querySelector("#selectJ");

var mousedown = false;
var middlemousedown = false;

window.addEventListener('wheel', (event) => {
	zoomSize += zoomSize * (event.deltaY/1000);
});

itSlider.addEventListener('input', () => {
	maxIt = Math.floor(itSlider.value);
});
radio1.addEventListener('input', () => {
	mandel = true;
});
radio2.addEventListener('input', () => {
	mandel = false;
});
canvas.addEventListener('mousedown', (event) => {
	deltaX = 0;
	deltaY = 0;
	imMouseX = event.clientX;
	imMouseY = event.clientY;
	if (event && (event.which == 2 || event.button == 4 )) {
		middlemousedown = true;
		zoomFactor = 1;
	} else {
		mousedown = true;
	}
	
});
canvas.addEventListener('mousemove', (event) => {
	if (mousedown || middlemousedown) {
		deltaX = imMouseX - event.clientX;
		deltaY = imMouseY - event.clientY;
		imMouseX = event.clientX;
		imMouseY = event.clientY;
		if (!middlemousedown && !mandel) {
			juliaMouseX += deltaX ;
			juliaMouseY += deltaY ;
		} else {
			mouseX += deltaX ;
			mouseY += deltaY ;
		}
	}
});
canvas.addEventListener('mouseup', (event) => {
    if (event && (event.which == 2 || event.button == 4 )) {
		middlemousedown = false;
	} else {
		mousedown = false;
	}
});

window.addEventListener("resize", () => {
	canvas.setAttribute('width', window.innerWidth);
	canvas.setAttribute('height', window.innerHeight);
});
