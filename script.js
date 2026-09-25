let score = 0;
let passiveRate = 0;
let clickPower = 1;

let autoFlashCount = 0; let autoFlashCost = 50;
let grannyCount = 0; let grannyCost = 450;
let lensCount = 0; let lensCost = 1000;
let ringLightCount = 0; let ringLightCost = 1500;
let droneCount = 0; let droneCost = 5000;
let dslrCount = 0; let dslrCost = 25000;
let satelliteCount = 0; let satelliteCost = 50000;

// Frenzy State
let comboValue = 0; 
let comboMultiplier = 1; 

// Analytics Tracking
let statsManualClicks = 0;
let statsPointsSpent = 0;
let statsGoldenCaught = 0;
let statsTimePlayed = 0;

const scoreDisplay = document.getElementById('score');
const cpsDisplay = document.getElementById('cpsDisplay');
const cameraBtn = document.getElementById('cameraBtn');

// Combo Elements
const comboFill = document.getElementById('comboFill');
const comboText = document.getElementById('comboText');

const autoFlashBtn = document.getElementById('autoFlashBtn');
const autoFlashCostDisplay = document.getElementById('autoFlashCost');
const grannyBtn = document.getElementById('grannyBtn');
const grannyCostDisplay = document.getElementById('grannyCost');
const lensBtn = document.getElementById('lensBtn');
const lensCostDisplay = document.getElementById('lensCost');
const ringLightBtn = document.getElementById('ringLightBtn');
const ringLightCostDisplay = document.getElementById('ringLightCost');
const droneBtn = document.getElementById('droneBtn');
const droneCostDisplay = document.getElementById('droneCost');
const dslrBtn = document.getElementById('dslrBtn');
const dslrCostDisplay = document.getElementById('dslrCost');
const satelliteBtn = document.getElementById('satelliteBtn');
const satelliteCostDisplay = document.getElementById('satelliteCost');

function saveGame() {
    const saveData = {
        score, passiveRate, clickPower,
        autoFlashCount, autoFlashCost,
        grannyCount, grannyCost,
        lensCount, lensCost,
        ringLightCount, ringLightCost,
        droneCount, droneCost,
        dslrCount, dslrCost,
        satelliteCount, satelliteCost,
        statsManualClicks, statsPointsSpent,
        statsGoldenCaught, statsTimePlayed
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
        autoFlashCount = saveData.autoFlashCount || 0; autoFlashCost = saveData.autoFlashCost || 50;
        grannyCount = saveData.grannyCount || 0; grannyCost = saveData.grannyCost || 450;
        lensCount = saveData.lensCount || 0; lensCost = saveData.lensCost || 1000;
        ringLightCount = saveData.ringLightCount || 0; ringLightCost = saveData.ringLightCost || 1500;
        droneCount = saveData.droneCount || 0; droneCost = saveData.droneCost || 5000;
        dslrCount = saveData.dslrCount || 0; dslrCost = saveData.dslrCost || 25000;
        satelliteCount = saveData.satelliteCount || 0; satelliteCost = saveData.satelliteCost || 50000;
        
        // Analytics
        statsManualClicks = saveData.statsManualClicks || 0;
        statsPointsSpent = saveData.statsPointsSpent || 0;
        statsGoldenCaught = saveData.statsGoldenCaught || 0;
        statsTimePlayed = saveData.statsTimePlayed || 0;

        autoFlashCostDisplay.textContent = autoFlashCost;
        grannyCostDisplay.textContent = grannyCost;
        lensCostDisplay.textContent = lensCost;
        ringLightCostDisplay.textContent = ringLightCost;
        droneCostDisplay.textContent = droneCost;
        dslrCostDisplay.textContent = dslrCost;
        satelliteCostDisplay.textContent = satelliteCost;
        updateDisplay();
    }
}

setInterval(saveGame, 3000);

// Global Clock for Time Played Analytics
setInterval(() => {
    statsTimePlayed++;
    // Live update if the panel is open
    if (document.getElementById('analyticsPanel').style.display === 'flex') {
        updateAnalyticsUI();
    }
}, 1000);

function updateDisplay() {
    scoreDisplay.textContent = Math.floor(score); 
    cpsDisplay.textContent = `per second: ${passiveRate.toFixed(1)}`;
    
    autoFlashBtn.disabled = score < autoFlashCost;
    grannyBtn.disabled = score < grannyCost;
    lensBtn.disabled = score < lensCost;
    ringLightBtn.disabled = score < ringLightCost;
    droneBtn.disabled = score < droneCost;
    dslrBtn.disabled = score < dslrCost;
    satelliteBtn.disabled = score < satelliteCost;
}

