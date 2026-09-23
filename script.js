let score = 0;
const scoreDisplay = document.getElementById('score');
const cameraBtn = document.getElementById('cameraBtn');

cameraBtn.addEventListener('click', (e) => {
    score++;
    scoreDisplay.textContent = score;

    const floatEl = document.createElement('div');
    floatEl.classList.add('floating-number');
    floatEl.textContent = '+1 📸'; // Flash emoji

    const rect = cameraBtn.getBoundingClientRect();
    const x = (e.pageX !== undefined && e.pageX !== 0) ? e.pageX : rect.left + rect.width / 2;
    const y = (e.pageY !== undefined && e.pageY !== 0) ? e.pageY : rect.top + rect.height / 2;

    const randomX = x - 25 + Math.random() * 50;
    const randomY = y - 25 + Math.random() * 50;

    floatEl.style.left = randomX + 'px';
    floatEl.style.top = randomY + 'px';

    document.body.appendChild(floatEl);

    setTimeout(() => {
        floatEl.remove();
    }, 1000);
});