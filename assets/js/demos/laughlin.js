// Simulation of Laughlin state

var particlesQ = 1024;
var slider;
var c = 200;

var beta = 20;
var step = 0.1;
var gamma = beta * step**2 / 4;

var radius = 200

var x = new Array(particlesQ);
var y = new Array(particlesQ);
var vx = new Array(particlesQ);
var vy = new Array(particlesQ);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function setup() {
	var canvas = createCanvas(200, 200);
	// Move the canvas so it’s inside our <div id="sketch-holder">.
	canvas.parent('sketch-holder');
	noStroke();

	fill('#A3C1AD');

	// slider = createSlider(0, 0.000005, 0.0000025, 0);
	// slider.position(0, height - 32);
	// slider.style('width', width - 8 + 'px');

	for (var a = 0; a < c; a++) {
		x[a] = random(0,width);
		y[a] = random(0,height);
		vx[a] = 0;
		vy[a] = 0;
	}

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function draw() {
	// var g = slider.value();

	for (var a = 0; a < c; a++) {
		var ax = 0, ay = 0;

		for (var b = 0; b < c; b++) {
			if (a != b) {
				dx = x[b] - x[a];
				dy = y[b] - y[a];

				var d_ab = sqrt(dx*dx + dy*dy);
				//if (d < 1) d = 1;

				//var f = (d - 256) * m[b] / d;
        var f =  1 / d_ab**2

				ax += -f * dx;
				ay += -f * dy;
			}
		}

		var d = sqrt((x[a] - width / 2)**2 + (y[a] - height / 2)**2);
		if (d < 1) d = 1;
    ax +=  - 5 * (x[a] - width / 2) / radius;
    ay +=  - 5 * (y[a] - height / 2) / radius;

		vx[a] = vx[a] * exp(-gamma) + ax + step * randomGaussian();
		vy[a] = vy[a] * exp(-gamma) + ay + step * randomGaussian();
	}

	for (var a = 0; a < c; a++) {
		x[a] += vx[a];
		y[a] += vy[a];

		if ((x[a] < 0    &&    vx[a] < 0)    ||    (x[a] > width    &&    vx[a] > 0))    vx[a] = -vx[a];
		if ((y[a] < 0    &&    vy[a] < 0)    ||    (y[a] > height   &&    vy[a] > 0))    vy[a] = -vy[a];
	}

	background('#fff');

	for (var i = 0; i < c; i++) {
		ellipse(x[i], y[i], 5, 5);
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addNewParticle() {
	if (mouseY < height - 50) {
		x[c] = mouseX;//random(0,width); //mouseX;
		y[c] = mouseY;//random(0,height); //mouseY;
		vx[c] = 0;
		vy[c] = 0;

		c++;
		c = c % particlesQ;
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// function mouseClicked() {
// 	addNewParticle();
// }
//
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// function mouseDragged() {
// 	addNewParticle();
// }
