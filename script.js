let score = 0;

// Upgrades Data
let autoFlashCount = 0;
let autoFlashCost = 50;
let autoFlashRate = 0; // per second

const scoreDisplay = document.getElementById('score');
const cameraBtn = document.getElementById('cameraBtn');

const autoFlashBtn = document.getElementById('autoFlashBtn');
const autoFlashCostDisplay = document.getElementById('autoFlashCost');
const autoFlashCountDisplay = document.getElementById('autoFlashCount');

function updateDisplay() {
    // Show 1 decimal point so the user sees the +0.1 trickling in!
    scoreDisplay.textContent = score.toFixed(1);
    
    // Enable or disable buy button based on score
    if (score >= autoFlashCost) {
        autoFlashBtn.disabled = false;
    } else {
        autoFlashBtn.disabled = true;
    }
}

// Game Loop: Runs 10 times a second for visual smoothness
setInterval(() => {
    if (autoFlashRate > 0) {
        // Since rate is X per second, we add a tenth of it every 100ms
        score += (autoFlashRate / 10);
        updateDisplay();
    }
}, 100);

cameraBtn.addEventListener('click', (e) => {
    score++;
    updateDisplay();

    const floatEl = document.createElement('div');
    floatEl.classList.add('floating-number');
    floatEl.textContent = '+1 📸';

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

// Buy Upgrade Logic
autoFlashBtn.addEventListener('click', () => {
    if (score >= autoFlashCost) {
        score -= autoFlashCost;
        autoFlashCount++;
        autoFlashRate += 0.1;
        
        // Increase cost by 15% for the next purchase
        autoFlashCost = Math.ceil(autoFlashCost * 1.15); 
        
        autoFlashCostDisplay.textContent = autoFlashCost;
        autoFlashCountDisplay.textContent = autoFlashCount;
        updateDisplay();
    }
});

updateDisplay();