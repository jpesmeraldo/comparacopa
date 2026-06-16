// Comparacopa 2026 - Lógica da Aplicação
let activeTeamA = "BRA";
let activeTeamB = "FRA";
let activeFieldTeam = "A"; // 'A' ou 'B'
let currentGroupTab = "A";
let simulationInterval = null;

// Inicialização ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  initSelectors();
  initGroupTabs();
  loadComparison();
  renderBrackets();
  
  // Inicializar ícones do Lucide
  lucide.createIcons();
});

// Alternar entre abas principais (Comparador vs Torneio)
function switchSection(sectionId) {
  document.querySelectorAll('.content-section').forEach(sec => {
    sec.classList.remove('active');
  });
  document.querySelectorAll('.nav-section-btns button').forEach(btn => {
    btn.classList.remove('active', 'btn-green', 'btn-blue');
    btn.classList.add('btn-secondary');
  });

  document.getElementById(`section-${sectionId}`).classList.add('active');
  
  const activeBtn = document.getElementById(`btn-sec-${sectionId}`);
  activeBtn.classList.add('active');
  if (sectionId === 'compare') {
    activeBtn.classList.add('btn-green');
  } else {
    activeBtn.classList.add('btn-blue');
  }
}

// Inicializar seletores de seleções de todos os grupos
function initSelectors() {
  const selectA = document.getElementById("select-team-a");
  const selectB = document.getElementById("select-team-b");
  
  selectA.innerHTML = "";
  selectB.innerHTML = "";

  // Agrupar todos os times de todos os grupos
  const allTeams = [];
  for (const grp in window.comparacopaData.groups) {
    window.comparacopaData.groups[grp].forEach(t => {
      // Evitar duplicados por id (ex: se um time for repetido)
      if (!allTeams.some(existing => existing.id === t.id)) {
        allTeams.push(t);
      }
    });
  }

  // Ordenar alfabeticamente pelo nome do país
  allTeams.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));

  allTeams.forEach(team => {
    const optA = document.createElement("option");
    optA.value = team.id;
    optA.textContent = `${team.flag} ${team.name}`;
    if (team.id === activeTeamA) optA.selected = true;
    selectA.appendChild(optA);

    const optB = document.createElement("option");
    optB.value = team.id;
    optB.textContent = `${team.flag} ${team.name}`;
    if (team.id === activeTeamB) optB.selected = true;
    selectB.appendChild(optB);
  });
}

// Gerador automático sob demanda para elencos (squads) e estatísticas das seleções que não pertencem ao G8
function ensureSquadAndStats(teamId) {
  // 1. Estatísticas dos últimos 100 jogos
  if (!window.comparacopaData.teamStats[teamId]) {
    const tier = getTeamTier(teamId);
    let wins = 30, draws = 25, losses = 45, goals = 120, conceded = 160, sheets = 20, form = ["L", "D", "W", "L", "D"];
    
    if (tier === "A") {
      wins = 60; draws = 20; losses = 20; goals = 185; conceded = 90; sheets = 42; form = ["W", "W", "D", "W", "D"];
    } else if (tier === "B") {
      wins = 45; draws = 25; losses = 30; goals = 150; conceded = 125; sheets = 30; form = ["W", "L", "D", "W", "L"];
    }
    
    window.comparacopaData.teamStats[teamId] = {
      wins, draws, losses, goalsScored: goals, goalsConceded: conceded, cleanSheets: sheets, form
    };
  }

  // 2. Elenco tático de titulares e reservas
  if (!window.comparacopaData.squads[teamId]) {
    const tier = getTeamTier(teamId);
    const baseOvr = tier === "A" ? 82 : (tier === "B" ? 78 : 73);
    const names = getPlayerNamesByNationality(teamId);
    
    // Coordenadas padrão para o esquema 4-3-3
    const positions = [
      { pos: "GK", no: 1, x: 50, y: 12 },
      { pos: "DF", no: 2, x: 85, y: 35 },
      { pos: "DF", no: 3, x: 65, y: 28 },
      { pos: "DF", no: 4, x: 35, y: 28 },
      { pos: "DF", no: 6, x: 15, y: 35 },
      { pos: "MF", no: 5, x: 50, y: 50 },
      { pos: "MF", no: 8, x: 30, y: 55 },
      { pos: "MF", no: 10, x: 70, y: 55 },
      { pos: "FW", no: 7, x: 80, y: 80 },
      { pos: "FW", no: 9, x: 50, y: 85 },
      { pos: "FW", no: 11, x: 20, y: 80 }
    ];

    const players = positions.map((posInfo, index) => {
      const pName = names[index] || `Jogador ${posInfo.no}`;
      const ovrVariation = (index % 5) - 2; // -2 a +2
      const ovr = Math.min(95, Math.max(60, baseOvr + ovrVariation));
      return {
        name: pName,
        pos: posInfo.pos,
        no: posInfo.no,
        club: "Clube Local",
        ovr: ovr,
        pac: Math.min(99, Math.max(50, baseOvr + 5 + (index % 3) * 4)),
        sho: Math.min(99, Math.max(40, posInfo.pos === "FW" ? baseOvr + 8 : (posInfo.pos === "MF" ? baseOvr - 2 : 45))),
        pas: Math.min(99, Math.max(40, posInfo.pos === "GK" ? 50 : baseOvr + 2)),
        dri: Math.min(99, Math.max(40, posInfo.pos === "FW" ? baseOvr + 6 : baseOvr - 2)),
        def: Math.min(99, Math.max(40, posInfo.pos === "DF" ? baseOvr + 8 : (posInfo.pos === "GK" ? baseOvr + 7 : 50))),
        phy: Math.min(99, Math.max(50, baseOvr + 4)),
        x: posInfo.x,
        y: posInfo.y
      };
    });

    // Banco de Reservas
    const benchPositions = ["GK", "DF", "DF", "MF", "MF", "FW", "FW", "FW"];
    const bench = benchPositions.map((pos, index) => {
      const bName = names[11 + index] || `Reserva ${index + 1}`;
      const ovr = Math.min(90, Math.max(55, baseOvr - 2 - (index % 3)));
      return {
        name: bName,
        pos: pos,
        club: "Clube Local",
        ovr: ovr,
        pac: baseOvr + 2,
        sho: pos === "FW" ? baseOvr + 5 : 45,
        pas: baseOvr,
        dri: baseOvr,
        def: pos === "DF" ? baseOvr + 5 : 45,
        phy: baseOvr + 2
      };
    });

    window.comparacopaData.squads[teamId] = {
      formation: "4-3-3",
      players,
      bench
    };
  }
}

