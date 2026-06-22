let arenaRoomId = null;
let arenaPlayerRole = null; // 'p1' or 'p2'
let arenaUnsubscribe = null;
let arenaState = null;

// Initialize Teams Dropdown for Arena
function initArenaTeams() {
  const select = document.getElementById("arena-team1");
  if (!select) return;
  select.innerHTML = '<option value="">Selecione...</option>';
  
  if (window.comparacopaData && window.comparacopaData.groups) {
    for (const group in window.comparacopaData.groups) {
      const optgroup = document.createElement("optgroup");
      optgroup.label = `Grupo ${group}`;
      window.comparacopaData.groups[group].forEach(team => {
        const option = document.createElement("option");
        option.value = team.id;
        option.textContent = `${team.flag} ${team.name}`;
        optgroup.appendChild(option);
      });
      select.appendChild(optgroup);
    }
  }
}

// Criar Sala (Player 1)
async function arenaCreateRoom() {
  if (!window.firebaseDB) {
    alert("Firebase não configurado ou carregando.");
    return;
  }
  
  // Generate random 4-character code
  const code = Math.random().toString(36).substring(2, 6).toUpperCase();
  
  const roomData = {
    id: code,
    status: "waiting",
    createdAt: new Date().toISOString(),
    p1: { team: null, ready: false },
    p2: { team: null, ready: false },
    simulation: null
  };
  
  try {
    const { doc, setDoc } = window.firebaseAPI;
    await setDoc(doc(window.firebaseDB, "rooms", code), roomData);
    
    arenaRoomId = code;
    arenaPlayerRole = "p1";
    
    document.getElementById("arena-lobby").style.display = "none";
    document.getElementById("arena-active").style.display = "block";
    document.getElementById("arena-current-room").textContent = code;
    
    initArenaTeams();
    listenToRoom(code);
    
  } catch (err) {
    console.error(err);
    alert("Erro ao criar sala: " + err.message);
  }
}

// Entrar em Sala (Player 2)
async function arenaJoinRoom() {
  const codeInput = document.getElementById("arena-room-input").value.trim().toUpperCase();
  if (!codeInput) return alert("Digite o código da sala.");
  
  if (!window.firebaseDB) {
    alert("Firebase não configurado.");
    return;
  }

  try {
    const { doc, getDoc, updateDoc } = window.firebaseAPI;
    const roomRef = doc(window.firebaseDB, "rooms", codeInput);
    const snap = await getDoc(roomRef);
    
    if (!snap.exists()) {
      alert("Sala não encontrada.");
      return;
    }
    
    const data = snap.data();
    if (data.status !== "waiting") {
      alert("Esta sala já está em andamento ou fechada.");
      return;
    }
    
    await updateDoc(roomRef, { status: "connected" });
    
    arenaRoomId = codeInput;
    arenaPlayerRole = "p2";
    
    document.getElementById("arena-lobby").style.display = "none";
    document.getElementById("arena-active").style.display = "block";
    document.getElementById("arena-current-room").textContent = codeInput;
    
    // Altera interface visual para P2 (Ajusta os quadros)
    document.querySelector("#arena-p1-selects").innerHTML = `
      <label class="neo-label">Selecione seu Time:</label>
      <select id="arena-team1" class="neo-select" onchange="arenaUpdateTeamSelect(2)"></select>
    `;
    document.getElementById("btn-arena-ready-p1").setAttribute("onclick", "arenaToggleReady(2)");
    
    initArenaTeams();
    listenToRoom(codeInput);
    
  } catch (err) {
    console.error(err);
    alert("Erro ao entrar na sala: " + err.message);
  }
}

// Realtime Listener
function listenToRoom(code) {
  const { doc, onSnapshot } = window.firebaseAPI;
  
  arenaUnsubscribe = onSnapshot(doc(window.firebaseDB, "rooms", code), (snap) => {
    if (!snap.exists()) return;
    const data = snap.data();
    arenaState = data;
    
    updateArenaUI(data);
    
    // Check if both are ready to simulate
    if (data.status === "connected" && data.p1.ready && data.p2.ready) {
      if (arenaPlayerRole === "p1") {
        triggerSimulation(data);
      }
    }
    
    // Se a simulação já estiver rolando
    if (data.status === "playing" && data.simulation) {
      runAnimation(data.simulation);
    }
  });
}

function updateArenaUI(data) {
  const statusEl = document.getElementById("arena-status");
  statusEl.textContent = data.status === "waiting" ? "Aguardando P2..." : (data.status === "connected" ? "Escolhendo times" : "Simulando!");
  
  const p2Container = document.getElementById("arena-p2-status");
  if (data.status === "waiting") {
    p2Container.innerHTML = "Aguardando conexão...";
  } else {
    // If you are P1, read P2 data. If you are P2, read P1 data.
    const enemyData = arenaPlayerRole === "p1" ? data.p2 : data.p1;
    
    if (enemyData.ready) {
      p2Container.innerHTML = `<span style="color: #4CAF50; font-weight: bold;">✔ ADVERSÁRIO PRONTO</span><br><small>Time escolhido e escalado.</small>`;
    } else if (enemyData.team) {
      p2Container.innerHTML = `<span style="color: var(--dark-accent);">Adversário selecionou um time e está escalando...</span>`;
    } else {
      p2Container.innerHTML = "Adversário está escolhendo o time...";
    }
  }
}

