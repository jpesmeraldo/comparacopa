/* ==========================================================================
   COMPARACOPA - ARENA MULTIPLAYER LOGIC
   Supports: Amistoso Local, Amistoso On-line, Torneio On-line
   ========================================================================== */

let arenaMode = null; // 'local', 'online_friendly', 'online_tournament'
let arenaRoomId = null;
let arenaPlayerRole = null; // 'p1', 'p2', or 'host', 'guest'
let arenaUnsubscribe = null;
let arenaState = null;

// Local Mode State
let localState = {
  step: 1, // 1: P1 Escolha/Escalação, 2: P2 Escolha/Escalação, 3: Simulação
  p1: { name: "Jogador A", team: null, squad: null, bench: null, formation: "4-3-3", ready: false, style: "bal" },
  p2: { name: "Jogador B", team: null, squad: null, bench: null, formation: "4-3-3", ready: false, style: "bal" },
  scoreA: 0,
  scoreB: 0,
  injuryTime: 0,
  status: "playing",
  state: "starting"
};

// Speed control
let arenaAnimSpeed = 1.0;

// Config state tracking
let onlineFriendlyTime = 30;
let onlineFriendlyPass = "";

let tournamentDifficulty = "classic";
let tournamentSize = 8;
let tournamentPass = "";
let tournamentDraft = "turns";
let tournamentTime = 30;

let localDifficulty = "classic";
let localStyle = "bal"; // bal, def, off

// Helper to safely get Team Name and Flag
function getTeamName(teamId) {
  if (!teamId) return "Time";
  const t = window.comparacopaData.teams.find(x => x.id === teamId);
  return t ? t.name : teamId;
}

function getTeamFlag(teamId) {
  if (!teamId) return "🏳️";
  const t = window.comparacopaData.teams.find(x => x.id === teamId);
  return t ? t.flag : "🏳️";
}

// Select Arena Mode from Lobby
function arenaSelectMode(mode) {
  arenaMode = mode;
  document.getElementById("arena-lobby").style.display = "none";
  
  if (mode === "local") {
    document.getElementById("arena-local-setup").style.display = "block";
    
    // Show difficulty container again in case it was hidden from previous run
    const diffContainer = document.getElementById("local-difficulty-container");
    if (diffContainer) diffContainer.style.display = "block";
    
    localState = {
      step: 1,
      p1: { name: "Jogador A", team: null, squad: null, bench: null, formation: "4-3-3", ready: false, style: "bal" },
      p2: { name: "Jogador B", team: null, squad: null, bench: null, formation: "4-3-3", ready: false, style: "bal" },
      scoreA: 0,
      scoreB: 0,
      injuryTime: 0,
      status: "playing",
      state: "starting"
    };
    initLocalSetup();
  } else if (mode === "online_friendly") {
    arenaCreateRoom("online_friendly");
  } else if (mode === "online_tournament") {
    arenaCreateRoom("online_tournament");
  }
}

function arenaShowConfig(mode) {
  arenaMode = mode;
  if (mode === "local") {
    arenaSelectMode("local");
  } else {
    document.getElementById("arena-lobby-main").style.display = "none";
    if (mode === "online_friendly") {
      document.getElementById("arena-config-online-friendly").style.display = "block";
    } else if (mode === "online_tournament") {
      document.getElementById("arena-config-online-tournament").style.display = "block";
    }
  }
}

function arenaHideConfig() {
  document.getElementById("arena-config-local").style.display = "none";
  document.getElementById("arena-config-online-friendly").style.display = "none";
  document.getElementById("arena-config-online-tournament").style.display = "none";
  document.getElementById("arena-lobby-main").style.display = "block";
}

function arenaReturnToLobby() {
  if (arenaUnsubscribe) {
    arenaUnsubscribe();
    arenaUnsubscribe = null;
  }
  arenaRoomId = null;
  arenaPlayerRole = null;
  arenaMode = null;
  
  // Hide all panels
  document.getElementById("arena-local-setup").style.display = "none";
  document.getElementById("arena-tournament-lobby").style.display = "none";
  document.getElementById("arena-tournament-bracket-screen").style.display = "none";
  document.getElementById("arena-active").style.display = "none";
  document.getElementById("arena-pitch-container").style.display = "none";
  document.getElementById("arena-pause-panel").style.display = "none";
  
  // Show lobby
  document.getElementById("arena-lobby").style.display = "block";
  arenaHideConfig();
}

/* ==========================================================================
   AMISTOSO LOCAL (1x1 Same Device)
   ========================================================================== */

function initLocalSetup() {
  const select = document.getElementById("arena-local-team-select");
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
  
  document.getElementById("local-setup-title").textContent = "ESCALAÇÃO JOGADOR 1";
  document.getElementById("arena-local-player-name").value = "Jogador A";
  document.getElementById("arena-local-tactical-editor").style.display = "none";
  document.getElementById("btn-arena-local-next").textContent = "Confirmar Jogador 1";
  setLocalDifficulty("classic");
  setLocalStyle("bal");
  select.value = "";
}

function setLocalDifficulty(diff) {
  localDifficulty = diff;
  document.getElementById("btn-local-setup-diff-classic")?.classList.toggle("active", diff === "classic");
  document.getElementById("btn-local-setup-diff-almanac")?.classList.toggle("active", diff === "almanac");
}

function setLocalStyle(style) {
  localStyle = style;
  document.getElementById("btn-local-setup-style-def")?.classList.toggle("active", style === "def");
  document.getElementById("btn-local-setup-style-bal")?.classList.toggle("active", style === "bal");
  document.getElementById("btn-local-setup-style-off")?.classList.toggle("active", style === "off");
}

function arenaLocalTeamChanged() {
  const val = document.getElementById("arena-local-team-select").value;
  if (!val) {
    document.getElementById("arena-local-tactical-editor").style.display = "none";
    return;
  }
  
  if (typeof ensureSquadAndStats === "function") {
    ensureSquadAndStats(val);
  }
  
  const squadData = window.comparacopaData.squads[val];
  const activePlayer = localState.step === 1 ? localState.p1 : localState.p2;
  
  activePlayer.team = val;
  activePlayer.squad = JSON.parse(JSON.stringify(squadData.players));
  activePlayer.bench = JSON.parse(JSON.stringify(squadData.bench)).map((p, idx) => ({ ...p, no: p.no || (12 + idx) }));
  activePlayer.formation = squadData.formation || "4-3-3";
  
  document.getElementById("arena-local-tactical-editor").style.display = "block";
  renderLocalSetupField();
}

function renderLocalSetupField() {
  const container = document.getElementById("arena-local-setup-player-nodes");
  if (!container) return;
  container.innerHTML = "";
  
  const activePlayer = localState.step === 1 ? localState.p1 : localState.p2;
  const teamId = activePlayer.team;
  const colors = window.comparacopaData.teamColors[teamId] || { primary: "#222", secondary: "#fff" };
  
  // Render formation buttons
  const grid = document.getElementById("arena-local-formation-btn-grid");
  if (grid) {
    grid.innerHTML = "";
    const formations = ["4-3-3", "4-4-2", "4-2-3-1", "4-2-4", "3-5-2", "5-3-2", "4-5-1", "3-4-3"];
    formations.forEach(f => {
      const btn = document.createElement("button");
      btn.className = `formation-btn ${f === activePlayer.formation ? 'active' : ''}`;
      btn.style.fontSize = "0.75rem";
      btn.style.padding = "5px";
      btn.textContent = f;
      btn.onclick = () => {
        activePlayer.formation = f;
        const coords = formationsCoordinates[f];
        activePlayer.squad.forEach((player, idx) => {
          if (coords[idx]) {
            player.x = coords[idx].x;
            player.y = coords[idx].y;
          }
        });
        renderLocalSetupField();
      };
      grid.appendChild(btn);
    });
  }
  
  const coords = formationsCoordinates[activePlayer.formation || "4-3-3"];
  activePlayer.squad.forEach((player, index) => {
    if (player.y === undefined && coords[index]) {
      player.y = coords[index].y;
      player.x = coords[index].x;
    }
    
    const finalY = player.y !== undefined ? player.y : (coords[index] ? coords[index].y : 50);
    const finalX = player.x !== undefined ? player.x : (coords[index] ? coords[index].x : 50);
    
    const node = document.createElement("div");
    node.className = "player-node";
    node.style.left = `${finalY}%`; 
    node.style.top = `${finalX}%`;  
    node.style.backgroundColor = colors.primary;
    node.style.color = colors.text || "#ffffff";
    node.style.borderColor = colors.secondary;
    node.style.transform = "translate(-50%, -50%) scale(0.95)";
    
    const slotPos = coords[index] ? coords[index].pos : (player.pos || player.origPos || 'MF');
    const effectiveOvr = getEffectivePlayerOvr(player, slotPos);
    
    node.innerHTML = `
      <span class="player-number">${player.no}</span>
      <div class="player-ovr-tag">${effectiveOvr}</div>
      <div class="player-name-tag">${escapeHtml(player.name)}</div>
    `;
    
    node.onclick = () => showLocalPlayerSubModal(player);
    container.appendChild(node);
  });
}