function getTeamTier(teamId) {
  const tierA = ["BEL", "NED", "CRO", "COL", "MAR", "MEX", "USA", "SUI", "JPN", "KOR", "SWE", "AUT"];
  const tierB = ["SEN", "ECU", "EGY", "TUR", "PAR", "CIV", "TUN", "IRN", "NOR", "ALG", "GHA", "CZE"];
  return tierA.includes(teamId) ? "A" : (tierB.includes(teamId) ? "B" : "C");
}

function getPlayerNamesByNationality(teamId) {
  const spanishSurnames = ["Rodriguez", "Lopez", "Sanchez", "Gomez", "Perez", "Hernandez", "Diaz", "Torres", "Ramirez", "Flores", "Morales", "Ortiz", "Castro", "Rios", "Alvarez", "Castillo", "Ruiz", "Vargas", "Mendez", "Guzman"];
  const englishSurnames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Wilson", "Taylor", "Thomas", "Anderson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson", "Clark", "Rodriguez"];
  const portSurnames = ["Silva", "Santos", "Oliveira", "Souza", "Pereira", "Costa", "Carvalho", "Ferreira", "Ribeiro", "Gomes", "Martins", "Rocha", "Almeida", "Lopes", "Soares", "Cardoso", "Teixeira", "Mendes", "Jesus", "Pinto"];
  const japaneseSurnames = ["Sato", "Tanaka", "Watanabe", "Ito", "Nakamura", "Kobayashi", "Takahashi", "Saito", "Suzuki", "Yamamoto", "Aoki", "Ishii", "Kondo", "Ono", "Ueda", "Mori", "Hasegawa", "Shida", "Inoue", "Kato"];
  const koreanSurnames = ["Kim", "Lee", "Park", "Choi", "Jung", "Kang", "Cho", "Yoon", "Jang", "Lim", "Han", "Shin", "Song", "Oh", "Suh", "Hwang", "Kwon", "Ahn", "Hong", "Yoo"];
  
  const spanishTeams = ["MEX", "COL", "PAR", "ECU", "ESP", "ARG", "URU", "HAI", "CUW"];
  const englishTeams = ["USA", "CAN", "ENG", "NZL", "SCO", "RSA", "GHA", "PAN"];
  const portTeams = ["BRA", "POR", "CPV", "COD"];
  const asianTeams = ["JPN", "KOR", "UZB", "IRN", "IRQ", "JOR", "QAT", "KSA"];

  let pool = spanishSurnames;
  if (spanishTeams.includes(teamId)) {
    pool = spanishSurnames;
  } else if (englishTeams.includes(teamId)) {
    pool = englishSurnames;
  } else if (portTeams.includes(teamId)) {
    pool = portSurnames;
  } else if (teamId === "JPN") {
    pool = japaneseSurnames;
  } else if (teamId === "KOR") {
    pool = koreanSurnames;
  } else {
    return Array.from({length: 25}, (_, i) => `${teamId} Craque ${i+1}`);
  }

  return Array.from({length: 25}, (_, i) => {
    const fn = teamId === "KOR" ? "" : (["J.", "M.", "R.", "C.", "D.", "F.", "L.", "P.", "S.", "A."][i % 10] + " ");
    return fn + pool[i % pool.length];
  });
}

// Obter nome e bandeira de um país pelo ID
function getTeamNameAndFlag(id) {
  for (const grp in window.comparacopaData.groups) {
    const team = window.comparacopaData.groups[grp].find(t => t.id === id);
    if (team) return { name: team.name, flag: team.flag };
  }
  // Fallbacks para códigos conhecidos fora da lista base se houver
  const fallbacks = {
    BRA: { name: "Brasil", flag: "🇧🇷" },
    ARG: { name: "Argentina", flag: "🇦🇷" },
    FRA: { name: "França", flag: "🇫🇷" },
    ESP: { name: "Espanha", flag: "🇪🇸" },
    ENG: { name: "Inglaterra", flag: "🏴\u200d󠁡󠁩󠁲󠁿" },
    GER: { name: "Alemanha", flag: "🇩🇪" },
    POR: { name: "Portugal", flag: "🇵🇹" },
    URU: { name: "Uruguai", flag: "🇺🇾" }
  };
  return fallbacks[id] || { name: id, flag: "🏳️" };
}

