let score = 0; let passiveRate = 0; let clickPower = 1;

let autoFlashCount = 0; let autoFlashCost = 50;
let grannyCount = 0; let grannyCost = 450;
let lensCount = 0; let lensCost = 1000;
let ringLightCount = 0; let ringLightCost = 1500;
let droneCount = 0; let droneCost = 5000;
let dslrCount = 0; let dslrCost = 25000;
let satelliteCount = 0; let satelliteCost = 50000;

// New Late Game Variables
let hubbleCount = 0; let hubbleCost = 5000000;
let quantumCount = 0; let quantumCost = 50000000;
let alienCount = 0; let alienCost = 2000000000;
let matrixCount = 0; let matrixCost = 50000000000;
const winCost = 1000000000000; // 1 Trillion
let timesWon = 0; // Crowns

let comboValue = 0; let comboMultiplier = 1; 

// Analytics & Timestamps
let statsManualClicks = 0; let statsPointsSpent = 0;
let statsGoldenCaught = 0; let statsTimePlayed = 0;
let lastSaveTime = Date.now();

// DOM Elements
const scoreDisplay = document.getElementById('score'); const cpsDisplay = document.getElementById('cpsDisplay');
const cameraBtn = document.getElementById('cameraBtn');
const comboFill = document.getElementById('comboFill'); const comboText = document.getElementById('comboText');

const crownDisplay = document.getElementById('crownDisplay'); const crownCount = document.getElementById('crownCount');
const winModal = document.getElementById('winModal'); const prestigeBtn = document.getElementById('prestigeBtn');

// Shop Buttons & Displays
const autoFlashBtn = document.getElementById('autoFlashBtn'); const autoFlashCostDisplay = document.getElementById('autoFlashCost');
const grannyBtn = document.getElementById('grannyBtn'); const grannyCostDisplay = document.getElementById('grannyCost');
const lensBtn = document.getElementById('lensBtn'); const lensCostDisplay = document.getElementById('lensCost');
const ringLightBtn = document.getElementById('ringLightBtn'); const ringLightCostDisplay = document.getElementById('ringLightCost');
const droneBtn = document.getElementById('droneBtn'); const droneCostDisplay = document.getElementById('droneCost');
const dslrBtn = document.getElementById('dslrBtn'); const dslrCostDisplay = document.getElementById('dslrCost');
const satelliteBtn = document.getElementById('satelliteBtn'); const satelliteCostDisplay = document.getElementById('satelliteCost');

const hubbleBtn = document.getElementById('hubbleBtn'); const hubbleCostDisplay = document.getElementById('hubbleCost');
const quantumBtn = document.getElementById('quantumBtn'); const quantumCostDisplay = document.getElementById('quantumCost');
const alienBtn = document.getElementById('alienBtn'); const alienCostDisplay = document.getElementById('alienCost');
const matrixBtn = document.getElementById('matrixBtn'); const matrixCostDisplay = document.getElementById('matrixCost');
const winBtn = document.getElementById('winBtn');

// OFFLINE POPUP ELEMENTS
const offlinePopup = document.getElementById('offlinePopup');
const offlineText = document.getElementById('offlineText');
const offlineReward = document.getElementById('offlineReward');
const offlineCapText = document.getElementById('offlineCapText');
const closeOfflineBtn = document.getElementById('closeOfflineBtn');
closeOfflineBtn.addEventListener('click', () => { offlinePopup.style.display = 'none'; });

// Helper for large numbers
function formatNum(num) { return Math.floor(num).toLocaleString(); }

function saveGame() {
    lastSaveTime = Date.now();
    const saveData = {
        score, passiveRate, clickPower,
        autoFlashCount, autoFlashCost, grannyCount, grannyCost,
        lensCount, lensCost, ringLightCount, ringLightCost,
        droneCount, droneCost, dslrCount, dslrCost, satelliteCount, satelliteCost,
        hubbleCount, hubbleCost, quantumCount, quantumCost, alienCount, alienCost, matrixCount, matrixCost,
        statsManualClicks, statsPointsSpent, statsGoldenCaught, statsTimePlayed,
        lastSaveTime, timesWon
    };
    localStorage.setItem('cameraClickerSave', JSON.stringify(saveData));
}