function showLocalPlayerSubModal(player) {
  console.log("showLocalPlayerSubModal called for", player);
  const activePlayer = localState.step === 1 ? localState.p1 : localState.p2;
  console.log("activePlayer:", activePlayer);
  const modal = document.getElementById("player-modal");
  if (!modal) {
    console.error("player-modal not found!");
    return;
  }
  const teamId = activePlayer.team;
  const flag = getTeamFlag(teamId);

  try {
    document.getElementById("sticker-flag").textContent = flag;
    document.getElementById("sticker-name").textContent = player.name;
    document.getElementById("sticker-club").textContent = `${player.pos || 'MF'} | ${player.club || "Seleção"}`;
    document.getElementById("sticker-ovr").textContent = player.ovr;
    
    document.getElementById("sticker-pac").textContent = player.pac || 50;
    document.getElementById("sticker-sho").textContent = player.sho || 50;
    document.getElementById("sticker-pas").textContent = player.pas || 50;
    document.getElementById("sticker-dri").textContent = player.dri || 50;
    document.getElementById("sticker-def").textContent = player.def || 50;
    document.getElementById("sticker-phy").textContent = player.phy || 50;

    const selectSub = document.getElementById("select-substitute");
    selectSub.innerHTML = "";
    const bench = activePlayer.bench || [];
    console.log("bench players count:", bench.length);

    if (bench.length === 0) {
      document.getElementById("substitute-section").style.display = "none";
    } else {
      document.getElementById("substitute-section").style.display = "block";
      bench.forEach((benchPlayer, index) => {
        const opt = document.createElement("option");
        opt.value = index;
        opt.textContent = `${benchPlayer.name} (${benchPlayer.pos || 'MF'} - OVR ${benchPlayer.ovr})`;
        selectSub.appendChild(opt);
      });
    }

    modal.style.display = "flex";
    console.log("player-modal display is now flex");

    const btnSub = document.getElementById("btn-confirm-sub");
    btnSub.onclick = () => {
      const selectedSubIndex = selectSub.value;
      if (selectedSubIndex === "") return;

      const benchPlayer = bench[selectedSubIndex];
      const titularIndex = activePlayer.squad.findIndex(p => p.name === player.name);
      if (titularIndex === -1) {
        console.error("titularIndex not found for player name:", player.name);
        return;
      }

      const targetY = player.y;
      const targetX = player.x;

      delete player.y;
      delete player.x;

      benchPlayer.y = targetY;
      benchPlayer.x = targetX;

      // Direct reference swap in activePlayer
      activePlayer.squad[titularIndex] = benchPlayer;
      activePlayer.bench[selectedSubIndex] = player;

      modal.style.display = "none";
      renderLocalSetupField();
    };
  } catch (err) {
    console.error("Error in showLocalPlayerSubModal:", err);
  }
}

function arenaLocalNextStep() {
  if (localState.step === 1) {
    if (!localState.p1.team) return alert("Selecione o time do Jogador 1!");
    
    const pName = document.getElementById("arena-local-player-name")?.value.trim() || "Jogador A";
    localState.p1.name = pName;
    localState.p1.style = "bal";
    
    localState.step = 2;
    document.getElementById("local-setup-title").textContent = "ESCALAÇÃO JOGADOR 2";
    document.getElementById("arena-local-team-select").value = "";
    document.getElementById("arena-local-player-name").value = "Jogador B";
    
    document.getElementById("arena-local-tactical-editor").style.display = "none";
    document.getElementById("btn-arena-local-next").textContent = "Iniciar Simulação →";
  } else if (localState.step === 2) {
    if (!localState.p2.team) return alert("Selecione o time do Jogador 2!");
    
    const pName = document.getElementById("arena-local-player-name")?.value.trim() || "Jogador B";
    localState.p2.name = pName;
    localState.p2.style = "bal";
    
    // Start local simulation
    document.getElementById("arena-local-setup").style.display = "none";
    document.getElementById("arena-active").style.display = "block";
    
    // Mimic Firebase structures for local state
    arenaState = localState;
    arenaState.difficulty = "classic"; // Save selected difficulty!
    arenaRoomId = "LOCAL";
    arenaPlayerRole = "p1"; // Host role for local coordinator
    
    // Update Lobby displays
    document.getElementById("arena-room-code-badge").textContent = "LOCAL";
    document.getElementById("arena-lobby-title").textContent = "AMISTOSO LOCAL";
    document.getElementById("arena-lobby-vacancy-status").textContent = "EM PARTIDA LOCAL";
    document.getElementById("arena-lobby-meta-diff").textContent = "CLÁSSICO";
    document.getElementById("arena-lobby-meta-time").textContent = "SEM LIMITE";
    
    document.getElementById("arena-slot-1-name").textContent = `${localState.p1.name.toUpperCase()} (P1)`;
    document.getElementById("arena-slot-1-status").textContent = "PRONTO ✔";
    document.getElementById("arena-slot-1-status").style.color = "green";
    
    document.getElementById("arena-slot-2-name").textContent = `${localState.p2.name.toUpperCase()} (P2)`;
    const s2Status = document.getElementById("arena-slot-2-status");
    if (s2Status) {
      s2Status.textContent = "PRONTO ✔";
      s2Status.style.color = "green";
      s2Status.style.display = "block";
    }
    document.getElementById("arena-slot-2-status-area").style.display = "block";
    document.getElementById("btn-play-vs-cpu").style.display = "none";
    
    // Prepare pitch headers
    document.getElementById("arena-score-a").textContent = "0";
    document.getElementById("arena-score-b").textContent = "0";
    
    triggerLocalSimulation();
  }
}

function triggerLocalSimulation() {
  localState.scoreA = 0;
  localState.scoreB = 0;
  localState.injuryTime = 0;
  localState.p1.subsLeft = 4;
  localState.p1.tacsLeft = 2;
  localState.p2.subsLeft = 4;
  localState.p2.tacsLeft = 2;
  
  localState.state = "first_half_1";
  arenaStartLocalPhase("first_half_1");
}

function arenaStartLocalPhase(phaseName) {
  localState.state = phaseName;
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
    simData = generateArenaPenalties(localState);
  } else {
    const phaseDef = phases[phaseName];
    if (!phaseDef) return;
    simData = generateArenaPhase(phaseDef.start, phaseDef.end, localState);
  }
  
  localState.scoreA = simData.scoreA !== undefined ? simData.scoreA : localState.scoreA;
  localState.scoreB = simData.scoreB !== undefined ? simData.scoreB : localState.scoreB;
  localState.simulation = simData;
  
  runAnimation(simData);
}

/* ==========================================================================
   ONLINE MODES (1x1 and Tournament)
   ========================================================================== */

function setOnlineFriendlyTime(seconds) {
  onlineFriendlyTime = seconds;
  document.getElementById("btn-online-friendly-time-20")?.classList.toggle("active", seconds === 20);
  document.getElementById("btn-online-friendly-time-30")?.classList.toggle("active", seconds === 30);
  document.getElementById("btn-online-friendly-time-45")?.classList.toggle("active", seconds === 45);
}

async function submitOnlineFriendlyConfig() {
  if (!window.firebaseDB) {
    alert("Firebase não configurado ou bloqueado.");
    return;
  }
  
  const code = Math.random().toString(36).substring(2, 6).toUpperCase();
  const password = document.getElementById("online-friendly-pass")?.value.trim() || "";
  
  const roomData = {
    id: code,
    mode: "friendly",
    status: "waiting",
    difficulty: "classic",
    roundTime: onlineFriendlyTime,
    password: password,
    createdAt: new Date().toISOString(),
    p1: { name: "P1", team: null, ready: false, style: "bal", formation: "4-3-3" },
    p2: null,
    simulation: null
  };
  
  try {
    const { doc, setDoc } = window.firebaseAPI;
    await setDoc(doc(window.firebaseDB, "rooms", code), roomData);
    
    arenaRoomId = code;
    arenaPlayerRole = "p1";
    arenaMode = "online_friendly";
    
    document.getElementById("arena-lobby").style.display = "none";
    document.getElementById("arena-active").style.display = "block";
    
    // Set initial values in sessional tactical pitch input fields
    const nameInput = document.getElementById("arena-player-name-input");
    if (nameInput) nameInput.value = "P1";
    
    initArenaTeams();
    listenToRoom(code);
  } catch (err) {
    console.error("Erro ao criar sala amistosa:", err);
    alert("Erro ao criar sala. Verifique sua conexão.");
  }
}

function setTournamentDifficulty(diff) {
  tournamentDifficulty = diff;
  document.getElementById("btn-tournament-diff-classic")?.classList.toggle("active", diff === "classic");
  document.getElementById("btn-tournament-diff-almanac")?.classList.toggle("active", diff === "almanac");
}

function setTournamentSize(size) {
  tournamentSize = size;
  document.getElementById("btn-tournament-size-4")?.classList.toggle("active", size === 4);
  document.getElementById("btn-tournament-size-8")?.classList.toggle("active", size === 8);
  document.getElementById("btn-tournament-size-16")?.classList.toggle("active", size === 16);
}

function setTournamentDraft(draft) {
  tournamentDraft = draft;
  document.getElementById("btn-tournament-draft-turns")?.classList.toggle("active", draft === "turns");
  document.getElementById("btn-tournament-draft-together")?.classList.toggle("active", draft === "together");
}

function setTournamentTime(time) {
  tournamentTime = time;
  document.getElementById("btn-tournament-time-20")?.classList.toggle("active", time === 20);
  document.getElementById("btn-tournament-time-30")?.classList.toggle("active", time === 30);
  document.getElementById("btn-tournament-time-45")?.classList.toggle("active", time === 45);
}

async function submitTournamentConfig() {
  if (!window.firebaseDB) {
    alert("Firebase não configurado ou bloqueado.");
    return;
  }
  
  const code = Math.random().toString(36).substring(2, 6).toUpperCase();
  const password = document.getElementById("tournament-pass")?.value.trim() || "";
  
  const slots = [];
  slots.push({ team: null, type: "human", name: "Host (P1)", ready: false, role: "p1" });
  for (let i = 1; i < tournamentSize; i++) {
    slots.push({ team: null, type: "cpu", name: `CPU ${i}`, ready: true });
  }
  
  const roomData = {
    id: code,
    mode: "tournament",
    status: "lobby",
    difficulty: tournamentDifficulty,
    roundTime: tournamentTime,
    password: password,
    draftType: tournamentDraft,
    createdAt: new Date().toISOString(),
    host: "p1",
    slots: slots,
    bracket: null,
    activeMatchIdx: 0,
    simulation: null
  };
  
  try {
    const { doc, setDoc } = window.firebaseAPI;
    await setDoc(doc(window.firebaseDB, "rooms", code), roomData);
    
    arenaRoomId = code;
    arenaPlayerRole = "p1";
    arenaMode = "online_tournament";
    
    document.getElementById("arena-lobby").style.display = "none";
    document.getElementById("arena-tournament-lobby").style.display = "block";
    document.getElementById("tournament-room-code").textContent = code;
    
    listenToRoom(code);
  } catch (err) {
    console.error("Erro ao criar sala do torneio:", err);
    alert("Erro ao criar sala. Verifique sua conexão.");
  }
}