// Carregar toda a comparação ao selecionar times
function loadComparison() {
  activeTeamA = document.getElementById("select-team-a").value;
  activeTeamB = document.getElementById("select-team-b").value;

  if (activeTeamA === activeTeamB) {
    alert("Por favor, selecione duas seleções diferentes!");
    return;
  }

  // Garantir existência de dados e elencos antes de carregar
  ensureSquadAndStats(activeTeamA);
  ensureSquadAndStats(activeTeamB);

  // Atualizar cabeçalhos de placar do simulador
  const detailsA = getTeamNameAndFlag(activeTeamA);
  const detailsB = getTeamNameAndFlag(activeTeamB);
  
  document.getElementById("score-flag-a").textContent = detailsA.flag;
  document.getElementById("score-name-a").textContent = activeTeamA;
  document.getElementById("score-flag-b").textContent = detailsB.flag;
  document.getElementById("score-name-b").textContent = activeTeamB;
  document.getElementById("score-flag-b").textContent = detailsB.flag;
  document.getElementById("score-name-b").textContent = activeTeamB;
  
  // Resetar placar
  document.getElementById("sim-score-a").textContent = "0";
  document.getElementById("sim-score-b").textContent = "0";
  document.getElementById("sim-console").innerHTML = `<div class="sim-console-line">&gt; Pronto para simulação entre ${detailsA.name} e ${detailsB.name}...</div>`;

  renderStats();
  renderTacticalField();
  initPlayerSelectors();
  comparePlayers();
}

// Renderizar estatísticas históricas (100 jogos)
function renderStats() {
  const statsA = window.comparacopaData.teamStats[activeTeamA];
  const statsB = window.comparacopaData.teamStats[activeTeamB];

  const nameA = getTeamNameAndFlag(activeTeamA).name;
  const nameB = getTeamNameAndFlag(activeTeamB).name;

  // Vitórias
  document.getElementById("label-wins-a").textContent = `${nameA}: ${statsA.wins} Vitórias`;
  document.getElementById("label-wins-b").textContent = `${nameB}: ${statsB.wins} Vitórias`;
  const winSum = statsA.wins + statsB.wins;
  document.getElementById("bar-wins-a").style.width = `${(statsA.wins / winSum) * 100}%`;
  document.getElementById("bar-wins-b").style.width = `${(statsB.wins / winSum) * 100}%`;

  // Gols Marcados
  document.getElementById("label-goals-a").textContent = `${nameA}: ${statsA.goalsScored}`;
  document.getElementById("label-goals-b").textContent = `${nameB}: ${statsB.goalsScored}`;
  const goalsSum = statsA.goalsScored + statsB.goalsScored;
  document.getElementById("bar-goals-a").style.width = `${(statsA.goalsScored / goalsSum) * 100}%`;
  document.getElementById("bar-goals-b").style.width = `${(statsB.goalsScored / goalsSum) * 100}%`;

  // Clean Sheets
  document.getElementById("label-sheets-a").textContent = `${nameA}: ${statsA.cleanSheets}`;
  document.getElementById("label-sheets-b").textContent = `${nameB}: ${statsB.cleanSheets}`;
  const sheetsSum = statsA.cleanSheets + statsB.cleanSheets;
  document.getElementById("bar-sheets-a").style.width = `${(statsA.cleanSheets / sheetsSum) * 100}%`;
  document.getElementById("bar-sheets-b").style.width = `${(statsB.cleanSheets / sheetsSum) * 100}%`;

  // Probabilidade de Resultado Futuro
  const squadA = window.comparacopaData.squads[activeTeamA].players;
  const squadB = window.comparacopaData.squads[activeTeamB].players;
  const avgOvrA = squadA.reduce((sum, p) => sum + p.ovr, 0) / 11;
  const avgOvrB = squadB.reduce((sum, p) => sum + p.ovr, 0) / 11;
  
  const strA = (avgOvrA * 0.65) + (statsA.wins * 0.35);
  const strB = (avgOvrB * 0.65) + (statsB.wins * 0.35);
  const totalStr = strA + strB;

  const winPctA = Math.round((strA / totalStr) * 76);
  const winPctB = Math.round((strB / totalStr) * 76);
  const drawPct = 100 - winPctA - winPctB;

  document.getElementById("label-prob-a").textContent = `${nameA}: ${winPctA}%`;
  document.getElementById("label-prob-b").textContent = `${nameB}: ${winPctB}%`;
  document.getElementById("label-prob-draw-txt").textContent = `Empate: ${drawPct}%`;

  document.getElementById("bar-prob-a").style.width = `${winPctA}%`;
  document.getElementById("bar-prob-draw").style.width = `${drawPct}%`;
  document.getElementById("bar-prob-b").style.width = `${winPctB}%`;

  // Forma Recente
  renderFormBadges("form-badges-a", statsA.form);
  renderFormBadges("form-badges-b", statsB.form);
}

function renderFormBadges(elementId, formArray) {
  const container = document.getElementById(elementId);
  container.innerHTML = "";
  formArray.forEach(result => {
    const badge = document.createElement("div");
    badge.className = `form-badge ${result}`;
    badge.textContent = result;
    container.appendChild(badge);
  });
}