// MAIN 100ms GAME LOOP
setInterval(() => {
    if (passiveRate > 0) {
        score += (passiveRate / 10);
    }
    
    // Frenzy Decay
    comboValue -= 1.5;
    if (comboValue < 0) comboValue = 0;
    
    if (comboValue >= 80) {
        comboMultiplier = 2;
        comboFill.classList.add('active');
        comboText.textContent = '2x!';
        comboText.style.color = '#fdcb6e';
        comboText.style.transform = 'scale(1.2)';
    } else {
        comboMultiplier = 1;
        comboFill.classList.remove('active');
        comboText.textContent = '1x';
        comboText.style.color = '#fff';
        comboText.style.transform = 'scale(1)';
    }
    
    comboFill.style.height = comboValue + '%';
    updateDisplay();
}, 100);

// MANUAL CLICKING
cameraBtn.addEventListener('click', (e) => {
    statsManualClicks++; // TRACK CLICK

    comboValue += 8;
    if (comboValue > 100) comboValue = 100;

    let earned = clickPower * comboMultiplier;
    score += earned; 
    updateDisplay();

    const floatEl = document.createElement('div');
    floatEl.classList.add('floating-number');
    
    if (comboMultiplier === 2) {
        floatEl.style.color = '#fdcb6e';
        floatEl.textContent = `+${earned} \uD83D\uDCF8 \u2728`; 
    } else {
        floatEl.textContent = `+${earned} \uD83D\uDCF8`;
    }

    const rect = cameraBtn.getBoundingClientRect();
    const x = (e.pageX !== undefined && e.pageX !== 0) ? e.pageX : rect.left + rect.width / 2;
    const y = (e.pageY !== undefined && e.pageY !== 0) ? e.pageY : rect.top + rect.height / 2;
    const randomX = x - 30 + Math.random() * 60;
    const randomY = y - 30 + Math.random() * 60;

    floatEl.style.left = randomX + 'px';
    floatEl.style.top = randomY + 'px';
    document.body.appendChild(floatEl);
    setTimeout(() => { floatEl.remove(); }, 800);
});

// SHOP ACTIONS
autoFlashBtn.addEventListener('click', () => {
    if (score >= autoFlashCost) {
        score -= autoFlashCost; statsPointsSpent += autoFlashCost;
        autoFlashCount++; passiveRate += 0.1;
        if (autoFlashCount >= 100) { autoFlashCost = Math.ceil(autoFlashCost * 1.10); } else { autoFlashCost = 50; }
        autoFlashCostDisplay.textContent = autoFlashCost; updateDisplay();
    }
});
grannyBtn.addEventListener('click', () => {
    if (score >= grannyCost) {
        score -= grannyCost; statsPointsSpent += grannyCost;
        grannyCount++; passiveRate += 1.0;
        if (grannyCount >= 10) { grannyCost = Math.ceil(grannyCost * 1.15); } else { grannyCost = 450; }
        grannyCostDisplay.textContent = grannyCost; updateDisplay();
    }
});
lensBtn.addEventListener('click', () => {
    if (score >= lensCost) {
        score -= lensCost; statsPointsSpent += lensCost;
        lensCount++; clickPower++; 
        if (lensCount >= 5) { lensCost = Math.ceil(lensCost * 1.50); } else { lensCost = 1000; }
        lensCostDisplay.textContent = lensCost; updateDisplay();
    }
});
ringLightBtn.addEventListener('click', () => {
    if (score >= ringLightCost) {
        score -= ringLightCost; statsPointsSpent += ringLightCost;
        ringLightCount++; passiveRate += 4.0; 
        if (ringLightCount >= 5) { ringLightCost = Math.ceil(ringLightCost * 1.15); } else { ringLightCost = 1500; }
        ringLightCostDisplay.textContent = ringLightCost; updateDisplay();
    }
});
droneBtn.addEventListener('click', () => {
    if (score >= droneCost) {
        score -= droneCost; statsPointsSpent += droneCost;
        droneCount++; passiveRate += 15.0; 
        if (droneCount >= 5) { droneCost = Math.ceil(droneCost * 1.20); } else { droneCost = 5000; }
        droneCostDisplay.textContent = droneCost; updateDisplay();
    }
});
dslrBtn.addEventListener('click', () => {
    if (score >= dslrCost) {
        score -= dslrCost; statsPointsSpent += dslrCost;
        dslrCount++; clickPower += 10; 
        if (dslrCount >= 3) { dslrCost = Math.ceil(dslrCost * 1.50); } else { dslrCost = 25000; }
        dslrCostDisplay.textContent = dslrCost; updateDisplay();
    }
});
satelliteBtn.addEventListener('click', () => {
    if (score >= satelliteCost) {
        score -= satelliteCost; statsPointsSpent += satelliteCost;
        satelliteCount++; passiveRate += 100.0; 
        if (satelliteCount >= 5) { satelliteCost = Math.ceil(satelliteCost * 1.25); } else { satelliteCost = 50000; }
        satelliteCostDisplay.textContent = satelliteCost; updateDisplay();
    }
});