function chooseRandomCpuTeam() {
  const teams = window.comparacopaData.teams;
  if (!teams || teams.length === 0) return null;
  const t = teams[Math.floor(Math.random() * teams.length)];
  return t.id;
}

function initArenaCpuTeams(selectedCpuTeamId) {
  const select = document.getElementById("arena-cpu-team-select");
  if (!select) return;
  if (select.children.length > 0) {
    if (selectedCpuTeamId) select.value = selectedCpuTeamId;
    return;
  }
  
  select.innerHTML = '<option value="">Selecione adversário...</option>';
  
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
  if (selectedCpuTeamId) select.value = selectedCpuTeamId;
}

async function arenaUpdateCpuTeamSelect(cpuTeamId) {
  if (!arenaRoomId || !window.firebaseDB || !cpuTeamId) return;
  
  if (typeof ensureSquadAndStats === "function") {
    ensureSquadAndStats(cpuTeamId);
  }
  
  const squadData = window.comparacopaData.squads[cpuTeamId];
  const cpuSquad = JSON.parse(JSON.stringify(squadData.players));
  const cpuBench = JSON.parse(JSON.stringify(squadData.bench)).map((p, idx) => ({ ...p, no: p.no || (12 + idx) }));
  const cpuFormation = squadData.formation || "4-3-3";
  
  const { doc, updateDoc } = window.firebaseAPI;
  const roomRef = doc(window.firebaseDB, "rooms", arenaRoomId);
  
  await updateDoc(roomRef, {
    "p2.team": cpuTeamId,
    "p2.squad": cpuSquad,
    "p2.bench": cpuBench,
    "p2.formation": cpuFormation
  });
}

async function arenaDrawCpuTeam() {
  const cpuTeamId = chooseRandomCpuTeam();
  if (!cpuTeamId) return;
  const select = document.getElementById("arena-cpu-team-select");
  if (select) select.value = cpuTeamId;
  await arenaUpdateCpuTeamSelect(cpuTeamId);
}

async function arenaPlayVsCpu() {
  if (!arenaRoomId || !window.firebaseDB) return;
  const cpuTeamId = chooseRandomCpuTeam();
  if (!cpuTeamId) return alert("Erro ao escolher time para a CPU.");
  
  if (typeof ensureSquadAndStats === "function") {
    ensureSquadAndStats(cpuTeamId);
  }
  
  const squadData = window.comparacopaData.squads[cpuTeamId];
  const cpuSquad = JSON.parse(JSON.stringify(squadData.players));
  const cpuBench = JSON.parse(JSON.stringify(squadData.bench)).map((p, idx) => ({ ...p, no: p.no || (12 + idx) }));
  const cpuFormation = squadData.formation || "4-3-3";
  
  const { doc, updateDoc } = window.firebaseAPI;
  const roomRef = doc(window.firebaseDB, "rooms", arenaRoomId);
  
  await updateDoc(roomRef, {
    p2: {
      name: "CPU",
      type: "cpu",
      team: cpuTeamId,
      squad: cpuSquad,
      bench: cpuBench,
      formation: cpuFormation,
      style: "bal",
      ready: true
    },
    status: "connected"
  });
}

async function arenaLobbyPlayNow() {
  if (!arenaRoomId || !window.firebaseDB) return;
  
  const { doc, updateDoc } = window.firebaseAPI;
  const roomRef = doc(window.firebaseDB, "rooms", arenaRoomId);
  
  await updateDoc(roomRef, {
    status: "playing",
    state: "starting"
  });
  
  triggerSimulation(arenaState);
}

function arenaCopyRoomLink() {
  if (!arenaRoomId) return;
  const url = `${window.location.origin}${window.location.pathname}?sala=${arenaRoomId}`;
  
  navigator.clipboard.writeText(url).then(() => {
    alert(`Link da sala copiado! Envie para o seu adversário: ${url}`);
  }).catch(err => {
    console.error("Erro ao copiar link:", err);
    alert(`Código da sala: ${arenaRoomId}`);
  });
}

async function arenaUpdateMyName(name) {
  if (!arenaState || !arenaRoomId) return;
  const role = arenaPlayerRole;
  
  const { doc, updateDoc } = window.firebaseAPI;
  const roomRef = doc(window.firebaseDB, "rooms", arenaRoomId);
  const updateObj = {};
  updateObj[`${role}.name`] = name;
  await updateDoc(roomRef, updateObj);
}

async function arenaUpdateStyle(style) {
  if (!arenaState || !arenaRoomId) return;
  const role = arenaPlayerRole;
  
  document.getElementById("btn-arena-style-def")?.classList.toggle("active", style === "def");
  document.getElementById("btn-arena-style-bal")?.classList.toggle("active", style === "bal");
  document.getElementById("btn-arena-style-off")?.classList.toggle("active", style === "off");
  
  const { doc, updateDoc } = window.firebaseAPI;
  const roomRef = doc(window.firebaseDB, "rooms", arenaRoomId);
  const updateObj = {};
  updateObj[`${role}.style`] = style;
  await updateDoc(roomRef, updateObj);
}

async function arenaCreateRoom(mode) {
  if (mode === "online_friendly") {
    submitOnlineFriendlyConfig();
  } else if (mode === "online_tournament") {
    submitTournamentConfig();
  }
}

async function arenaJoinRoomByCode() {
  const code = document.getElementById("arena-room-input").value.trim().toUpperCase();
  if (!code) return alert("Digite o código da sala.");
  
  if (!window.firebaseDB) {
    return alert("Firebase não configurado ou bloqueado.");
  }
  
  try {
    const { doc, getDoc, updateDoc } = window.firebaseAPI;
    const roomRef = doc(window.firebaseDB, "rooms", code);
    
    const snap = await getDoc(roomRef);
    if (!snap.exists()) {
      return alert("Sala não encontrada.");
    }
    
    const data = snap.data();
    arenaRoomId = code;
    arenaMode = data.mode === "tournament" ? "online_tournament" : "online_friendly";
    
    if (data.mode === "friendly") {
      if (data.status !== "waiting") {
        return alert("Esta sala já está cheia ou em andamento.");
      }
      arenaPlayerRole = "p2";
      
      await updateDoc(roomRef, {
        status: "connected",
        p2: { name: "Jogador B", team: null, ready: false, style: "bal", formation: "4-3-3" }
      });
      
      document.getElementById("arena-lobby").style.display = "none";
      document.getElementById("arena-active").style.display = "block";
      
      const nameInput = document.getElementById("arena-player-name-input");
      if (nameInput) nameInput.value = "Jogador B";
      
      initArenaTeams();
      listenToRoom(code);
    } else if (data.mode === "tournament") {
      if (data.status !== "lobby") {
        return alert("Este torneio já iniciou ou está fechado.");
      }
      // Encontrar slot humano livre
      let freeSlotIdx = -1;
      for (let i = 0; i < data.slots.length; i++) {
        if (data.slots[i].type === "human" && !data.slots[i].role && i > 0) {
          freeSlotIdx = i;
          break;
        }
      }
      
      if (freeSlotIdx === -1) {
        // Se não houver humanos abertos, tentar converter o primeiro slot CPU aberto para humano
        for (let i = 0; i < data.slots.length; i++) {
          if (data.slots[i].type === "cpu" && i > 0) {
            freeSlotIdx = i;
            break;
          }
        }
      }
      
      if (freeSlotIdx === -1) {
        return alert("Torneio sem vagas livres.");
      }
      
      arenaPlayerRole = `p${freeSlotIdx + 1}`;
      
      const newSlots = [...data.slots];
      newSlots[freeSlotIdx] = {
        team: null,
        type: "human",
        name: `Jogador ${freeSlotIdx + 1}`,
        ready: false,
        role: arenaPlayerRole
      };
      
      await updateDoc(roomRef, { slots: newSlots });
      
      document.getElementById("arena-lobby").style.display = "none";
      document.getElementById("arena-tournament-lobby").style.display = "block";
      document.getElementById("tournament-room-code").textContent = code;
      
      listenToRoom(code);
    }
  } catch (err) {
    console.error(err);
    alert("Erro ao conectar à sala.");
  }
}

// Sincronização em tempo real (Firebase Listener)
function listenToRoom(code) {
  const { doc, onSnapshot } = window.firebaseAPI;
  
  arenaUnsubscribe = onSnapshot(doc(window.firebaseDB, "rooms", code), (snap) => {
    if (!snap.exists()) return;
    const data = snap.data();
    arenaState = data;
    
    if (data.mode === "friendly") {
      updateArenaUI(data);
      
      if (data.status === "playing" && data.p1.readyToResume && data.p2.readyToResume && arenaPlayerRole === "p1") {
        advanceOnlinePhase(data);
      }
      
      if (data.status === "playing" && data.simulation) {
        if (!window.currentArenaPhaseRun || window.currentArenaPhaseRun !== data.state) {
          window.currentArenaPhaseRun = data.state;
          runAnimation(data.simulation);
        }
      }
    } else if (data.mode === "tournament") {
      updateTournamentUI(data);
      
      if (data.status === "match_playing" && data.simulation) {
        if (!window.currentArenaPhaseRun || window.currentArenaPhaseRun !== data.state) {
          window.currentArenaPhaseRun = data.state;
          runAnimation(data.simulation);
        }
      }
    }
  });
}