// Dicionário de Coordenadas de Formações Táticas Retro
const formationsCoordinates = {
  "4-3-3": [
    { pos: "GK", x: 50, y: 12 },
    { pos: "DF", x: 85, y: 35 }, { pos: "DF", x: 65, y: 28 }, { pos: "DF", x: 35, y: 28 }, { pos: "DF", x: 15, y: 35 },
    { pos: "MF", x: 50, y: 50 }, { pos: "MF", x: 30, y: 55 }, { pos: "MF", x: 70, y: 55 },
    { pos: "FW", x: 80, y: 80 }, { pos: "FW", x: 50, y: 85 }, { pos: "FW", x: 20, y: 80 }
  ],
  "4-4-2": [
    { pos: "GK", x: 50, y: 12 },
    { pos: "DF", x: 85, y: 35 }, { pos: "DF", x: 65, y: 28 }, { pos: "DF", x: 35, y: 28 }, { pos: "DF", x: 15, y: 35 },
    { pos: "MF", x: 35, y: 52 }, { pos: "MF", x: 65, y: 52 }, { pos: "MF", x: 20, y: 65 }, { pos: "MF", x: 80, y: 65 },
    { pos: "FW", x: 35, y: 85 }, { pos: "FW", x: 65, y: 85 }
  ],
  "4-2-3-1": [
    { pos: "GK", x: 50, y: 12 },
    { pos: "DF", x: 85, y: 35 }, { pos: "DF", x: 65, y: 28 }, { pos: "DF", x: 35, y: 28 }, { pos: "DF", x: 15, y: 35 },
    { pos: "MF", x: 35, y: 48 }, { pos: "MF", x: 65, y: 48 },
    { pos: "MF", x: 50, y: 65 }, { pos: "FW", x: 80, y: 68 }, { pos: "FW", x: 20, y: 68 },
    { pos: "FW", x: 50, y: 86 }
  ],
  "4-2-4": [
    { pos: "GK", x: 50, y: 12 },
    { pos: "DF", x: 85, y: 35 }, { pos: "DF", x: 65, y: 28 }, { pos: "DF", x: 35, y: 28 }, { pos: "DF", x: 15, y: 35 },
    { pos: "MF", x: 35, y: 53 }, { pos: "MF", x: 65, y: 53 },
    { pos: "FW", x: 85, y: 80 }, { pos: "FW", x: 60, y: 85 }, { pos: "FW", x: 40, y: 85 }, { pos: "FW", x: 15, y: 80 }
  ],
  "3-5-2": [
    { pos: "GK", x: 50, y: 12 },
    { pos: "DF", x: 65, y: 28 }, { pos: "DF", x: 50, y: 26 }, { pos: "DF", x: 35, y: 28 },
    { pos: "MF", x: 15, y: 50 }, { pos: "MF", x: 50, y: 48 }, { pos: "MF", x: 85, y: 50 }, { pos: "MF", x: 35, y: 62 }, { pos: "MF", x: 65, y: 62 },
    { pos: "FW", x: 35, y: 85 }, { pos: "FW", x: 65, y: 85 }
  ],
  "5-3-2": [
    { pos: "GK", x: 50, y: 12 },
    { pos: "DF", x: 12, y: 38 }, { pos: "DF", x: 68, y: 28 }, { pos: "DF", x: 50, y: 26 }, { pos: "DF", x: 32, y: 28 }, { pos: "DF", x: 88, y: 38 },
    { pos: "MF", x: 50, y: 48 }, { pos: "MF", x: 30, y: 58 }, { pos: "MF", x: 70, y: 58 },
    { pos: "FW", x: 35, y: 85 }, { pos: "FW", x: 65, y: 85 }
  ],
  "4-5-1": [
    { pos: "GK", x: 50, y: 12 },
    { pos: "DF", x: 85, y: 35 }, { pos: "DF", x: 65, y: 28 }, { pos: "DF", x: 35, y: 28 }, { pos: "DF", x: 15, y: 35 },
    { pos: "MF", x: 50, y: 46 }, { pos: "MF", x: 35, y: 58 }, { pos: "MF", x: 65, y: 58 }, { pos: "MF", x: 82, y: 65 }, { pos: "MF", x: 18, y: 65 },
    { pos: "FW", x: 50, y: 85 }
  ],
  "3-4-3": [
    { pos: "GK", x: 50, y: 12 },
    { pos: "DF", x: 65, y: 28 }, { pos: "DF", x: 50, y: 26 }, { pos: "DF", x: 35, y: 28 },
    { pos: "MF", x: 15, y: 52 }, { pos: "MF", x: 35, y: 55 }, { pos: "MF", x: 65, y: 55 }, { pos: "MF", x: 85, y: 52 },
    { pos: "FW", x: 80, y: 80 }, { pos: "FW", x: 50, y: 85 }, { pos: "FW", x: 20, y: 80 }
  ]
};

// Renderizar campo tático
function toggleFieldTeam(teamType) {
  activeFieldTeam = teamType;
  renderTacticalField();
}

function renderTacticalField() {
  const container = document.getElementById("tactical-field-players");
  container.innerHTML = "";

  const teamId = activeFieldTeam === "A" ? activeTeamA : activeTeamB;
  const squad = window.comparacopaData.squads[teamId];
  
  // Obter cores do time
  const colors = window.comparacopaData.teamColors[teamId] || { primary: "#222", secondary: "#fff" };

  // Renderizar o seletor de formação correspondente ao time atual
  renderFormationSelector(squad.formation || "4-3-3");

  squad.players.forEach((player, index) => {
    const node = document.createElement("div");
    node.className = "player-node";
    node.style.left = `${player.y}%`; // y vira o progresso da esquerda para a direita (GK na esquerda, FW na direita)
    node.style.top = `${player.x}%`;  // x vira a distribuição vertical de largura
    node.style.backgroundColor = colors.primary;
    node.style.color = colors.text || "#ffffff";
    node.style.borderColor = colors.secondary;

    node.innerHTML = `
      <span class="player-number">${player.no}</span>
      <div class="player-ovr-tag">${player.ovr}</div>
      <div class="player-name-tag">${player.name}</div>
    `;

    node.onclick = () => showPlayerModal(player, teamId);
    container.appendChild(node);
  });
}

