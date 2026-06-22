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
  const btn = document.querySelector('button[onclick="arenaCreateRoom()"]');
  if (btn) btn.innerHTML = '<i data-lucide="loader" style="width: 18px; margin-right: 5px; vertical-align: middle;"></i> Criando...';

  if (!window.firebaseDB) {
    alert("Firebase não configurado ou bloqueado no seu navegador.");
    if (btn) btn.innerHTML = '<i data-lucide="plus-circle" style="width: 18px; margin-right: 5px; vertical-align: middle;"></i> Criar Sala';
    return;
  }
  
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
    
    // Timeout promise to prevent indefinite hanging if Firebase connection fails
    const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 8000));
    await Promise.race([setDoc(doc(window.firebaseDB, "rooms", code), roomData), timeout]);
    
    arenaRoomId = code;
    arenaPlayerRole = "p1";
    
    document.getElementById("arena-lobby").style.display = "none";
    document.getElementById("arena-active").style.display = "block";
    document.getElementById("arena-current-room").textContent = code;
    
    initArenaTeams();
    listenToRoom(code);
    
  } catch (err) {
    console.error("Erro ao criar sala:", err);
    alert("Erro ao conectar no banco de dados. Verifique a internet ou se o banco bloqueou o acesso.");
  } finally {
    if (btn) btn.innerHTML = '<i data-lucide="plus-circle" style="width: 18px; margin-right: 5px; vertical-align: middle;"></i> Criar Sala';
    if (window.lucide) window.lucide.createIcons();
  }
}