function loadGame() {
    const savedString = localStorage.getItem('cameraClickerSave');
    if (savedString) {
        const saveData = JSON.parse(savedString);
        score = saveData.score || 0; passiveRate = saveData.passiveRate || 0; clickPower = saveData.clickPower || 1;
        autoFlashCount = saveData.autoFlashCount || 0; autoFlashCost = saveData.autoFlashCost || 50;
        grannyCount = saveData.grannyCount || 0; grannyCost = saveData.grannyCost || 450;
        lensCount = saveData.lensCount || 0; lensCost = saveData.lensCost || 1000;
        ringLightCount = saveData.ringLightCount || 0; ringLightCost = saveData.ringLightCost || 1500;
        droneCount = saveData.droneCount || 0; droneCost = saveData.droneCost || 5000;
        dslrCount = saveData.dslrCount || 0; dslrCost = saveData.dslrCost || 25000;
        satelliteCount = saveData.satelliteCount || 0; satelliteCost = saveData.satelliteCost || 50000;
        
        hubbleCount = saveData.hubbleCount || 0; hubbleCost = saveData.hubbleCost || 5000000;
        quantumCount = saveData.quantumCount || 0; quantumCost = saveData.quantumCost || 50000000;
        alienCount = saveData.alienCount || 0; alienCost = saveData.alienCost || 2000000000;
        matrixCount = saveData.matrixCount || 0; matrixCost = saveData.matrixCost || 50000000000;
        timesWon = saveData.timesWon || 0;
        
        statsManualClicks = saveData.statsManualClicks || 0; statsPointsSpent = saveData.statsPointsSpent || 0;
        statsGoldenCaught = saveData.statsGoldenCaught || 0; statsTimePlayed = saveData.statsTimePlayed || 0;
        
        autoFlashCostDisplay.textContent = formatNum(autoFlashCost); grannyCostDisplay.textContent = formatNum(grannyCost);
        lensCostDisplay.textContent = formatNum(lensCost); ringLightCostDisplay.textContent = formatNum(ringLightCost);
        droneCostDisplay.textContent = formatNum(droneCost); dslrCostDisplay.textContent = formatNum(dslrCost);
        satelliteCostDisplay.textContent = formatNum(satelliteCost);
        hubbleCostDisplay.textContent = formatNum(hubbleCost); quantumCostDisplay.textContent = formatNum(quantumCost);
        alienCostDisplay.textContent = formatNum(alienCost); matrixCostDisplay.textContent = formatNum(matrixCost);

        if (timesWon > 0) { crownDisplay.style.display = 'block'; crownCount.textContent = formatNum(timesWon); }

        if (saveData.lastSaveTime && passiveRate > 0) {
            const timeDiffSeconds = Math.floor((Date.now() - saveData.lastSaveTime) / 1000);
            if (timeDiffSeconds >= 60) {
                const isCapped = timeDiffSeconds > 3600; const effectiveSeconds = isCapped ? 3600 : timeDiffSeconds;
                const earned = Math.floor(effectiveSeconds * passiveRate); score += earned;
                if (effectiveSeconds >= 3600) { offlineText.textContent = `You were away for over 1 hour.`; } 
                else { const m = Math.floor(effectiveSeconds / 60); offlineText.textContent = `You were away for ${m} minute${m !== 1 ? 's' : ''}.`; }
                offlineReward.textContent = `+${formatNum(earned)}`;
                if (isCapped) { offlineCapText.style.display = 'block'; }
                offlinePopup.style.display = 'flex';
            }
        }
        updateDisplay();
    }
}

setInterval(saveGame, 3000);

setInterval(() => {
    statsTimePlayed++;
    if (document.getElementById('analyticsPanel').style.display === 'flex') { updateAnalyticsUI(); }
}, 1000);