// Renderizar os botões do grid de formação tática
function renderFormationSelector(currentFormation) {
  const grid = document.getElementById("formation-btn-grid");
  grid.innerHTML = "";
  
  const formations = ["4-3-3", "4-4-2", "4-2-3-1", "4-2-4", "3-5-2", "5-3-2", "4-5-1", "3-4-3"];
  formations.forEach(f => {
    const btn = document.createElement("button");
    btn.className = `formation-btn ${f === currentFormation ? 'active' : ''}`;
    btn.textContent = f;
    btn.onclick = () => changeFormation(f);
    grid.appendChild(btn);
  });
}

// Mudar esquema tático e reposicionar jogadores no campo
function changeFormation(formationName) {
  const teamId = activeFieldTeam === "A" ? activeTeamA : activeTeamB;
  const squad = window.comparacopaData.squads[teamId];
  
  squad.formation = formationName;
  
  const coords = formationsCoordinates[formationName];
  if (coords) {
    squad.players.forEach((player, index) => {
      if (coords[index]) {
        player.x = coords[index].x;
        player.y = coords[index].y;
        player.pos = coords[index].pos; // Atualizar a posição nominal (GK, DF, MF, FW)
      }
    });
  }

  renderTacticalField();
  initPlayerSelectors(); // Recarregar seletores de duelistas com as novas posições
  comparePlayers();
}

// Modal do Jogador (Carta)
function showPlayerModal(player, teamId) {
  const modal = document.getElementById("player-modal");
  const tInfo = getTeamNameAndFlag(teamId);

  document.getElementById("sticker-flag").textContent = tInfo.flag;
  document.getElementById("sticker-name").textContent = player.name;
  document.getElementById("sticker-club").textContent = `${player.pos} | ${player.club}`;
  document.getElementById("sticker-ovr").textContent = player.ovr;
  
  document.getElementById("sticker-pac").textContent = player.pac;
  document.getElementById("sticker-sho").textContent = player.sho;
  document.getElementById("sticker-pas").textContent = player.pas;
  document.getElementById("sticker-dri").textContent = player.dri;
  document.getElementById("sticker-def").textContent = player.def;
  document.getElementById("sticker-phy").textContent = player.phy;

  // Carregar banco de reservas
  const selectSub = document.getElementById("select-substitute");
  selectSub.innerHTML = "";

  const squad = window.comparacopaData.squads[teamId];
  const bench = squad.bench || [];

  if (bench.length === 0) {
    document.getElementById("substitute-section").style.display = "none";
  } else {
    document.getElementById("substitute-section").style.display = "block";
    bench.forEach((benchPlayer, index) => {
      const opt = document.createElement("option");
      opt.value = index;
      opt.textContent = `${benchPlayer.name} (${benchPlayer.pos} - OVR ${benchPlayer.ovr})`;
      selectSub.appendChild(opt);
    });
  }

  // Configurar ação de substituição
  const btnSub = document.getElementById("btn-confirm-sub");
  btnSub.onclick = () => {
    const selectedSubIndex = selectSub.value;
    if (selectedSubIndex === "") return;

    const benchPlayer = bench[selectedSubIndex];

    const titularIndex = squad.players.findIndex(p => p === player);
    if (titularIndex === -1) return;

    // Guardar coordenadas e número do slot do campo
    const targetX = player.x;
    const targetY = player.y;
    const targetNo = player.no;

    // Limpar as coordenadas do jogador que vai para o banco
    delete player.x;
    delete player.y;
    delete player.no;

    // Atribuir coordenadas e número do slot ao jogador que entra no campo
    benchPlayer.x = targetX;
    benchPlayer.y = targetY;
    benchPlayer.no = targetNo;

    // Realizar a troca de objetos nos arrays
    squad.players[titularIndex] = benchPlayer;
    squad.bench[selectedSubIndex] = player;

    closePlayerModal();
    renderTacticalField();
    renderStats();
    initPlayerSelectors();
    comparePlayers();
  };

  modal.style.display = "flex";
}

function closePlayerModal() {
  document.getElementById("player-modal").style.display = "none";
}

// Inicializar Seletores de Duelo de Jogadores
function initPlayerSelectors() {
  const selA = document.getElementById("select-player-a");
  const selB = document.getElementById("select-player-b");
  
  selA.innerHTML = "";
  selB.innerHTML = "";

  const squadA = window.comparacopaData.squads[activeTeamA].players;
  const squadB = window.comparacopaData.squads[activeTeamB].players;

  squadA.forEach((p, idx) => {
    const opt = document.createElement("option");
    opt.value = idx;
    opt.textContent = `${p.name} (${p.pos})`;
    // Pré-selecionar o atacante ou jogador principal (ex: Vini Jr)
    if (p.name.includes("Vini") || p.name.includes("Messi") || p.name.includes("Mbappé") || idx === 9) opt.selected = true;
    selA.appendChild(opt);
  });

  squadB.forEach((p, idx) => {
    const opt = document.createElement("option");
    opt.value = idx;
    opt.textContent = `${p.name} (${p.pos})`;
    if (p.name.includes("Mbappé") || p.name.includes("Messi") || idx === 10) opt.selected = true;
    selB.appendChild(opt);
  });
}