// Entrar em Sala (Player 2)
async function arenaJoinRoom() {
  const codeInput = document.getElementById("arena-room-input").value.trim().toUpperCase();
  if (!codeInput) return alert("Digite o código da sala.");
  
  const btn = document.querySelector('button[onclick="arenaJoinRoom()"]');
  if (btn) btn.innerHTML = '<i data-lucide="loader" style="width: 18px; margin-right: 5px; vertical-align: middle;"></i> Entrando...';

  if (!window.firebaseDB) {
    alert("Firebase não configurado ou bloqueado no seu navegador.");
    if (btn) btn.innerHTML = '<i data-lucide="log-in" style="width: 18px; margin-right: 5px; vertical-align: middle;"></i> Entrar';
    return;
  }

  try {
    const { doc, getDoc, updateDoc } = window.firebaseAPI;
    const roomRef = doc(window.firebaseDB, "rooms", codeInput);
    
    const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 8000));
    const snap = await Promise.race([getDoc(roomRef), timeout]);
    
    if (!snap.exists()) {
      alert("Sala não encontrada.");
      return;
    }
    
    // Atualiza campo visual
    arenaRenderPitch(snap.data());
    
    const data = snap.data();
    if (data.status !== "waiting") {
      alert("Esta sala já está em andamento ou fechada.");
      return;
    }
    
    await Promise.race([updateDoc(roomRef, { status: "connected" }), new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 8000))]);
    
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
    alert("Erro ao entrar na sala. Verifique a internet ou se o banco bloqueou o acesso.");
  } finally {
    if (btn) btn.innerHTML = '<i data-lucide="log-in" style="width: 18px; margin-right: 5px; vertical-align: middle;"></i> Entrar';
    if (window.lucide) window.lucide.createIcons();
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
      
      let nextPhase = phases[currentState];
      
      // Só vai para a prorrogação se estiver empatado aos 90'
      if (currentState === "second_half_2" && data.scoreA !== data.scoreB) {
        nextPhase = "finished";
      }
      // Só vai para pênaltis se estiver empatado após a prorrogação
      if (currentState === "extra_time_2" && data.scoreA !== data.scoreB) {
        nextPhase = "finished";
      }
      
      if (nextPhase === "finished") {
        const { doc, updateDoc } = window.firebaseAPI;
        updateDoc(doc(window.firebaseDB, "rooms", arenaRoomId), { state: "finished" });
        arenaState.p1.readyToResume = false;
        arenaState.p2.readyToResume = false;
      } else if (nextPhase) {
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
    "first_half_1": { start: 0, end: 22 },
    "first_half_2": { start: 22, end: 45 },
    "second_half_1": { start: 45, end: 67 },
    "second_half_2": { start: 67, end: 90 },
    "extra_time_1": { start: 90, end: 105 },
    "extra_time_2": { start: 105, end: 120 }
  };
  
  let simData;
  if (phaseName === "penalties") {
    simData = generateArenaPenalties(arenaState);
  } else {
    const phaseDef = phases[phaseName];
    if (!phaseDef) return;
    simData = generateArenaPhase(phaseDef.start, phaseDef.end, arenaState);
  }
  
  const { doc, updateDoc } = window.firebaseAPI;
  const roomRef = doc(window.firebaseDB, "rooms", arenaRoomId);
  
  await updateDoc(roomRef, { 
    "state": phaseName,
    "scoreA": simData.scoreA !== undefined ? simData.scoreA : arenaState.scoreA,
    "scoreB": simData.scoreB !== undefined ? simData.scoreB : arenaState.scoreB,
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
    // Inicializa placares, status, e limites de subs/táticas no banco
    await updateDoc(roomRef, {
      scoreA: 0,
      scoreB: 0,
      injuryTime: 0,
      "p1.subsLeft": 4,
      "p1.tacsLeft": 2,
      "p2.subsLeft": 4,
      "p2.tacsLeft": 2,
      "p1.squad": window.comparacopaData.squads[data.p1.team].players,
      "p1.bench": window.comparacopaData.squads[data.p1.team].bench.map((p, idx) => ({ ...p, no: p.no || (12 + idx) })),
      "p2.squad": window.comparacopaData.squads[data.p2.team].players,
      "p2.bench": window.comparacopaData.squads[data.p2.team].bench.map((p, idx) => ({ ...p, no: p.no || (12 + idx) })),
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
  
  const arenaSpeedMs = 2000 / arenaAnimSpeed;
  
  const playNext = () => {
    if (currentEventIndex >= simData.events.length) {
      isAnimating = false;
      // Animação terminou, mostrar painel de pausa ou resumo final
      if (arenaState.state === "finished") {
        arenaShowMatchSummary();
      } else if (arenaState.state && !arenaState.state.includes("half")) {
        showArenaPausePanel(true);
      }
      return;
    }
    
    const ev = simData.events[currentEventIndex];
    if (!narrator) return;
    narrator.textContent = ev.text;
    
    let prevScoreA = parseInt(document.getElementById("sim-score-a").textContent) || 0;
    let prevScoreB = parseInt(document.getElementById("sim-score-b").textContent) || 0;

    // Atualizar placares na tela se houver alteração
    if (ev.scoreA !== undefined) {
      if (ev.scoreA > prevScoreA) triggerArenaFireworks("left");
      document.getElementById("sim-score-a").textContent = ev.scoreA;
    }
    if (ev.scoreB !== undefined) {
      if (ev.scoreB > prevScoreB) triggerArenaFireworks("right");
      document.getElementById("sim-score-b").textContent = ev.scoreB;
    }

    // CSS Anim for the event
    const p1Pieces = document.querySelectorAll('.p1-piece');
    const p2Pieces = document.querySelectorAll('.p2-piece');
    
    p1Pieces.forEach(el => el.style.transform = "scale(1)");
    p2Pieces.forEach(el => el.style.transform = "scale(1)");

    if (ev.anim === "start") {
      ball.style.left = "50%";
      ball.style.top = "50%";
    } else if (ev.anim === "shoot-p1") {
      ball.style.left = "90%";
      ball.style.top = "50%";
      p1Pieces.forEach(el => {
        el.style.transform = "scale(1.3)";
        el.style.transition = "transform 0.2s";
      });
    } else if (ev.anim === "shoot-p2") {
      ball.style.left = "10%";
      ball.style.top = "50%";
      p2Pieces.forEach(el => {
        el.style.transform = "scale(1.3)";
        el.style.transition = "transform 0.2s";
      });
    } else if (ev.anim === "mid") {
      ball.style.left = (40 + Math.random() * 20) + "%";
      ball.style.top = (30 + Math.random() * 40) + "%";
      const randomP1 = p1Pieces[Math.floor(Math.random() * p1Pieces.length)];
      const randomP2 = p2Pieces[Math.floor(Math.random() * p2Pieces.length)];
      if(randomP1) randomP1.style.transform = "scale(1.2)";
      if(randomP2) randomP2.style.transform = "scale(1.2)";
    } else if (ev.anim === "reset") {
      ball.style.left = "50%";
      ball.style.top = "50%";
    }

    setTimeout(() => {
      p1Pieces.forEach(el => el.style.transform = "scale(1)");
      p2Pieces.forEach(el => el.style.transform = "scale(1)");
    }, arenaSpeedMs - 100);
    
    currentEventIndex++;
    setTimeout(playNext, arenaSpeedMs); 
  };
  
  playNext();
}

function triggerArenaFireworks(side) {
  const container = document.getElementById("arena-fireworks");
  if (!container) return;
  container.style.display = "block";
  container.innerHTML = "";
  
  for(let i = 0; i < 20; i++) {
    const particle = document.createElement("div");
    particle.style.position = "absolute";
    particle.style.left = side === 'left' ? (15 + Math.random() * 20) + "%" : (65 + Math.random() * 20) + "%";
    particle.style.top = (20 + Math.random() * 60) + "%";
    particle.style.width = "8px";
    particle.style.height = "8px";
    particle.style.backgroundColor = ['#ff0', '#f00', '#0f0', '#0ff', '#f0f'][Math.floor(Math.random() * 5)];
    particle.style.borderRadius = "50%";
    particle.style.boxShadow = "0 0 10px " + particle.style.backgroundColor;
    
    const animName = "explode" + Math.floor(Math.random() * 100000);
    const style = document.createElement("style");
    const tx = (Math.random() - 0.5) * 150;
    const ty = (Math.random() - 0.5) * 150;
    style.innerHTML = `
      @keyframes ${animName} {
        0% { transform: translate(0,0) scale(1); opacity: 1; }
        100% { transform: translate(${tx}px, ${ty}px) scale(0); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
    
    particle.style.animation = `${animName} 1s ease-out forwards`;
    container.appendChild(particle);
    
    setTimeout(() => style.remove(), 1000);
  }
  
  setTimeout(() => {
    container.innerHTML = "";
    container.style.display = "none";
  }, 1000);
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

function generateArenaPenalties(stateData) {
  const events = [];
  
  const teamA = stateData.p1.team;
  const teamB = stateData.p2.team;
  const teamAName = window.comparacopaData.squads[teamA].name;
  const teamBName = window.comparacopaData.squads[teamB].name;
  
  // Power calc simplification just for probability
  const chanceA = 0.5 + (Math.random() * 0.2); 
  const chanceB = 0.5 + (Math.random() * 0.2); 
  
  events.push({ time: "PÊNALTIS", text: "INÍCIO DA DISPUTA DE PÊNALTIS!", anim: "start" });
  
  let penA = 0;
  let penB = 0;
  let takenA = 0;
  let takenB = 0;
  
  while (true) {
    takenA++;
    if (Math.random() < chanceA) {
      penA++;
      events.push({ time: "PÊNALTIS", text: `[Cobrança ${takenA}] ${teamAName}: ⚽ GOOOOL! (${penA}x${penB})`, anim: "shoot-p1" });
    } else {
      events.push({ time: "PÊNALTIS", text: `[Cobrança ${takenA}] ${teamAName}: ❌ PERDEU! (${penA}x${penB})`, anim: "shoot-p1" });
    }
    
    let remainingA = Math.max(0, 5 - takenA);
    let remainingB = Math.max(0, 5 - takenB);
    
    if (penA > penB + remainingB) {
      events.push({ time: "FIM", text: `FIM DE JOGO! O ${teamAName} VENCE NOS PÊNALTIS POR ${penA} a ${penB}!`, anim: "reset" });
      break;
    }
    if (penB > penA + remainingA) {
      events.push({ time: "FIM", text: `FIM DE JOGO! O ${teamBName} VENCE NOS PÊNALTIS POR ${penB} a ${penA}!`, anim: "reset" });
      break;
    }
    
    takenB++;
    if (Math.random() < chanceB) {
      penB++;
      events.push({ time: "PÊNALTIS", text: `[Cobrança ${takenB}] ${teamBName}: ⚽ GOOOOL! (${penA}x${penB})`, anim: "shoot-p2" });
    } else {
      events.push({ time: "PÊNALTIS", text: `[Cobrança ${takenB}] ${teamBName}: ❌ PERDEU! (${penA}x${penB})`, anim: "shoot-p2" });
    }
    
    remainingA = Math.max(0, 5 - takenA);
    remainingB = Math.max(0, 5 - takenB);
    
    if (penA > penB + remainingB) {
      events.push({ time: "FIM", text: `FIM DE JOGO! O ${teamAName} VENCE NOS PÊNALTIS POR ${penA} a ${penB}!`, anim: "reset" });
      break;
    }
    if (penB > penA + remainingA) {
      events.push({ time: "FIM", text: `FIM DE JOGO! O ${teamBName} VENCE NOS PÊNALTIS POR ${penB} a ${penA}!`, anim: "reset" });
      break;
    }
    
    // Morte súbita
    if (takenA >= 5 && penA !== penB) {
      const winner = penA > penB ? teamAName : teamBName;
      events.push({ time: "FIM", text: `FIM DE JOGO! O ${winner} VENCE NAS COBRANÇAS ALTERNADAS POR ${Math.max(penA, penB)} a ${Math.min(penA, penB)}!`, anim: "reset" });
      break;
    }
  }
  
  return { events };
}

let arenaPauseTimerInterval = null;

function arenaRenderPitch(data) {
  const container = document.getElementById("arena-pieces-layer");
  if (!container) return;
  container.innerHTML = "";
  
  if (!data.p1 || !data.p2 || !data.p1.squad || !data.p2.squad) return;
  
  // Coordenadas globais do app.js
  const coordsP1 = typeof formationsCoordinates !== "undefined" ? formationsCoordinates[data.p1.formation || "4-3-3"] : null;
  const coordsP2 = typeof formationsCoordinates !== "undefined" ? formationsCoordinates[data.p2.formation || "4-3-3"] : null;
  
  const colorsP1 = window.comparacopaData.teamColors[data.p1.team] || { primary: "#222", secondary: "#fff" };
  const colorsP2 = window.comparacopaData.teamColors[data.p2.team] || { primary: "#222", secondary: "#fff" };
  
  // Renderizar time 1 (Esquerda)
  data.p1.squad.forEach((player, index) => {
    const node = document.createElement("div");
    node.className = "arena-piece p1-piece";
    // Na esquerda: y define X, x define Y (horizontal)
    const slotY = coordsP1 && coordsP1[index] ? coordsP1[index].y : player.y;
    const slotX = coordsP1 && coordsP1[index] ? coordsP1[index].x : player.x;
    node.style.left = `${slotY}%`; 
    node.style.top = `${slotX}%`;
    node.style.backgroundColor = colorsP1.primary;
    node.style.color = colorsP1.text || "#ffffff";
    node.style.borderColor = colorsP1.secondary;
    node.style.transform = "translate(-50%, -50%)"; // Centraliza o próprio botão no slot
    node.innerHTML = `<span>${player.no}</span>`;
    node.title = player.name;
    container.appendChild(node);
  });
  
  // Renderizar time 2 (Direita) - Invertido
  data.p2.squad.forEach((player, index) => {
    const node = document.createElement("div");
    node.className = "arena-piece p2-piece";
    const slotY = coordsP2 && coordsP2[index] ? coordsP2[index].y : player.y;
    const slotX = coordsP2 && coordsP2[index] ? coordsP2[index].x : player.x;
    // Inverte o lado para P2 (X e Y) para manter a formação espelhada corretamente
    node.style.left = `${100 - slotY}%`; 
    node.style.top = `${100 - slotX}%`;
    node.style.backgroundColor = colorsP2.primary;
    node.style.color = colorsP2.text || "#ffffff";
    node.style.borderColor = colorsP2.secondary;
    node.style.transform = "translate(-50%, -50%)"; // Centraliza o próprio botão no slot
    node.innerHTML = `<span>${player.no}</span>`;
    node.title = player.name;
    container.appendChild(node);
  });
}

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
    
    // Atualiza placares e nomes da partida
    document.getElementById("arena-score-a").textContent = arenaState.scoreA || 0;
    document.getElementById("arena-score-b").textContent = arenaState.scoreB || 0;
    document.getElementById("arena-team-a-name").textContent = window.comparacopaData.squads[arenaState.p1.team].name;
    document.getElementById("arena-team-b-name").textContent = window.comparacopaData.squads[arenaState.p2.team].name;
    
    if (!isAnimating) {
      arenaRenderPitch(arenaState);
    }
    
    startArenaPauseTimer(30);
  } else {
    document.getElementById("arena-pause-panel").style.display = "none";
    clearInterval(arenaPauseTimerInterval);
  }
}

function arenaOpenSubModal() {
  if (!arenaState || !arenaState[arenaPlayerRole]) return;
  const pState = arenaState[arenaPlayerRole];
  
  if (pState.subsLeft <= 0) {
    alert("Você já usou todas as 4 substituições permitidas!");
    return;
  }
  
  document.getElementById("arena-modal-sub").style.display = "block";
  const selectOut = document.getElementById("arena-sub-out");
  const selectIn = document.getElementById("arena-sub-in");
  
  selectOut.innerHTML = "";
  selectIn.innerHTML = "";
  
  pState.squad.forEach((p, idx) => {
    selectOut.innerHTML += `<option value="${idx}">${p.pos} - ${p.name} (${p.ovr})</option>`;
  });
  
  pState.bench.forEach((p, idx) => {
    selectIn.innerHTML += `<option value="${idx}">${p.pos} - ${p.name} (${p.ovr})</option>`;
  });
}

async function arenaConfirmSub() {
  const pState = arenaState[arenaPlayerRole];
  if (pState.subsLeft <= 0) return;

  const idxOut = document.getElementById("arena-sub-out").value;
  const idxIn = document.getElementById("arena-sub-in").value;
  
  if (idxOut === "" || idxIn === "") return;
  
  const squad = [...pState.squad];
  const bench = [...pState.bench];
  
  const playerOut = squad[idxOut];
  const playerIn = bench[idxIn];
  
  // O jogador que entra herda a posição original, o x e y do jogador que sai
  const newPlayerIn = {
    ...playerIn,
    pos: playerOut.pos,
    x: playerOut.x,
    y: playerOut.y
  };
  
  squad[idxOut] = newPlayerIn;
  bench.splice(idxIn, 1); // remove o que entrou do banco
  bench.push(playerOut);  // opcionalmente pode colocar o cara que saiu no banco
  
  const { doc, updateDoc } = window.firebaseAPI;
  const roomRef = doc(window.firebaseDB, "rooms", arenaRoomId);
  
  const updates = {};
  updates[`${arenaPlayerRole}.squad`] = squad;
  updates[`${arenaPlayerRole}.bench`] = bench;
  updates[`${arenaPlayerRole}.subsLeft`] = pState.subsLeft - 1;
  // Aumenta o tempo de acréscimo global
  updates["injuryTime"] = (arenaState.injuryTime || 0) + 1;
  
  await updateDoc(roomRef, updates);
  
  alert(`Substituição feita! ${playerIn.name} entrou no lugar de ${playerOut.name}. (+1 min de acréscimo)`);
  document.getElementById("arena-modal-sub").style.display = "none";
}

function arenaOpenTacModal() {
  if (!arenaState || !arenaState[arenaPlayerRole]) return;
  const pState = arenaState[arenaPlayerRole];
  
  if (pState.tacsLeft <= 0) {
    alert("Você já usou todas as 2 alterações táticas permitidas!");
    return;
  }
  
  document.getElementById("arena-modal-tac").style.display = "block";
  
  // Se ainda não existir a dropdown na UI, crio aqui via código ou assumo que existe em index.html
  const selectForm = document.getElementById("arena-tac-select");
  if (selectForm) {
    selectForm.value = pState.formation;
  }
}

async function arenaConfirmTac() {
  const pState = arenaState[arenaPlayerRole];
  if (pState.tacsLeft <= 0) return;
  
  const selectForm = document.getElementById("arena-tac-select");
  if (!selectForm) return;
  
  const newFormation = selectForm.value;
  
  const { doc, updateDoc } = window.firebaseAPI;
  const roomRef = doc(window.firebaseDB, "rooms", arenaRoomId);
  
  const updates = {};
  updates[`${arenaPlayerRole}.formation`] = newFormation;
  updates[`${arenaPlayerRole}.tacsLeft`] = pState.tacsLeft - 1;
  
  await updateDoc(roomRef, updates);
  
  alert(`Tática alterada para ${newFormation}!`);
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


// ==========================================
// Match Summary & Sharing
// ==========================================

function arenaShowMatchSummary() {
  const modal = document.getElementById("arena-modal-summary");
  if (!modal || !arenaState) return;
  
  const scoreA = arenaState.scoreA || 0;
  const scoreB = arenaState.scoreB || 0;
  
  const teamAData = window.comparacopaData.squads[arenaState.p1.team];
  const teamBData = window.comparacopaData.squads[arenaState.p2.team];
  
  document.getElementById("summary-flag-a").textContent = teamAData.flag || "🏳️";
  document.getElementById("summary-team-a").textContent = teamAData.name;
  
  document.getElementById("summary-flag-b").textContent = teamBData.flag || "🏳️";
  document.getElementById("summary-team-b").textContent = teamBData.name;
  
  document.getElementById("summary-score").textContent = `${scoreA} - ${scoreB}`;
  
  modal.style.display = "flex";
}

function arenaDownloadSummary() {
  const card = document.getElementById("arena-summary-card");
  if (!card) return;
  
  // Ocultar ícones ou botões desnecessários antes de capturar se houver
  
  html2canvas(card, {
    backgroundColor: "#111", // Fundo para a imagem renderizada
    scale: 2
  }).then(canvas => {
    const link = document.createElement("a");
    link.download = `Comparacopa_Arena_Resultado.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}

function arenaShareSummary() {
  const scoreA = arenaState.scoreA || 0;
  const scoreB = arenaState.scoreB || 0;
  const teamAData = window.comparacopaData.squads[arenaState.p1.team];
  const teamBData = window.comparacopaData.squads[arenaState.p2.team];
  
  const text = `🏆 FIM DE JOGO na Comparacopa Arena!\n\n${teamAData.flag} ${teamAData.name} ${scoreA} x ${scoreB} ${teamBData.name} ${teamBData.flag}\n\nDesafie seus amigos e monte a sua seleção!`;
  
  if (navigator.share) {
    navigator.share({
      title: "Resultado Comparacopa Arena",
      text: text
    }).catch(console.error);
  } else {
    // Fallback: Copy to clipboard
    navigator.clipboard.writeText(text).then(() => {
      alert("Resultado copiado para a área de transferência! Compartilhe nas redes.");
    });
  }
}