function updateArenaUI(data) {
  const titleEl = document.getElementById("arena-lobby-title");
  if (titleEl) {
    titleEl.textContent = data.mode === "tournament" ? "MATA-MATA DE COPA" : "AMISTOSO ON-LINE";
  }
  
  const codeBadge = document.getElementById("arena-room-code-badge");
  if (codeBadge) codeBadge.textContent = data.id;
  
  const diffEl = document.getElementById("arena-lobby-meta-diff");
  if (diffEl) diffEl.textContent = (data.difficulty || "classic") === "classic" ? "CLÁSSICO" : "DE ALMANAQUE";
  
  const timeEl = document.getElementById("arena-lobby-meta-time");
  if (timeEl) timeEl.textContent = `${data.roundTime || 30}S POR JOGADA`;
  
  // Vacancy status
  const vacancyEl = document.getElementById("arena-lobby-vacancy-status");
  const hasP2 = !!(data.p2 && (data.p2.team || data.p2.name || data.p2.type === "cpu"));
  if (vacancyEl) {
    vacancyEl.textContent = hasP2 ? "Inscrições - 0 vagas abertas" : "Inscrições - 1 vaga aberta";
  }
  
  // Slots List
  const s1Name = document.getElementById("arena-slot-1-name");
  if (s1Name) {
    let p1DisplayName = "P1";
    if (data.p1.name && !data.p1.name.includes("Host (P1)")) {
      p1DisplayName = `${data.p1.name.toUpperCase()} [P1]`;
    }
    s1Name.textContent = p1DisplayName;
    if (arenaPlayerRole === "p1") s1Name.textContent += " [VOCÊ]";
  }
  const s1Status = document.getElementById("arena-slot-1-status");
  if (s1Status) {
    if (data.p1.ready) {
      s1Status.textContent = "PRONTO ✔";
      s1Status.style.color = "green";
    } else {
      s1Status.textContent = data.p1.team ? "ESCALANDO TIME..." : "AGUARDANDO ESCALAÇÃO...";
      s1Status.style.color = "var(--retro-red)";
    }
  }
  
  const s2Name = document.getElementById("arena-slot-2-name");
  const s2Status = document.getElementById("arena-slot-2-status");
  const s2StatusArea = document.getElementById("arena-slot-2-status-area");
  const playVsCpuBtn = document.getElementById("btn-play-vs-cpu");
  
  if (hasP2) {
    if (playVsCpuBtn) playVsCpuBtn.style.display = "none";
    if (s2Status) s2Status.style.display = "block";
    
    let p2DisplayName = data.p2.name || "JOGADOR 2";
    if (data.p2.type === "cpu") p2DisplayName = "CPU";
    if (s2Name) {
      s2Name.textContent = `${p2DisplayName.toUpperCase()} [P2]`;
      if (arenaPlayerRole === "p2") s2Name.textContent += " [VOCÊ]";
      s2Name.style.color = "#000";
    }
    
    if (s2Status) {
      if (data.p2.ready) {
        s2Status.textContent = "PRONTO ✔";
        s2Status.style.color = "green";
      } else {
        s2Status.textContent = data.p2.team ? "ESCALANDO TIME..." : "AGUARDANDO ESCALAÇÃO...";
        s2Status.style.color = "var(--retro-red)";
      }
    }
  } else {
    if (s2Name) {
      s2Name.textContent = "Aguardando P2";
      s2Name.style.color = "#777";
    }
    if (s2Status) s2Status.style.display = "none";
    if (playVsCpuBtn) {
      playVsCpuBtn.style.display = (arenaPlayerRole === "p1") ? "inline-block" : "none";
    }
  }
  
  // Play Now Button State
  const playNowBtn = document.getElementById("btn-lobby-play-now");
  if (playNowBtn) {
    const isHost = (arenaPlayerRole === "p1");
    const canPlay = isHost && data.p1.ready && (data.p2 && (data.p2.ready || data.p2.type === "cpu"));
    playNowBtn.disabled = !canPlay;
  }
  
  // Render tactical panel - Only display to players if P2 has joined (connected state)
  const configPanel = document.getElementById("arena-tactical-config-panel");
  if (data.status === "connected") {
    if (configPanel) configPanel.style.display = "block";
    const myData = arenaPlayerRole === "p1" ? data.p1 : data.p2;
    if (myData) {
      const nameInput = document.getElementById("arena-player-name-input");
      if (nameInput && document.activeElement !== nameInput) {
        nameInput.value = myData.name || "";
      }
      
      const confirmReadyBtn = document.getElementById("btn-arena-confirm-ready");
      if (confirmReadyBtn) {
        if (myData.ready) {
          confirmReadyBtn.textContent = "CANCELAR CONFIRMAÇÃO";
          confirmReadyBtn.className = "neo-btn btn-red";
        } else {
          confirmReadyBtn.textContent = "CONFIRMAR";
          confirmReadyBtn.className = "neo-btn btn-green";
        }
      }
      
      // Populate CPU opponent config selector if playing vs CPU as Host
      const cpuSelectionWrapper = document.getElementById("arena-cpu-selection-wrapper");
      if (cpuSelectionWrapper) {
        if (arenaPlayerRole === "p1" && data.p2 && data.p2.type === "cpu") {
          cpuSelectionWrapper.style.display = "block";
          initArenaCpuTeams(data.p2.team);
        } else {
          cpuSelectionWrapper.style.display = "none";
        }
      }
      
      if (myData.team && myData.squad) {
        arenaRenderSetupField(myData);
      }
    }
  } else {
    if (configPanel) configPanel.style.display = "none";
    // Hide slots card during active simulation
    const lobbyCard = document.querySelector("#arena-active > .neo-card");
    if (lobbyCard && data.status === "playing") {
      lobbyCard.style.display = "none";
    }
  }
}

// Dropdowns de times
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