// Comparação direta de atributos de jogadores
function comparePlayers() {
  const idxA = document.getElementById("select-player-a").value;
  const idxB = document.getElementById("select-player-b").value;

  if (idxA === "" || idxB === "") return;

  const pA = window.comparacopaData.squads[activeTeamA].players[idxA];
  const pB = window.comparacopaData.squads[activeTeamB].players[idxB];

  const container = document.getElementById("player-comp-attributes");
  container.innerHTML = "";

  const attributes = [
    { key: "ovr", label: "OVERALL (OVR)" },
    { key: "pac", label: "RITMO (PAC)" },
    { key: "sho", label: "CHUTE (SHO)" },
    { key: "pas", label: "PASSE (PAS)" },
    { key: "dri", label: "DRIBLE (DRI)" },
    { key: "def", label: "DEFESA (DEF)" },
    { key: "phy", label: "FÍSICO (PHY)" }
  ];

  attributes.forEach(attr => {
    const valA = pA[attr.key];
    const valB = pB[attr.key];

    const row = document.createElement("div");
    row.className = "stat-row";
    
    // Identificar vencedor do atributo para aplicar negrito ou cor
    const labelStyleA = valA > valB ? "font-weight: 800; color: var(--neon-green);" : "font-weight: 600;";
    const labelStyleB = valB > valA ? "font-weight: 800; color: var(--neon-green);" : "font-weight: 600;";

    row.innerHTML = `
      <div class="stat-label-row">
        <span style="${labelStyleA}">${valA}</span>
        <span style="font-size: 0.75rem; color: #555;">${attr.label}</span>
        <span style="${labelStyleB}">${valB}</span>
      </div>
      <div class="stat-bar-container" style="height: 16px;">
        <div class="stat-bar-left" style="width: ${(valA / (valA + valB)) * 100}%; background: var(--retro-blue);"></div>
        <div class="stat-bar-right" style="width: ${(valB / (valA + valB)) * 100}%; background: var(--retro-yellow);"></div>
      </div>
    `;
    container.appendChild(row);
  });
}

// Motor de Simulação de Partida
function startMatchSimulation() {
  if (simulationInterval) clearInterval(simulationInterval);

  const consoleBox = document.getElementById("sim-console");
  const scoreBoxA = document.getElementById("sim-score-a");
  const scoreBoxB = document.getElementById("sim-score-b");

  scoreBoxA.textContent = "0";
  scoreBoxB.textContent = "0";
  consoleBox.innerHTML = `<div class="sim-console-line">&gt; [00'] Transmissão Rádio AM Iniciada: Juiz apita o início do jogo!</div>`;

  let scoreA = 0;
  let scoreB = 0;
  let minute = 0;

  const squadA = window.comparacopaData.squads[activeTeamA].players;
  const squadB = window.comparacopaData.squads[activeTeamB].players;
  
  // Calcular média de ataque e defesa de cada seleção
  const avgOvrA = squadA.reduce((sum, p) => sum + p.ovr, 0) / 11;
  const avgOvrB = squadB.reduce((sum, p) => sum + p.ovr, 0) / 11;

  // Lances narrativos possíveis
  const narrativeTemplates = [
    "{team} pressiona forte no campo de ataque!",
    "{player} tenta o drible pela lateral, mas é desarmado.",
    "Grande defesa de {gk}! Evita a abertura do placar.",
    "Falta dura de {player}! Juiz adverte verbalmente.",
    "Jogo truncado no meio campo. Muitas disputas físicas.",
    "{player} chuta de fora da área! A bola passa raspando a trave!"
  ];

  simulationInterval = setInterval(() => {
    minute += Math.floor(Math.random() * 8) + 5;
    if (minute >= 90) {
      minute = 90;
      clearInterval(simulationInterval);
      consoleBox.innerHTML += `<div class="sim-console-line" style="color: var(--retro-yellow); font-weight: 800;">&gt; [90'] FIM DE PAPO! Placar final: ${scoreA} x ${scoreB}. Obrigado pela audiência!</div>`;
      consoleBox.scrollTop = consoleBox.scrollHeight;
      return;
    }

    // Decidir evento com base nos Overalls
    const randomVal = Math.random() * 100;
    
    // Fatores de chance de gol
    const chanceGoalA = 5 + (avgOvrA - avgOvrB) * 1.5;
    const chanceGoalB = 5 + (avgOvrB - avgOvrA) * 1.5;

    let logLine = "";

    if (randomVal < chanceGoalA) {
      // Gol do Time A
      scoreA++;
      scoreBoxA.textContent = scoreA;
      const scorer = squadA[Math.floor(Math.random() * 6) + 5].name; // atacante/meia
      logLine = `<span style="color: var(--neon-green); font-weight:800;">&gt; [${minute}'] GOOOOOOOOL do ${activeTeamA}! ${scorer} chuta forte no canto esquerdo sem chances! (${scoreA}-${scoreB})</span>`;
    } else if (randomVal < chanceGoalA + chanceGoalB) {
      // Gol do Time B
      scoreB++;
      scoreBoxB.textContent = scoreB;
      const scorer = squadB[Math.floor(Math.random() * 6) + 5].name;
      logLine = `<span style="color: var(--neon-green); font-weight:800;">&gt; [${minute}'] GOOOOOOOOL do ${activeTeamB}! ${scorer} recebe cruzamento perfeito e escora de cabeça! (${scoreA}-${scoreB})</span>`;
    } else {
      // Lance normal de rádio
      const isTeamA = Math.random() > 0.5;
      const actingTeam = isTeamA ? activeTeamA : activeTeamB;
      const oppTeam = isTeamA ? activeTeamB : activeTeamA;
      const actingSquad = isTeamA ? squadA : squadB;
      const oppSquad = isTeamA ? squadB : squadA;

      const randomPlayer = actingSquad[Math.floor(Math.random() * 11)].name;
      const oppGk = oppSquad[0].name;

      const template = narrativeTemplates[Math.floor(Math.random() * narrativeTemplates.length)];
      const text = template
        .replace("{team}", actingTeam)
        .replace("{player}", randomPlayer)
        .replace("{gk}", oppGk);
      
      logLine = `&gt; [${minute}'] ${text}`;
    }

    consoleBox.innerHTML += `<div class="sim-console-line">${logLine}</div>`;
    consoleBox.scrollTop = consoleBox.scrollHeight;
  }, 1200);
}

