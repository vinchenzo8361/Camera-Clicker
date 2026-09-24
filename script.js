let score = 0;
let passiveRate = 0;

let autoFlashCount = 0;
let autoFlashCost = 50;

let grannyCount = 0;
let grannyCost = 450;

const scoreDisplay = document.getElementById('score');
const cpsDisplay = document.getElementById('cpsDisplay');
const cameraBtn = document.getElementById('cameraBtn');

const autoFlashBtn = document.getElementById('autoFlashBtn');
const autoFlashCostDisplay = document.getElementById('autoFlashCost');

const grannyBtn = document.getElementById('grannyBtn');
const grannyCostDisplay = document.getElementById('grannyCost');

// --- 💾 AUTO SAVE / LOAD SYSTEM ---
function saveGame() {
    const saveData = {
        score: score,
        passiveRate: passiveRate,
        autoFlashCount: autoFlashCount,
        autoFlashCost: autoFlashCost,
        grannyCount: grannyCount,
        grannyCost: grannyCost
    };
    localStorage.setItem('cameraClickerSave', JSON.stringify(saveData));
}

function loadGame() {
    const savedString = localStorage.getItem('cameraClickerSave');
    if (savedString) {
        const saveData = JSON.parse(savedString);
        score = saveData.score || 0;
        passiveRate = saveData.passiveRate || 0;
        autoFlashCount = saveData.autoFlashCount || 0;
        autoFlashCost = saveData.autoFlashCost || 50;
        grannyCount = saveData.grannyCount || 0;
        grannyCost = saveData.grannyCost || 450;
        
        autoFlashCostDisplay.textContent = autoFlashCost;
        grannyCostDisplay.textContent = grannyCost;
        updateDisplay();
    }
}

// Save the game every 3 seconds
setInterval(saveGame, 3000);


// --- 📸 GAME UI LOGIC ---
function updateDisplay() {
    scoreDisplay.textContent = Math.floor(score); // Clean whole numbers on main display
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
        
        if (grannyCount >= 10) {
            grannyCost = Math.ceil(grannyCost * 1.15);
        } else {
            grannyCost = 450;
        }
        
        grannyCostDisplay.textContent = grannyCost;
        updateDisplay();
    }
});

// --- 🌟 GOLDEN CAMERA SYSTEM ---
const goldenCamera = document.createElement('div');
goldenCamera.id = 'goldenCamera';
// Star emoji + Camera Emoji
goldenCamera.textContent = '\u2B50\uD83D\uDCF7\u2B50';
document.body.appendChild(goldenCamera);

let goldenCameraActive = false;
let goldenCameraTimeout;

function spawnGoldenCamera() {
    if (goldenCameraActive) return;
    
    goldenCameraActive = true;
    
    // Spawn randomly, but avoid the shop (assuming right side ~360px wide)
    const maxX = window.innerWidth - 450;
    const maxY = window.innerHeight - 100;
    
    const randomX = Math.max(20, Math.random() * maxX);
    const randomY = Math.max(80, Math.random() * maxY); // Avoid score at top
    
    goldenCamera.style.left = randomX + 'px';
    goldenCamera.style.top = randomY + 'px';
    goldenCamera.style.display = 'block';
    
    // Disappears after 12 seconds if you miss it!
    goldenCameraTimeout = setTimeout(() => {
        goldenCamera.style.display = 'none';
        goldenCameraActive = false;
        scheduleGoldenCamera();
    }, 12000);
}

function scheduleGoldenCamera() {
    // Spawns randomly between 20 to 45 seconds!
    const randomTime = 20000 + Math.random() * 25000;
    setTimeout(spawnGoldenCamera, randomTime);
}

goldenCamera.addEventListener('click', (e) => {
    if (!goldenCameraActive) return;
    
    goldenCamera.style.display = 'none';
    goldenCameraActive = false;
    clearTimeout(goldenCameraTimeout);
    
    // The Reward: Either 150 photos instantly OR 2 minutes worth of passive income!
    const reward = Math.max(150, Math.floor(passiveRate * 120));
    score += reward;
    updateDisplay();
    
    // Show epic floating reward text
    const floatEl = document.createElement('div');
    floatEl.classList.add('floating-number');
    floatEl.classList.add('golden-reward');
    floatEl.textContent = `+${reward} \u2B50!`;
    
    floatEl.style.left = (e.pageX - 50) + 'px';
    floatEl.style.top = (e.pageY - 50) + 'px';
    document.body.appendChild(floatEl);
    
    setTimeout(() => floatEl.remove(), 1500);
    
    scheduleGoldenCamera();
});

// INITIALIZATION
loadGame();
scheduleGoldenCamera();