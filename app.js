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
    let wins = 30, draws = 25, losses = 45, goals = 120, conceded = 160, sheets = 20, form = ["D", "E", "V", "D", "D"];
    
    if (tier === "A") {
      wins = 60; draws = 20; losses = 20; goals = 185; conceded = 90; sheets = 42; form = ["V", "V", "E", "V", "E"];
    } else if (tier === "B") {
      wins = 45; draws = 25; losses = 30; goals = 150; conceded = 125; sheets = 30; form = ["V", "D", "E", "V", "D"];
    }
    
    window.comparacopaData.teamStats[teamId] = {
      wins, draws, losses, goalsScored: goals, goalsConceded: conceded, cleanSheets: sheets, form
    };
  }

  // Se já existe no data.js (como G8 ou Senegal), garantir origPos nos jogadores
  if (window.comparacopaData.squads[teamId]) {
    const s = window.comparacopaData.squads[teamId];
    if (s.players) {
      s.players.forEach(p => {
        if (!p.origPos) p.origPos = p.pos;
      });
    }
    if (s.bench) {
      s.bench.forEach(p => {
        if (!p.origPos) p.origPos = p.pos;
      });
    }
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
        origPos: posInfo.pos,
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
        origPos: pos,
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
  const all48RealSquads = {
    // Grupo A
    MEX: [
      "Raúl Rangel", "Jorge Sánchez", "César Montes", "Johan Vásquez", "Gerardo Arteaga",
      "Edson Álvarez", "Luis Chávez", "Erick Sánchez", "Uriel Antuna", "Santiago Giménez",
      "Julián Quiñones", // Reservas
      "Luis Malagón", "Julio González", "Jesús Orozco", "Brian García", "Julián Araujo",
      "Jesús Gallardo", "Luis Romo", "Carlos Rodríguez", "Orbelín Pineda", "Roberto Alvarado",
      "César Huerta", "Alexis Vega", "Henry Martín", "Guillermo Martínez"
    ],
    RSA: [
      "Ronwen Williams", "Khuliso Mudau", "Aubrey Modiba", "Olwethu Makhanya", "Bradley Cross",
      "Teboho Mokoena", "Sphephelo Sithole", "Themba Zwane", "Percy Tau", "Evidence Makgopa",
      "Lyle Foster", // Reservas
      "Ricardo Goss", "Sipho Chaine", "Thabang Matuludi", "Nkosinathi Sibisi", "Ime Okon",
      "Grant Kekana", "Mothobi Mvala", "Bathusi Aubaas", "Jayden Adams", "Patrick Maswanganyi",
      "Relebohile Mofokeng", "Iqraam Rayners", "Elias Mokwana", "Oswin Appollis"
    ],
    KOR: [
      "Jo Hyeon-woo", "Kim Tae-hwan", "Kim Min-jae", "Kim Young-gwon", "Seol Young-woo",
      "Park Yong-woo", "Hwang In-beom", "Lee Kang-in", "Son Heung-min", "Cho Gue-sung",
      "Hwang Hee-chan", // Reservas
      "Song Bum-keun", "Lee Chang-geun", "Jung Seung-hyun", "Kim Ju-sung", "Kim Jin-su",
      "Lee Jae-sung", "Hong Hyun-seok", "Lee Soon-min", "Jeong Woo-yeong", "Moon Seon-min",
      "Oh Hyeon-gyu", "Yang Hyun-jun", "Park Jin-seob", "Joo Min-kyu"
    ],
    CZE: [
      "Matej Kovar", "Vladimir Coufal", "Robin Hranac", "David Zima", "David Jurasek",
      "Tomas Soucek", "Lukas Provod", "Michal Sadilek", "Pavel Sulc", "Patrik Schick",
      "Adam Hlozek", // Reservas
      "Jindrich Stanek", "Lukas Hornicek", "Tomas Holes", "Stepan Chaloupek", "Ladislav Krejci",
      "Jaroslav Zeleny", "David Doudera", "Lukas Cerv", "Alexandr Sojka", "Denis Visinsky",
      "Jan Kuchta", "Mojmir Chytil", "Tomas Chory", "Vaclav Cerny"
    ],
    // Grupo B
    CAN: [
      "Maxime Crépeau", "Alistair Johnston", "Moïse Bombito", "Derek Cornelius", "Luc de Fougerolles",
      "Stephen Eustaquio", "Ismaël Koné", "Tajon Buchanan", "Tajon Buchanan", "Jonathan David",
      "Cyle Larin", // Reservas
      "Dayne St. Clair", "Owen Goodman", "Alfie Jones", "Joel Waterman", "Niko Sigur",
      "Mathieu Choinière", "Liam Millar", "Jacob Shaffelburg", "Jayden Nelson", "Tani Oluwaseyi",
      "Junior Hoilett", "Samuel Piette", "Kamal Miller", "Kamaldeen Sulemana"
    ],
    SUI: [
      "Yann Sommer", "Silvan Widmer", "Manuel Akanji", "Fabian Schär", "Ricardo Rodríguez",
      "Remo Freuler", "Granit Xhaka", "Michel Aebischer", "Dan Ndoye", "Breel Embolo",
      "Ruben Vargas", // Reservas
      "Yvon Mvogo", "Gregor Kobel", "Nico Elvedi", "Cédric Zesiger", "Leonidas Stergiou",
      "Denis Zakaria", "Vincent Sierro", "Xherdan Shaqiri", "Fabian Rieder", "Ardon Jashari",
      "Zeki Amdouni", "Kwadwo Duah", "Noah Okafor", "Renato Steffen"
    ],
    QAT: [
      "Meshaal Barsham", "Pedro Miguel", "Lucas Mendes", "Boualem Khoukhi", "Homam Ahmed",
      "Tarek Salman", "Assim Madibo", "Hassan Al-Haydos", "Akram Afif", "Almoez Ali",
      "Yusuf Abdurisag", // Reservas
      "Saad Al-Sheeb", "Salah Zakaria", "Bassam Al-Rawi", "Musab Kheder", "Hazem Shehata",
      "Ali Asad", "Karim Boudiaf", "Mostafa Meshaal", "Ahmed Alaaeldin", "Mohammed Muntari",
      "Hazem Ahmed", "Jassem Gaber", "Ahmed Fathy", "Khalid Muneer"
    ],
    BIH: [
      "Nikola Vasilj", "Amar Dedić", "Nikola Katić", "Dennis Hadžikadunić", "Sead Kolašinac",
      "Ivan Šunjić", "Amir Hadžiahmetović", "Ivan Bašić", "Esmir Bajraktarevic", "Edin Džeko",
      "Ermedin Demirovic", // Reservas
      "Martin Zlomislić", "Osman Hadžikić", "Nihad Mujakić", "Tarik Muharemović", "Stjepan Radeljić",
      "Nidal Čelik", "Dzenis Burnić", "Haris Tabakovic", "Benjamin Tahirović", "Rade Krunić",
      "Luka Menalo", "Kenan Kodro", "Smail Prevljak", "Jusuf Gazibegović"
    ],
    // Grupo C
    BRA: [
      "Alisson", "Danilo", "Marquinhos", "G. Magalhães", "Alex Sandro",
      "Casemiro", "B. Guimarães", "L. Paquetá", "Raphinha", "Neymar",
      "Vini Júnior", // Reservas
      "Ederson", "Weverton", "Bremer", "Douglas Santos", "Léo Pereira",
      "Roger Ibañez", "Danilo", "Éderson", "Fabinho", "Endrick",
      "G. Martinelli", "Igor Thiago", "Luiz Henrique", "Matheus Cunha", "Rayan"
    ],
    MAR: [
      "Yassine Bounou", "Achraf Hakimi", "Nayef Aguerd", "Romain Saïss", "Yahia Attiyat Allah",
      "Sofyan Amrabat", "Azzedine Ounahi", "Selim Amallah", "Hakim Ziyech", "Youssef En-Nesyri",
      "Sofiane Boufal", // Reservas
      "Munir Mohamedi", "El Mehdi Benabid", "Achraf Dari", "Abdel Abqar", "Chadi Riad",
      "Noussair Mazraoui", "Bilal El Khannouss", "Amir Richardson", "Oussama El Azzouzi", "Ismael Saibari",
      "Amine Harit", "Abde Ezzalzouli", "Tarik Tissoudali", "Ayoub El Kaabi"
    ],
    SCO: [
      "Angus Gunn", "Anthony Ralston", "Jack Hendry", "Scott McKenna", "Andrew Robertson",
      "Billy Gilmour", "Callum McGregor", "Scott McTominay", "John McGinn", "Ché Adams",
      "Lawrence Shankland", // Reservas
      "Zander Clark", "Liam Kelly", "Liam Cooper", "Grant Hanley", "Ryan Porteous",
      "Greg Taylor", "Ryan Jack", "Kenny McLean", "Stuart Armstrong", "Ryan Christie",
      "James Forrest", "Tommy Conway", "Lewis Morgan", "Ben Doak"
    ],
    HAI: [
      "Johnny Placide", "Carlens Arcus", "Jérome Duverne", "Ricardo Adé", "Duke Lacroix",
      "Carl-Fred Sainté", "Jean-Jacques Danley", "Woodensky Pierre", "Derrick Etienne", "Frantzdy Pierrot",
      "Wilson Isidor", // Reservas
      "Alexandre Pierre", "Josué Duverger", "Wilguens Paugain", "Martin Expérience", "Hannes Delcroix",
      "Keety Thémoncy", "Bryan Alceus", "Leverton Pierre", "Mondy Prunier", "Duckens Nazon",
      "Carnejy Antoine", "Deedson Louicius", "Louicius Don Deedson", "Jayro Jean"
    ],
    // Grupo D
    USA: [
      "Matt Turner", "Joe Scally", "Chris Richards", "Tim Ream", "Antonee Robinson",
      "Tyler Adams", "Weston McKennie", "Gio Reyna", "Timothy Weah", "Folarin Balogun",
      "Christian Pulisic", // Reservas
      "Ethan Horvath", "Sean Johnson", "Miles Robinson", "Cameron Carter-Vickers", "Mark McKenzie",
      "Kristoffer Lund", "Yunus Musah", "Johnny Cardoso", "Malik Tillman", "Luca de la Torre",
      "Brenden Aaronson", "Haji Wright", "Ricardo Pepi", "Josh Sargent"
    ],
    AUS: [
      "Maty Ryan", "Jason Geria", "Harry Souttar", "Cameron Burgess", "Aziz Behich",
      "Jackson Irvine", "Aiden O'Neill", "Ajdin Hrustic", "Nestory Irankunda", "Mohamed Toure",
      "Mathew Leckie", // Reservas
      "Patrick Beach", "Paul Izzo", "Jordan Bos", "Alessandro Circati", "Milos Degenek",
      "Lucas Herrington", "Jacob Italiano", "Kai Trewin", "Cameron Devlin", "Connor Metcalfe",
      "Paul Okon-Engstler", "Awer Mabil", "Nishan Velupillay", "Cristian Volpato"
    ],
    TUR: [
      "Mert Günok", "Zeki Çelik", "Merih Demiral", "Çağlar Söyüncü", "Ferdi Kadıoğlu",
      "Hakan Çalhanoğlu", "Salih Özcan", "Orkun Kökçü", "Arda Güler", "Barış Alper Yılmaz",
      "Kenan Yıldız", // Reservas
      "Altay Bayındır", "Uğurcan Çakır", "Eren Elmalı", "Abdülkerim Bardakcı", "Ozan Kabak",
      "Mert Müldür", "Samet Akaydın", "İsmail Yüksek", "Kaan Ayhan", "Kerem Aktürkoğlu",
      "Deniz Gül", "İrfan Can Kahveci", "Yunus Akgün", "Can Uzun"
    ],
    PAR: [
      "Gatito Fernández", "Juan José Cáceres", "Gustavo Gómez", "Fabián Balbuena", "Júnior Alonso",
      "Andrés Cubas", "Mathías Villasanti", "Miguel Almirón", "Julio Enciso", "Ramón Sosa",
      "Antonio Sanabria", // Reservas
      "Orlando Gill", "Gastón Olveira", "Gustavo Velázquez", "Omar Alderete", "José Canale",
      "Kaku Romero", "Damián Bobadilla", "Richard Sánchez", "Matías Rojas", "Ángel Romero",
      "Isidro Pitta", "Adam Bareiro", "Derlis González", "Gabriel Ávalos"
    ],
    // Grupo E
    GER: [
      "Manuel Neuer", "Joshua Kimmich", "Antonio Rüdiger", "Jonathan Tah", "Maximilian Mittelstädt",
      "Robert Andrich", "Toni Kroos", "İlkay Gündoğan", "Jamal Musiala", "Florian Wirtz",
      "Kai Havertz", // Reservas
      "Marc-André ter Stegen", "Oliver Baumann", "David Raum", "Waldemar Anton", "Benjamin Henrichs",
      "Robin Koch", "Nico Schlotterbeck", "Pascal Groß", "Chris Führich", "Thomas Müller",
      "Leroy Sané", "Niclas Füllkrug", "Maximilian Beier", "Deniz Undav"
    ],
    CIV: [
      "Yahia Fofana", "Wilfried Singo", "Ousmane Diomande", "Evan Ndicka", "Ghislain Konan",
      "Franck Kessié", "Ibrahim Sangaré", "Seko Fofana", "Amad Diallo", "Ange-Yoan Bonny",
      "Nicolas Pépé", // Reservas
      "Mohamed Koné", "Alban Lafont", "Emmanuel Agbadou", "Clément Akpa", "Guéla Doué",
      "Odilon Kossounou", "Parfait Guiagon", "Christ Inao Oulaï", "Jean Michaël Seri", "Simon Adingra",
      "Oumar Diakité", "Yan Diomande", "Evann Guessand", "Bazoumana Touré"
    ],
    ECU: [
      "Hernán Galíndez", "Félix Torres", "Willian Pacho", "Piero Hincapié", "Pervis Estupiñán",
      "Moisés Caicedo", "Alan Franco", "Kendry Páez", "John Yeboah", "Alan Minda",
      "Enner Valencia", // Reservas
      "Moisés Ramírez", "Gonzalo Valle", "Joel Ordóñez", "Jackson Porozo", "Layan Loor",
      "Jhoanner Chávez", "Carlos Gruezo", "João Ortiz", "Angel Mena", "Jeremy Sarmiento",
      "Kevin Rodríguez", "Jordy Caicedo", "Denil Castillo", "Nilson Angulo"
    ],
    CUW: [
      "Eloy Room", "Juriën Gaari", "Cuco Martina", "Roshon van Eijma", "Sherel Floranus",
      "Vurnon Anita", "Leandro Bacuna", "Juninho Bacuna", "Gervane Kastaneer", "Rangelo Janga",
      "Kenji Gorré", // Reservas
      "Zeus de la Paz", "Tyrick Bodak", "Suently Alberto", "Bradley Martis", "Justin Ogenia",
      "Kevin Felida", "Godfried Roemeratoe", "Roly Bonevacia", "Brandley Kuwas", "Jearl Margaritha",
      "Jeremy Antonisse", "Joshua Zimmerman", "Anthony van den Hurk", "Tyrone Coniah"
    ],
    // Grupo F
    SWE: [
      "Viktor Johansson", "Emil Krafth", "Victor Lindelöf", "Carl Starfelt", "Gabriel Gudmundsson",
      "Eric Smith", "Mattias Svanberg", "Lucas Bergvall", "Anthony Elanga", "Alexander Isak",
      "Viktor Gyökeres", // Reservas
      "Kristoffer Nordfeldt", "Jacob Widell Zetterström", "Hjalmar Ekdal", "Isak Hien", "Daniel Svensson",
      "Yasin Ayari", "Jesper Karlström", "Benjamin Nygren", "Ken Sema", "Elliot Stroud",
      "Alexander Bernhardsson", "Dejan Kulusevski", "Emil Forsberg", "Gustaf Nilsson"
    ],
    JPN: [
      "Zion Suzuki", "Yukinari Sugawara", "Ko Itakura", "Shogo Taniguchi", "Hiroki Ito",
      "Wataru Endo", "Hidemasa Morita", "Takefusa Kubo", "Takumi Minamino", "Ayase Ueda",
      "Keito Nakamura", // Reservas
      "Keisuke Osako", "Taishi Brandon Nozawa", "Koki Machida", "Seiya Maikuma", "Tsuyoshi Watanabe",
      "Reo Hatate", "Kaoru Mitoma", "Ritsu Doan", "Junya Ito", "Mao Hosoya",
      "Takuma Asano", "Daizen Maeda", "Kyogo Furuhashi", "Ao Tanaka"
    ],
    NED: [
      "Bart Verbruggen", "Denzel Dumfries", "Stefan de Vrij", "Virgil van Dijk", "Nathan Aké",
      "Jerdy Schouten", "Tijjani Reijnders", "Xavi Simons", "Jeremie Frimpong", "Memphis Depay",
      "Cody Gakpo", // Reservas
      "Justin Bijlow", "Mark Flekken", "Matthijs de Ligt", "Micky van de Ven", "Daley Blind",
      "Lutsharel Geertruida", "Ryan Gravenberch", "Joey Veerman", "Georginio Wijnaldum", "Ian Maatsen",
      "Donyell Malen", "Steven Bergwijn", "Brian Brobbey", "Joshua Zirkzee"
    ],
    TUN: [
      "Aymen Dahmen", "Wajdi Kechrida", "Dylan Bronn", "Montassár Talbi", "Ali Maâloul",
      "Ellyes Skhiri", "Aïssa Laïdouni", "Anis Ben Slimane", "Naïm Sliti", "Youssef Msakni",
      "Seifeddine Jaziri", // Reservas
      "Mouez Hassen", "Bechir Ben Saïd", "Yassine Meriah", "Yan Valery", "Alaa Ghram",
      "Ali Abdi", "Mohamed Ali Ben Romdhane", "Hamza Rafia", "Sayfallah Ltaief", "Elias Achouri",
      "Haythem Jouini", "Taha Yassine Khenissi", "Bassem Srarfi", "Mortadha Ben Ouanes"
    ],
    // Grupo G
    NZL: [
      "Max Crocombe", "Alistair Johnston", "Michael Boxall", "Tyler Bindon", "Liberato Cacace",
      "Joe Bell", "Matthew Garbett", "Sarpreet Singh", "Kosta Barbarouses", "Chris Wood",
      "Ben Waine", // Reservas
      "Alex Paulsen", "Michael Woud", "Tommy Smith", "Nando Pijnaker", "Dalton Wilkins",
      "Cam Howieson", "Clayton Lewis", "Elijah Just", "Callum McCowatt", "Marco Rojas",
      "Alex Greive", "Max Mata", "Logan Rogerson", "Storm Roux"
    ],
    IRN: [
      "Alireza Beiranvand", "Ramin Rezaeian", "Hossein Kanaanizadegan", "Shojae Khalilzadeh", "Milad Mohammadi",
      "Saeid Ezatolahi", "Saman Ghoddos", "Ali Gholizadeh", "Mehdi Taremi", "Sardar Azmoun",
      "Alireza Jahanbakhsh", // Reservas
      "Payam Niazmand", "Hossein Hosseini", "Ehsan Hajsafi", "Sadegh Moharrami", "Majid Hosseini",
      "Aria Yousefi", "Roozbeh Cheshmi", "Mehdi Torabi", "Omid Noorafkan", "Mohammad Mohebi",
      "Shahriyar Moghanlou", "Mehdi Ghaedi", "Karim Ansarifard", "Javad Nekounam"
    ],
    BEL: [
      "Koen Casteels", "Timothy Castagne", "Wout Faes", "Jan Vertonghen", "Arthur Theate",
      "Amadou Onana", "Orel Mangala", "Kevin De Bruyne", "Jeremy Doku", "Romelu Lukaku",
      "Leandro Trossard", // Reservas
      "Thomas Kaminski", "Matz Sels", "Zeno Debast", "Maxim De Cuyper", "Axel Witsel",
      "Youri Tielemans", "Aster Vranckx", "Arthur Vermeeren", "Charles De Ketelaere", "Dodi Lukebakio",
      "Johan Bakayoko", "Lois Openda", "Yannick Carrasco", "Michy Batshuayi"
    ],
    EGY: [
      "Mohamed El Shenawy", "Mohamed Hany", "Mohamed Abdelmonem", "Ahmed Hegazi", "Mohamed Hamdy",
      "Hamdi Fathi", "Marwan Attia", "Emam Ashour", "Mohamed Salah", "Mostafa Mohamed",
      "Trézéguet", // Reservas
      "Mohamed Sobhy", "Mostafa Shobeir", "Ramy Rabia", "Yasser Ibrahim", "Omar Kamal",
      "Mohamed Elneny", "Akram Tawfik", "Zizo", "Mustafa Fathi", "Kahraba",
      "Mohamed Sherif", "Ahmed Hassan Koka", "Omar Marmoush", "Ibrahim Adel"
    ],
    // Grupo H
    URU: [
      "Sergio Rochet", "Nahitan Nández", "Ronald Araújo", "José María Giménez", "Mathías Olivera",
      "Manuel Ugarte", "Federico Valverde", "Nicolás de la Cruz", "Facundo Pellistri", "Darwin Núñez",
      "Maximilian Araújo", // Reservas
      "F. Muslera", "Santiago Mele", "Santiago Bueno", "Sebastián Cáceres", "Joaquín Piquerez",
      "Matías Viña", "Emiliano Martínez", "Agustín Canobbio", "J. M. Sanabria", "Rodrigo Zalazar",
      "Brian Rodríguez", "Rodrigo Aguirre", "Federico Viñas", "Luis Suárez", "Giorgian de Arrascaeta"
    ],
    KSA: [
      "Mohamed Al-Owais", "Saud Abdulhamid", "Hassan Altambakti", "Abdulelah Alamri", "Moteb Alharbi",
      "Abdullah Alkhaibari", "Mohamed Kanno", "Nasser Aldawsari", "Salem Aldawsari", "Feras Albrikan",
      "Saleh Alshehri", // Reservas
      "Nawaf Al-Aqidi", "Ahmed Alkassar", "Ali Lajami", "Ali Majrashi", "Hassan Kadish",
      "Jehad Thikri", "Mohammed Abualshamat", "Nawaf Buwashl", "Aiman Yahya", "Khalid Alghannam",
      "Musab Aljuwayr", "Sultan Mandash", "Ziyad Aljohani", "Alaa Al-Hejji", "Abdullah Alhamddan"
    ],
    ESP: [
      "Unai Simón", "Pedro Porro", "Pau Cubarsí", "A. Laporte", "M. Cucurella",
      "Rodri", "Pedri", "Fabián Ruiz", "Lamine Yamal", "M. Oyarzabal",
      "Nico Williams", // Reservas
      "David Raya", "Joan García", "Dani Carvajal", "Robin Le Normand", "Dani Vivian",
      "Álex Grimaldo", "Martín Zubimendi", "Mikel Merino", "Dani Olmo", "Alex Baena",
      "Ferran Torres", "Ayoze Pérez", "Álvaro Morata", "Joselu"
    ],
    CPV: [
      "Vozinha", "Steven Moreira", "Roberto Lopes", "Logan Costa", "João Paulo",
      "Kevin Pina", "Jamiro Monteiro", "Kenny Rocha", "Ryan Mendes", "Dailon Livramento",
      "Jovane Cabral", // Reservas
      "Márcio Rosa", "Dylan Silva", "Stopira", "Dylan Tavares", "Diney Borges",
      "Willy Semedo", "Deroy Duarte", "Cuca", "Laros Duarte", "Garry Rodrigues",
      "Bebé", "Bryan Teixeira", "Gilson Tavares", "Hélio Varela"
    ],
    // Grupo I
    FRA: [
      "M. Maignan", "J. Koundé", "W. Saliba", "D. Upamecano", "T. Hernández",
      "A. Tchouaméni", "W. Zaïre-Emery", "A. Rabiot", "O. Dembélé", "K. Mbappé",
      "M. Thuram", // Reservas
      "Robin Risser", "Brice Samba", "Lucas Digne", "Malo Gusto", "Lucas Hernandez",
      "Ibrahima Konaté", "Maxence Lacroix", "N'Golo Kanté", "Manu Koné", "M. Akliouche",
      "Rayan Cherki", "Désiré Doué", "J. Mateta", "Michael Olise", "Marcus Thuram"
    ],
    SEN: [
      "Edouard Mendy", "Krepin Diatta", "K. Koulibaly", "Moussa Niakhate", "Ismail Jakobs",
      "Lamine Camara", "P. Matar Sarr", "Pape Gueye", "Ismaila Sarr", "Nicolas Jackson",
      "Sadio Mane", // Reservas
      "Yehvann Diouf", "Mory Diaw", "Mamadou Sarr", "Abdoulaye Seck", "E. Malick Diouf",
      "Idrissa Gueye", "Pathe Ciss", "Habib Diarra", "Bamba Dieng", "Iliman Ndiaye",
      "Ibrahim Mbaye", "Mory Diaw", "Antoine Mendy", "Bara Sapoko Ndiaye", "Cherif Ndiaye"
    ],
    IRQ: [
      "Jalal Hassan", "Hussein Ali", "Saad Natiq", "Rebin Sulaka", "Merchas Doski",
      "Amir Al-Ammari", "Osama Rashid", "Ibrahim Bayesh", "Ali Jasim", "Youssef Amyn",
      "Aymen Hussein", // Reservas
      "Fahad Talib", "Ahmed Basil", "Ali Adnan", "Frans Putros", "Zaid Tahseen",
      "Mustafa Saadoun", "Amjad Attwan", "Bashar Resan", "Zidan Iqbal", "Youssef Amyn",
      "Mohanad Ali", "Ali Al-Hamadi", "Montader Madjed", "Danilo Al-Saed"
    ],
    NOR: [
      "Ørjan Nyland", "Julian Ryerson", "Kristoffer Ajer", "Leo Østigård", "David Møller Wolfe",
      "Sander Berge", "Fredrik Aursnes", "Martin Ødegaard", "Oscar Bobb", "Erling Haaland",
      "Alexander Sørloth", // Reservas
      "Sander Tangvik", "Egil Selvik", "Fredrik André Bjørkan", "Marcus Holmgren Pedersen", "Torbjørn Heggem",
      "Sondre Langås", "Henrik Falchener", "Morten Thorsby", "Patrick Berg", "Kristian Thorstvedt",
      "Thelo Aasgaard", "Antonio Nusa", "Andreas Schjelderup", "Jens Petter Hauge", "Jørgen Strand Larsen"
    ],
    // Grupo J
    ARG: [
      "E. Martínez", "N. Molina", "C. Romero", "N. Otamendi", "N. Tagliafico",
      "R. De Paul", "Enzo F.", "Mac Allister", "L. Messi", "J. Álvarez",
      "L. Martínez", // Reservas
      "G. Rulli", "Juan Musso", "L. Martínez", "G. Montiel", "L. Balerdi",
      "Facundo Medina", "L. Paredes", "G. Lo Celso", "E. Palacios", "Valentín Barco",
      "Flaco López", "Nico González", "Thiago Almada", "G. Simeone", "Nico Paz"
    ],
    ALG: [
      "Anthony Mandrea", "Youcef Atal", "Aïssa Mandi", "Mohamed Amine Tougai", "Rayan Aït-Nouri",
      "Nabil Bentaleb", "Ismaël Bennacer", "Faris Chaïbi", "Riyad Mahrez", "Baghdad Bounedjah",
      "Amine Gouiri", // Reservas
      "Mustapha Zeghba", "Oussama Benbot", "Jaouen Hadjam", "Kevin Guitoun", "Zineddine Belaïd",
      "Houssem Aouar", "Ramiz Zerrouki", "Hicham Boudaoui", "Said Benrahma", "Yassine Benzia",
      "Mohamed Amoura", "Islam Slimani", "Badredine Bouanani", "Anis Hadj Moussa"
    ],
    AUT: [
      "Patrick Pentz", "Stefan Posch", "Kevin Danso", "Philipp Lienhart", "Phillipp Mwene",
      "Konrad Laimer", "Nicolas Seiwald", "Marcel Sabitzer", "Christoph Baumgartner", "Marko Arnautović",
      "Michael Gregoritsch", // Reservas
      "Alexander Schlager", "Florian Wiegele", "David Affengruber", "David Alaba", "Marco Friedl",
      "Alexander Prass", "Michael Svoboda", "Carney Chukwuemeka", "Florian Grillitsch", "Xaver Schlager",
      "Romano Schmid", "Alessandro Schöpf", "Paul Wanner", "Patrick Wimmer", "Sasa Kalajdzic"
    ],
    JOR: [
      "Yazeed Abulaila", "Ihsan Haddad", "Yazan Al-Arab", "Saad Al-Rousan", "Salem Al-Ajalin",
      "Nizar Al-Rashdan", "Noor Al-Rawabdeh", "Mousa Al-Tamari", "Ali Olwan", "Yazan Al-Naimat",
      "Mahmoud Al-Mardi", // Reservas
      "Abdallah Al-Fakhouri", "Ahmad Al-Juaidi", "Bara' Marei", "Feras Shelbaieh", "Hadi Al-Hourani",
      "Rajaei Ayed", "Ibrahim Sadeh", "Saleh Rateb", "Anas Al-Awadat", "Mohammad Abu Zrayq",
      "Reziq Bani Hani", "Hamza Al-Dardour", "Yazan Dahal", "Ahmad Ersan"
    ],
    // Grupo K
    POR: [
      "Diogo Costa", "João Cancelo", "Rúben Dias", "Pepe", "Nuno Mendes",
      "João Palhinha", "Vitinha", "Bruno Fernandes", "Bernardo Silva", "Cristiano Ronaldo",
      "Rafael Leão", // Reservas
      "José Sá", "Rui Patrício", "Diogo Dalot", "António Silva", "Gonçalo Inácio",
      "Nélson Semedo", "Rúben Neves", "João Neves", "Matheus Nunes", "Otávio",
      "Diogo Jota", "Gonçalo Ramos", "João Félix", "Francisco Conceição", "Pedro Neto"
    ],
    COD: [
      "Dimitry Bertaud", "Gédéon Kalulu", "Chancel Mbemba", "Dylan Batubinsika", "Arthur Masuaku",
      "Samuel Moutoussamy", "Charles Pickel", "Meschak Elia", "Gaël Kakuta", "Yoane Wissa",
      "Simon Banza", // Reservas
      "Lionel Mpasi", "Baggio Siadi", "Henock Inonga", "Rocky Bushiri", "Brian Bayeye",
      "Joris Kayembe", "Aaron Tshibola", "Edo Kayembe", "Omenuke Mfulu", "Theo Bongonda",
      "Grady Diangana", "Fiston Mayele", "Cedric Bakambu", "Silas Katompa Mvumpa"
    ],
    UZB: [
      "Utkir Yusupov", "Zafarmurad Abdurakhmatov", "Rustam Ashurmatov", "Abdukodir Khusanov", "Sherzod Nasrullaev",
      "Otabek Shukurov", "Odiljon Hamrobekov", "Abbosbek Fayzullaev", "Jaloliddin Masharipov", "Eldor Shomurodov",
      "Igor Sergeev", // Reservas
      "Abduvohid Nematov", "Botirali Ergashev", "Husniddin Aliqulov", "Farrukh Sayfiev", "Abdulla Abdullaev",
      "Azizbek Turgunboev", "Jamshid Iskanderov", "Diyor Kholmatov", "Khozhimat Erkinov", "Oston Urunov",
      "Jasur Yakhshiboev", "Bobur Abdikholikov", "Azizbek Amonov", "Muhammadkodir Khamraliev"
    ],
    COL: [
      "Camilo Vargas", "Daniel Muñoz", "Davinson Sánchez", "Carlos Cuesta", "Johan Mojica",
      "Jefferson Lerma", "Richard Ríos", "James Rodríguez", "Jhon Arias", "Jhon Córdoba",
      "Luis Díaz", // Reservas
      "David Ospina", "Álvaro Montero", "Yerry Mina", "Santiago Arias", "Jhon Lucumí",
      "Deiver Machado", "Kevin Castaño", "Mateus Uribe", "Juan F. Quintero", "Yáser Asprilla",
      "Jorge Carrascal", "Luis Sinisterra", "Jhon Durán", "Rafael Santos Borré"
    ],
    // Grupo L
    ENG: [
      "Jordan Pickford", "Kyle Walker", "John Stones", "Marc Guéhi", "Kieran Trippier",
      "Trent Alexander-Arnold", "Declan Rice", "Jude Bellingham", "Bukayo Saka", "Harry Kane",
      "Phil Foden", // Reservas
      "Aaron Ramsdale", "Dean Henderson", "Ezri Konsa", "Lewis Dunk", "Joe Gomez",
      "Luke Shaw", "Adam Wharton", "Kobbie Mainoo", "Conor Gallagher", "Cole Palmer",
      "Jarrod Bowen", "Eberechi Eze", "Anthony Gordon", "Ollie Watkins", "Ivan Toney"
    ],
    CRO: [
      "Dominik Livakovic", "Josip Stanisic", "Josip Sutalo", "Marin Pongracic", "Josko Gvardiol",
      "Luka Modric", "Marcelo Brozovic", "Mateo Kovacic", "Lovro Majer", "Bruno Petkovic",
      "Andrej Kramaric", // Reservas
      "Ivica Ivusic", "Nediljko Labrovic", "Martin Erlic", "Domagoj Vida", "Borna Sosa",
      "Josip Juranovic", "Mario Pasalic", "Luka Sucic", "Martin Baturina", "Ivan Perisic",
      "Luka Ivanusec", "Marco Pasalic", "Ante Budimir", "Nikola Vlasic"
    ],
    GHA: [
      "Lawrence Ati-Zigi", "Alidu Seidu", "Alexander Djiku", "Mohammed Salisu", "Gideon Mensah",
      "Salis Abdul Samed", "Elisha Owusu", "Mohammed Kudus", "Ernest Nuamah", "Jordan Ayew",
      "Antoine Semenyo", // Reservas
      "Joseph Anang", "Benjamin Asare", "Tariq Lamptey", "Abdul Mumin", "Denis Odoi",
      "Thomas Partey", "Majid Ashimeru", "Baba Iddrisu", "Iñaki Williams", "Kamaldeen Sulemana",
      "Abdul Fatawu", "Brandon Thomas-Asante", "Osman Bukari", "Ibrahim Osman"
    ],
    PAN: [
      "Orlando Mosquera", "Michael Amir Murillo", "José Córdoba", "Andrés Andrade", "Eric Davis",
      "Adalberto Carrasquilla", "Aníbal Godoy", "Edgar Yoel Bárcenas", "José Luis Rodríguez", "Ismael Díaz",
      "José Fajardo", // Reservas
      "César Samudio", "Luis Mejía", "Fidel Escobar", "César Blackman", "Roderick Miller",
      "Jovani Welch", "Cristian Martínez", "Abdiel Ayarza", "Kahiser Lenis", "Freddy Góndola",
      "Eduardo Guerrero", "Cecilio Waterman", "César Yanis", "Ivan Anderson"
    ]
  };

  if (all48RealSquads[teamId]) {
    return all48RealSquads[teamId];
  }

  // Fallback seguro caso algum ID inexistente seja solicitado por engano (não deve ocorrer)
  return Array.from({length: 25}, (_, i) => `${teamId} Jogador Real ${i+1}`);
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
  const formA = window.comparacopaData.squads[activeTeamA].formation || "4-3-3";
  const formB = window.comparacopaData.squads[activeTeamB].formation || "4-3-3";
  const coordsA = formationsCoordinates[formA];
  const coordsB = formationsCoordinates[formB];

  const avgOvrA = squadA.reduce((sum, p, idx) => {
    const slotPos = coordsA[idx] ? coordsA[idx].pos : p.pos;
    return sum + getEffectivePlayerOvr(p, slotPos);
  }, 0) / 11;

  const avgOvrB = squadB.reduce((sum, p, idx) => {
    const slotPos = coordsB[idx] ? coordsB[idx].pos : p.pos;
    return sum + getEffectivePlayerOvr(p, slotPos);
  }, 0) / 11;
  
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

// Obter OVR Efetivo com penalidade caso esteja fora de sua posição original
function getEffectivePlayerOvr(player, slotPos) {
  const orig = player.origPos || player.pos;
  if (orig !== slotPos) {
    return Math.max(40, player.ovr - 8);
  }
  return player.ovr;
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

  const coords = formationsCoordinates[squad.formation || "4-3-3"];

  squad.players.forEach((player, index) => {
    const node = document.createElement("div");
    node.className = "player-node";
    node.style.left = `${player.y}%`; // y vira o progresso da esquerda para a direita (GK na esquerda, FW na direita)
    node.style.top = `${player.x}%`;  // x vira a distribuição vertical de largura
    node.style.backgroundColor = colors.primary;
    node.style.color = colors.text || "#ffffff";
    node.style.borderColor = colors.secondary;

    const slotPos = coords[index] ? coords[index].pos : player.pos;
    const effectiveOvr = getEffectivePlayerOvr(player, slotPos);
    const isOutOfPosition = (player.origPos || player.pos) !== slotPos;

    let ovrTagStyle = "";
    let alertSymbol = "";
    if (isOutOfPosition) {
      ovrTagStyle = "background-color: #f39c12; color: #fff; font-weight: 900;";
      alertSymbol = `<span style="color: #f39c12; font-weight: 900; margin-left: 2px;" title="Fora de posição! Penalidade de -8 OVR.">⚠️</span>`;
      node.style.boxShadow = "3px 3px 0 #f39c12";
    }

    node.innerHTML = `
      <span class="player-number">${player.no}</span>
      <div class="player-ovr-tag" style="${ovrTagStyle}">${effectiveOvr}</div>
      <div class="player-name-tag">${player.name}${alertSymbol}</div>
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
  
  const formationA = window.comparacopaData.squads[activeTeamA].formation || "4-3-3";
  const formationB = window.comparacopaData.squads[activeTeamB].formation || "4-3-3";

  const coordsA = formationsCoordinates[formationA];
  const coordsB = formationsCoordinates[formationB];

  // Lógica de duelo de setores e influência tática com OVR Efetivo
  const getSectorAverages = (players, coords) => {
    const defense = [];
    const midfield = [];
    const attack = [];

    players.forEach((p, idx) => {
      const slotPos = coords[idx] ? coords[idx].pos : p.pos;
      const effOvr = getEffectivePlayerOvr(p, slotPos);
      const playerWithEff = { ...p, effectiveOvr: effOvr };

      if (slotPos === "GK" || slotPos === "DF") {
        defense.push(playerWithEff);
      } else if (slotPos === "MF") {
        midfield.push(playerWithEff);
      } else if (slotPos === "FW") {
        attack.push(playerWithEff);
      }
    });
    
    return {
      def: defense.reduce((sum, p) => sum + p.effectiveOvr, 0) / (defense.length || 1),
      mid: midfield.reduce((sum, p) => sum + p.effectiveOvr, 0) / (midfield.length || 1),
      att: attack.reduce((sum, p) => sum + p.effectiveOvr, 0) / (attack.length || 1)
    };
  };

  const getFormationFactors = (form) => {
    const factors = {
      "4-2-4": { att: 1.25, def: 0.85 },
      "3-4-3": { att: 1.20, def: 0.85 },
      "4-3-3": { att: 1.00, def: 1.00 },
      "4-2-3-1": { att: 1.00, def: 1.00 },
      "4-4-2": { att: 0.95, def: 1.05 },
      "3-5-2": { att: 1.05, def: 1.00 },
      "5-3-2": { att: 0.80, def: 1.25 },
      "4-5-1": { att: 0.80, def: 1.20 }
    };
    return factors[form] || { att: 1.0, def: 1.0 };
  };

  const secA = getSectorAverages(squadA, coordsA);
  const secB = getSectorAverages(squadB, coordsB);

  const formFactorsA = getFormationFactors(formationA);
  const formFactorsB = getFormationFactors(formationB);

  // Força de ataque calculada combinando ataque e suporte do meio de campo
  const attackPowerA = (secA.att * 0.7 + secA.mid * 0.3) * formFactorsA.att;
  const attackPowerB = (secB.att * 0.7 + secB.mid * 0.3) * formFactorsB.att;

  // Força defensiva baseada na zaga/goleiro e suporte tático
  const defensePowerA = secA.def * formFactorsA.def;
  const defensePowerB = secB.def * formFactorsB.def;

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

    // Decidir evento com base no duelo Ataque vs Defesa
    const randomVal = Math.random() * 100;
    
    // Chance de gol final adaptada taticamente
    const chanceGoalA = 5.0 + (attackPowerA - defensePowerB) * 1.5;
    const chanceGoalB = 5.0 + (attackPowerB - defensePowerA) * 1.5;

    let logLine = "";

    if (randomVal < chanceGoalA) {
      // Gol do Time A
      scoreA++;
      scoreBoxA.textContent = scoreA;
      // Escolher goleador realista (meias e atacantes têm preferência)
      const offensivePlayersA = squadA.filter(p => p.pos === "FW" || p.pos === "MF");
      const scorer = offensivePlayersA.length > 0 ? offensivePlayersA[Math.floor(Math.random() * offensivePlayersA.length)].name : "Jogador";
      logLine = `<span style="color: var(--neon-green); font-weight:800;">&gt; [${minute}'] GOOOOOOOOL do ${activeTeamA}! ${scorer} chuta forte no canto esquerdo sem chances! (${scoreA}-${scoreB})</span>`;
    } else if (randomVal < chanceGoalA + chanceGoalB) {
      // Gol do Time B
      scoreB++;
      scoreBoxB.textContent = scoreB;
      const offensivePlayersB = squadB.filter(p => p.pos === "FW" || p.pos === "MF");
      const scorer = offensivePlayersB.length > 0 ? offensivePlayersB[Math.floor(Math.random() * offensivePlayersB.length)].name : "Jogador";
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
