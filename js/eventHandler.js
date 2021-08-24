var hideShow = document.querySelector("#hideShow");
var menu = document.querySelector(".menu");
var itSlider = document.querySelector("#itSlider");
var rSlider = document.querySelector("#rSlider");
var gSlider = document.querySelector("#gSlider");
var bSlider = document.querySelector("#bSlider");
var btnM = document.querySelector("#selectM");
var btnJ = document.querySelector("#selectJ");

window.addEventListener('keydown', (event) => {
	console.log(event);
	if (event.code == 'ArrowRight') {
		if(maxIt < 2048){
			maxIt += 10;
		}
		itSlider.value = maxIt;
	} else {
		if(maxIt > 11){
			maxIt -= 10;
		}
		itSlider.value = maxIt;
	}
});
window.addEventListener('wheel', (event) => {
	zoomSize += zoomSize * (event.deltaY/1000);
});
hideShow.addEventListener('click', (event) => {
	event.preventDefault();
	if(menu.classList.contains('show')) {
		menu.classList.remove('show');
		hideShow.innerHTML = 'Menu ↓'
	} else {
		menu.classList.add('show');
		hideShow.innerHTML = 'Menu ↑'
	}
});
itSlider.addEventListener('input', () => {
	maxIt = Math.floor(itSlider.value);
});

rSlider.addEventListener('input', () => {
	red = rSlider.value / 255;
});
gSlider.addEventListener('input', () => {
	green = gSlider.value / 255;
});
bSlider.addEventListener('input', () => {
	blue = bSlider.value / 255;
});

btnM.addEventListener('click', () => {
	mandel = true;
	btnM.setAttribute('disabled', '');
	btnJ.removeAttribute('disabled');
});
btnJ.addEventListener('click', () => {
	mandel = false;
	btnJ.setAttribute('disabled', '');
	btnM.removeAttribute('disabled');
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
	event.preventDefault();
	deltaX = 0;
	deltaY = 0;
	imMouseX = event.touches[0].clientX;
	imMouseY = event.touches[0].clientY;
	mousedown = true;
}
function handle_two_touches(event) {
	event.preventDefault();
	touch1 = new Vector2(event.touches[0].clientX,event.touches[0].clientY);
	touch2 = new Vector2(event.touches[1].clientX,event.touches[1].clientY);

	pinchDist = zoomSize + (touch1.dist(touch2)/100);
	pinch = true;
}
// touchmove handler
function process_touchmove(event) {
	event.preventDefault();
	if (mousedown || middlemousedown) {
		deltaX = imMouseX - event.touches[0].clientX;
		deltaY = imMouseY - event.touches[0].clientY;
		imMouseX = event.touches[0].clientX;
		imMouseY = event.touches[0].clientY;
		
		if (!middlemousedown && !mandel && !pinch) {
			juliaMouseX += deltaX * zoomSize;
			juliaMouseY += deltaY * zoomSize;
		} else if(pinch){
			touch1.x = event.touches[0].clientX;
			touch1.y = event.touches[0].clientY;
			touch2.x = event.touches[1].clientX;
			touch2.y = event.touches[1].clientY;
			zoomSize = (pinchDist - (touch1.dist(touch2)/100));
		} else {
			mouseX += deltaX * zoomSize;
			mouseY += deltaY * zoomSize;
		}
	}
}
function process_touchend(event) {
	event.preventDefault();
		middlemousedown = false;
		mousedown = false;
		pinch = false;
}

window.addEventListener("resize", () => {
	canvas.setAttribute('width', window.innerWidth);
	canvas.setAttribute('height', window.innerHeight);
});
