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
      if (arenaPlayerRole === "p1" && data.state !== "starting") {
        triggerSimulation(data);
      }
    }
    
    // Avançar de fase quando ambos clicam em "Estou Pronto / Pular" na pausa
    if (data.status === "playing" && data.p1.readyToResume && data.p2.readyToResume && arenaPlayerRole === "p1") {
      const currentState = data.state;
      const phases = {
        "first_half_1": "first_half_2",
        "first_half_2": "second_half_1",
        "second_half_1": "second_half_2",
        "second_half_2": "extra_time_1",
        "extra_time_1": "extra_time_2",
        "extra_time_2": "penalties"
      };
      
      const nextPhase = phases[currentState];
      if (nextPhase) {
        // We will prevent loop by updating state immediately
        arenaStartPhase(nextPhase);
      }
    }
    
    // Se a simulação já estiver rolando
    // Evita resetar se os states forem iguais e a animação já estiver ocorrendo.
    if (data.status === "playing" && data.simulation) {
      // Para não re-engatilhar a mesma fase
      if (!window.currentArenaPhaseRun || window.currentArenaPhaseRun !== data.state) {
        window.currentArenaPhaseRun = data.state;
        runAnimation(data.simulation);
      }
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

async function arenaStartPhase(phaseName) {
  if (arenaPlayerRole !== "p1") return; // Only P1 computes the simulation
  
  const phases = {
    "first_half_1": { start: 0, end: 22, nextPause: "break_hydration1" },
    "first_half_2": { start: 22, end: 45, nextPause: "half_time" },
    "second_half_1": { start: 45, end: 67, nextPause: "break_hydration2" },
    "second_half_2": { start: 67, end: 90, nextPause: "full_time" },
    "extra_time_1": { start: 90, end: 105, nextPause: "extra_time_break" },
    "extra_time_2": { start: 105, end: 120, nextPause: "extra_full_time" }
  };
  
  const phaseDef = phases[phaseName];
  if (!phaseDef) return;

  const simData = generateArenaPhase(phaseDef.start, phaseDef.end, arenaState);
  
  const { doc, updateDoc } = window.firebaseAPI;
  const roomRef = doc(window.firebaseDB, "rooms", arenaRoomId);
  
  await updateDoc(roomRef, { 
    "state": phaseName,
    "simulation": simData,
    "p1.readyToResume": false,
    "p2.readyToResume": false
  });
}

async function triggerSimulation(data) {
  // Chamado quando ambos estão ready pela primeira vez
  const { doc, updateDoc } = window.firebaseAPI;
  const roomRef = doc(window.firebaseDB, "rooms", arenaRoomId);
  
  await updateDoc(roomRef, { 
    status: "playing",
    state: "starting"
  });
  
  if (arenaPlayerRole === "p1") {
    // Inicializa placares e status no banco
    await updateDoc(roomRef, {
      scoreA: 0,
      scoreB: 0,
      injuryTime: 0,
      stats: {
        A: { shots: 0, corners: 0, fouls: 0, yellow: 0, red: 0, possession: 50 },
        B: { shots: 0, corners: 0, fouls: 0, yellow: 0, red: 0, possession: 50 }
      }
    });
    setTimeout(() => arenaStartPhase("first_half_1"), 2000);
  }
}

// Animation Engine
let currentEventIndex = 0;
let isAnimating = false;

function runAnimation(simData) {
  if (isAnimating) return; 
  
  // Esconder a tela de pausa sempre que começar uma nova animação
  showArenaPausePanel(false);
  
  document.getElementById("arena-pitch-container").style.display = "block";
  document.getElementById("arena-p1-ready-container").parentElement.style.display = "none";
  document.getElementById("arena-p2-status").parentElement.style.display = "none";
  
  const narrator = document.getElementById("arena-narrator");
  const p1 = document.getElementById("arena-piece-p1");
  const p2 = document.getElementById("arena-piece-p2");
  const ball = document.getElementById("arena-ball");
  
  isAnimating = true;
  currentEventIndex = 0;
  
  const playNext = () => {
    if (currentEventIndex >= simData.events.length) {
      isAnimating = false;
      // Animação terminou, mostrar painel de pausa se o status permitir
      if (arenaState.state && !arenaState.state.includes("half")) {
        showArenaPausePanel(true);
      }
      return;
    }
    
    const ev = simData.events[currentEventIndex];
    narrator.innerHTML = `<span style="color: var(--retro-yellow);">${ev.time}</span> - ${ev.text}`;
    
    // Atualizar placares na tela se houver alteração
    if (ev.scoreA !== undefined) document.getElementById("sim-score-a").textContent = ev.scoreA;
    if (ev.scoreB !== undefined) document.getElementById("sim-score-b").textContent = ev.scoreB;

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
      ball.style.transform = "translate(150px, -50px)"; 
    } else if (ev.anim === "shoot-p2") {
      p2.classList.add("bump-anim");
      p2.style.transform = "translate(10px, 0)";
      ball.style.transform = "translate(-150px, 50px)"; 
    }
    
    currentEventIndex++;
    // Base animation time: 2000ms / speed multiplier
    const timeToWait = 2000 / arenaAnimSpeed;
    setTimeout(playNext, timeToWait); 
  };
  
  playNext();
}