function updateDisplay() {
    const scoreStr = formatNum(score);
    scoreDisplay.textContent = scoreStr; 
    
    // Dynamic text shrinking for massive numbers (trillions+)
    if (scoreStr.length > 15) {
        scoreDisplay.style.fontSize = '0.55em';
    } else if (scoreStr.length > 12) {
        scoreDisplay.style.fontSize = '0.75em';
    } else {
        scoreDisplay.style.fontSize = '1em';
    }

    cpsDisplay.textContent = `per second: ${formatNum(passiveRate)}`;
    
    autoFlashBtn.disabled = score < autoFlashCost; grannyBtn.disabled = score < grannyCost;
    lensBtn.disabled = score < lensCost; ringLightBtn.disabled = score < ringLightCost;
    droneBtn.disabled = score < droneCost; dslrBtn.disabled = score < dslrCost;
    satelliteBtn.disabled = score < satelliteCost;
    hubbleBtn.disabled = score < hubbleCost; quantumBtn.disabled = score < quantumCost;
    alienBtn.disabled = score < alienCost; matrixBtn.disabled = score < matrixCost;
    winBtn.disabled = score < winCost;
}

// MAIN 100ms GAME LOOP
setInterval(() => {
    if (passiveRate > 0) { score += (passiveRate / 10); }
    comboValue -= 1.5; if (comboValue < 0) comboValue = 0;
    
    if (comboValue >= 80) {
        comboMultiplier = 2; comboFill.classList.add('active');
        comboText.textContent = '2x!'; comboText.style.color = '#fdcb6e'; comboText.style.transform = 'scale(1.2)';
    } else {
        comboMultiplier = 1; comboFill.classList.remove('active');
        comboText.textContent = '1x'; comboText.style.color = '#fff'; comboText.style.transform = 'scale(1)';
    }
    comboFill.style.height = comboValue + '%'; updateDisplay();
}, 100);

// HELPER: Spawn Floating Text
function spawnFloatText(e, text, isGolden, sourceElement) {
    const floatEl = document.createElement('div');
    floatEl.classList.add('floating-number');
    if (isGolden) {
        floatEl.style.color = '#fdcb6e';
        floatEl.classList.add('golden-reward');
    }
    floatEl.textContent = text;

    const rect = sourceElement.getBoundingClientRect();
    const x = (e && e.pageX !== undefined && e.pageX !== 0) ? e.pageX : rect.left + rect.width / 2;
    const y = (e && e.pageY !== undefined && e.pageY !== 0) ? e.pageY : rect.top + rect.height / 2;
    
    floatEl.style.left = (x - 30 + Math.random() * 60) + 'px';
    floatEl.style.top = (y - 30 + Math.random() * 60) + 'px';
    
    document.body.appendChild(floatEl);
    setTimeout(() => { floatEl.remove(); }, 800);
}

// MANUAL CLICKING
cameraBtn.addEventListener('click', (e) => {
    statsManualClicks++; 
    comboValue += 8; 
    if (comboValue > 100) comboValue = 100;
    
    const earned = clickPower * comboMultiplier; 
    score += earned; 
    updateDisplay();

    const text = comboMultiplier === 2 ? `+${formatNum(earned)} 📸 ✨` : `+${formatNum(earned)} 📸`;
    spawnFloatText(e, text, comboMultiplier === 2, cameraBtn);
});

// SHOP ACTIONS
function buy(cost, increasePassive, increaseClick, costMultiplier) {
    score -= cost; statsPointsSpent += cost;
    if (increasePassive > 0) passiveRate += increasePassive;
    if (increaseClick > 0) clickPower += increaseClick;
    updateDisplay();
}

