var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0xffffff});
document.body.appendChild(renderer.view);

var stage = new PIXI.Container();
var texture = PIXI.Texture.fromImage('turtle.png');
var turtle = new PIXI.Sprite(texture);
var graphics = new PIXI.Graphics();

graphics.lineStyle(3, 0x777777);

turtle.anchor.x = 0.5;
turtle.anchor.y = 0.63;
turtle.position.x = 200;
turtle.position.y = 200;

stage.addChild(graphics);
stage.addChild(turtle);


// 거북이 구현
// -------------------------------------

var ANGULAR_VELOCITY = 0.05;
var LINEAR_VELOCITY = 1;

var jobQueue = [];
var job; // 목표치, 달성치
var jobDelta;

function work() {

	if (job == null) {
		if (jobQueue.length > 0){
			job = [jobQueue.shift(), 0];
			jobDelta = Infinity;
		}
		else { return };
	}

	var delta = job[0][0] - job[1];
	var direction = (job[0][0] > 0 ? 1 : -1);

	if (Math.abs(delta) >= jobDelta) {
		if (job[0][1]) turtle.rotation += delta;
		else {
			turtle.x += Math.sin(turtle.rotation) * delta * direction;
			turtle.y -= Math.cos(turtle.rotation) * delta * direction;
		}
		job = null;
		return;
	}

	jobDelta = Math.abs(delta);

	// 회전
	if (job[0][1]) {
		var delta = direction * ANGULAR_VELOCITY;
		turtle.rotation += delta;
		job[1] += delta;
	}

	// 이동
	else {

		graphics.moveTo(turtle.x, turtle.y);

		turtle.x += Math.sin(turtle.rotation) * LINEAR_VELOCITY * direction;
		turtle.y -= Math.cos(turtle.rotation) * LINEAR_VELOCITY * direction;

		graphics.lineTo(turtle.x, turtle.y);

		job[1] += LINEAR_VELOCITY * direction;
	}
}

// -------------------------------------

function left(degree) {
	jobQueue.push([degree * Math.PI / 180, true]);
}

function right(degree) {
	left(-degree);
}

function forward(amount) {
	jobQueue.push([amount, false]);
}

function backward(amount) {
	forward(-amount);
}

animate();
function animate() {
    requestAnimationFrame(animate);
    work();
    renderer.render(stage);
}