// === ARENA SIMULATION ENGINE ===

function getArenaSectorAverages(players, coords) {
  const defense = [];
  const midfield = [];
  const attack = [];
  players.forEach((p, idx) => {
    const slotPos = coords && coords[idx] ? coords[idx].pos : p.pos;
    const effOvr = getEffectivePlayerOvr ? getEffectivePlayerOvr(p, slotPos) : parseInt(p.ovr);
    const playerWithEff = { ...p, effectiveOvr: effOvr };
    if (slotPos === "GK" || slotPos === "DF") defense.push(playerWithEff);
    else if (slotPos === "MF") midfield.push(playerWithEff);
    else if (slotPos === "FW") attack.push(playerWithEff);
  });
  return {
    def: defense.reduce((sum, p) => sum + p.effectiveOvr, 0) / (defense.length || 1),
    mid: midfield.reduce((sum, p) => sum + p.effectiveOvr, 0) / (midfield.length || 1),
    att: attack.reduce((sum, p) => sum + p.effectiveOvr, 0) / (attack.length || 1)
  };
}

function getArenaFormationFactors(form) {
  const factors = {
    "4-2-4": { att: 1.25, def: 0.85 }, "3-4-3": { att: 1.20, def: 0.85 },
    "4-3-3": { att: 1.00, def: 1.00 }, "4-2-3-1": { att: 1.00, def: 1.00 },
    "4-4-2": { att: 0.95, def: 1.05 }, "3-5-2": { att: 1.05, def: 1.00 },
    "5-3-2": { att: 0.80, def: 1.25 }, "4-5-1": { att: 0.80, def: 1.20 }
  };
  return factors[form] || { att: 1.0, def: 1.0 };
}