autoFlashBtn.addEventListener('click', () => { if (score >= autoFlashCost) { buy(autoFlashCost, 0.1, 0); autoFlashCount++; if (autoFlashCount >= 100) autoFlashCost = Math.ceil(autoFlashCost * 1.10); else autoFlashCost = 50; autoFlashCostDisplay.textContent = formatNum(autoFlashCost); updateDisplay(); } });
grannyBtn.addEventListener('click', () => { if (score >= grannyCost) { buy(grannyCost, 1.0, 0); grannyCount++; if (grannyCount >= 10) grannyCost = Math.ceil(grannyCost * 1.15); else grannyCost = 450; grannyCostDisplay.textContent = formatNum(grannyCost); updateDisplay(); } });
lensBtn.addEventListener('click', () => { if (score >= lensCost) { buy(lensCost, 0, 1); lensCount++; if (lensCount >= 5) lensCost = Math.ceil(lensCost * 1.50); else lensCost = 1000; lensCostDisplay.textContent = formatNum(lensCost); updateDisplay(); } });
ringLightBtn.addEventListener('click', () => { if (score >= ringLightCost) { buy(ringLightCost, 4.0, 0); ringLightCount++; if (ringLightCount >= 5) ringLightCost = Math.ceil(ringLightCost * 1.15); else ringLightCost = 1500; ringLightCostDisplay.textContent = formatNum(ringLightCost); updateDisplay(); } });
droneBtn.addEventListener('click', () => { if (score >= droneCost) { buy(droneCost, 15.0, 0); droneCount++; if (droneCount >= 5) droneCost = Math.ceil(droneCost * 1.20); else droneCost = 5000; droneCostDisplay.textContent = formatNum(droneCost); updateDisplay(); } });
dslrBtn.addEventListener('click', () => { if (score >= dslrCost) { buy(dslrCost, 0, 10); dslrCount++; if (dslrCount >= 3) dslrCost = Math.ceil(dslrCost * 1.50); else dslrCost = 25000; dslrCostDisplay.textContent = formatNum(dslrCost); updateDisplay(); } });
satelliteBtn.addEventListener('click', () => { if (score >= satelliteCost) { buy(satelliteCost, 100.0, 0); satelliteCount++; if (satelliteCount >= 5) satelliteCost = Math.ceil(satelliteCost * 1.25); else satelliteCost = 50000; satelliteCostDisplay.textContent = formatNum(satelliteCost); updateDisplay(); } });

// NEW EXPONENTIAL UPGRADES
hubbleBtn.addEventListener('click', () => { if (score >= hubbleCost) { buy(hubbleCost, 5000.0, 0); hubbleCount++; if (hubbleCount >= 3) hubbleCost = Math.ceil(hubbleCost * 1.30); else hubbleCost = 5000000; hubbleCostDisplay.textContent = formatNum(hubbleCost); updateDisplay(); } });
quantumBtn.addEventListener('click', () => { if (score >= quantumCost) { buy(quantumCost, 0, 1000); quantumCount++; if (quantumCount >= 3) quantumCost = Math.ceil(quantumCost * 1.40); else quantumCost = 50000000; quantumCostDisplay.textContent = formatNum(quantumCost); updateDisplay(); } });
alienBtn.addEventListener('click', () => { if (score >= alienCost) { buy(alienCost, 500000.0, 0); alienCount++; if (alienCount >= 3) alienCost = Math.ceil(alienCost * 1.35); else alienCost = 2000000000; alienCostDisplay.textContent = formatNum(alienCost); updateDisplay(); } });
matrixBtn.addEventListener('click', () => { if (score >= matrixCost) { buy(matrixCost, 0, 100000); matrixCount++; if (matrixCount >= 2) matrixCost = Math.ceil(matrixCost * 1.50); else matrixCost = 50000000000; matrixCostDisplay.textContent = formatNum(matrixCost); updateDisplay(); } });

// WIN THE GAME
winBtn.addEventListener('click', () => {
    if (score >= winCost) {
        score -= winCost; updateDisplay();
        winModal.style.display = 'flex';
    }
});

// PRESTIGE LOGIC
prestigeBtn.addEventListener('click', () => {
    timesWon++;
    localStorage.removeItem('cameraClickerSave'); 
    const freshSave = { timesWon: timesWon };
    localStorage.setItem('cameraClickerSave', JSON.stringify(freshSave));
    location.reload(); 
});

// --- 🌟 GOLDEN CAMERA SYSTEM ---
const goldenCamera = document.createElement('div'); goldenCamera.id = 'goldenCamera'; goldenCamera.textContent = '\u2728\uD83D\uDCF8\u2728'; document.body.appendChild(goldenCamera);
let goldenCameraActive = false; let goldenCameraTimeout;
function spawnGoldenCamera() {
    if (goldenCameraActive) return; goldenCameraActive = true;
    const startLeft = Math.random() > 0.5; const startY = Math.random() * (window.innerHeight - 300) + 150; const endY = Math.random() * (window.innerHeight - 300) + 150;
    goldenCamera.style.transition = 'none'; goldenCamera.style.top = startY + 'px';
    if (startLeft) { goldenCamera.style.left = '-150px'; } else { goldenCamera.style.left = (window.innerWidth + 150) + 'px'; }
    goldenCamera.style.display = 'block'; void goldenCamera.offsetWidth; 
    goldenCamera.style.transition = 'left 12s linear, top 12s linear'; goldenCamera.style.top = endY + 'px';
    if (startLeft) { goldenCamera.style.left = (window.innerWidth + 150) + 'px'; } else { goldenCamera.style.left = '-150px'; }
    goldenCameraTimeout = setTimeout(() => { goldenCamera.style.display = 'none'; goldenCameraActive = false; scheduleGoldenCamera(); }, 12000);
}
function scheduleGoldenCamera() { setTimeout(spawnGoldenCamera, 20000 + Math.random() * 25000); }

