let score = 0;
let passiveRate = 0;
let clickPower = 1;

let autoFlashCount = 0;
let autoFlashCost = 50;

let grannyCount = 0;
let grannyCost = 450;

let lensCount = 0;
let lensCost = 1000;

let droneCount = 0;
let droneCost = 5000;

const scoreDisplay = document.getElementById('score');
const cpsDisplay = document.getElementById('cpsDisplay');
const cameraBtn = document.getElementById('cameraBtn');

const autoFlashBtn = document.getElementById('autoFlashBtn');
const autoFlashCostDisplay = document.getElementById('autoFlashCost');

const grannyBtn = document.getElementById('grannyBtn');
const grannyCostDisplay = document.getElementById('grannyCost');

const lensBtn = document.getElementById('lensBtn');
const lensCostDisplay = document.getElementById('lensCost');

const droneBtn = document.getElementById('droneBtn');
const droneCostDisplay = document.getElementById('droneCost');

// --- 💾 AUTO SAVE / LOAD SYSTEM ---
function saveGame() {
    const saveData = {
        score: score,
        passiveRate: passiveRate,
        clickPower: clickPower,
        autoFlashCount: autoFlashCount,
        autoFlashCost: autoFlashCost,
        grannyCount: grannyCount,
        grannyCost: grannyCost,
        lensCount: lensCount,
        lensCost: lensCost,
        droneCount: droneCount,
        droneCost: droneCost
    };
    localStorage.setItem('cameraClickerSave', JSON.stringify(saveData));
}

function loadGame() {
    const savedString = localStorage.getItem('cameraClickerSave');
    if (savedString) {
        const saveData = JSON.parse(savedString);
        score = saveData.score || 0;
        passiveRate = saveData.passiveRate || 0;
        clickPower = saveData.clickPower || 1;
        
        autoFlashCount = saveData.autoFlashCount || 0;
        autoFlashCost = saveData.autoFlashCost || 50;
        
        grannyCount = saveData.grannyCount || 0;
        grannyCost = saveData.grannyCost || 450;
        
        lensCount = saveData.lensCount || 0;
        lensCost = saveData.lensCost || 1000;
        
        droneCount = saveData.droneCount || 0;
        droneCost = saveData.droneCost || 5000;
        
        autoFlashCostDisplay.textContent = autoFlashCost;
        grannyCostDisplay.textContent = grannyCost;
        lensCostDisplay.textContent = lensCost;
        droneCostDisplay.textContent = droneCost;
        updateDisplay();
    }
}

setInterval(saveGame, 3000);

// --- 📸 GAME UI LOGIC ---
function updateDisplay() {
    scoreDisplay.textContent = Math.floor(score); 
    cpsDisplay.textContent = `per second: ${passiveRate.toFixed(1)}`;
    
    autoFlashBtn.disabled = score < autoFlashCost;
    grannyBtn.disabled = score < grannyCost;
    lensBtn.disabled = score < lensCost;
    droneBtn.disabled = score < droneCost;
}

setInterval(() => {
    if (passiveRate > 0) {
        score += (passiveRate / 10);
        updateDisplay();
    }
}, 100);

cameraBtn.addEventListener('click', (e) => {
    score += clickPower; 
    updateDisplay();

    const floatEl = document.createElement('div');
    floatEl.classList.add('floating-number');
    floatEl.textContent = `+${clickPower} \uD83D\uDCF8`;

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
        if (autoFlashCount >= 100) { autoFlashCost = Math.ceil(autoFlashCost * 1.10); } 
        else { autoFlashCost = 50; }
        autoFlashCostDisplay.textContent = autoFlashCost;
        updateDisplay();
    }
});

grannyBtn.addEventListener('click', () => {
    if (score >= grannyCost) {
        score -= grannyCost;
        grannyCount++;
        passiveRate += 1.0;
        if (grannyCount >= 10) { grannyCost = Math.ceil(grannyCost * 1.15); } 
        else { grannyCost = 450; }
        grannyCostDisplay.textContent = grannyCost;
        updateDisplay();
    }
});

lensBtn.addEventListener('click', () => {
    if (score >= lensCost) {
        score -= lensCost;
        lensCount++;
        clickPower++; 
        if (lensCount >= 5) { lensCost = Math.ceil(lensCost * 1.50); } 
        else { lensCost = 1000; }
        lensCostDisplay.textContent = lensCost;
        updateDisplay();
    }
});

