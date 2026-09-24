let score = 0;
let passiveRate = 0; // Total global photos/sec

// Upgrade 1
let autoFlashCount = 0;
let autoFlashCost = 50;

// Upgrade 2
let grannyCount = 0;
let grannyCost = 450;

const scoreDisplay = document.getElementById('score');
const cpsDisplay = document.getElementById('cpsDisplay');
const cameraBtn = document.getElementById('cameraBtn');

const autoFlashBtn = document.getElementById('autoFlashBtn');
const autoFlashCostDisplay = document.getElementById('autoFlashCost');

const grannyBtn = document.getElementById('grannyBtn');
const grannyCostDisplay = document.getElementById('grannyCost');

function updateDisplay() {
    scoreDisplay.textContent = score.toFixed(1);
    cpsDisplay.textContent = `per second: ${passiveRate.toFixed(1)}`;
    
    autoFlashBtn.disabled = score < autoFlashCost;
    grannyBtn.disabled = score < grannyCost;
}

setInterval(() => {
    if (passiveRate > 0) {
        score += (passiveRate / 10);
        updateDisplay();
    }
}, 100);

cameraBtn.addEventListener('click', (e) => {
    score++;
    updateDisplay();

    const floatEl = document.createElement('div');
    floatEl.classList.add('floating-number');
    floatEl.textContent = '+1 \uD83D\uDCF8';

    const rect = cameraBtn.getBoundingClientRect();
    const x = (e.pageX !== undefined && e.pageX !== 0) ? e.pageX : rect.left + rect.width / 2;
    const y = (e.pageY !== undefined && e.pageY !== 0) ? e.pageY : rect.top + rect.height / 2;

    const randomX = x - 30 + Math.random() * 60;
    const randomY = y - 30 + Math.random() * 60;

    floatEl.style.left = randomX + 'px';
    floatEl.style.top = randomY + 'px';

    document.body.appendChild(floatEl);

    setTimeout(() => {
        floatEl.remove();
    }, 800);
});

autoFlashBtn.addEventListener('click', () => {
    if (score >= autoFlashCost) {
        score -= autoFlashCost;
        autoFlashCount++;
        passiveRate += 0.1;
        
        if (autoFlashCount >= 100) {
            autoFlashCost = Math.ceil(autoFlashCost * 1.10); 
        } else {
            autoFlashCost = 50;
        }
        
        autoFlashCostDisplay.textContent = autoFlashCost;
        updateDisplay();
    }
});

grannyBtn.addEventListener('click', () => {
    if (score >= grannyCost) {
        score -= grannyCost;
        grannyCount++;
        passiveRate += 1.0;
        
        // Granny price scales by 15% after 10 purchases
        if (grannyCount >= 10) {
            grannyCost = Math.ceil(grannyCost * 1.15);
        } else {
            grannyCost = 450;
        }
        
        grannyCostDisplay.textContent = grannyCost;
        updateDisplay();
    }
});