goldenCamera.addEventListener('click', (e) => {
    if (!goldenCameraActive) return; 
    statsGoldenCaught++; 
    goldenCamera.style.display = 'none'; 
    goldenCameraActive = false; 
    clearTimeout(goldenCameraTimeout);
    
    const reward = Math.max(150, Math.floor(passiveRate * 120)); 
    score += reward; 
    updateDisplay();
    
    spawnFloatText(e, `+${formatNum(reward)} ⭐!`, true, goldenCamera);
    
    scheduleGoldenCamera();
});

// --- ⚙️ SETTINGS, ANALYTICS & 🛠️ ADMIN MODE ---
const adminPanel = document.getElementById('adminPanel'); const adminToggleBtn = document.getElementById('adminToggleBtn');
const settingsBtn = document.getElementById('settingsBtn'); const settingsPanel = document.getElementById('settingsPanel'); const closeSettingsBtn = document.getElementById('closeSettingsBtn');
const factoryResetBtn = document.getElementById('factoryResetBtn'); const analyticsBtn = document.getElementById('analyticsBtn'); const analyticsPanel = document.getElementById('analyticsPanel'); const closeAnalyticsBtn = document.getElementById('closeAnalyticsBtn');

function formatTime(totalSeconds) { const h = Math.floor(totalSeconds / 3600); const m = Math.floor((totalSeconds % 3600) / 60); const s = totalSeconds % 60; let timeStr = ""; if (h > 0) timeStr += `${h}h `; if (m > 0 || h > 0) timeStr += `${m}m `; timeStr += `${s}s`; return timeStr; }

function updateAnalyticsUI() { document.getElementById('statClicks').textContent = formatNum(statsManualClicks); document.getElementById('statSpent').textContent = formatNum(statsPointsSpent); document.getElementById('statGolden').textContent = formatNum(statsGoldenCaught); document.getElementById('statTime').textContent = formatTime(statsTimePlayed); }
analyticsBtn.addEventListener('click', () => { updateAnalyticsUI(); analyticsPanel.style.display = 'flex'; }); closeAnalyticsBtn.addEventListener('click', () => { analyticsPanel.style.display = 'none'; });
adminToggleBtn.addEventListener('click', () => { if (adminPanel.style.display === 'flex') { adminPanel.style.display = 'none'; } else { const pwd = window.prompt("Enter Admin Password:"); if (pwd === "```" || pwd === "admin") { adminPanel.style.display = 'flex'; } else if (pwd !== null) { alert("Incorrect password!"); } } });
settingsBtn.addEventListener('click', () => { settingsPanel.style.display = 'flex'; }); closeSettingsBtn.addEventListener('click', () => { settingsPanel.style.display = 'none'; });

factoryResetBtn.addEventListener('click', () => {
    const confirmVal = window.prompt("Type 'RESET' to permanently wipe all progress (INCLUDING CROWNS):");
    if (confirmVal === "RESET") { localStorage.removeItem('cameraClickerSave'); location.reload(); } 
    else if (confirmVal !== null) { alert("Reset canceled."); }
});

document.getElementById('adminAddScore').addEventListener('click', () => { score += 10000; updateDisplay(); });
document.getElementById('adminAddTrillion').addEventListener('click', () => { score += 1000000000000; updateDisplay(); });
document.getElementById('adminSpawnGold').addEventListener('click', () => { goldenCameraActive = false; goldenCamera.style.display = 'none'; clearTimeout(goldenCameraTimeout); spawnGoldenCamera(); });

// INITIALIZATION
loadGame();
scheduleGoldenCamera();
prestigeBtn.addEventListener('mouseenter', () => { prestigeBtn.style.transform = 'scale(1.05)'; });
prestigeBtn.addEventListener('mouseleave', () => { prestigeBtn.style.transform = 'scale(1)'; });