async function arenaUpdateTeamSelect(playerNum) {
  const val = document.getElementById("arena-team1").value;
  if (!val) return;
  
  const { doc, updateDoc } = window.firebaseAPI;
  const roomRef = doc(window.firebaseDB, "rooms", arenaRoomId);
  
  if (arenaPlayerRole === "p1") {
    await updateDoc(roomRef, { "p1.team": val });
  } else {
    await updateDoc(roomRef, { "p2.team": val });
  }
}

async function arenaToggleReady(playerNum) {
  const val = document.getElementById("arena-team1").value;
  if (!val) return alert("Selecione um time primeiro!");
  
  document.getElementById("btn-arena-ready-p1").disabled = true;
  document.getElementById("btn-arena-ready-p1").textContent = "AGUARDANDO ADVERSÁRIO...";
  
  const { doc, updateDoc } = window.firebaseAPI;
  const roomRef = doc(window.firebaseDB, "rooms", arenaRoomId);
  
  if (arenaPlayerRole === "p1") {
    await updateDoc(roomRef, { "p1.ready": true });
  } else {
    await updateDoc(roomRef, { "p2.ready": true });
  }
}

async function triggerSimulation(data) {
  // P1 uses current engine logic (from app.js context)
  // For now, let's create a mockup simulation sequence
  const simData = {
    events: [
      { time: "00'", text: "Apita o árbitro! Começa o jogo!", anim: "start" },
      { time: "15'", text: "Toque de bola no meio campo...", anim: "mid" },
      { time: "30'", text: "Chute perigoso!", anim: "shoot-p1" },
      { time: "45'", text: "Fim do primeiro tempo. 0x0.", anim: "reset" },
      { time: "60'", text: "Ataque rápido pelo lado direito...", anim: "mid" },
      { time: "90'", text: "Fim de jogo! Empate! Vamos para a prorrogação!", anim: "reset" },
      { time: "105'", text: "Times cansados na prorrogação...", anim: "mid" },
      { time: "120'", text: "Fim da prorrogação! PÊNALTIS!", anim: "reset" },
      { time: "PÊNALTIS", text: "P1 chuta e... GOOOOL!", anim: "shoot-p1" },
      { time: "PÊNALTIS", text: "P2 chuta e... NA TRAVE! P1 VENCE!", anim: "shoot-p2" }
    ],
    winner: "p1"
  };

  const { doc, updateDoc } = window.firebaseAPI;
  const roomRef = doc(window.firebaseDB, "rooms", arenaRoomId);
  
  await updateDoc(roomRef, { 
    status: "playing",
    simulation: simData
  });
}

// Animation Engine
let currentEventIndex = 0;
let isAnimating = false;

function runAnimation(simData) {
  if (isAnimating) return; // Prevent double trigger if already running
  
  document.getElementById("arena-pitch-container").style.display = "block";
  document.getElementById("arena-p1-ready-container").parentElement.style.display = "none";
  document.getElementById("arena-p2-status").parentElement.style.display = "none";
  
  const narrator = document.getElementById("arena-narrator");
  const p1 = document.getElementById("arena-piece-p1");
  const p2 = document.getElementById("arena-piece-p2");
  const ball = document.getElementById("arena-ball");
  
  isAnimating = true;
  
  const playNext = () => {
    if (currentEventIndex >= simData.events.length) {
      narrator.innerHTML = `<strong>FIM DE JOGO! VENCEDOR: ${simData.winner.toUpperCase()}</strong>`;
      return;
    }
    
    const ev = simData.events[currentEventIndex];
    narrator.innerHTML = `<span style="color: var(--retro-yellow);">${ev.time}</span> - ${ev.text}`;
    
    // Reset classes
    p1.className = "arena-piece piece-p1";
    p2.className = "arena-piece piece-p2";
    
    if (ev.anim === "start" || ev.anim === "reset") {
      p1.style.transform = "translate(-100px, 0)";
      p2.style.transform = "translate(100px, 0)";
      ball.style.transform = "translate(0, 0)";
    } else if (ev.anim === "mid") {
      p1.style.transform = "translate(-30px, -20px)";
      p2.style.transform = "translate(30px, 20px)";
      ball.style.transform = "translate(-10px, 0)";
    } else if (ev.anim === "shoot-p1") {
      p1.classList.add("bump-anim");
      p1.style.transform = "translate(-10px, 0)";
      ball.style.transform = "translate(150px, -50px)"; // Chute para direita
    } else if (ev.anim === "shoot-p2") {
      p2.classList.add("bump-anim");
      p2.style.transform = "translate(10px, 0)";
      ball.style.transform = "translate(-150px, 50px)"; // Chute para esquerda
    }
    
    currentEventIndex++;
    setTimeout(playNext, 3000); // 3 segundos por evento
  };
  
  playNext();
}