// --- 🌟 GOLDEN CAMERA SYSTEM ---
const goldenCamera = document.createElement('div');
goldenCamera.id = 'goldenCamera';
goldenCamera.textContent = '\u2728\uD83D\uDCF8\u2728';
document.body.appendChild(goldenCamera);

let goldenCameraActive = false; let goldenCameraTimeout;

function spawnGoldenCamera() {
    if (goldenCameraActive) return;
    goldenCameraActive = true;
    
    const startLeft = Math.random() > 0.5;
    const startY = Math.random() * (window.innerHeight - 300) + 150;
    const endY = Math.random() * (window.innerHeight - 300) + 150;
    
    goldenCamera.style.transition = 'none';
    goldenCamera.style.top = startY + 'px';
    if (startLeft) { goldenCamera.style.left = '-150px'; } else { goldenCamera.style.left = (window.innerWidth + 150) + 'px'; }
    goldenCamera.style.display = 'block';
    
    void goldenCamera.offsetWidth; 
    
    goldenCamera.style.transition = 'left 12s linear, top 12s linear';
    goldenCamera.style.top = endY + 'px';
    if (startLeft) { goldenCamera.style.left = (window.innerWidth + 150) + 'px'; } else { goldenCamera.style.left = '-150px'; }
    
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
    statsGoldenCaught++; // TRACK ANALYTICS
    
    goldenCamera.style.display = 'none';
    goldenCameraActive = false;
    clearTimeout(goldenCameraTimeout);
    
    const reward = Math.max(150, Math.floor(passiveRate * 120));
    score += reward; updateDisplay();
    
    const floatEl = document.createElement('div');
    floatEl.classList.add('floating-number');
    floatEl.classList.add('golden-reward');
    floatEl.textContent = `+${reward} \u2B50!`;
    
    floatEl.style.left = (e.pageX - 50) + 'px'; floatEl.style.top = (e.pageY - 50) + 'px';
    document.body.appendChild(floatEl);
    setTimeout(() => floatEl.remove(), 1500);
    scheduleGoldenCamera();
});

// --- ⚙️ SETTINGS, ANALYTICS & 🛠️ ADMIN MODE ---
const adminPanel = document.getElementById('adminPanel');
const adminToggleBtn = document.getElementById('adminToggleBtn');
const settingsBtn = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settingsPanel');
const closeSettingsBtn = document.getElementById('closeSettingsBtn');
const factoryResetBtn = document.getElementById('factoryResetBtn');

const analyticsBtn = document.getElementById('analyticsBtn');
const analyticsPanel = document.getElementById('analyticsPanel');
const closeAnalyticsBtn = document.getElementById('closeAnalyticsBtn');

function formatTime(totalSeconds) {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    let timeStr = "";
    if (h > 0) timeStr += `${h}h `;
    if (m > 0 || h > 0) timeStr += `${m}m `;
    timeStr += `${s}s`;
    return timeStr;
}

function updateAnalyticsUI() {
    document.getElementById('statClicks').textContent = statsManualClicks;
    document.getElementById('statSpent').textContent = Math.floor(statsPointsSpent);
    document.getElementById('statGolden').textContent = statsGoldenCaught;
    document.getElementById('statTime').textContent = formatTime(statsTimePlayed);
}

analyticsBtn.addEventListener('click', () => { updateAnalyticsUI(); analyticsPanel.style.display = 'flex'; });
closeAnalyticsBtn.addEventListener('click', () => { analyticsPanel.style.display = 'none'; });

adminToggleBtn.addEventListener('click', () => {
    if (adminPanel.style.display === 'flex') { adminPanel.style.display = 'none'; } 
    else {
        const pwd = window.prompt("Enter Admin Password:");
        if (pwd === "```" || pwd === "admin") { adminPanel.style.display = 'flex'; } 
        else if (pwd !== null) { alert("Incorrect password!"); }
    }
});

settingsBtn.addEventListener('click', () => { settingsPanel.style.display = 'flex'; });
closeSettingsBtn.addEventListener('click', () => { settingsPanel.style.display = 'none'; });

factoryResetBtn.addEventListener('click', () => {
    if (window.confirm("Are you 100% sure you want to WIPE all your progress? This cannot be undone!")) {
        localStorage.removeItem('cameraClickerSave');
        location.reload(); 
    }
});

document.getElementById('adminAddScore').addEventListener('click', () => { score += 10000; updateDisplay(); });
document.getElementById('adminSpawnGold').addEventListener('click', () => { goldenCameraActive = false; goldenCamera.style.display = 'none'; clearTimeout(goldenCameraTimeout); spawnGoldenCamera(); });
document.getElementById('adminReset').addEventListener('click', () => { if (window.confirm("Are you sure?")) { localStorage.removeItem('cameraClickerSave'); location.reload(); } });

// INITIALIZATION
loadGame();
scheduleGoldenCamera();