let score = 0;
const scoreDisplay = document.getElementById('score');
const cameraBtn = document.getElementById('cameraBtn');

cameraBtn.addEventListener('click', (e) => {
    score++;
    scoreDisplay.textContent = score;

    // Create floating number element
    const floatEl = document.createElement('div');
    floatEl.classList.add('floating-number');
    floatEl.innerHTML = '+1 ?'; // Flash icon!

    // Position it near where the user clicked
    const rect = cameraBtn.getBoundingClientRect();
    const x = (e.pageX !== undefined && e.pageX !== 0) ? e.pageX : rect.left + rect.width / 2;
    const y = (e.pageY !== undefined && e.pageY !== 0) ? e.pageY : rect.top + rect.height / 2;

    // Randomize position slightly so they don't overlap perfectly if clicked super fast
    const randomX = x - 20 + Math.random() * 40;
    const randomY = y - 20 + Math.random() * 40;

    floatEl.style.left = randomX + 'px';
    floatEl.style.top = randomY + 'px';

    document.body.appendChild(floatEl);

    // Clean up the element after the CSS animation finishes
    setTimeout(() => {
        floatEl.remove();
    }, 1000);
});