// Inicializar abas da Copa
function initGroupTabs() {
  const container = document.getElementById("groups-tabs-container");
  container.innerHTML = "";

  const groups = Object.keys(window.comparacopaData.groups);
  groups.forEach(g => {
    const btn = document.createElement("button");
    btn.className = `tab-btn ${g === currentGroupTab ? 'active' : ''}`;
    btn.textContent = `Grupo ${g}`;
    btn.onclick = () => selectGroupTab(g);
    container.appendChild(btn);
  });

  renderGroupTable();
}

function selectGroupTab(groupLetter) {
  currentGroupTab = groupLetter;
  initGroupTabs();
}

// Renderizar Tabela do Grupo Ativo
function renderGroupTable() {
  const container = document.getElementById("group-table-content");
  const teams = window.comparacopaData.groups[currentGroupTab];

  // Simular classificação organizando por pontos, vitórias e saldo de gols
  const sortedTeams = [...teams].sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    const sgA = a.gp - a.gc;
    const sgB = b.gp - b.gc;
    if (sgB !== sgA) return sgB - sgA;
    return b.gp - a.gp;
  });

  let html = `
    <table class="group-table">
      <thead>
        <tr>
          <th style="width: 50px;">Pos</th>
          <th class="team-name-cell">Seleção</th>
          <th>P</th>
          <th>J</th>
          <th>V</th>
          <th>E</th>
          <th>D</th>
          <th>GP</th>
          <th>GC</th>
          <th>SG</th>
        </tr>
      </thead>
      <tbody>
  `;

  sortedTeams.forEach((t, idx) => {
    const isTop2 = idx < 2; // Passa de fase na Copa real
    const posStyle = isTop2 ? "color: var(--neon-green); font-weight: 800;" : "";
    const sg = t.gp - t.gc;
    const sign = sg > 0 ? "+" : "";

    html += `
      <tr>
        <td style="${posStyle}">${idx + 1}º</td>
        <td class="team-name-cell">${t.flag} ${t.name}</td>
        <td style="font-weight: 800;">${t.pts}</td>
        <td>${t.pj}</td>
        <td>${t.v}</td>
        <td>${t.e}</td>
        <td>${t.d}</td>
        <td>${t.gp}</td>
        <td>${t.gc}</td>
        <td style="font-family: 'Space Mono', monospace;">${sign}${sg}</td>
      </tr>
    `;
  });

  html += `
      </tbody>
    </table>
  `;

  container.innerHTML = html;
}

// Carregar confronto do mata-mata para o simulador
function loadBracketMatchToSim(teamA, teamB) {
  // Garantir existência de dados e elencos
  ensureSquadAndStats(teamA);
  ensureSquadAndStats(teamB);

  // Mudar aba de seção ativa para Comparador
  switchSection('compare');

  // Atualizar seletores de time
  document.getElementById("select-team-a").value = teamA;
  document.getElementById("select-team-b").value = teamB;

  // Carregar dados
  loadComparison();
}