droneBtn.addEventListener('click', () => {
    if (score >= droneCost) {
        score -= droneCost;
        droneCount++;
        passiveRate += 15.0; 
        if (droneCount >= 5) { droneCost = Math.ceil(droneCost * 1.20); } 
        else { droneCost = 5000; }
        droneCostDisplay.textContent = droneCost;
        updateDisplay();
    }
});

// --- 🌟 GOLDEN CAMERA SYSTEM ---
const goldenCamera = document.createElement('div');
goldenCamera.id = 'goldenCamera';
goldenCamera.textContent = '\u2728\uD83D\uDCF8\u2728';
document.body.appendChild(goldenCamera);

let goldenCameraActive = false;
let goldenCameraTimeout;

function spawnGoldenCamera() {
    if (goldenCameraActive) return;
    goldenCameraActive = true;
    
    const startLeft = Math.random() > 0.5;
    const startY = Math.random() * (window.innerHeight - 300) + 150;
    const endY = Math.random() * (window.innerHeight - 300) + 150;
    
    goldenCamera.style.transition = 'none';
    goldenCamera.style.top = startY + 'px';
    if (startLeft) { goldenCamera.style.left = '-150px'; } 
    else { goldenCamera.style.left = (window.innerWidth + 150) + 'px'; }
    goldenCamera.style.display = 'block';
    
    void goldenCamera.offsetWidth; 
    
    goldenCamera.style.transition = 'left 12s linear, top 12s linear';
    goldenCamera.style.top = endY + 'px';
    if (startLeft) { goldenCamera.style.left = (window.innerWidth + 150) + 'px'; } 
    else { goldenCamera.style.left = '-150px'; }
    
    goldenCameraTimeout = setTimeout(() => {
        goldenCamera.style.display = 'none';
        goldenCameraActive = false;
        scheduleGoldenCamera();
    }, 12000);
}

function scheduleGoldenCamera() {
    const randomTime = 20000 + Math.random() * 25000;
    setTimeout(spawnGoldenCamera, randomTime);
}

goldenCamera.addEventListener('click', (e) => {
    if (!goldenCameraActive) return;
    
    goldenCamera.style.display = 'none';
    goldenCameraActive = false;
    clearTimeout(goldenCameraTimeout);
    
    const reward = Math.max(150, Math.floor(passiveRate * 120));
    score += reward;
    updateDisplay();
    
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

// --- ⚙️ SETTINGS & 🛠️ ADMIN MODE ---
const adminPanel = document.getElementById('adminPanel');
const adminToggleBtn = document.getElementById('adminToggleBtn');
const settingsBtn = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settingsPanel');
const closeSettingsBtn = document.getElementById('closeSettingsBtn');
const factoryResetBtn = document.getElementById('factoryResetBtn');

adminToggleBtn.addEventListener('click', () => {
    if (adminPanel.style.display === 'flex') {
        adminPanel.style.display = 'none';
    } else {
        const pwd = window.prompt("Enter Admin Password:");
        if (pwd === "```" || pwd === "admin") {
            adminPanel.style.display = 'flex';
        } else if (pwd !== null) {
            alert("Incorrect password!");
        }
    }
});

settingsBtn.addEventListener('click', () => {
    settingsPanel.style.display = 'flex';
});

closeSettingsBtn.addEventListener('click', () => {
    settingsPanel.style.display = 'none';
});

factoryResetBtn.addEventListener('click', () => {
    if (window.confirm("Are you 100% sure you want to WIPE all your progress? This cannot be undone!")) {
        localStorage.removeItem('cameraClickerSave');
        location.reload(); 
    }
});

document.getElementById('adminAddScore').addEventListener('click', () => {
    score += 10000;
    updateDisplay();
});

document.getElementById('adminSpawnGold').addEventListener('click', () => {
    goldenCameraActive = false; 
    goldenCamera.style.display = 'none';
    clearTimeout(goldenCameraTimeout);
    spawnGoldenCamera();
});

document.getElementById('adminReset').addEventListener('click', () => {
    if (window.confirm("Are you sure you want to WIPE all save data?")) {
        localStorage.removeItem('cameraClickerSave');
        location.reload(); 
    }
});

// INITIALIZATION
loadGame();
scheduleGoldenCamera();