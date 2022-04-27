const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');

const colors = ['#b4dafc', '#bbbbf9', '#cca4fd', '#ad8cfc', '#7f51fd', '#feccfe', '#ff8bd1', '#f240a0', '#ae02b2'];

let score = 0; 
let timer;

startBtn.addEventListener('click', e => {
    e.preventDefault();
    screens[0].classList.add('up');
    let time = 0;
})

timeList.addEventListener('click', e => {
    if (e.target.classList.contains('time-btn')) {
        time = parseInt(e.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
})

board.addEventListener('click', e => {
    if (e.target.classList.contains('circle')) {
        score++;
        e.target.remove();
        createRandomCircle();
    }
})

function startGame() {
    timer = setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}

function restartGame(e) {
    e.preventDefault();
    screens[1].classList.remove('up');
    timeEl.parentNode.classList.remove('hide');
    score = 0;
    board.innerHTML = '<div class="board" id="board"></div>';
}

function decreaseTime() {
    if (time === 0) {
        clearInterval(timer);
        finishGame();
    } else {
        let current = --time;
        setTime(current);
    }
}

function setTime(value) {
    if (value < 10) {
        timeEl.innerHTML = `00:0${value}`;
    } else {
        timeEl.innerHTML = `00:${value}`;
    }
}

function finishGame() {
    timeEl.parentNode.classList.add('hide');
    const restartBtn = document.createElement('a');
    restartBtn.innerHTML = `<a href="#" class="restart" id="restart">Play again</a>`;
    board.innerHTML = `
    <h1>
        Счет: <span class="primary">${score}</span>
    </h1>`;
    board.appendChild(restartBtn);
    board.style.display = 'flex';
    board.style.flexDirection = 'column';
    restartBtn.addEventListener('click', e => {
        board.innerHTML = '';
        restartGame(e);
    });
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const { width, height } = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    const color = getRandomColor();
    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.backgroundColor = color;

    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index]
}
