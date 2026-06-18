// Comparacopa 2026 - Base de Dados Retro Anos 80
window.comparacopaData = {
  // Técnicos Oficiais das Seleções para a Copa de 2026
  coaches: {
    BRA: "Carlo Ancelotti",
    ARG: "Lionel Scaloni",
    FRA: "Didier Deschamps",
    ESP: "Luis de la Fuente",
    ENG: "Thomas Tuchel",
    GER: "Julian Nagelsmann",
    POR: "Roberto Martínez",
    URU: "Marcelo Bielsa",
    SEN: "Aliou Cissé",
    MEX: "Javier Aguirre",
    USA: "Mauricio Pochettino",
    CAN: "Jesse Marsch",
    BEL: "Rudi Garcia",
    NED: "Ronald Koeman",
    CRO: "Zlatko Dalić",
    MAR: "Walid Regragui",
    COL: "Néstor Lorenzo",
    ECU: "Sebastián Beccacece",
    PAR: "Gustavo Alfaro",
    CIV: "Emerse Faé",
    EGY: "Hossam Hassan",
    ALG: "Vladimir Petković",
    TUN: "Jalel Kadri",
    GHA: "Otto Addo",
    KOR: "Hong Myung-bo",
    JPN: "Hajime Moriyasu",
    AUS: "Tony Popovic",
    KSA: "Roberto Mancini",
    IRN: "Amir Ghalenoei",
    IRQ: "Jesús Casas",
    UZB: "Srečko Katanec",
    NZL: "Darren Bazeley",
    SUI: "Murat Yakin",
    SWE: "Jon Dahl Tomasson",
    NOR: "Ståle Solbakken",
    TUR: "Vincenzo Montella",
    AUT: "Ralf Rangnick",
    CZE: "Ivan Hašek",
    SCO: "Steve Clarke",
    BIH: "Sergej Barbarez",
    CPV: "Bubista",
    HAI: "Sebastien Migne",
    PAN: "Thomas Christiansen",
    CUW: "Dick Advocaat",
    RSA: "Hugo Broos"
  },

  // Paleta de Cores de Destaque para times do G8
  teamColors: {
    BRA: { primary: "#009c3b", secondary: "#ffdf00", accent: "#002776", text: "#ffffff" },
    ARG: { primary: "#74acdf", secondary: "#ffffff", accent: "#f6b426", text: "#111111" },
    FRA: { primary: "#002060", secondary: "#ffffff", accent: "#ef4135", text: "#ffffff" },
    ESP: { primary: "#c60b1e", secondary: "#febd12", accent: "#002060", text: "#ffffff" },
    ENG: { primary: "#ffffff", secondary: "#cf081b", accent: "#002060", text: "#111111" },
    GER: { primary: "#111111", secondary: "#d90000", accent: "#ffcc00", text: "#ffffff" },
    POR: { primary: "#da121a", secondary: "#046a38", accent: "#f4c430", text: "#ffffff" },
    URU: { primary: "#5bc2e7", secondary: "#ffffff", accent: "#f6b426", text: "#111111" },
    SEN: { primary: "#00853f", secondary: "#fdef42", accent: "#e31b23", text: "#ffffff" }
  },

  // 12 Grupos Customizados da Copa de 2026 (48 seleções)
  groups: {
    A: [
      { id: "MEX", name: "México", flag: "🇲🇽", pts: 3, pj: 1, v: 1, e: 0, d: 0, gp: 2, gc: 0 },
      { id: "RSA", name: "África do Sul", flag: "🇿🇦", pts: 0, pj: 1, v: 0, e: 0, d: 1, gp: 0, gc: 2 },
      { id: "KOR", name: "Coreia do Sul", flag: "🇰🇷", pts: 3, pj: 1, v: 1, e: 0, d: 0, gp: 2, gc: 1 },
      { id: "CZE", name: "República Tcheca", flag: "🇨🇿", pts: 0, pj: 1, v: 0, e: 0, d: 1, gp: 1, gc: 2 }
    ],
    B: [
      { id: "CAN", name: "Canadá", flag: "🇨🇦", pts: 1, pj: 1, v: 0, e: 1, d: 0, gp: 1, gc: 1 },
      { id: "SUI", name: "Suíça", flag: "🇨🇭", pts: 1, pj: 1, v: 0, e: 1, d: 0, gp: 1, gc: 1 },
      { id: "QAT", name: "Catar", flag: "🇶🇦", pts: 1, pj: 1, v: 0, e: 1, d: 0, gp: 1, gc: 1 },
      { id: "BIH", name: "Bósnia e Herzegovina", flag: "🇧🇦", pts: 1, pj: 1, v: 0, e: 1, d: 0, gp: 1, gc: 1 }
    ],
    C: [
      { id: "BRA", name: "Brasil", flag: "🇧🇷", pts: 1, pj: 1, v: 0, e: 1, d: 0, gp: 1, gc: 1 },
      { id: "MAR", name: "Marrocos", flag: "🇲🇦", pts: 1, pj: 1, v: 0, e: 1, d: 0, gp: 1, gc: 1 },
      { id: "SCO", name: "Escócia", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", pts: 3, pj: 1, v: 1, e: 0, d: 0, gp: 1, gc: 0 },
      { id: "HAI", name: "Haiti", flag: "🇭🇹", pts: 0, pj: 1, v: 0, e: 0, d: 1, gp: 0, gc: 1 }
    ],
    D: [
      { id: "USA", name: "Estados Unidos", flag: "🇺🇸", pts: 3, pj: 1, v: 1, e: 0, d: 0, gp: 4, gc: 1 },
      { id: "AUS", name: "Austrália", flag: "🇦🇺", pts: 3, pj: 1, v: 1, e: 0, d: 0, gp: 2, gc: 0 },
      { id: "TUR", name: "Turquia", flag: "🇹🇷", pts: 0, pj: 1, v: 0, e: 0, d: 1, gp: 0, gc: 2 },
      { id: "PAR", name: "Paraguai", flag: "🇵🇾", pts: 0, pj: 1, v: 0, e: 0, d: 1, gp: 1, gc: 4 }
    ],
    E: [
      { id: "GER", name: "Alemanha", flag: "🇩🇪", pts: 3, pj: 1, v: 1, e: 0, d: 0, gp: 7, gc: 1 },
      { id: "CIV", name: "Costa do Marfim", flag: "🇨🇮", pts: 3, pj: 1, v: 1, e: 0, d: 0, gp: 1, gc: 0 },
      { id: "ECU", name: "Equador", flag: "🇪🇨", pts: 0, pj: 1, v: 0, e: 0, d: 1, gp: 0, gc: 1 },
      { id: "CUW", name: "Curaçau", flag: "🇨🇼", pts: 0, pj: 1, v: 0, e: 0, d: 1, gp: 1, gc: 7 }
    ],
    F: [
      { id: "SWE", name: "Suécia", flag: "🇸🇪", pts: 3, pj: 1, v: 1, e: 0, d: 0, gp: 5, gc: 1 },
      { id: "JPN", name: "Japão", flag: "🇯🇵", pts: 1, pj: 1, v: 0, e: 1, d: 0, gp: 2, gc: 2 },
      { id: "NED", name: "Holanda", flag: "🇳🇱", pts: 1, pj: 1, v: 0, e: 1, d: 0, gp: 2, gc: 2 },
      { id: "TUN", name: "Tunísia", flag: "🇹🇳", pts: 0, pj: 1, v: 0, e: 0, d: 1, gp: 1, gc: 5 }
    ],
    G: [
      { id: "NZL", name: "Nova Zelândia", flag: "🇳🇿", pts: 1, pj: 1, v: 0, e: 1, d: 0, gp: 2, gc: 2 },
      { id: "IRN", name: "Irã", flag: "🇮🇷", pts: 1, pj: 1, v: 0, e: 1, d: 0, gp: 2, gc: 2 },
      { id: "BEL", name: "Bélgica", flag: "🇧🇪", pts: 1, pj: 1, v: 0, e: 1, d: 0, gp: 1, gc: 1 },
      { id: "EGY", name: "Egito", flag: "🇪🇬", pts: 1, pj: 1, v: 0, e: 1, d: 0, gp: 1, gc: 1 }
    ],
    H: [
      { id: "URU", name: "Uruguai", flag: "🇺🇾", pts: 1, pj: 1, v: 0, e: 1, d: 0, gp: 1, gc: 1 },
      { id: "KSA", name: "Arábia Saudita", flag: "🇸🇦", pts: 1, pj: 1, v: 0, e: 1, d: 0, gp: 1, gc: 1 },
      { id: "ESP", name: "Espanha", flag: "🇪🇸", pts: 1, pj: 1, v: 0, e: 1, d: 0, gp: 0, gc: 0 },
      { id: "CPV", name: "Cabo Verde", flag: "🇨🇻", pts: 1, pj: 1, v: 0, e: 1, d: 0, gp: 0, gc: 0 }
    ],
    I: [
      { id: "FRA", name: "França", flag: "🇫🇷", pts: 3, pj: 1, v: 1, e: 0, d: 0, gp: 2, gc: 1 },
      { id: "NOR", name: "Noruega", flag: "🇳🇴", pts: 3, pj: 1, v: 1, e: 0, d: 0, gp: 1, gc: 0 },
      { id: "SEN", name: "Senegal", flag: "🇸🇳", pts: 0, pj: 1, v: 0, e: 0, d: 1, gp: 1, gc: 2 },
      { id: "IRQ", name: "Iraque", flag: "🇮🇶", pts: 0, pj: 1, v: 0, e: 0, d: 1, gp: 0, gc: 1 }
    ],
    J: [
      { id: "ARG", name: "Argentina", flag: "🇦🇷", pts: 3, pj: 1, v: 1, e: 0, d: 0, gp: 3, gc: 1 },
      { id: "AUT", name: "Áustria", flag: "🇦🇹", pts: 3, pj: 1, v: 1, e: 0, d: 0, gp: 2, gc: 0 },
      { id: "ALG", name: "Argélia", flag: "🇩🇿", pts: 0, pj: 1, v: 0, e: 0, d: 1, gp: 1, gc: 3 },
      { id: "JOR", name: "Jordânia", flag: "🇯🇴", pts: 0, pj: 1, v: 0, e: 0, d: 1, gp: 0, gc: 2 }
    ],
    K: [
      { id: "COL", name: "Colômbia", flag: "🇨🇴", pts: 3, pj: 1, v: 1, e: 0, d: 0, gp: 2, gc: 1 },
      { id: "POR", name: "Portugal", flag: "🇵🇹", pts: 1, pj: 1, v: 0, e: 1, d: 0, gp: 1, gc: 1 },
      { id: "COD", name: "RD do Congo", flag: "🇨🇩", pts: 1, pj: 1, v: 0, e: 1, d: 0, gp: 1, gc: 1 },
      { id: "UZB", name: "Uzbequistão", flag: "🇺🇿", pts: 0, pj: 1, v: 0, e: 0, d: 1, gp: 1, gc: 2 }
    ],
    L: [
      { id: "ENG", name: "Inglaterra", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", pts: 3, pj: 1, v: 1, e: 0, d: 0, gp: 2, gc: 0 },
      { id: "GHA", name: "Gana", flag: "🇬🇭", pts: 1, pj: 1, v: 0, e: 1, d: 0, gp: 1, gc: 1 },
      { id: "PAN", name: "Panamá", flag: "🇵🇦", pts: 1, pj: 1, v: 0, e: 1, d: 0, gp: 1, gc: 1 },
      { id: "CRO", name: "Croácia", flag: "🇭🇷", pts: 0, pj: 1, v: 0, e: 0, d: 1, gp: 0, gc: 2 }
    ]
  },
 
  // Estrutura de Chaveamento Pré-Definido (Mata-Mata da Copa de 2026)
  brackets: {
    roundOf32: [
      { id: "m1", teamA: null, teamB: null, scoreA: null, scoreB: null, date: "25 Jun 2026" },
      { id: "m2", teamA: null, teamB: null, scoreA: null, scoreB: null, date: "25 Jun 2026" },
      { id: "m3", teamA: null, teamB: null, scoreA: null, scoreB: null, date: "26 Jun 2026" },
      { id: "m4", teamA: null, teamB: null, scoreA: null, scoreB: null, date: "26 Jun 2026" },
      { id: "m5", teamA: null, teamB: null, scoreA: null, scoreB: null, date: "27 Jun 2026" },
      { id: "m6", teamA: null, teamB: null, scoreA: null, scoreB: null, date: "27 Jun 2026" },
      { id: "m7", teamA: null, teamB: null, scoreA: null, scoreB: null, date: "28 Jun 2026" },
      { id: "m8", teamA: null, teamB: null, scoreA: null, scoreB: null, date: "28 Jun 2026" }
    ],
    octaves: [
      { id: "m9", teamA: null, teamB: null, prevMatchA: "m1", prevMatchB: "m2", scoreA: null, scoreB: null, date: "30 Jun 2026" },
      { id: "m10", teamA: null, teamB: null, prevMatchA: "m3", prevMatchB: "m4", scoreA: null, scoreB: null, date: "01 Jul 2026" },
      { id: "m11", teamA: null, teamB: null, prevMatchA: "m5", prevMatchB: "m6", scoreA: null, scoreB: null, date: "02 Jul 2026" },
      { id: "m12", teamA: null, teamB: null, prevMatchA: "m7", prevMatchB: "m8", scoreA: null, scoreB: null, date: "03 Jul 2026" }
    ],
    quarters: [
      { id: "m13", teamA: null, teamB: null, prevMatchA: "m9", prevMatchB: "m10", scoreA: null, scoreB: null, date: "06 Jul 2026" },
      { id: "m14", teamA: null, teamB: null, prevMatchA: "m11", prevMatchB: "m12", scoreA: null, scoreB: null, date: "07 Jul 2026" }
    ],
    semis: [
      { id: "m15", teamA: null, teamB: null, prevMatchA: "m13", prevMatchB: "m14", scoreA: null, scoreB: null, date: "11 Jul 2026" }
    ],
    final: { id: "m16", teamA: null, teamB: null, prevMatchA: "m15", scoreA: null, scoreB: null, date: "19 Jul 2026" }
  },

  // Estatísticas de performance dos últimos 100 jogos para G8
  teamStats: {
    BRA: { wins: 68, draws: 18, losses: 14, goalsScored: 215, goalsConceded: 78, cleanSheets: 48, form: ["V", "V", "E", "V", "V"] },
    ARG: { wins: 72, draws: 16, losses: 12, goalsScored: 202, goalsConceded: 65, cleanSheets: 55, form: ["V", "V", "V", "D", "V"] },
    FRA: { wins: 64, draws: 20, losses: 16, goalsScored: 198, goalsConceded: 84, cleanSheets: 42, form: ["V", "E", "V", "V", "E"] },
    ESP: { wins: 62, draws: 22, losses: 16, goalsScored: 195, goalsConceded: 81, cleanSheets: 45, form: ["V", "V", "E", "V", "V"] },
    ENG: { wins: 60, draws: 24, losses: 16, goalsScored: 190, goalsConceded: 79, cleanSheets: 46, form: ["E", "V", "V", "E", "V"] },
    GER: { wins: 54, draws: 26, losses: 20, goalsScored: 188, goalsConceded: 98, cleanSheets: 35, form: ["V", "E", "V", "D", "V"] },
    POR: { wins: 61, draws: 19, losses: 20, goalsScored: 204, goalsConceded: 86, cleanSheets: 41, form: ["V", "V", "D", "V", "V"] },
    URU: { wins: 52, draws: 24, losses: 24, goalsScored: 154, goalsConceded: 95, cleanSheets: 38, form: ["V", "E", "V", "V", "D"] }
  },

  // Escalações oficiais, posições e dados reais dos convocados de 2026
  squads: {
    BRA: {
      formation: "4-3-3",
      players: [
        { name: "Alisson", pos: "GK", no: 1, club: "Liverpool", ovr: 89, pac: 85, sho: 45, pas: 89, dri: 87, def: 90, phy: 84, x: 50, y: 12 },
        { name: "Danilo", pos: "DF", no: 2, club: "Flamengo", ovr: 81, pac: 76, sho: 65, pas: 78, dri: 76, def: 82, phy: 80, x: 85, y: 35 },
        { name: "Marquinhos", pos: "DF", no: 3, club: "PSG", ovr: 87, pac: 79, sho: 53, pas: 75, dri: 74, def: 89, phy: 80, x: 65, y: 28 },
        { name: "G. Magalhães", pos: "DF", no: 4, club: "Arsenal", ovr: 85, pac: 74, sho: 50, pas: 70, dri: 68, def: 86, phy: 84, x: 35, y: 28 },
        { name: "Alex Sandro", pos: "DF", no: 6, club: "Flamengo", ovr: 80, pac: 75, sho: 60, pas: 74, dri: 76, def: 79, phy: 76, x: 15, y: 35 },
        { name: "Casemiro", pos: "MF", no: 5, club: "Manchester United", ovr: 83, pac: 60, sho: 73, pas: 76, dri: 72, def: 83, phy: 84, x: 50, y: 50 },
        { name: "B. Guimarães", pos: "MF", no: 8, club: "Newcastle", ovr: 86, pac: 76, sho: 73, pas: 85, dri: 84, def: 81, phy: 83, x: 30, y: 55 },
        { name: "L. Paquetá", pos: "MF", no: 10, club: "Flamengo", ovr: 84, pac: 75, sho: 79, pas: 84, dri: 85, def: 72, phy: 79, x: 70, y: 55 },
        { name: "Raphinha", pos: "FW", no: 7, club: "Barcelona", ovr: 85, pac: 89, sho: 80, pas: 81, dri: 85, def: 52, phy: 73, x: 80, y: 80 },
        { name: "Vini Júnior", pos: "FW", no: 11, club: "Real Madrid", ovr: 91, pac: 96, sho: 84, pas: 81, dri: 92, def: 29, phy: 68, x: 20, y: 80 },
        { name: "Neymar", pos: "FW", no: 9, club: "Santos", ovr: 88, pac: 80, sho: 87, pas: 88, dri: 91, def: 35, phy: 68, x: 50, y: 85 }
      ],
      bench: [
        { name: "Ederson", pos: "GK", club: "Fenerbahçe", ovr: 85, pac: 84, sho: 46, pas: 84, dri: 85, def: 86, phy: 82 },
        { name: "Weverton", pos: "GK", club: "Grêmio", ovr: 79, pac: 77, sho: 40, pas: 73, dri: 76, def: 80, phy: 78 },
        { name: "Bremer", pos: "DF", club: "Juventus", ovr: 84, pac: 78, sho: 48, pas: 60, dri: 65, def: 85, phy: 84 },
        { name: "Douglas Santos", pos: "DF", club: "Zenit", ovr: 80, pac: 78, sho: 60, pas: 75, dri: 77, def: 77, phy: 76 },
        { name: "Léo Pereira", pos: "DF", club: "Flamengo", ovr: 79, pac: 70, sho: 54, pas: 65, dri: 68, def: 78, phy: 80 },
        { name: "Roger Ibañez", pos: "DF", club: "Al-Ahli", ovr: 81, pac: 78, sho: 48, pas: 62, dri: 65, def: 82, phy: 80 },
        { name: "Danilo", pos: "MF", club: "Botafogo", ovr: 80, pac: 76, sho: 69, pas: 76, dri: 78, def: 76, phy: 78 },
        { name: "Éderson", pos: "MF", club: "Atalanta", ovr: 81, pac: 77, sho: 72, pas: 75, dri: 78, def: 79, phy: 81 },
        { name: "Fabinho", pos: "MF", club: "Al-Ittihad", ovr: 81, pac: 62, sho: 69, pas: 76, dri: 74, def: 81, phy: 80 },
        { name: "Endrick", pos: "FW", club: "Real Madrid", ovr: 82, pac: 88, sho: 81, pas: 70, dri: 82, def: 35, phy: 80 },
        { name: "G. Martinelli", pos: "FW", club: "Arsenal", ovr: 84, pac: 89, sho: 78, pas: 77, dri: 86, def: 42, phy: 72 },
        { name: "Igor Thiago", pos: "FW", club: "Brentford", ovr: 79, pac: 78, sho: 77, pas: 65, dri: 72, def: 34, phy: 81 },
        { name: "Luiz Henrique", pos: "FW", club: "Zenit", ovr: 81, pac: 86, sho: 76, pas: 73, dri: 83, def: 38, phy: 75 },
        { name: "Matheus Cunha", pos: "FW", club: "Manchester United", ovr: 82, pac: 83, sho: 80, pas: 74, dri: 81, def: 46, phy: 79 },
        { name: "Rayan", pos: "FW", club: "Vasco", ovr: 75, pac: 80, sho: 73, pas: 68, dri: 76, def: 28, phy: 70 }
      ]
    },
    ARG: {
      formation: "4-3-3",
      players: [
        { name: "E. Martínez", pos: "GK", no: 23, club: "Aston Villa", ovr: 87, pac: 83, sho: 48, pas: 82, dri: 85, def: 88, phy: 86, x: 50, y: 12 },
        { name: "N. Molina", pos: "DF", no: 26, club: "Atlético Madrid", ovr: 82, pac: 86, sho: 67, pas: 77, dri: 79, def: 77, phy: 74, x: 85, y: 35 },
        { name: "C. Romero", pos: "DF", no: 13, club: "Tottenham", ovr: 88, pac: 81, sho: 46, pas: 65, dri: 67, def: 90, phy: 87, x: 65, y: 28 },
        { name: "N. Otamendi", pos: "DF", no: 19, club: "Benfica", ovr: 82, pac: 60, sho: 48, pas: 63, dri: 59, def: 83, phy: 82, x: 35, y: 28 },
        { name: "N. Tagliafico", pos: "DF", no: 3, club: "Lyon", ovr: 81, pac: 78, sho: 58, pas: 73, dri: 74, def: 81, phy: 76, x: 15, y: 35 },
        { name: "R. De Paul", pos: "MF", no: 7, club: "Inter Miami", ovr: 84, pac: 77, sho: 76, pas: 83, dri: 81, def: 78, phy: 82, x: 70, y: 55 },
        { name: "Enzo F.", pos: "MF", no: 24, club: "Chelsea", ovr: 83, pac: 72, sho: 75, pas: 84, dri: 80, def: 76, phy: 78, x: 50, y: 50 },
        { name: "Mac Allister", pos: "MF", no: 20, club: "Liverpool", ovr: 86, pac: 73, sho: 80, pas: 86, dri: 84, def: 78, phy: 79, x: 30, y: 55 },
        { name: "L. Messi", pos: "FW", no: 10, club: "Inter Miami", ovr: 90, pac: 78, sho: 89, pas: 90, dri: 92, def: 33, phy: 62, x: 80, y: 80 },
        { name: "J. Álvarez", pos: "FW", no: 9, club: "Atlético Madrid", ovr: 84, pac: 85, sho: 83, pas: 78, dri: 83, def: 48, phy: 78, x: 50, y: 85 },
        { name: "L. Martínez", pos: "FW", no: 22, club: "Inter de Milão", ovr: 88, pac: 80, sho: 88, pas: 73, dri: 83, def: 48, phy: 84, x: 20, y: 80 }
      ],
      bench: [
        { name: "G. Rulli", pos: "GK", club: "Marseille", ovr: 81, pac: 80, sho: 44, pas: 75, dri: 79, def: 81, phy: 78 },
        { name: "Juan Musso", pos: "GK", club: "Atlético de Madrid", ovr: 81, pac: 78, sho: 40, pas: 72, dri: 77, def: 82, phy: 79 },
        { name: "L. Martínez", pos: "DF", club: "Manchester United", ovr: 83, pac: 78, sho: 45, pas: 80, dri: 78, def: 84, phy: 82 },
        { name: "G. Montiel", pos: "DF", club: "River Plate", ovr: 79, pac: 81, sho: 60, pas: 72, dri: 75, def: 77, phy: 78 },
        { name: "L. Balerdi", pos: "DF", club: "Marseille", ovr: 80, pac: 74, sho: 46, pas: 68, dri: 67, def: 81, phy: 80 },
        { name: "Facundo Medina", pos: "DF", club: "Marseille", ovr: 80, pac: 75, sho: 48, pas: 70, dri: 69, def: 80, phy: 81 },
        { name: "L. Paredes", pos: "MF", club: "Boca Juniors", ovr: 82, pac: 58, sho: 73, pas: 81, dri: 77, def: 78, phy: 80 },
        { name: "G. Lo Celso", pos: "MF", club: "Real Betis", ovr: 81, pac: 74, sho: 75, pas: 82, dri: 83, def: 68, phy: 72 },
        { name: "E. Palacios", pos: "MF", club: "Bayer Leverkusen", ovr: 82, pac: 75, sho: 74, pas: 81, dri: 80, def: 78, phy: 79 },
        { name: "Valentín Barco", pos: "MF", club: "Strasbourg", ovr: 79, pac: 81, sho: 66, pas: 78, dri: 80, def: 72, phy: 70 },
        { name: "Flaco López", pos: "FW", club: "Palmeiras", ovr: 78, pac: 74, sho: 79, pas: 68, dri: 75, def: 38, phy: 80 },
        { name: "Nico González", pos: "FW", club: "Atlético Madrid", ovr: 81, pac: 83, sho: 78, pas: 74, dri: 81, def: 50, phy: 78 },
        { name: "Thiago Almada", pos: "FW", club: "Atlético Madrid", ovr: 81, pac: 84, sho: 77, pas: 81, dri: 85, def: 42, phy: 65 },
        { name: "G. Simeone", pos: "FW", club: "Atlético Madrid", ovr: 76, pac: 82, sho: 74, pas: 70, dri: 78, def: 44, phy: 73 },
        { name: "Nico Paz", pos: "FW", club: "Como", ovr: 79, pac: 76, sho: 75, pas: 80, dri: 82, def: 48, phy: 70 }
      ]
    },
    FRA: {
      formation: "4-2-3-1",
      players: [
        { name: "M. Maignan", pos: "GK", no: 16, club: "Milan", ovr: 87, pac: 84, sho: 50, pas: 83, dri: 85, def: 88, phy: 83, x: 50, y: 12 },
        { name: "J. Koundé", pos: "DF", no: 5, club: "Barcelona", ovr: 85, pac: 81, sho: 52, pas: 74, dri: 79, def: 85, phy: 79, x: 85, y: 35 },
        { name: "W. Saliba", pos: "DF", no: 4, club: "Arsenal", ovr: 88, pac: 82, sho: 40, pas: 72, dri: 73, def: 90, phy: 84, x: 65, y: 28 },
        { name: "D. Upamecano", pos: "DF", no: 18, club: "Bayern Munique", ovr: 83, pac: 81, sho: 51, pas: 69, dri: 68, def: 82, phy: 85, x: 35, y: 28 },
        { name: "T. Hernández", pos: "DF", no: 22, club: "Milan", ovr: 86, pac: 93, sho: 71, pas: 78, dri: 82, def: 79, phy: 82, x: 15, y: 35 },
        { name: "A. Tchouaméni", pos: "MF", no: 8, club: "Real Madrid", ovr: 85, pac: 72, sho: 72, pas: 80, dri: 79, def: 83, phy: 84, x: 40, y: 50 },
        { name: "W. Zaïre-Emery", pos: "MF", no: 6, club: "PSG", ovr: 84, pac: 80, sho: 72, pas: 82, dri: 83, def: 79, phy: 81, x: 60, y: 50 },
        { name: "O. Dembélé", pos: "FW", no: 11, club: "PSG", ovr: 86, pac: 93, sho: 77, pas: 81, dri: 90, def: 36, phy: 58, x: 80, y: 70 },
        { name: "A. Rabiot", pos: "MF", no: 7, club: "Marseille", ovr: 84, pac: 76, sho: 77, pas: 81, dri: 80, def: 80, phy: 82, x: 50, y: 68 },
        { name: "M. Thuram", pos: "FW", no: 20, club: "Inter de Milão", ovr: 84, pac: 86, sho: 82, pas: 74, dri: 83, def: 38, phy: 81, x: 20, y: 70 },
        { name: "K. Mbappé", pos: "FW", no: 10, club: "Real Madrid", ovr: 92, pac: 97, sho: 90, pas: 80, dri: 92, def: 36, phy: 78, x: 50, y: 86 }
      ],
      bench: [
        { name: "Robin Risser", pos: "GK", club: "Strasbourg", ovr: 75, pac: 73, sho: 38, pas: 68, dri: 72, def: 76, phy: 74 },
        { name: "Brice Samba", pos: "GK", club: "Lens", ovr: 81, pac: 78, sho: 40, pas: 75, dri: 78, def: 82, phy: 80 },
        { name: "Lucas Digne", pos: "DF", club: "Aston Villa", ovr: 80, pac: 75, sho: 62, pas: 77, dri: 76, def: 77, phy: 74 },
        { name: "Malo Gusto", pos: "DF", club: "Chelsea", ovr: 81, pac: 85, sho: 58, pas: 76, dri: 80, def: 78, phy: 75 },
        { name: "Lucas Hernandez", pos: "DF", club: "PSG", ovr: 84, pac: 76, sho: 54, pas: 71, dri: 72, def: 85, phy: 81 },
        { name: "Ibrahima Konaté", pos: "DF", club: "Liverpool", ovr: 83, pac: 78, sho: 39, pas: 62, dri: 65, def: 84, phy: 85 },
        { name: "Maxence Lacroix", pos: "DF", club: "Crystal Palace", ovr: 80, pac: 82, sho: 42, pas: 60, dri: 66, def: 81, phy: 80 },
        { name: "N'Golo Kanté", pos: "MF", club: "Al-Ittihad", ovr: 83, pac: 73, sho: 66, pas: 76, dri: 80, def: 83, phy: 78 },
        { name: "Manu Koné", pos: "MF", club: "Roma", ovr: 80, pac: 78, sho: 68, pas: 75, dri: 81, def: 77, phy: 80 },
        { name: "M. Akliouche", pos: "FW", club: "Monaco", ovr: 80, pac: 78, sho: 75, pas: 79, dri: 83, def: 45, phy: 68 },
        { name: "Rayan Cherki", pos: "FW", club: "Lyon", ovr: 80, pac: 74, sho: 76, pas: 81, dri: 86, def: 32, phy: 65 },
        { name: "Désiré Doué", pos: "FW", club: "PSG", ovr: 80, pac: 82, sho: 75, pas: 77, dri: 84, def: 45, phy: 72 },
        { name: "J. Mateta", pos: "FW", club: "Crystal Palace", ovr: 81, pac: 76, sho: 81, pas: 65, dri: 74, def: 38, phy: 82 },
        { name: "Michael Olise", pos: "FW", club: "Bayern Munique", ovr: 85, pac: 84, sho: 81, pas: 84, dri: 87, def: 50, phy: 70 },
        { name: "Marcus Thuram", pos: "FW", club: "Inter de Milão", ovr: 84, pac: 86, sho: 82, pas: 74, dri: 83, def: 38, phy: 81 }
      ]
    },
    ESP: {
      formation: "4-3-3",
      players: [
        { name: "Unai Simón", pos: "GK", no: 23, club: "Athletic Bilbao", ovr: 86, pac: 81, sho: 44, pas: 79, dri: 81, def: 87, phy: 83, x: 50, y: 12 },
        { name: "Pedro Porro", pos: "DF", no: 2, club: "Tottenham", ovr: 82, pac: 83, sho: 64, pas: 77, dri: 79, def: 78, phy: 75, x: 85, y: 35 },
        { name: "Pau Cubarsí", pos: "DF", no: 3, club: "Barcelona", ovr: 82, pac: 72, sho: 40, pas: 75, dri: 72, def: 84, phy: 76, x: 65, y: 28 },
        { name: "A. Laporte", pos: "DF", no: 14, club: "Al-Nassr", ovr: 84, pac: 70, sho: 59, pas: 73, dri: 71, def: 85, phy: 79, x: 35, y: 28 },
        { name: "M. Cucurella", pos: "DF", no: 24, club: "Chelsea", ovr: 82, pac: 80, sho: 61, pas: 75, dri: 77, def: 80, phy: 78, x: 15, y: 35 },
        { name: "Rodri", pos: "MF", no: 16, club: "Manchester City", ovr: 91, pac: 66, sho: 80, pas: 86, dri: 84, def: 89, phy: 85, x: 50, y: 48 },
        { name: "Pedri", pos: "MF", no: 8, club: "Barcelona", ovr: 86, pac: 78, sho: 76, pas: 88, dri: 87, def: 72, phy: 68, x: 30, y: 58 },
        { name: "Fabián Ruiz", pos: "MF", no: 10, club: "PSG", ovr: 83, pac: 68, sho: 78, pas: 82, dri: 81, def: 74, phy: 76, x: 70, y: 58 },
        { name: "Lamine Yamal", pos: "FW", no: 19, club: "Barcelona", ovr: 87, pac: 90, sho: 81, pas: 83, dri: 90, def: 40, phy: 65, x: 80, y: 80 },
        { name: "M. Oyarzabal", pos: "FW", no: 7, club: "Real Sociedad", ovr: 83, pac: 80, sho: 82, pas: 80, dri: 81, def: 45, phy: 74, x: 50, y: 85 },
        { name: "Nico Williams", pos: "FW", no: 17, club: "Athletic Bilbao", ovr: 85, pac: 94, sho: 79, pas: 78, dri: 87, def: 36, phy: 70, x: 20, y: 80 }
      ],
      bench: [
        { name: "David Raya", pos: "GK", club: "Arsenal", ovr: 83, pac: 82, sho: 42, pas: 80, dri: 81, def: 84, phy: 78 },
        { name: "Joan García", pos: "GK", club: "Barcelona", ovr: 78, pac: 76, sho: 38, pas: 70, dri: 74, def: 79, phy: 76 },
        { name: "Alex Grimaldo", pos: "DF", club: "B. Leverkusen", ovr: 84, pac: 83, sho: 76, pas: 84, dri: 84, def: 77, phy: 72 },
        { name: "Marc Pubill", pos: "DF", club: "Almería", ovr: 77, pac: 81, sho: 52, pas: 68, dri: 72, def: 74, phy: 75 },
        { name: "Eric García", pos: "DF", club: "Barcelona", ovr: 79, pac: 70, sho: 48, pas: 72, dri: 73, def: 80, phy: 76 },
        { name: "Marcos Llorente", pos: "DF", club: "Atlético de Madrid", ovr: 81, pac: 88, sho: 76, pas: 78, dri: 79, def: 77, phy: 82 },
        { name: "M. Zubimendi", pos: "MF", club: "Real Sociedad", ovr: 84, pac: 72, sho: 67, pas: 80, dri: 81, def: 82, phy: 78 },
        { name: "Gavi", pos: "MF", club: "Barcelona", ovr: 83, pac: 80, sho: 72, pas: 80, dri: 83, def: 79, phy: 82 },
        { name: "Alex Baena", pos: "MF", club: "Villarreal", ovr: 82, pac: 76, sho: 77, pas: 83, dri: 82, def: 65, phy: 68 },
        { name: "Mikel Merino", pos: "MF", club: "Arsenal", ovr: 82, pac: 70, sho: 77, pas: 79, dri: 80, def: 80, phy: 82 },
        { name: "Yeremy Pino", pos: "FW", club: "Villarreal", ovr: 80, pac: 82, sho: 76, pas: 74, dri: 82, def: 38, phy: 65 },
        { name: "Ferran Torres", pos: "FW", club: "Barcelona", ovr: 81, pac: 82, sho: 79, pas: 76, dri: 81, def: 35, phy: 74 },
        { name: "Borja Iglesias", pos: "FW", club: "Celta de Vigo", ovr: 79, pac: 60, sho: 80, pas: 66, dri: 71, def: 38, phy: 79 },
        { name: "Víctor Muñoz", pos: "FW", club: "Lazio", ovr: 75, pac: 78, sho: 72, pas: 70, dri: 76, def: 30, phy: 68 }
      ]
    },
    ENG: {
      formation: "4-2-3-1",
      players: [
        { name: "J. Pickford", pos: "GK", no: 1, club: "Everton", ovr: 84, pac: 83, sho: 46, pas: 87, dri: 84, def: 83, phy: 80, x: 50, y: 12 },
        { name: "Reece James", pos: "DF", no: 2, club: "Chelsea", ovr: 83, pac: 80, sho: 68, pas: 79, dri: 80, def: 81, phy: 82, x: 85, y: 35 },
        { name: "J. Stones", pos: "DF", no: 5, club: "Manchester City", ovr: 86, pac: 72, sho: 54, pas: 80, dri: 79, def: 86, phy: 79, x: 65, y: 28 },
        { name: "Marc Guéhi", pos: "DF", no: 6, club: "Manchester City", ovr: 83, pac: 75, sho: 40, pas: 68, dri: 69, def: 84, phy: 80, x: 35, y: 28 },
        { name: "Dan Burn", pos: "DF", no: 12, club: "Newcastle", ovr: 80, pac: 60, sho: 50, pas: 68, dri: 66, def: 80, phy: 84, x: 15, y: 35 },
        { name: "Declan Rice", pos: "MF", no: 4, club: "Arsenal", ovr: 87, pac: 78, sho: 74, pas: 80, dri: 81, def: 86, phy: 84, x: 40, y: 50 },
        { name: "K. Mainoo", pos: "MF", no: 26, club: "Manchester United", ovr: 80, pac: 75, sho: 70, pas: 78, dri: 82, def: 74, phy: 73, x: 60, y: 50 },
        { name: "Bukayo Saka", pos: "FW", no: 7, club: "Arsenal", ovr: 87, pac: 88, sho: 83, pas: 81, dri: 87, def: 53, phy: 76, x: 80, y: 70 },
        { name: "J. Bellingham", pos: "MF", no: 10, club: "Real Madrid", ovr: 90, pac: 80, sho: 86, pas: 84, dri: 88, def: 80, phy: 88, x: 50, y: 68 },
        { name: "M. Rashford", pos: "FW", no: 11, club: "Barcelona", ovr: 84, pac: 89, sho: 82, pas: 78, dri: 84, def: 41, phy: 74, x: 20, y: 70 },
        { name: "Harry Kane", pos: "FW", no: 9, club: "Bayern Munique", ovr: 89, pac: 69, sho: 93, pas: 84, dri: 83, def: 48, phy: 82, x: 50, y: 86 }
      ],
      bench: [
        { name: "D. Henderson", pos: "GK", club: "Crystal Palace", ovr: 80, pac: 78, sho: 40, pas: 74, dri: 78, def: 81, phy: 79 },
        { name: "James Trafford", pos: "GK", club: "Manchester City", ovr: 77, pac: 76, sho: 38, pas: 72, dri: 74, def: 77, phy: 75 },
        { name: "Ezri Konsa", pos: "DF", club: "Aston Villa", ovr: 80, pac: 76, sho: 35, pas: 64, dri: 66, def: 81, phy: 79 },
        { name: "Jarell Quansah", pos: "DF", club: "Bayer Leverkusen", ovr: 78, pac: 72, sho: 32, pas: 62, dri: 63, def: 79, phy: 78 },
        { name: "Nico O'Reilly", pos: "DF", club: "Manchester City", ovr: 74, pac: 70, sho: 64, pas: 72, dri: 74, def: 70, phy: 71 },
        { name: "Djed Spence", pos: "DF", club: "Tottenham", ovr: 76, pac: 82, sho: 54, pas: 68, dri: 74, def: 74, phy: 73 },
        { name: "T. Livramento", pos: "DF", club: "Newcastle", ovr: 79, pac: 81, sho: 56, pas: 73, dri: 77, def: 77, phy: 74 },
        { name: "Elliot Anderson", pos: "MF", club: "Nottingham Forest", ovr: 78, pac: 74, sho: 70, pas: 76, dri: 78, def: 72, phy: 75 },
        { name: "J. Henderson", pos: "MF", club: "Brentford", ovr: 77, pac: 55, sho: 64, pas: 77, dri: 72, def: 75, phy: 76 },
        { name: "Morgan Rogers", pos: "MF", club: "Aston Villa", ovr: 79, pac: 80, sho: 76, pas: 75, dri: 81, def: 52, phy: 77 },
        { name: "Eberechi Eze", pos: "MF", club: "Arsenal", ovr: 82, pac: 81, sho: 79, pas: 81, dri: 85, def: 48, phy: 68 },
        { name: "Ivan Toney", pos: "FW", club: "Al-Ahli", ovr: 81, pac: 76, sho: 81, pas: 70, dri: 76, def: 42, phy: 81 },
        { name: "Ollie Watkins", pos: "FW", club: "Aston Villa", ovr: 82, pac: 85, sho: 82, pas: 70, dri: 78, def: 40, phy: 78 },
        { name: "Anthony Gordon", pos: "FW", club: "Newcastle", ovr: 82, pac: 89, sho: 78, pas: 75, dri: 83, def: 42, phy: 73 },
        { name: "Noni Madueke", pos: "FW", club: "Arsenal", ovr: 81, pac: 86, sho: 75, pas: 74, dri: 84, def: 38, phy: 68 }
      ]
    },
    GER: {
      formation: "4-2-3-1",
      players: [
        { name: "Manuel Neuer", pos: "GK", no: 1, club: "Bayern Munique", ovr: 86, pac: 80, sho: 45, pas: 87, dri: 83, def: 85, phy: 80, x: 50, y: 12 },
        { name: "J. Kimmich", pos: "DF", no: 6, club: "Bayern Munique", ovr: 86, pac: 70, sho: 73, pas: 88, dri: 83, def: 81, phy: 76, x: 85, y: 35 },
        { name: "A. Rüdiger", pos: "DF", no: 2, club: "Real Madrid", ovr: 88, pac: 82, sho: 53, pas: 71, dri: 69, def: 89, phy: 86, x: 65, y: 28 },
        { name: "Jonathan Tah", pos: "DF", no: 4, club: "Bayern Munique", ovr: 84, pac: 76, sho: 42, pas: 68, dri: 67, def: 85, phy: 85, x: 35, y: 28 },
        { name: "David Raum", pos: "DF", no: 3, club: "RB Leipzig", ovr: 81, pac: 84, sho: 60, pas: 78, dri: 77, def: 75, phy: 78, x: 15, y: 35 },
        { name: "A. Pavlovic", pos: "MF", no: 23, club: "Bayern Munique", ovr: 81, pac: 72, sho: 68, pas: 79, dri: 78, def: 76, phy: 75, x: 40, y: 50 },
        { name: "Pascal Groß", pos: "MF", no: 5, club: "Brighton", ovr: 82, pac: 60, sho: 76, pas: 84, dri: 78, def: 75, phy: 76, x: 60, y: 50 },
        { name: "Florian Wirtz", pos: "FW", no: 10, club: "Liverpool", ovr: 88, pac: 82, sho: 81, pas: 87, dri: 90, def: 52, phy: 68, x: 80, y: 70 },
        { name: "Jamal Musiala", pos: "MF", no: 8, club: "Bayern Munique", ovr: 88, pac: 85, sho: 80, pas: 84, dri: 92, def: 53, phy: 64, x: 50, y: 68 },
        { name: "Leroy Sané", pos: "FW", no: 19, club: "Galatasaray", ovr: 84, pac: 91, sho: 81, pas: 78, dri: 86, def: 38, phy: 66, x: 20, y: 70 },
        { name: "Kai Havertz", pos: "FW", no: 7, club: "Arsenal", ovr: 84, pac: 81, sho: 80, pas: 80, dri: 84, def: 47, phy: 77, x: 50, y: 86 }
      ],
      bench: [
        { name: "O. Baumann", pos: "GK", club: "Hoffenheim", ovr: 80, pac: 79, sho: 40, pas: 72, dri: 78, def: 81, phy: 79 },
        { name: "A. Nübel", pos: "GK", club: "Bayern Munique", ovr: 80, pac: 78, sho: 40, pas: 74, dri: 77, def: 80, phy: 76 },
        { name: "Waldemar Anton", pos: "DF", club: "Borussia Dortmund", ovr: 81, pac: 74, sho: 42, pas: 66, dri: 68, def: 82, phy: 80 },
        { name: "Nathaniel Brown", pos: "DF", club: "Eintracht Frankfurt", ovr: 75, pac: 78, sho: 50, pas: 68, dri: 72, def: 73, phy: 70 },
        { name: "Felix Nmecha", pos: "MF", club: "Borussia Dortmund", ovr: 78, pac: 76, sho: 72, pas: 75, dri: 80, def: 72, phy: 76 },
        { name: "N. Schlotterbeck", pos: "DF", club: "Borussia Dortmund", ovr: 83, pac: 77, sho: 45, pas: 70, dri: 72, def: 84, phy: 81 },
        { name: "Angelo Stiller", pos: "MF", club: "Stuttgart", ovr: 81, pac: 70, sho: 70, pas: 80, dri: 79, def: 77, phy: 76 },
        { name: "Malick Thiaw", pos: "DF", club: "Newcastle", ovr: 80, pac: 75, sho: 40, pas: 64, dri: 65, def: 81, phy: 79 },
        { name: "Nadiem Amiri", pos: "MF", club: "Mainz 05", ovr: 79, pac: 75, sho: 74, pas: 78, dri: 81, def: 60, phy: 68 },
        { name: "Maximilian Beier", pos: "FW", club: "Borussia Dortmund", ovr: 79, pac: 87, sho: 78, pas: 70, dri: 79, def: 35, phy: 70 },
        { name: "Leon Goretzka", pos: "MF", club: "Bayern Munique", ovr: 82, pac: 74, sho: 79, pas: 80, dri: 79, def: 78, phy: 81 },
        { name: "Lennart Karl", pos: "MF", club: "Bayern Munique", ovr: 72, pac: 70, sho: 68, pas: 72, dri: 74, def: 58, phy: 66 },
        { name: "Jamie Leweling", pos: "FW", club: "Stuttgart", ovr: 78, pac: 83, sho: 74, pas: 72, dri: 80, def: 42, phy: 74 },
        { name: "Deniz Undav", pos: "FW", club: "Stuttgart", ovr: 81, pac: 72, sho: 82, pas: 75, dri: 80, def: 40, phy: 78 },
        { name: "Nick Woltemade", pos: "FW", club: "Newcastle", ovr: 75, pac: 70, sho: 73, pas: 72, dri: 75, def: 34, phy: 76 }
      ]
    },
    POR: {
      formation: "4-3-3",
      players: [
        { name: "Diogo Costa", pos: "GK", no: 22, club: "Porto", ovr: 85, pac: 83, sho: 45, pas: 80, dri: 83, def: 85, phy: 80, x: 50, y: 12 },
        { name: "Diogo Dalot", pos: "DF", no: 5, club: "Manchester United", ovr: 83, pac: 81, sho: 68, pas: 79, dri: 80, def: 79, phy: 78, x: 85, y: 35 },
        { name: "Rúben Dias", pos: "DF", no: 4, club: "Manchester City", ovr: 89, pac: 67, sho: 39, pas: 71, dri: 68, def: 89, phy: 87, x: 65, y: 28 },
        { name: "Gonçalo Inácio", pos: "DF", no: 14, club: "Sporting CP", ovr: 81, pac: 75, sho: 45, pas: 74, dri: 72, def: 82, phy: 78, x: 35, y: 28 },
        { name: "Nuno Mendes", pos: "DF", no: 19, club: "PSG", ovr: 83, pac: 89, sho: 66, pas: 76, dri: 81, def: 77, phy: 74, x: 15, y: 35 },
        { name: "João Palhinha", pos: "MF", no: 6, club: "Bayern Munique", ovr: 84, pac: 65, sho: 71, pas: 72, dri: 72, def: 85, phy: 88, x: 50, y: 48 },
        { name: "Vitinha", pos: "MF", no: 23, club: "PSG", ovr: 85, pac: 78, sho: 78, pas: 86, dri: 87, def: 75, phy: 72, x: 30, y: 58 },
        { name: "B. Fernandes", pos: "MF", no: 8, club: "Manchester United", ovr: 88, pac: 74, sho: 86, pas: 89, dri: 83, def: 69, phy: 77, x: 70, y: 58 },
        { name: "Bernardo Silva", pos: "FW", no: 10, club: "Manchester City", ovr: 88, pac: 75, sho: 78, pas: 86, dri: 89, def: 69, phy: 68, x: 80, y: 80 },
        { name: "C. Ronaldo", pos: "FW", no: 7, club: "Al-Nassr", ovr: 86, pac: 77, sho: 89, pas: 78, dri: 80, def: 34, phy: 75, x: 50, y: 85 },
        { name: "Rafael Leão", pos: "FW", no: 17, club: "Milan", ovr: 86, pac: 93, sho: 79, pas: 76, dri: 88, def: 27, phy: 75, x: 20, y: 80 }
      ],
      bench: [
        { name: "José Sá", pos: "GK", club: "Wolverhampton", ovr: 80, pac: 78, sho: 40, pas: 72, dri: 76, def: 81, phy: 79 },
        { name: "Rui Silva", pos: "GK", club: "Real Betis", ovr: 80, pac: 77, sho: 40, pas: 73, dri: 77, def: 81, phy: 78 },
        { name: "Ricardo Velho", pos: "GK", club: "Farense", ovr: 76, pac: 74, sho: 38, pas: 68, dri: 72, def: 76, phy: 75 },
        { name: "Matheus Nunes", pos: "DF", club: "Manchester City", ovr: 81, pac: 82, sho: 72, pas: 78, dri: 83, def: 72, phy: 76 },
        { name: "Nélson Semedo", pos: "DF", club: "Wolverhampton", ovr: 78, pac: 83, sho: 56, pas: 70, dri: 76, def: 76, phy: 74 },
        { name: "João Cancelo", pos: "DF", club: "Al-Hilal", ovr: 84, pac: 82, sho: 72, pas: 84, dri: 84, def: 78, phy: 72 },
        { name: "Renato Veiga", pos: "DF", club: "Chelsea", ovr: 77, pac: 74, sho: 55, pas: 70, dri: 72, def: 77, phy: 78 },
        { name: "Tomás Araújo", pos: "DF", club: "Benfica", ovr: 78, pac: 73, sho: 38, pas: 64, dri: 65, def: 79, phy: 77 },
        { name: "Samu Costa", pos: "MF", club: "Mallorca", ovr: 78, pac: 72, sho: 66, pas: 73, dri: 75, def: 76, phy: 78 },
        { name: "João Neves", pos: "MF", club: "PSG", ovr: 81, pac: 78, sho: 68, pas: 79, dri: 82, def: 77, phy: 79 },
        { name: "Pedro Neto", pos: "FW", club: "Chelsea", ovr: 81, pac: 88, sho: 74, pas: 76, dri: 84, def: 42, phy: 68 },
        { name: "João Félix", pos: "FW", club: "Chelsea", ovr: 81, pac: 80, sho: 79, pas: 78, dri: 83, def: 35, phy: 68 },
        { name: "F. Trincão", pos: "FW", club: "Sporting CP", ovr: 80, pac: 81, sho: 76, pas: 76, dri: 83, def: 38, phy: 68 },
        { name: "F. Conceição", pos: "FW", club: "Juventus", ovr: 81, pac: 86, sho: 72, pas: 73, dri: 85, def: 35, phy: 62 },
        { name: "Gonçalo Guedes", pos: "FW", club: "Wolverhampton", ovr: 79, pac: 82, sho: 78, pas: 74, dri: 80, def: 38, phy: 72 },
        { name: "Gonçalo Ramos", pos: "FW", club: "PSG", ovr: 82, pac: 78, sho: 81, pas: 68, dri: 74, def: 40, phy: 79 }
      ]
    },
    URU: {
      formation: "4-3-3",
      players: [
        { name: "Sergio Rochet", pos: "GK", no: 1, club: "Internacional", ovr: 81, pac: 79, sho: 40, pas: 73, dri: 77, def: 81, phy: 80, x: 50, y: 12 },
        { name: "G. Varela", pos: "DF", no: 8, club: "Flamengo", ovr: 77, pac: 79, sho: 58, pas: 70, dri: 73, def: 76, phy: 74, x: 85, y: 35 },
        { name: "Ronald Araújo", pos: "DF", no: 4, club: "Barcelona", ovr: 86, pac: 81, sho: 51, pas: 65, dri: 65, def: 86, phy: 84, x: 65, y: 28 },
        { name: "J. M. Giménez", pos: "DF", no: 2, club: "Atlético Madrid", ovr: 82, pac: 68, sho: 46, pas: 58, dri: 56, def: 83, phy: 82, x: 35, y: 28 },
        { name: "Mathías Olivera", pos: "DF", no: 16, club: "Napoli", ovr: 79, pac: 78, sho: 52, pas: 70, dri: 73, def: 78, phy: 79, x: 15, y: 35 },
        { name: "F. Valverde", pos: "MF", no: 15, club: "Real Madrid", ovr: 88, pac: 87, sho: 82, pas: 84, dri: 84, def: 80, phy: 82, x: 70, y: 55 },
        { name: "Manuel Ugarte", pos: "MF", no: 5, club: "Manchester United", ovr: 81, pac: 75, sho: 62, pas: 74, dri: 76, def: 80, phy: 83, x: 50, y: 50 },
        { name: "N. De la Cruz", pos: "MF", no: 7, club: "Flamengo", ovr: 80, pac: 81, sho: 76, pas: 80, dri: 81, def: 70, phy: 73, x: 30, y: 55 },
        { name: "G. Arrascaeta", pos: "MF", no: 10, club: "Flamengo", ovr: 81, pac: 72, sho: 79, pas: 83, dri: 82, def: 40, phy: 66, x: 50, y: 68 },
        { name: "Darwin Núñez", pos: "FW", no: 9, club: "Al-Hilal", ovr: 82, pac: 90, sho: 81, pas: 70, dri: 77, def: 42, phy: 82, x: 50, y: 85 },
        { name: "M. Araújo", pos: "FW", no: 11, club: "Sporting", ovr: 78, pac: 84, sho: 71, pas: 73, dri: 79, def: 58, phy: 74, x: 20, y: 80 }
      ],
      bench: [
        { name: "F. Muslera", pos: "GK", club: "Estudiantes", ovr: 79, pac: 74, sho: 40, pas: 70, dri: 75, def: 80, phy: 78 },
        { name: "Santiago Mele", pos: "GK", club: "Monterrey", ovr: 77, pac: 76, sho: 38, pas: 68, dri: 73, def: 77, phy: 75 },
        { name: "Santiago Bueno", pos: "DF", club: "Wolverhampton", ovr: 78, pac: 72, sho: 36, pas: 62, dri: 63, def: 79, phy: 78 },
        { name: "Sebastián Cáceres", pos: "DF", club: "América-MEX", ovr: 77, pac: 75, sho: 40, pas: 60, dri: 62, def: 78, phy: 77 },
        { name: "Joaquín Piquerez", pos: "DF", club: "Palmeiras", ovr: 80, pac: 79, sho: 66, pas: 75, dri: 76, def: 77, phy: 78 },
        { name: "Matías Viña", pos: "DF", club: "River Plate", ovr: 79, pac: 78, sho: 58, pas: 72, dri: 74, def: 76, phy: 77 },
        { name: "Emiliano Martínez", pos: "MF", club: "Palmeiras", ovr: 77, pac: 73, sho: 60, pas: 72, dri: 73, def: 76, phy: 76 },
        { name: "Agustín Canobbio", pos: "MF", club: "Fluminense", ovr: 76, pac: 80, sho: 70, pas: 70, dri: 75, def: 52, phy: 74 },
        { name: "J. M. Sanabria", pos: "MF", club: "Real Salt Lake", ovr: 76, pac: 77, sho: 68, pas: 73, dri: 75, def: 70, phy: 72 },
        { name: "Rodrigo Zalazar", pos: "MF", club: "Sporting", ovr: 77, pac: 74, sho: 72, pas: 76, dri: 78, def: 65, phy: 73 },
        { name: "Facundo Pellistri", pos: "FW", club: "Panathinaikos", ovr: 77, pac: 86, sho: 69, pas: 71, dri: 79, def: 40, phy: 68 },
        { name: "Brian Rodríguez", pos: "FW", club: "América-MEX", ovr: 76, pac: 85, sho: 72, pas: 71, dri: 79, def: 32, phy: 64 },
        { name: "Rodrigo Aguirre", pos: "FW", club: "Tigres", ovr: 76, pac: 78, sho: 75, pas: 68, dri: 74, def: 34, phy: 75 },
        { name: "Federico Viñas", pos: "FW", club: "Oviedo", ovr: 76, pac: 75, sho: 76, pas: 65, dri: 72, def: 35, phy: 78 }
      ]
    },
    SEN: {
      formation: "4-3-3",
      players: [
        { name: "Edouard Mendy", pos: "GK", no: 16, club: "Al-Ahli", ovr: 84, pac: 80, sho: 44, pas: 78, dri: 82, def: 85, phy: 80, x: 50, y: 12 },
        { name: "Krepin Diatta", pos: "DF", no: 15, club: "AS Monaco", ovr: 79, pac: 85, sho: 70, pas: 74, dri: 80, def: 72, phy: 74, x: 85, y: 35 },
        { name: "K. Koulibaly", pos: "DF", no: 3, club: "Al-Hilal", ovr: 83, pac: 70, sho: 45, pas: 60, dri: 63, def: 85, phy: 84, x: 65, y: 28 },
        { name: "Moussa Niakhate", pos: "DF", no: 19, club: "Lyon", ovr: 80, pac: 72, sho: 42, pas: 65, dri: 66, def: 81, phy: 82, x: 35, y: 28 },
        { name: "Ismail Jakobs", pos: "DF", no: 14, club: "Galatasaray SK", ovr: 78, pac: 82, sho: 54, pas: 71, dri: 75, def: 76, phy: 75, x: 15, y: 35 },
        { name: "Lamine Camara", pos: "MF", no: 5, club: "AS Monaco", ovr: 80, pac: 74, sho: 71, pas: 78, dri: 77, def: 75, phy: 76, x: 50, y: 50 },
        { name: "P. Matar Sarr", pos: "MF", no: 17, club: "Tottenham", ovr: 82, pac: 77, sho: 73, pas: 79, dri: 80, def: 77, phy: 78, x: 30, y: 55 },
        { name: "Pape Gueye", pos: "MF", no: 8, club: "Villarreal CF", ovr: 78, pac: 68, sho: 69, pas: 74, dri: 74, def: 76, phy: 78, x: 70, y: 55 },
        { name: "Ismaila Sarr", pos: "FW", no: 18, club: "Crystal Palace", ovr: 80, pac: 89, sho: 75, pas: 73, dri: 81, def: 35, phy: 68, x: 80, y: 80 },
        { name: "Nicolas Jackson", pos: "FW", no: 9, club: "Chelsea", ovr: 84, pac: 85, sho: 81, pas: 72, dri: 82, def: 40, phy: 79, x: 50, y: 85 },
        { name: "Sadio Mane", pos: "FW", no: 10, club: "Al-Nassr", ovr: 85, pac: 86, sho: 83, pas: 80, dri: 88, def: 38, phy: 73, x: 20, y: 80 }
      ],
      bench: [
        { name: "Yehvann Diouf", pos: "GK", club: "OGC Nice", ovr: 79, pac: 78, sho: 40, pas: 72, dri: 75, def: 80, phy: 77 },
        { name: "Mory Diaw", pos: "GK", club: "Le Havre AC", ovr: 77, pac: 74, sho: 38, pas: 68, dri: 72, def: 78, phy: 76 },
        { name: "Mamadou Sarr", pos: "DF", club: "Chelsea", ovr: 75, pac: 70, sho: 35, pas: 58, dri: 60, def: 76, phy: 74 },
        { name: "Abdoulaye Seck", pos: "DF", club: "Maccabi Haifa", ovr: 76, pac: 62, sho: 38, pas: 52, dri: 54, def: 77, phy: 79 },
        { name: "E. Malick Diouf", pos: "DF", club: "West Ham United", ovr: 77, pac: 80, sho: 55, pas: 68, dri: 72, def: 75, phy: 74 },
        { name: "Idrissa Gueye", pos: "MF", club: "Everton", ovr: 79, pac: 64, sho: 66, pas: 73, dri: 75, def: 80, phy: 76 },
        { name: "Pathe Ciss", pos: "MF", club: "Rayo Vallecano", ovr: 76, pac: 66, sho: 64, pas: 71, dri: 70, def: 75, phy: 78 },
        { name: "Habib Diarra", pos: "MF", club: "Sunderland", ovr: 77, pac: 79, sho: 70, pas: 74, dri: 78, def: 70, phy: 74 },
        { name: "Bamba Dieng", pos: "FW", club: "Lorient", ovr: 76, pac: 81, sho: 76, pas: 64, dri: 74, def: 32, phy: 73 },
        { name: "Iliman Ndiaye", pos: "FW", club: "Everton", ovr: 79, pac: 80, sho: 74, pas: 75, dri: 82, def: 42, phy: 70 },
        { name: "Ibrahim Mbaye", pos: "FW", club: "PSG", ovr: 74, pac: 82, sho: 70, pas: 66, dri: 76, def: 28, phy: 65 }
      ]
    }
  }
};
