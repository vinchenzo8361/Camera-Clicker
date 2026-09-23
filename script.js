let score = 0;
const scoreDisplay = document.getElementById('score');
const cameraBtn = document.getElementById('cameraBtn');

cameraBtn.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = score;
});