function generateArenaPhase(startMin, endMin, stateData) {
  const events = [];
  let min = startMin;
  
  let scoreA = stateData.scoreA || 0;
  let scoreB = stateData.scoreB || 0;
  
  const teamA = stateData.p1.team;
  const teamB = stateData.p2.team;
  
  const squadA = stateData.p1.squad || window.comparacopaData.squads[teamA].players;
  const squadB = stateData.p2.squad || window.comparacopaData.squads[teamB].players;
  const formationA = stateData.p1.formation || window.comparacopaData.squads[teamA].formation || "4-3-3";
  const formationB = stateData.p2.formation || window.comparacopaData.squads[teamB].formation || "4-3-3";
  
  const teamAName = window.comparacopaData.squads[teamA].name;
  const teamBName = window.comparacopaData.squads[teamB].name;

  // Usa variáveis globais do app.js: formationsCoordinates, getEffectivePlayerOvr
  const coordsA = typeof formationsCoordinates !== "undefined" ? formationsCoordinates[formationA] : null;
  const coordsB = typeof formationsCoordinates !== "undefined" ? formationsCoordinates[formationB] : null;

  const secA = getArenaSectorAverages(squadA, coordsA);
  const secB = getArenaSectorAverages(squadB, coordsB);
  const formFactorsA = getArenaFormationFactors(formationA);
  const formFactorsB = getArenaFormationFactors(formationB);

  const attackPowerA = (secA.att * 0.7 + secA.mid * 0.3) * formFactorsA.att;
  const attackPowerB = (secB.att * 0.7 + secB.mid * 0.3) * formFactorsB.att;
  const defensePowerA = secA.def * formFactorsA.def;
  const defensePowerB = secB.def * formFactorsB.def;

  // Para ter controle de posse nos logs
  const totalPower = attackPowerA + attackPowerB;
  const posA = Math.round((attackPowerA / totalPower) * 100);

  const chanceGoalA = 4.0 + (attackPowerA - defensePowerB) * 1.5;
  const chanceGoalB = 4.0 + (attackPowerB - defensePowerA) * 1.5;

  const getOffensivePlayer = (squad) => {
    const off = squad.filter(p => p.pos !== "GK");
    return off.length > 0 ? off[Math.floor(Math.random() * off.length)].name : "Jogador";
  };
  const getDefensivePlayer = (squad) => {
    const def = squad.filter(p => p.pos === "DF" || p.pos === "MF");
    return def.length > 0 ? def[Math.floor(Math.random() * def.length)].name : "Defensor";
  };

  if (min === 0) events.push({ time: "00'", text: "Apita o árbitro! Começa o jogo na Arena!", anim: "start" });
  if (min === 46) events.push({ time: "46'", text: "Começa o segundo tempo! A bola volta a rolar!", anim: "start" });
  if (min === 91) events.push({ time: "91'", text: "Bola rolando na prorrogação! Haja coração!", anim: "start" });
  if (min === 106) events.push({ time: "106'", text: "Últimos 15 minutos de prorrogação!", anim: "start" });

  while(min < endMin) {
    min += Math.floor(Math.random() * 5) + 3;
    if (min >= endMin) min = endMin;
    
    // Motor de Física e Probabilidade
    const randomVal = Math.random() * 100;
    
    if (randomVal < chanceGoalA) {
      scoreA++;
      const scorer = getOffensivePlayer(squadA);
      events.push({ time: min + "'", text: `GOOOOOOOOL do ${teamAName}! ${scorer} estufa as redes! (${scoreA}-${scoreB})`, anim: "shoot-p1", scoreA, scoreB });
    } else if (randomVal < chanceGoalA + chanceGoalB) {
      scoreB++;
      const scorer = getOffensivePlayer(squadB);
      events.push({ time: min + "'", text: `GOOOOOOOOL do ${teamBName}! ${scorer} marca um golaço! (${scoreA}-${scoreB})`, anim: "shoot-p2", scoreA, scoreB });
    } else if (randomVal < 35) {
      const isTeamA = Math.random() > 0.5;
      const oppGk = isTeamA ? squadB[0].name : squadA[0].name;
      const shooter = isTeamA ? getOffensivePlayer(squadA) : getOffensivePlayer(squadB);
      const team = isTeamA ? teamAName : teamBName;
      events.push({ time: min + "'", text: `Quase gol do ${team}! ${shooter} chuta forte mas ${oppGk} faz defesa espetacular!`, anim: isTeamA ? "shoot-p1" : "shoot-p2" });
    } else if (randomVal < 50) {
      const isTeamA = Math.random() > 0.5;
      const team = isTeamA ? teamAName : teamBName;
      events.push({ time: min + "'", text: `Escanteio para o ${team}. A zaga adversária afasta o perigo.`, anim: "mid" });
    } else if (randomVal < 70) {
      const isTeamA = Math.random() > 0.5;
      const actingTeam = isTeamA ? teamAName : teamBName;
      const foulSquad = isTeamA ? squadA : squadB;
      const foulPlayer = getDefensivePlayer(foulSquad);
      const cardChance = Math.random();
      if (cardChance < 0.20) {
        events.push({ time: min + "'", text: `Falta dura de ${foulPlayer} (${actingTeam})! O árbitro mostra o cartão amarelo.`, anim: "reset" });
      } else {
        events.push({ time: min + "'", text: `Falta tática cometida por ${foulPlayer} (${actingTeam}) para matar o ataque.`, anim: "mid" });
      }
    } else {
      const isTeamA = Math.random() > (posA / 100);
      const team = isTeamA ? teamAName : teamBName;
      events.push({ time: min + "'", text: `${team} valoriza a posse de bola e troca passes com calma no meio campo.`, anim: "mid" });
    }
  }
  
  // Tratamento dos fins de fase
  if (endMin === 22) events.push({ time: "22'", text: "O juiz autoriza a parada técnica para hidratação.", anim: "reset" });
  if (endMin === 45) events.push({ time: "45'", text: "Fim do primeiro tempo.", anim: "reset" });
  if (endMin === 67) events.push({ time: "67'", text: "Nova parada para hidratação no segundo tempo.", anim: "reset" });
  
  if (endMin === 90) {
    const totalAcre = stateData.injuryTime || 0;
    if (totalAcre > 0) {
      events.push({ time: `90'`, text: `O árbitro dá +${totalAcre} minutos de acréscimo!`, anim: "mid" });
    }
    events.push({ time: "FIM", text: "Fim do tempo regulamentar.", anim: "reset" });
  }
  
  if (endMin === 105) events.push({ time: "105'", text: "Intervalo rápido da prorrogação.", anim: "reset" });
  if (endMin === 120) events.push({ time: "120'", text: "Fim da prorrogação! Se o jogo estiver empatado, vamos para os PÊNALTIS!", anim: "reset" });
  
  return {
    events,
    scoreA,
    scoreB
  };
}

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

