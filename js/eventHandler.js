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
			juliaMouseX += deltaX * zoomSize;
			juliaMouseY += deltaY * zoomSize;
		} else {
			mouseX += deltaX * zoomSize;
			mouseY += deltaY * zoomSize;
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

canvas.addEventListener('touchstart', process_touchstart, false);
canvas.addEventListener('touchmove', process_touchmove, false);
canvas.addEventListener('touchend', process_touchend, false);

function process_touchstart(event) {
	event.preventDefault();
	deltaX = 0;
	deltaY = 0;
	imMouseX = event.touches[0].clientX;
	imMouseY = event.touches[0].clientY;
	mousedown = true;
	switch (event.touches.length) {
    case 1: handle_one_touch(event); break;
    case 2: handle_two_touches(event); break;
    default: break;
  }
}
function handle_one_touch(event) {
	console.log("one!")
	event.preventDefault();
	deltaX = 0;
	deltaY = 0;
	imMouseX = event.touches[0].clientX;
	imMouseY = event.touches[0].clientY;
	mousedown = true;
}
function handle_two_touches(event) {
	console.log("two!")
	event.preventDefault();
	deltaX = 0;
	deltaY = 0;
	imMouseX = event.touches[0].clientX;
	imMouseY = event.touches[0].clientY;
	middlemousedown = true;
}
// touchmove handler
function process_touchmove(event) {
	console.log("move!")
	event.preventDefault();
	if (mousedown || middlemousedown) {
		deltaX = imMouseX - event.touches[0].clientX;
		deltaY = imMouseY - event.touches[0].clientY;
		imMouseX = event.touches[0].clientX;
		imMouseY = event.touches[0].clientY;
		if (!middlemousedown && !mandel) {
			juliaMouseX += deltaX * zoomSize;
			juliaMouseY += deltaY * zoomSize;
		} else {
			mouseX += deltaX * zoomSize;
			mouseY += deltaY * zoomSize;
		}
	}
}
function process_touchend(event) {
	event.preventDefault();
	mousedown = false;
}

window.addEventListener("resize", () => {
	canvas.setAttribute('width', window.innerWidth);
	canvas.setAttribute('height', window.innerHeight);
});
