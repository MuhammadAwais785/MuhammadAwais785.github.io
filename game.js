// Pong Game Logic

const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

// Game Variables
let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height / 2;
let dx = 2;
let dy = -2;

const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;

// Score
let playerScore = 0;
let cpuScore = 0;

// Event Listeners
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(event) {
    if (event.key === 'ArrowRight') {
        rightPressed = true;
    } else if (event.key === 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler(event) {
    if (event.key === 'ArrowRight') {
        rightPressed = false;
    } else if (event.key === 'ArrowLeft') {
        leftPressed = false;
    }
}

function drawBall() {
    context.beginPath();
    context.arc(x, y, ballRadius, 0, Math.PI * 2);
    context.fillStyle = '#0095DD';
    context.fill();
    context.closePath();
}

function drawPaddle() {
    context.beginPath();
    context.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    context.fillStyle = '#0095DD';
    context.fill();
    context.closePath();
}

function drawScore() {
    context.font = '16px Arial';
    context.fillStyle = '#0095DD';
    context.fillText('Player: ' + playerScore, 8, 20);
    context.fillText('CPU: ' + cpuScore, canvas.width - 65, 20);
}

function drawCPU() {
    const cpuPaddleX = Math.random() * (canvas.width - paddleWidth);
    context.beginPath();
    context.rect(cpuPaddleX, 0, paddleWidth, paddleHeight);
    context.fillStyle = '#0095DD';
    context.fill();
    context.closePath();
}

function collisionDetection() {
    if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            playerScore++; // increase player score for paddle hit
        } else {
            cpuScore++; // increase CPU score for miss
            resetBall();
        }
    } else if (y + dy < ballRadius) {
        dy = -dy; // top wall hit
    }
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx; // side walls hit
    }
}

function resetBall() {
    x = canvas.width / 2;
    y = canvas.height / 2;
    dx = 2;
    dy = -2;
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawCPU();
    drawScore();
    collisionDetection();

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}

draw();