// Renderizar Brackets (Chaveamento)
function renderBrackets() {
  const r32Col = document.getElementById("bracket-r32-col");
  const r16Col = document.getElementById("bracket-r16-col");
  const r8Col = document.getElementById("bracket-r8-col");
  const r4Col = document.getElementById("bracket-r4-col");
  const rFinalCol = document.getElementById("bracket-final");

  r32Col.innerHTML = "";
  r16Col.innerHTML = "";
  r8Col.innerHTML = "";
  r4Col.innerHTML = "";
  rFinalCol.innerHTML = "";

  // Renderizar Rodada de 32 (Fidelidade do Mata-Mata)
  const matches = window.comparacopaData.brackets.roundOf32;
  matches.forEach(m => {
    const isDefined = m.teamA && m.teamB;
    const detailsA = m.teamA ? getTeamNameAndFlag(m.teamA) : { name: "A confirmar", flag: "🏳️" };
    const detailsB = m.teamB ? getTeamNameAndFlag(m.teamB) : { name: "A confirmar", flag: "🏳️" };

    const matchCard = document.createElement("div");
    matchCard.className = "bracket-match";
    if (isDefined) {
      matchCard.onclick = () => loadBracketMatchToSim(m.teamA, m.teamB);
    } else {
      matchCard.style.cursor = "default";
      matchCard.style.opacity = "0.8";
    }

    matchCard.innerHTML = `
      <div class="bracket-team-row">
        <span>${detailsA.flag} ${m.teamA || "A confirmar"}</span>
        <span class="score-placeholder" style="font-family: 'Space Mono', monospace;">-</span>
      </div>
      <div class="bracket-team-row">
        <span>${detailsB.flag} ${m.teamB || "A confirmar"}</span>
        <span class="score-placeholder" style="font-family: 'Space Mono', monospace;">-</span>
      </div>
      <div class="bracket-match-date">${m.date}</div>
    `;
    r32Col.appendChild(matchCard);
  });

  // Preencher colunas vazias subsequentes (Oitavas, Quartas, Semis e Final) para efeito visual
  const octavesData = window.comparacopaData.brackets.octaves;
  octavesData.forEach((m, idx) => {
    const card = document.createElement("div");
    card.className = "bracket-match";
    card.style.opacity = "0.75";
    card.innerHTML = `
      <div class="bracket-team-row" style="color: var(--dark-accent); font-weight: 600;">
        <span>Vencedor M${idx*2 + 1}</span>
        <span>-</span>
      </div>
      <div class="bracket-team-row" style="color: var(--dark-accent); font-weight: 600;">
        <span>Vencedor M${idx*2 + 2}</span>
        <span>-</span>
      </div>
      <div class="bracket-match-date" style="color: #444; border-top-color: #ddd;">${m.date}</div>
    `;
    r16Col.appendChild(card);
  });

  const quartersData = window.comparacopaData.brackets.quarters;
  quartersData.forEach((m, idx) => {
    const card = document.createElement("div");
    card.className = "bracket-match";
    card.style.opacity = "0.6";
    card.innerHTML = `
      <div class="bracket-team-row" style="color: var(--dark-accent); font-weight: 600;">
        <span>Vencedor Q${idx*2 + 1}</span>
        <span>-</span>
      </div>
      <div class="bracket-team-row" style="color: var(--dark-accent); font-weight: 600;">
        <span>Vencedor Q${idx*2 + 2}</span>
        <span>-</span>
      </div>
      <div class="bracket-match-date" style="color: #444; border-top-color: #ddd;">${m.date}</div>
    `;
    r8Col.appendChild(card);
  });

  const semisData = window.comparacopaData.brackets.semis;
  semisData.forEach((m, idx) => {
    const card = document.createElement("div");
    card.className = "bracket-match";
    card.style.opacity = "0.5";
    card.innerHTML = `
      <div class="bracket-team-row" style="color: var(--dark-accent); font-weight: 600;">
        <span>Vencedor S1</span>
        <span>-</span>
      </div>
      <div class="bracket-team-row" style="color: var(--dark-accent); font-weight: 600;">
        <span>Vencedor S2</span>
        <span>-</span>
      </div>
      <div class="bracket-match-date" style="color: #444; border-top-color: #ddd;">${m.date}</div>
    `;
    r4Col.appendChild(card);
  });

  const finalData = window.comparacopaData.brackets.final;
  const finalCard = document.createElement("div");
  finalCard.className = "bracket-match";
  finalCard.style.opacity = "0.45";
  finalCard.style.boxShadow = "6px 6px 0 var(--retro-blue)";
  finalCard.innerHTML = `
    <div class="bracket-team-row" style="color: var(--dark-accent); font-weight: 700;">
      <span>Vencedor Semifinal 1</span>
      <span>-</span>
    </div>
    <div class="bracket-team-row" style="color: var(--dark-accent); font-weight: 700;">
      <span>Vencedor Semifinal 2</span>
      <span>-</span>
    </div>
    <div class="bracket-match-date" style="border-top-color: var(--retro-blue); color: var(--retro-blue); font-weight: 800;">${finalData.date}</div>
  `;
  rFinalCol.appendChild(finalCard);
}

// Atualizar estatísticas e resultados reais em tempo real
function updateRealTimeResults() {
  const btn = document.getElementById("btn-update-results");
  if (!btn) return;
  
  const originalText = btn.innerHTML;
  btn.innerHTML = `<span style="font-family: 'Space Mono', monospace; font-size: 0.75rem;">Atualizando...</span>`;
  btn.disabled = true;

  // Remover script dinâmico antigo se houver
  const oldScript = document.getElementById("data-script-dyn");
  if (oldScript) oldScript.remove();

  // Criar script dinâmico com cache bypass (timestamp)
  const script = document.createElement("script");
  script.id = "data-script-dyn";
  script.src = "data.js?t=" + Date.now();
  script.onload = () => {
    // Re-renderizar tudo com os dados recém-carregados
    renderGroupTable();
    renderBrackets();
    initSelectors();
    loadComparison();
    
    btn.innerHTML = `<span style="font-family: 'Space Mono', monospace; font-size: 0.75rem; color: var(--dark-accent);">Atualizado!</span>`;
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }, 2500);
  };
  script.onerror = () => {
    alert("Falha ao se conectar com o GitHub para obter atualizações em tempo real.");
    btn.innerHTML = originalText;
    btn.disabled = false;
  };
  document.body.appendChild(script);
}

// Funções de Compartilhamento Social para Viralização
function shareOnWhatsApp() {
  const text = encodeURIComponent("Quem tem o melhor elenco e a melhor tática para a Copa de 2026? Acabei de comparar os times no Comparacopa! Faça o seu teste também: https://jpesmeraldo.github.io/comparacopa/");
  window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
}

function shareOnTwitter() {
  const text = encodeURIComponent("Simulei os confrontos e táticas da Copa do Mundo 2026 no Comparacopa! Quem leva a taça? Monte sua tática e simule você também: https://jpesmeraldo.github.io/comparacopa/ @FIFAWorldCup");
  window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
}

function copyLink() {
  navigator.clipboard.writeText("https://jpesmeraldo.github.io/comparacopa/").then(() => {
    alert("Link copiado para a área de transferência! Envie para seus amigos no WhatsApp ou redes sociais.");
  }).catch(() => {
    // Fallback se navigator.clipboard falhar
    const tempInput = document.createElement("input");
    tempInput.value = "https://jpesmeraldo.github.io/comparacopa/";
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    alert("Link copiado para a área de transferência! Envie para seus amigos no WhatsApp ou redes sociais.");
  });
}
