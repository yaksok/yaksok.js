 var canvas = document.getElementById("gameStage");
var ctx = canvas.getContext("2d");

var paddleX = (canvas.width-75)/2;

document.addEventListener("mousemove", mouseMoveHandler, false);


function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - 75/2;
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawBall(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#00008B";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(x) {
    ctx.beginPath();
    ctx.rect(x, canvas.height - 10, 75, 10);
    ctx.fillStyle = "#00008B";
    ctx.fill();
    ctx.closePath();
}

function drawBrick(x, y) {
    ctx.beginPath();
    ctx.rect(x, y, 75, 20);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

}
function drawScore(score) {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#333333";
    ctx.fillText("점수: " + score, 8, 20);
}

function drawLives(lives) {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#333333";
    ctx.fillText("목숨: " + lives, canvas.width - 65, 20);
}