let score = 0;

let autoFlashCount = 0;
let autoFlashCost = 50;
let autoFlashRate = 0;

const scoreDisplay = document.getElementById('score');
const cameraBtn = document.getElementById('cameraBtn');

const autoFlashBtn = document.getElementById('autoFlashBtn');
const autoFlashCostDisplay = document.getElementById('autoFlashCost');
const autoFlashDesc = document.getElementById('autoFlashDesc');

function updateDisplay() {
    scoreDisplay.textContent = score.toFixed(1);
    
    if (score >= autoFlashCost) {
        autoFlashBtn.disabled = false;
    } else {
        autoFlashBtn.disabled = true;
    }
}

setInterval(() => {
    if (autoFlashRate > 0) {
        score += (autoFlashRate / 10);
        updateDisplay();
    }
}, 100);

cameraBtn.addEventListener('click', (e) => {
    score++;
    updateDisplay();

    const floatEl = document.createElement('div');
    floatEl.classList.add('floating-number');
    // Using explicit Unicode so PowerShell never corrupts the emoji again
    floatEl.textContent = '+1 \uD83D\uDCF8';

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

autoFlashBtn.addEventListener('click', () => {
    if (score >= autoFlashCost) {
        score -= autoFlashCost;
        autoFlashCount++;
        autoFlashRate += 0.1;
        
        if (autoFlashCount >= 100) {
            autoFlashCost = Math.ceil(autoFlashCost * 1.10); 
        } else {
            autoFlashCost = 50;
        }
        
        autoFlashCostDisplay.textContent = autoFlashCost;
        autoFlashDesc.textContent = `Currently: +${autoFlashRate.toFixed(1)}/sec`;
        updateDisplay();
    }
});