// === PAUSE AND INTERVENTIONS LOGIC ===

let arenaPauseTimerInterval = null;

function startArenaPauseTimer(seconds) {
  let timeLeft = seconds;
  document.getElementById("arena-pause-timer").textContent = timeLeft;
  
  clearInterval(arenaPauseTimerInterval);
  arenaPauseTimerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("arena-pause-timer").textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(arenaPauseTimerInterval);
      // Auto confirm if time runs out
      arenaConfirmReadyToResume();
    }
  }, 1000);
}

function showArenaPausePanel(isPause) {
  if (isPause) {
    document.getElementById("arena-pause-panel").style.display = "block";
    document.getElementById("btn-arena-resume").disabled = false;
    document.getElementById("btn-arena-resume").textContent = "Pular / Estou Pronto";
    document.getElementById("arena-pause-waiting").style.display = "none";
    startArenaPauseTimer(30);
  } else {
    document.getElementById("arena-pause-panel").style.display = "none";
    clearInterval(arenaPauseTimerInterval);
  }
}

function arenaOpenSubModal() {
  // Populate select boxes with current team players
  document.getElementById("arena-modal-sub").style.display = "block";
}

function arenaConfirmSub() {
  // Save sub logic here
  alert("Substituição computada! (mockup)");
  document.getElementById("arena-modal-sub").style.display = "none";
}

function arenaOpenTacModal() {
  document.getElementById("arena-modal-tac").style.display = "block";
}

function arenaConfirmTac() {
  // Save tac logic here
  alert("Tática alterada! (mockup)");
  document.getElementById("arena-modal-tac").style.display = "none";
}

async function arenaConfirmReadyToResume() {
  document.getElementById("btn-arena-resume").disabled = true;
  document.getElementById("btn-arena-resume").textContent = "AGUARDANDO...";
  document.getElementById("arena-pause-waiting").style.display = "block";
  
  const { doc, updateDoc } = window.firebaseAPI;
  const roomRef = doc(window.firebaseDB, "rooms", arenaRoomId);
  
  if (arenaPlayerRole === "p1") {
    await updateDoc(roomRef, { "p1.readyToResume": true });
  } else {
    await updateDoc(roomRef, { "p2.readyToResume": true });
  }
}

// === ARENA SIMULATION ENGINE ===

function generateArenaPhase(startMin, endMin, isExtraTime, currentScoreA, currentScoreB) {
  // Mockup for now to test the state machine.
  // We will replace this with real math later.
  const events = [];
  let min = startMin;
  
  if (min === 0) events.push({ time: "00'", text: "Apita o árbitro! Começa o jogo na Arena!", anim: "start" });
  if (min === 46) events.push({ time: "46'", text: "Começa o segundo tempo!", anim: "start" });
  if (min === 91) events.push({ time: "91'", text: "Bola rolando na prorrogação!", anim: "start" });
  if (min === 106) events.push({ time: "106'", text: "Últimos 15 minutos de prorrogação!", anim: "start" });

  while(min < endMin) {
    min += Math.floor(Math.random() * 5) + 3;
    if (min >= endMin) min = endMin;
    events.push({ time: min + "'", text: "Toque de bola estudado...", anim: "mid" });
  }
  
  if (endMin === 22) events.push({ time: "22'", text: "Pausa para hidratação autorizada pelo juiz.", anim: "reset" });
  if (endMin === 45) events.push({ time: "45'", text: "Fim do primeiro tempo.", anim: "reset" });
  if (endMin === 67) events.push({ time: "67'", text: "Pausa para hidratação na etapa final.", anim: "reset" });
  if (endMin === 90) events.push({ time: "90'", text: "Fim do tempo regulamentar.", anim: "reset" });
  
  return {
    events,
    scoreA: currentScoreA,
    scoreB: currentScoreB
  };
}


// === SPEED CONTROLS ===
let arenaAnimSpeed = 1.0;

function arenaSetSpeed(mult) {
  arenaAnimSpeed = mult;
  document.getElementById("btn-speed-1").classList.remove("btn-green");
  document.getElementById("btn-speed-15").classList.remove("btn-green");
  document.getElementById("btn-speed-2").classList.remove("btn-green");
  
  if (mult === 1.0) document.getElementById("btn-speed-1").classList.add("btn-green");
  if (mult === 1.5) document.getElementById("btn-speed-15").classList.add("btn-green");
  if (mult === 2.0) document.getElementById("btn-speed-2").classList.add("btn-green");
}