async function arenaUpdateTeamSelect(playerNum) {
  const val = document.getElementById("arena-team1").value;
  if (!val) return;
  
  if (typeof ensureSquadAndStats === "function") {
    ensureSquadAndStats(val);
  }
  
  const squadData = window.comparacopaData.squads[val];
  const initialSquad = JSON.parse(JSON.stringify(squadData.players));
  const initialBench = JSON.parse(JSON.stringify(squadData.bench)).map((p, idx) => ({ ...p, no: p.no || (12 + idx) }));
  const initialFormation = squadData.formation || "4-3-3";
  
  const { doc, updateDoc } = window.firebaseAPI;
  const roomRef = doc(window.firebaseDB, "rooms", arenaRoomId);
  
  if (arenaPlayerRole === "p1") {
    await updateDoc(roomRef, {
      "p1.team": val,
      "p1.squad": initialSquad,
      "p1.bench": initialBench,
      "p1.formation": initialFormation,
      "p1.ready": false
    });
  } else {
    await updateDoc(roomRef, {
      "p2.team": val,
      "p2.squad": initialSquad,
      "p2.bench": initialBench,
      "p2.formation": initialFormation,
      "p2.ready": false
    });
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

function arenaRenderSetupField(myData) {
  const container = document.getElementById("arena-setup-player-nodes");
  if (!container) return;
  container.innerHTML = "";
  
  const grid = document.getElementById("arena-formation-btn-grid");
  if (grid) {
    grid.innerHTML = "";
    const formations = ["4-3-3", "4-4-2", "4-2-3-1", "4-2-4", "3-5-2", "5-3-2", "4-5-1", "3-4-3"];
    formations.forEach(f => {
      const btn = document.createElement("button");
      btn.className = `formation-btn ${f === myData.formation ? 'active' : ''}`;
      btn.style.fontSize = "0.75rem";
      btn.style.padding = "5px";
      btn.textContent = f;
      btn.onclick = () => arenaChangeFormation(f);
      grid.appendChild(btn);
    });
  }
  
  const teamId = myData.team;
  const colors = window.comparacopaData.teamColors[teamId] || { primary: "#222", secondary: "#fff" };
  const coords = formationsCoordinates[myData.formation || "4-3-3"];
  
  myData.squad.forEach((player, index) => {
    if (player.y === undefined && coords[index]) {
      player.y = coords[index].y;
      player.x = coords[index].x;
    }
    
    const finalY = player.y !== undefined ? player.y : (coords[index] ? coords[index].y : 50);
    const finalX = player.x !== undefined ? player.x : (coords[index] ? coords[index].x : 50);
    
    const node = document.createElement("div");
    node.className = "player-node";
    node.style.left = `${finalY}%`; 
    node.style.top = `${finalX}%`;  
    node.style.backgroundColor = colors.primary;
    node.style.color = colors.text || "#ffffff";
    node.style.borderColor = colors.secondary;
    node.style.transform = "translate(-50%, -50%) scale(0.95)";
    
    const slotPos = coords[index] ? coords[index].pos : (player.pos || player.origPos || 'MF');
    const effectiveOvr = getEffectivePlayerOvr(player, slotPos);
    
    node.innerHTML = `
      <span class="player-number">${player.no}</span>
      <div class="player-ovr-tag">${effectiveOvr}</div>
      <div class="player-name-tag">${escapeHtml(player.name)}</div>
    `;
    
    node.onclick = () => arenaShowPlayerModal(player, arenaPlayerRole);
    container.appendChild(node);
  });
}

function arenaShowPlayerModal(player, role) {
  const modal = document.getElementById("player-modal");
  const myData = arenaState[role];
  if (!myData) return;
  const teamId = myData.team;
  const flag = getTeamFlag(teamId);

  document.getElementById("sticker-flag").textContent = flag;
  document.getElementById("sticker-name").textContent = player.name;
  document.getElementById("sticker-club").textContent = `${player.pos || 'MF'} | ${player.club || "Seleção"}`;
  document.getElementById("sticker-ovr").textContent = player.ovr;
  
  document.getElementById("sticker-pac").textContent = player.pac || 50;
  document.getElementById("sticker-sho").textContent = player.sho || 50;
  document.getElementById("sticker-pas").textContent = player.pas || 50;
  document.getElementById("sticker-dri").textContent = player.dri || 50;
  document.getElementById("sticker-def").textContent = player.def || 50;
  document.getElementById("sticker-phy").textContent = player.phy || 50;

  const selectSub = document.getElementById("select-substitute");
  selectSub.innerHTML = "";
  const bench = myData.bench || [];

  if (bench.length === 0) {
    document.getElementById("substitute-section").style.display = "none";
  } else {
    document.getElementById("substitute-section").style.display = "block";
    bench.forEach((benchPlayer, index) => {
      const opt = document.createElement("option");
      opt.value = index;
      opt.textContent = `${benchPlayer.name} (${benchPlayer.pos || 'MF'} - OVR ${benchPlayer.ovr})`;
      selectSub.appendChild(opt);
    });
  }

  modal.style.display = "flex";

  const btnSub = document.getElementById("btn-confirm-sub");
  btnSub.onclick = async () => {
    const selectedSubIndex = selectSub.value;
    if (selectedSubIndex === "") return;

    const benchPlayer = bench[selectedSubIndex];
    const squadPlayers = JSON.parse(JSON.stringify(myData.squad));
    const benchPlayers = JSON.parse(JSON.stringify(myData.bench));

    const titularIndex = squadPlayers.findIndex(p => p.name === player.name);
    if (titularIndex === -1) return;

    const targetY = player.y;
    const targetX = player.x;

    delete player.y;
    delete player.x;

    benchPlayer.y = targetY;
    benchPlayer.x = targetX;

    squadPlayers[titularIndex] = benchPlayer;
    benchPlayers[selectedSubIndex] = player;

    modal.style.display = "none";

    const { doc, updateDoc } = window.firebaseAPI;
    const roomRef = doc(window.firebaseDB, "rooms", arenaRoomId);
    const updateObj = {};
    updateObj[`${role}.squad`] = squadPlayers;
    updateObj[`${role}.bench`] = benchPlayers;
    await updateDoc(roomRef, updateObj);
  };
}

async function arenaChangeFormation(newFormation) {
  if (!arenaState || !arenaRoomId) return;
  const role = arenaPlayerRole;
  const myData = arenaState[role];
  const coords = formationsCoordinates[newFormation];
  if (!coords) return;
  
  const updatedSquad = myData.squad.map((player, index) => {
    if (coords[index]) {
      return {
        ...player,
        y: coords[index].y,
        x: coords[index].x
      };
    }
    return player;
  });
  
  const { doc, updateDoc } = window.firebaseAPI;
  const roomRef = doc(window.firebaseDB, "rooms", arenaRoomId);
  const updateObj = {};
  updateObj[`${role}.formation`] = newFormation;
  updateObj[`${role}.squad`] = updatedSquad;
  
  await updateDoc(roomRef, updateObj);
}

/* ==========================================================================
   TOURNAMENT SLOTS AND BRACKET MANAGEMENT
   ========================================================================== */

function updateTournamentUI(data) {
  if (data.status === "lobby") {
    document.getElementById("arena-tournament-lobby").style.display = "block";
    document.getElementById("arena-tournament-bracket-screen").style.display = "none";
    document.getElementById("arena-active").style.display = "none";
    
    const grid = document.getElementById("tournament-slots-grid");
    grid.innerHTML = "";
    
    const isHost = arenaPlayerRole === "p1";
    
    // Load teams for slot selection
    let optionsHtml = '<option value="">Escolher Time...</option>';
    if (window.comparacopaData && window.comparacopaData.teams) {
      window.comparacopaData.teams.forEach(t => {
        optionsHtml += `<option value="${t.id}">${t.flag} ${t.name}</option>`;
      });
    }
    
    data.slots.forEach((slot, idx) => {
      const isMySlot = slot.role === arenaPlayerRole;
      const card = document.createElement("div");
      card.className = "neo-card";
      card.style.padding = "15px";
      
      let slotTypeSelector = "";
      if (isHost && idx > 0) {
        slotTypeSelector = `
          <select class="neo-select" style="font-size:0.8rem; padding:4px; margin-bottom:8px;" onchange="tournamentChangeSlotType(${idx}, this.value)">
            <option value="cpu" ${slot.type === "cpu" ? 'selected' : ''}>CPU</option>
            <option value="human" ${slot.type === "human" ? 'selected' : ''}>Humano (Aberto)</option>
          </select>
        `;
      } else {
        slotTypeSelector = `<span class="badge" style="background:#ddd; color:#333; font-size:0.75rem; padding:2px 6px; border-radius:4px;">${slot.type.toUpperCase()}</span>`;
      }
      
      let teamSelector = "";
      if (isMySlot) {
        teamSelector = `
          <select class="neo-select" style="margin-top:10px;" onchange="tournamentSelectTeam(${idx}, this.value)">
            ${optionsHtml}
          </select>
        `;
      } else if (slot.team) {
        teamSelector = `<div style="font-size:1.1rem; font-weight:bold; margin-top:10px;">${getTeamFlag(slot.team)} ${getTeamName(slot.team)}</div>`;
      } else {
        teamSelector = `<div style="color:#aaa; font-style:italic; margin-top:10px;">Sem time selecionado</div>`;
      }
      
      let readyButton = "";
      if (isMySlot && slot.team) {
        readyButton = `
          <button class="neo-btn ${slot.ready ? 'btn-green' : 'btn-red'}" style="width:100%; margin-top:10px;" onclick="tournamentToggleReady(${idx})">
            ${slot.ready ? 'PRONTO ✔' : 'MARCAR PRONTO'}
          </button>
        `;
      } else if (slot.ready) {
        readyButton = `<div style="color:green; font-weight:bold; margin-top:10px;">✔ PRONTO</div>`;
      } else {
        readyButton = `<div style="color:#e74c3c; font-weight:bold; margin-top:10px;">Aguardando...</div>`;
      }
      
      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #ddd; padding-bottom:5px;">
          <strong style="font-family:'Space Mono', monospace;">#${idx+1} ${slot.name}</strong>
          ${slotTypeSelector}
        </div>
        ${teamSelector}
        ${readyButton}
      `;
      
      grid.appendChild(card);
      
      // Auto select value in selector if my slot
      if (isMySlot) {
        const sel = card.querySelector("select.neo-select");
        if (sel) sel.value = slot.team || "";
      }
    });
    
    // Check if Host can start tournament
    const btnStart = document.getElementById("btn-start-tournament");
    if (btnStart) {
      const allReady = data.slots.every(s => s.team && s.ready);
      btnStart.style.display = (isHost && allReady) ? "inline-block" : "none";
    }
    
  } else if (data.status === "bracket" || data.status === "match_playing" || data.status === "finished") {
    document.getElementById("arena-tournament-lobby").style.display = "none";
    document.getElementById("arena-tournament-bracket-screen").style.display = "block";
    
    // Render brackets
    renderBrackets(data.bracket);
    
    const activeMatchPanel = document.getElementById("tournament-active-match-panel");
    const labelTeamA = document.getElementById("active-match-team-a");
    const labelTeamB = document.getElementById("active-match-team-b");
    const controls = document.getElementById("active-match-controls");
    
    if (data.status === "bracket" && data.bracket) {
      const nextMatch = findNextActiveMatch(data.bracket);
      if (nextMatch) {
        activeMatchPanel.style.display = "block";
        labelTeamA.textContent = `${getTeamFlag(nextMatch.teamA)} ${getTeamName(nextMatch.teamA)}`;
        labelTeamB.textContent = `${getTeamFlag(nextMatch.teamB)} ${getTeamName(nextMatch.teamB)}`;
        
        // Determine role permission
        const isMyTurn = (nextMatch.roleA === arenaPlayerRole || nextMatch.roleB === arenaPlayerRole || (arenaPlayerRole === "p1" && nextMatch.type === "cpu-cpu"));
        
        controls.innerHTML = "";
        if (isMyTurn) {
          const btnText = nextMatch.type === "cpu-cpu" ? "Simular CPU vs CPU" : "Iniciar Minha Partida";
          controls.innerHTML = `
            <button class="neo-btn btn-green" onclick="tournamentStartMatch(${nextMatch.roundIdx}, ${nextMatch.matchIdx})">${btnText}</button>
          `;
        } else {
          controls.innerHTML = `<p style="color:#666; font-style:italic;">Aguardando jogadores iniciarem a partida...</p>`;
        }
      } else {
        activeMatchPanel.style.display = "none";
        // Torneio concluído
        alert(`O Torneio foi finalizado! Campeão: ${getTeamName(data.bracket.winner)}`);
      }
    } else {
      activeMatchPanel.style.display = "none";
    }
  }
}

async function tournamentChangeSlotType(idx, val) {
  const { doc, updateDoc } = window.firebaseAPI;
  const roomRef = doc(window.firebaseDB, "rooms", arenaRoomId);
  const newSlots = [...arenaState.slots];
  
  if (val === "cpu") {
    newSlots[idx] = {
      team: null,
      type: "cpu",
      name: `CPU ${idx}`,
      ready: true
    };
  } else {
    newSlots[idx] = {
      team: null,
      type: "human",
      name: `Jogador ${idx + 1}`,
      ready: false,
      role: null
    };
  }
  
  await updateDoc(roomRef, { slots: newSlots });
}

async function tournamentSelectTeam(idx, val) {
  const { doc, updateDoc } = window.firebaseAPI;
  const roomRef = doc(window.firebaseDB, "rooms", arenaRoomId);
  const newSlots = [...arenaState.slots];
  
  newSlots[idx].team = val;
  newSlots[idx].ready = false;
  
  await updateDoc(roomRef, { slots: newSlots });
}

async function tournamentToggleReady(idx) {
  const { doc, updateDoc } = window.firebaseAPI;
  const roomRef = doc(window.firebaseDB, "rooms", arenaRoomId);
  const newSlots = [...arenaState.slots];
  
  newSlots[idx].ready = !newSlots[idx].ready;
  
  await updateDoc(roomRef, { slots: newSlots });
}

async function arenaStartTournamentMatchmaking() {
  const { doc, updateDoc } = window.firebaseAPI;
  const roomRef = doc(window.firebaseDB, "rooms", arenaRoomId);
  
  const slots = arenaState.slots;
  
  // Create round of 8
  const bracket = {
    winner: null,
    rounds: [
      {
        name: "Quartas de Final",
        matches: [
          { teamA: slots[0].team, teamB: slots[1].team, scoreA: null, scoreB: null, winner: null, roleA: slots[0].role || null, roleB: slots[1].role || null, type: getMatchType(slots[0], slots[1]) },
          { teamA: slots[2].team, teamB: slots[3].team, scoreA: null, scoreB: null, winner: null, roleA: slots[2].role || null, roleB: slots[3].role || null, type: getMatchType(slots[2], slots[3]) },
          { teamA: slots[4].team, teamB: slots[5].team, scoreA: null, scoreB: null, winner: null, roleA: slots[4].role || null, roleB: slots[5].role || null, type: getMatchType(slots[4], slots[5]) },
          { teamA: slots[6].team, teamB: slots[7].team, scoreA: null, scoreB: null, winner: null, roleA: slots[6].role || null, roleB: slots[7].role || null, type: getMatchType(slots[6], slots[7]) }
        ]
      },
      {
        name: "Semifinal",
        matches: [
          { teamA: null, teamB: null, scoreA: null, scoreB: null, winner: null, roleA: null, roleB: null },
          { teamA: null, teamB: null, scoreA: null, scoreB: null, winner: null, roleA: null, roleB: null }
        ]
      },
      {
        name: "Final",
        matches: [
          { teamA: null, teamB: null, scoreA: null, scoreB: null, winner: null, roleA: null, roleB: null }
        ]
      }
    ]
  };
  
  await updateDoc(roomRef, {
    status: "bracket",
    bracket: bracket
  });
}

function getMatchType(s1, s2) {
  if (s1.type === "human" && s2.type === "human") return "human-human";
  if (s1.type === "cpu" && s2.type === "cpu") return "cpu-cpu";
  return "human-cpu";
}

function renderBrackets(bracket) {
  if (!bracket) return;
  
  const qfDiv = document.getElementById("bracket-qf");
  const sfDiv = document.getElementById("bracket-sf");
  const fDiv = document.getElementById("bracket-f");
  
  qfDiv.innerHTML = "";
  sfDiv.innerHTML = "";
  fDiv.innerHTML = "";
  
  const renderMatchBox = (m) => {
    const el = document.createElement("div");
    el.className = "neo-card";
    el.style.padding = "8px 12px";
    el.style.fontSize = "0.85rem";
    el.style.minWidth = "180px";
    
    const nameA = m.teamA ? getTeamName(m.teamA) : "A definir";
    const nameB = m.teamB ? getTeamName(m.teamB) : "A definir";
    const flagA = m.teamA ? getTeamFlag(m.teamA) : "🏳️";
    const flagB = m.teamB ? getTeamFlag(m.teamB) : "🏳️";
    const scA = m.scoreA !== null ? m.scoreA : "-";
    const scB = m.scoreB !== null ? m.scoreB : "-";
    
    el.innerHTML = `
      <div style="display:flex; justify-content:space-between; margin-bottom:4px; font-weight:${m.winner === m.teamA ? 'bold' : 'normal'}">
        <span>${flagA} ${nameA}</span>
        <span>${scA}</span>
      </div>
      <div style="display:flex; justify-content:space-between; font-weight:${m.winner === m.teamB ? 'bold' : 'normal'}">
        <span>${flagB} ${nameB}</span>
        <span>${scB}</span>
      </div>
    `;
    return el;
  };
  
  bracket.rounds[0].matches.forEach(m => qfDiv.appendChild(renderMatchBox(m)));
  bracket.rounds[1].matches.forEach(m => sfDiv.appendChild(renderMatchBox(m)));
  bracket.rounds[2].matches.forEach(m => fDiv.appendChild(renderMatchBox(m)));
}

function findNextActiveMatch(bracket) {
  if (!bracket) return null;
  // Quartas
  for (let idx = 0; idx < bracket.rounds[0].matches.length; idx++) {
    const m = bracket.rounds[0].matches[idx];
    if (m.winner === null) {
      return { ...m, roundIdx: 0, matchIdx: idx };
    }
  }
  // Semis
  for (let idx = 0; idx < bracket.rounds[1].matches.length; idx++) {
    const m = bracket.rounds[1].matches[idx];
    if (m.winner === null) {
      return { ...m, roundIdx: 1, matchIdx: idx };
    }
  }
  // Final
  const fm = bracket.rounds[2].matches[0];
  if (fm.winner === null) {
    return { ...fm, roundIdx: 2, matchIdx: 0 };
  }
  return null;
}

async function tournamentStartMatch(roundIdx, matchIdx) {
  const match = arenaState.bracket.rounds[roundIdx].matches[matchIdx];
  const { doc, updateDoc } = window.firebaseAPI;
  const roomRef = doc(window.firebaseDB, "rooms", arenaRoomId);
  
  // Carrega elencos
  if (typeof ensureSquadAndStats === "function") {
    ensureSquadAndStats(match.teamA);
    ensureSquadAndStats(match.teamB);
  }
  
  const squadA = window.comparacopaData.squads[match.teamA].players;
  const squadB = window.comparacopaData.squads[match.teamB].players;
  const benchA = window.comparacopaData.squads[match.teamA].bench.map((p, idx) => ({ ...p, no: p.no || (12 + idx) }));
  const benchB = window.comparacopaData.squads[match.teamB].bench.map((p, idx) => ({ ...p, no: p.no || (12 + idx) }));
  
  // Set up active room match states
  await updateDoc(roomRef, {
    status: "match_playing",
    state: "starting",
    p1: { team: match.teamA, squad: squadA, bench: benchA, formation: "4-3-3", ready: true, readyToResume: false },
    p2: { team: match.teamB, squad: squadB, bench: benchB, formation: "4-3-3", ready: true, readyToResume: false },
    scoreA: 0,
    scoreB: 0,
    injuryTime: 0
  });
  
  // Se for simulador automático CPU vs CPU ou CPU vs player humano mas coordenado pelo host
  if (arenaPlayerRole === "p1") {
    setTimeout(() => arenaStartPhase("first_half_1"), 2000);
  }
}

/* ==========================================================================
   SIMULATION ENGINE (Shared Offline & Online friendly/tournament logic)
   ========================================================================== */

async function advanceOnlinePhase(data) {
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
  if (currentState === "second_half_2" && data.scoreA !== data.scoreB) {
    nextPhase = "finished";
  }
  if (currentState === "extra_time_2" && data.scoreA !== data.scoreB) {
    nextPhase = "finished";
  }
  
  const { doc, updateDoc } = window.firebaseAPI;
  const roomRef = doc(window.firebaseDB, "rooms", arenaRoomId);
  
  if (nextPhase === "finished") {
    if (arenaState.mode === "tournament") {
      // Registrar resultado na chave de bracket
      await saveTournamentMatchResult(data.scoreA, data.scoreB);
    } else {
      await updateDoc(roomRef, { state: "finished" });
    }
  } else if (nextPhase) {
    arenaStartPhase(nextPhase);
  }
}

async function saveTournamentMatchResult(scA, scB) {
  const { doc, updateDoc } = window.firebaseAPI;
  const roomRef = doc(window.firebaseDB, "rooms", arenaRoomId);
  
  const bracket = JSON.parse(JSON.stringify(arenaState.bracket));
  const activeMatch = findNextActiveMatch(bracket);
  
  if (!activeMatch) return;
  
  const winner = scA > scB ? activeMatch.teamA : activeMatch.teamB;
  const winnerRole = scA > scB ? activeMatch.roleA : activeMatch.roleB;
  
  const matchInBracket = bracket.rounds[activeMatch.roundIdx].matches[activeMatch.matchIdx];
  matchInBracket.scoreA = scA;
  matchInBracket.scoreB = scB;
  matchInBracket.winner = winner;
  
  // Propaga vencedor para a rodada seguinte
  const nextRoundIdx = activeMatch.roundIdx + 1;
  if (nextRoundIdx < bracket.rounds.length) {
    const nextMatchIdx = Math.floor(activeMatch.matchIdx / 2);
    const nextSlot = activeMatch.matchIdx % 2 === 0 ? "teamA" : "teamB";
    const nextRole = activeMatch.matchIdx % 2 === 0 ? "roleA" : "roleB";
    
    bracket.rounds[nextRoundIdx].matches[nextMatchIdx][nextSlot] = winner;
    bracket.rounds[nextRoundIdx].matches[nextMatchIdx][nextRole] = winnerRole;
  } else {
    // Fim da final
    bracket.winner = winner;
  }
  
  await updateDoc(roomRef, {
    status: "bracket",
    state: "finished",
    bracket: bracket
  });
}

async function arenaStartPhase(phaseName) {
  if (arenaPlayerRole !== "p1") return; // Only engine-owner computes calculations
  
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
  const { doc, updateDoc } = window.firebaseAPI;
  const roomRef = doc(window.firebaseDB, "rooms", arenaRoomId);
  
  await updateDoc(roomRef, { 
    status: "playing",
    state: "starting"
  });
  
  if (arenaPlayerRole === "p1") {
    if (typeof ensureSquadAndStats === "function") {
      ensureSquadAndStats(data.p1.team);
      ensureSquadAndStats(data.p2.team);
    }

    const updates = {
      scoreA: 0,
      scoreB: 0,
      injuryTime: 0,
      "p1.subsLeft": 4,
      "p1.tacsLeft": 2,
      "p2.subsLeft": 4,
      "p2.tacsLeft": 2
    };
    
    if (!data.p1.squad) {
      const sq1 = window.comparacopaData.squads[data.p1.team];
      updates["p1.squad"] = sq1.players;
      updates["p1.bench"] = sq1.bench.map((p, idx) => ({ ...p, no: p.no || (12 + idx) }));
      updates["p1.formation"] = sq1.formation || "4-3-3";
    }
    if (!data.p2.squad) {
      const sq2 = window.comparacopaData.squads[data.p2.team];
      updates["p2.squad"] = sq2.players;
      updates["p2.bench"] = sq2.bench.map((p, idx) => ({ ...p, no: p.no || (12 + idx) }));
      updates["p2.formation"] = sq2.formation || "4-3-3";
    }

    await updateDoc(roomRef, updates);
    setTimeout(() => arenaStartPhase("first_half_1"), 2000);
  }
}

// Visual updates during animation
function runAnimation(simData) {
  if (!simData || !simData.events) return;
  
  // Render static pitch nodes
  arenaRenderPitch(arenaState);
  showArenaPausePanel(false);
  
  document.getElementById("arena-pitch-container").style.display = "block";
  const p1Container = document.getElementById("arena-p1-ready-container");
  if (p1Container) p1Container.parentElement.style.display = "none";
  const p2Container = document.getElementById("arena-p2-status");
  if (p2Container) p2Container.parentElement.style.display = "none";
  
  const narrator = document.getElementById("arena-narrator");
  const ball = document.getElementById("arena-ball");
  
  let currentEventIndex = 0;
  
  const playNext = () => {
    if (currentEventIndex >= simData.events.length) {
      // Finished phase
      if (arenaState.state === "finished") {
        arenaShowMatchSummary();
      } else {
        showArenaPausePanel(true);
      }
      return;
    }
    
    const ev = simData.events[currentEventIndex];
    if (narrator) narrator.textContent = ev.text;
    
    let prevScoreA = parseInt(document.getElementById("sim-score-a")?.textContent) || 0;
    let prevScoreB = parseInt(document.getElementById("sim-score-b")?.textContent) || 0;

    if (ev.scoreA !== undefined) {
      if (ev.scoreA > prevScoreA) triggerArenaFireworks("left");
      const elA = document.getElementById("sim-score-a");
      if (elA) elA.textContent = ev.scoreA;
      const elMatchA = document.getElementById("arena-score-a");
      if (elMatchA) elMatchA.textContent = ev.scoreA;
    }
    if (ev.scoreB !== undefined) {
      if (ev.scoreB > prevScoreB) triggerArenaFireworks("right");
      const elB = document.getElementById("sim-score-b");
      if (elB) elB.textContent = ev.scoreB;
      const elMatchB = document.getElementById("arena-score-b");
      if (elMatchB) elMatchB.textContent = ev.scoreB;
    }

    // Pieces scales animations
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
      p1Pieces.forEach(el => el.style.transform = "scale(1.3)");
    } else if (ev.anim === "shoot-p2") {
      ball.style.left = "10%";
      ball.style.top = "50%";
      p2Pieces.forEach(el => el.style.transform = "scale(1.3)");
    } else if (ev.anim === "mid") {
      ball.style.left = (40 + Math.random() * 20) + "%";
      ball.style.top = (30 + Math.random() * 40) + "%";
    } else if (ev.anim === "reset") {
      ball.style.left = "50%";
      ball.style.top = "50%";
    }
    
    currentEventIndex++;
    setTimeout(playNext, 2000 / arenaAnimSpeed);
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
}

// Generate logs and simulation stats
function getArenaSectorAverages(players, coords) {
  const defense = [];
  const midfield = [];
  const attack = [];
  players.forEach((p, idx) => {
    const slotPos = coords && coords[idx] ? coords[idx].pos : (p.pos || p.origPos || 'MF');
    const effOvr = getEffectivePlayerOvr ? getEffectivePlayerOvr(p, slotPos) : parseInt(p.ovr);
    const playerWithEff = { ...p, effectiveOvr: effOvr, pos: slotPos };
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
  const formationA = stateData.p1.formation || "4-3-3";
  const formationB = stateData.p2.formation || "4-3-3";
  
  const teamAName = getTeamName(teamA);
  const teamBName = getTeamName(teamB);

  const coordsA = typeof formationsCoordinates !== "undefined" ? formationsCoordinates[formationA] : null;
  const coordsB = typeof formationsCoordinates !== "undefined" ? formationsCoordinates[formationB] : null;

  const secA = getArenaSectorAverages(squadA, coordsA);
  const secB = getArenaSectorAverages(squadB, coordsB);
  const formFactorsA = getArenaFormationFactors(formationA);
  const formFactorsB = getArenaFormationFactors(formationB);

  let attackPowerA = (secA.att * 0.7 + secA.mid * 0.3) * formFactorsA.att;
  let attackPowerB = (secB.att * 0.7 + secB.mid * 0.3) * formFactorsB.att;
  let defensePowerA = secA.def * formFactorsA.def;
  let defensePowerB = secB.def * formFactorsB.def;

  // Apply style modifiers: Defensivo (+10% defense, -5% attack), Ofensivo (+10% attack, -5% defense)
  const styleA = stateData.p1.style || "bal";
  const styleB = stateData.p2.style || "bal";

  if (styleA === "def") {
    defensePowerA *= 1.10;
    attackPowerA *= 0.95;
  } else if (styleA === "off") {
    attackPowerA *= 1.10;
    defensePowerA *= 0.95;
  }

  if (styleB === "def") {
    defensePowerB *= 1.10;
    attackPowerB *= 0.95;
  } else if (styleB === "off") {
    attackPowerB *= 1.10;
    defensePowerB *= 0.95;
  }

  const totalPower = attackPowerA + attackPowerB;
  const posA = Math.round((attackPowerA / totalPower) * 100);

  let chanceGoalA = 4.0 + (attackPowerA - defensePowerB) * 1.5;
  let chanceGoalB = 4.0 + (attackPowerB - defensePowerA) * 1.5;

  // Apply Difficulty mode: "classic" vs "almanac" (random variance)
  const diff = stateData.difficulty || "classic";
  if (diff === "almanac") {
    const varianceA = 0.5 + Math.random(); // Variance factor [0.5, 1.5]
    const varianceB = 0.5 + Math.random();
    chanceGoalA *= varianceA;
    chanceGoalB *= varianceB;
  }

  const getOffensivePlayer = (squad) => {
    const off = squad.filter(p => p.pos !== "GK");
    if (off.length === 0) return "Jogador (FW)";
    const p = off[Math.floor(Math.random() * off.length)];
    return `${p.name} (${p.pos || p.origPos || 'FW'})`;
  };
  const getDefensivePlayer = (squad) => {
    const def = squad.filter(p => p.pos === "DF" || p.pos === "MF");
    if (def.length === 0) return "Defensor (DF)";
    const p = def[Math.floor(Math.random() * def.length)];
    return `${p.name} (${p.pos || p.origPos || 'DF'})`;
  };

  if (min === 0) events.push({ time: "00'", text: "Apita o árbitro! Começa o jogo na Arena!", anim: "start" });
  if (min === 46) events.push({ time: "46'", text: "Começa o segundo tempo! A bola volta a rolar!", anim: "start" });
  if (min === 91) events.push({ time: "91'", text: "Bola rolando na prorrogação! Haja coração!", anim: "start" });
  if (min === 106) events.push({ time: "106'", text: "Últimos 15 minutos de prorrogação!", anim: "start" });

  while(min < endMin) {
    min += Math.floor(Math.random() * 5) + 3;
    if (min >= endMin) min = endMin;
    
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
      events.push({ time: min + "'", text: `Quase gol do ${team}! ${shooter} chuta forte mas ${oppGk} faz defense espetacular!`, anim: isTeamA ? "shoot-p1" : "shoot-p2" });
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
  const teamAName = getTeamName(teamA);
  const teamBName = getTeamName(teamB);
  
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
    
    if (takenA >= 5 && penA !== penB) {
      const winner = penA > penB ? teamAName : teamBName;
      events.push({ time: "FIM", text: `FIM DE JOGO! O ${winner} VENCE NAS COBRANÇAS ALTERNADAS POR ${Math.max(penA, penB)} a ${Math.min(penA, penB)}!`, anim: "reset" });
      break;
    }
  }
  
  return { events };
}

function arenaRenderPitch(data) {
  const container = document.getElementById("arena-pieces-layer");
  if (!container) return;
  container.innerHTML = "";
  
  if (!data.p1 || !data.p2 || !data.p1.squad || !data.p2.squad) return;
  
  const coordsP1 = typeof formationsCoordinates !== "undefined" ? formationsCoordinates[data.p1.formation || "4-3-3"] : null;
  const coordsP2 = typeof formationsCoordinates !== "undefined" ? formationsCoordinates[data.p2.formation || "4-3-3"] : null;
  
  const colorsP1 = window.comparacopaData.teamColors[data.p1.team] || { primary: "#222", secondary: "#fff" };
  const colorsP2 = window.comparacopaData.teamColors[data.p2.team] || { primary: "#222", secondary: "#fff" };
  
  // Render Player 1 Pieces (Left)
  data.p1.squad.forEach((player, index) => {
    const node = document.createElement("div");
    node.className = "arena-piece p1-piece";
    const slotY = coordsP1 && coordsP1[index] ? coordsP1[index].y : player.y;
    const slotX = coordsP1 && coordsP1[index] ? coordsP1[index].x : player.x;
    node.style.left = `${slotY}%`; 
    node.style.top = `${slotX}%`;
    node.style.backgroundColor = colorsP1.primary;
    node.style.color = colorsP1.text || "#ffffff";
    node.style.borderColor = colorsP1.secondary;
    node.style.transform = "translate(-50%, -50%)";
    node.innerHTML = `<span>${player.no}</span>`;
    
    const posLabel = coordsP1 && coordsP1[index] ? coordsP1[index].pos : (player.pos || player.origPos || 'MF');
    node.title = `${player.name} (${posLabel})`;
    container.appendChild(node);
  });
  
  // Render Player 2 Pieces (Right) - Mirrored
  data.p2.squad.forEach((player, index) => {
    const node = document.createElement("div");
    node.className = "arena-piece p2-piece";
    const slotY = coordsP2 && coordsP2[index] ? coordsP2[index].y : player.y;
    const slotX = coordsP2 && coordsP2[index] ? coordsP2[index].x : player.x;
    node.style.left = `${100 - slotY}%`; 
    node.style.top = `${100 - slotX}%`;
    node.style.backgroundColor = colorsP2.primary;
    node.style.color = colorsP2.text || "#ffffff";
    node.style.borderColor = colorsP2.secondary;
    node.style.transform = "translate(-50%, -50%)";
    node.innerHTML = `<span>${player.no}</span>`;
    
    const posLabel = coordsP2 && coordsP2[index] ? coordsP2[index].pos : (player.pos || player.origPos || 'MF');
    node.title = `${player.name} (${posLabel})`;
    container.appendChild(node);
  });
}

let arenaPauseTimerInterval = null;
function startArenaPauseTimer(seconds) {
  let timeLeft = seconds;
  const timerEl = document.getElementById("arena-pause-timer");
  if (timerEl) timerEl.textContent = timeLeft;
  
  clearInterval(arenaPauseTimerInterval);
  arenaPauseTimerInterval = setInterval(() => {
    timeLeft--;
    if (timerEl) timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(arenaPauseTimerInterval);
      arenaConfirmReadyToResume();
    }
  }, 1000);
}

function showArenaPausePanel(isPause) {
  if (isPause) {
    document.getElementById("arena-pause-panel").style.display = "block";
    const btn = document.getElementById("btn-arena-resume");
    if (btn) {
      btn.disabled = false;
      btn.textContent = "Pular / Estou Pronto";
    }
    const wait = document.getElementById("arena-pause-waiting");
    if (wait) wait.style.display = "none";
    
    // Updates UI texts
    const scA = document.getElementById("sim-score-a")?.textContent || 0;
    const scB = document.getElementById("sim-score-b")?.textContent || 0;
    const elScoreA = document.getElementById("arena-score-a");
    if (elScoreA) elScoreA.textContent = scA;
    const elScoreB = document.getElementById("arena-score-b");
    if (elScoreB) elScoreB.textContent = scB;
    
    const elTeamA = document.getElementById("arena-team-a-name");
    if (elTeamA) elTeamA.textContent = getTeamName(arenaState.p1.team);
    const elTeamB = document.getElementById("arena-team-b-name");
    if (elTeamB) elTeamB.textContent = getTeamName(arenaState.p2.team);
    
    if (!isAnimating) {
      arenaRenderPitch(arenaState);
    }
    
    startArenaPauseTimer(30);
  } else {
    document.getElementById("arena-pause-panel").style.display = "none";
    clearInterval(arenaPauseTimerInterval);
  }
}

async function arenaConfirmReadyToResume() {
  const btn = document.getElementById("btn-arena-resume");
  if (btn) {
    btn.disabled = true;
    btn.textContent = "AGUARDANDO...";
  }
  const wait = document.getElementById("arena-pause-waiting");
  if (wait) wait.style.display = "block";
  
  if (arenaRoomId === "LOCAL") {
    // Mode local handles itself
    const currentState = localState.state;
    const phases = {
      "first_half_1": "first_half_2",
      "first_half_2": "second_half_1",
      "second_half_1": "second_half_2",
      "second_half_2": "extra_time_1",
      "extra_time_1": "extra_time_2",
      "extra_time_2": "penalties"
    };
    
    let nextPhase = phases[currentState];
    if (currentState === "second_half_2" && localState.scoreA !== localState.scoreB) {
      nextPhase = "finished";
    }
    if (currentState === "extra_time_2" && localState.scoreA !== localState.scoreB) {
      nextPhase = "finished";
    }
    
    if (nextPhase === "finished") {
      arenaShowMatchSummary();
    } else if (nextPhase) {
      arenaStartLocalPhase(nextPhase);
    }
  } else {
    // Firebase flow
    const { doc, updateDoc } = window.firebaseAPI;
    const roomRef = doc(window.firebaseDB, "rooms", arenaRoomId);
    
    if (arenaPlayerRole === "p1") {
      await updateDoc(roomRef, { "p1.readyToResume": true });
    } else {
      await updateDoc(roomRef, { "p2.readyToResume": true });
    }
  }
}

/* ==========================================================================
   SUBSTITUTIONS AND ACTIONS FOR ACTIVE ARENA GAME
   ========================================================================== */

function arenaOpenSubModal() {
  if (!arenaState) return;
  const pState = arenaState[arenaPlayerRole];
  if (!pState) return;
  
  if (pState.subsLeft <= 0) {
    return alert("Você já usou todas as 4 substituições permitidas!");
  }
  
  document.getElementById("arena-modal-sub").style.display = "block";
  const selectOut = document.getElementById("arena-sub-out");
  const selectIn = document.getElementById("arena-sub-in");
  
  selectOut.innerHTML = "";
  selectIn.innerHTML = "";
  
  pState.squad.forEach((p, idx) => {
    const posLabel = p.pos || p.origPos || 'MF';
    selectOut.innerHTML += `<option value="${idx}">${posLabel} - ${p.name} (${p.ovr})</option>`;
  });
  
  pState.bench.forEach((p, idx) => {
    const posLabel = p.pos || p.origPos || 'MF';
    selectIn.innerHTML += `<option value="${idx}">${posLabel} - ${p.name} (${p.ovr})</option>`;
  });
}

async function arenaConfirmSub() {
  const pState = arenaState[arenaPlayerRole];
  if (!pState || pState.subsLeft <= 0) return;

  const idxOut = document.getElementById("arena-sub-out").value;
  const idxIn = document.getElementById("arena-sub-in").value;
  if (idxOut === "" || idxIn === "") return;
  
  const squad = [...pState.squad];
  const bench = [...pState.bench];
  const playerOut = squad[idxOut];
  const playerIn = bench[idxIn];
  
  const newPlayerIn = {
    ...playerIn,
    pos: playerOut.pos,
    x: playerOut.x,
    y: playerOut.y
  };
  
  squad[idxOut] = newPlayerIn;
  bench.splice(idxIn, 1);
  bench.push(playerOut);
  
  if (arenaRoomId === "LOCAL") {
    pState.squad = squad;
    pState.bench = bench;
    pState.subsLeft--;
    localState.injuryTime++;
    alert(`Substituição feita! ${playerIn.name} entrou no lugar de ${playerOut.name}. (+1 min de acréscimo)`);
    document.getElementById("arena-modal-sub").style.display = "none";
    arenaRenderPitch(localState);
  } else {
    const { doc, updateDoc } = window.firebaseAPI;
    const roomRef = doc(window.firebaseDB, "rooms", arenaRoomId);
    
    const updates = {};
    updates[`${arenaPlayerRole}.squad`] = squad;
    updates[`${arenaPlayerRole}.bench`] = bench;
    updates[`${arenaPlayerRole}.subsLeft`] = pState.subsLeft - 1;
    updates["injuryTime"] = (arenaState.injuryTime || 0) + 1;
    
    await updateDoc(roomRef, updates);
    
    alert(`Substituição feita! ${playerIn.name} entrou no lugar de ${playerOut.name}. (+1 min de acréscimo)`);
    document.getElementById("arena-modal-sub").style.display = "none";
  }
}

function arenaOpenTacModal() {
  if (!arenaState) return;
  const pState = arenaState[arenaPlayerRole];
  if (!pState) return;
  
  if (pState.tacsLeft <= 0) {
    return alert("Você já usou todas as 2 alterações táticas permitidas!");
  }
  
  document.getElementById("arena-modal-tac").style.display = "block";
  const selectForm = document.getElementById("arena-tac-select");
  if (selectForm) {
    selectForm.value = pState.formation;
  }
}

async function arenaConfirmTac() {
  const pState = arenaState[arenaPlayerRole];
  if (!pState || pState.tacsLeft <= 0) return;
  
  const selectForm = document.getElementById("arena-tac-select");
  if (!selectForm) return;
  
  const newFormation = selectForm.value;
  
  if (arenaRoomId === "LOCAL") {
    pState.formation = newFormation;
    pState.tacsLeft--;
    alert(`Tática alterada para ${newFormation}!`);
    document.getElementById("arena-modal-tac").style.display = "none";
  } else {
    const { doc, updateDoc } = window.firebaseAPI;
    const roomRef = doc(window.firebaseDB, "rooms", arenaRoomId);
    
    const updates = {};
    updates[`${arenaPlayerRole}.formation`] = newFormation;
    updates[`${arenaPlayerRole}.tacsLeft`] = pState.tacsLeft - 1;
    
    await updateDoc(roomRef, updates);
    
    alert(`Tática alterada para ${newFormation}!`);
    document.getElementById("arena-modal-tac").style.display = "none";
  }
}

function arenaSetSpeed(mult) {
  arenaAnimSpeed = mult;
  document.getElementById("btn-speed-1")?.classList.remove("btn-green");
  document.getElementById("btn-speed-15")?.classList.remove("btn-green");
  document.getElementById("btn-speed-2")?.classList.remove("btn-green");
  
  if (mult === 1.0) document.getElementById("btn-speed-1")?.classList.add("btn-green");
  if (mult === 1.5) document.getElementById("btn-speed-15")?.classList.add("btn-green");
  if (mult === 2.0) document.getElementById("btn-speed-2")?.classList.add("btn-green");
}

function arenaShowMatchSummary() {
  const modal = document.getElementById("arena-modal-summary");
  if (!modal || !arenaState) return;
  
  const scoreA = arenaState.scoreA || 0;
  const scoreB = arenaState.scoreB || 0;
  
  const flagA = getTeamFlag(arenaState.p1.team);
  const nameA = getTeamName(arenaState.p1.team);
  const flagB = getTeamFlag(arenaState.p2.team);
  const nameB = getTeamName(arenaState.p2.team);
  
  const labelFlagA = document.getElementById("summary-flag-a");
  if (labelFlagA) labelFlagA.textContent = flagA;
  const labelTeamA = document.getElementById("summary-team-a");
  if (labelTeamA) labelTeamA.textContent = nameA;
  
  const labelFlagB = document.getElementById("summary-flag-b");
  if (labelFlagB) labelFlagB.textContent = flagB;
  const labelTeamB = document.getElementById("summary-team-b");
  if (labelTeamB) labelTeamB.textContent = nameB;
  
  const labelScore = document.getElementById("summary-score");
  if (labelScore) labelScore.textContent = `${scoreA} - ${scoreB}`;
  
  modal.style.display = "flex";
}

function arenaDownloadSummary() {
  const card = document.getElementById("arena-summary-card");
  if (!card) return;
  
  html2canvas(card, {
    backgroundColor: "#111",
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
  const flagA = getTeamFlag(arenaState.p1.team);
  const nameA = getTeamName(arenaState.p1.team);
  const flagB = getTeamFlag(arenaState.p2.team);
  const nameB = getTeamName(arenaState.p2.team);
  
  const text = `🏆 FIM DE JOGO na Comparacopa Arena!\n\n${flagA} ${nameA} ${scoreA} x ${scoreB} ${nameB} ${flagB}\n\nDesafie seus amigos e monte a sua seleção!`;
  
  if (navigator.share) {
    navigator.share({
      title: "Resultado Comparacopa Arena",
      text: text
    }).catch(console.error);
  } else {
    navigator.clipboard.writeText(text).then(() => {
      alert("Resultado copiado para a área de transferência! Compartilhe nas redes.");
    });
  }
}
