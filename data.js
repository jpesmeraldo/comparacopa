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
        { name: "Danilo", pos: "DF", no: 2, club: "Juventus", ovr: 81, pac: 76, sho: 65, pas: 78, dri: 76, def: 82, phy: 80, x: 85, y: 35 },
        { name: "Marquinhos", pos: "DF", no: 3, club: "PSG", ovr: 87, pac: 79, sho: 53, pas: 75, dri: 74, def: 89, phy: 80, x: 65, y: 28 },
        { name: "Gabriel Magalhães", pos: "DF", no: 4, club: "Arsenal", ovr: 85, pac: 74, sho: 50, pas: 70, dri: 68, def: 86, phy: 84, x: 35, y: 28 },
        { name: "Douglas Santos", pos: "DF", no: 5, club: "Zenit", ovr: 80, pac: 75, sho: 60, pas: 74, dri: 76, def: 79, phy: 76, x: 15, y: 35 },
        { name: "Casemiro", pos: "MF", no: 6, club: "Manchester United", ovr: 83, pac: 60, sho: 73, pas: 76, dri: 72, def: 83, phy: 84, x: 50, y: 50 },
        { name: "Bruno Guimarães", pos: "MF", no: 8, club: "Newcastle", ovr: 86, pac: 76, sho: 73, pas: 85, dri: 84, def: 81, phy: 83, x: 30, y: 55 },
        { name: "Lucas Paquetá", pos: "MF", no: 10, club: "Flamengo", ovr: 84, pac: 75, sho: 79, pas: 84, dri: 85, def: 72, phy: 79, x: 70, y: 55 },
        { name: "Raphinha", pos: "FW", no: 11, club: "Barcelona", ovr: 85, pac: 89, sho: 80, pas: 81, dri: 85, def: 52, phy: 73, x: 80, y: 80 },
        { name: "Vinicius Júnior", pos: "FW", no: 7, club: "Real Madrid", ovr: 91, pac: 96, sho: 84, pas: 81, dri: 92, def: 29, phy: 68, x: 20, y: 80 },
        { name: "Matheus Cunha", pos: "FW", no: 9, club: "Manchester United", ovr: 82, pac: 80, sho: 80, pas: 74, dri: 81, def: 35, phy: 79, x: 50, y: 85 }
      ],
      bench: [
        { name: "Bento", pos: "GK", club: "Al-Nassr", ovr: 82, pac: 80, sho: 40, pas: 75, dri: 78, def: 82, phy: 80 },
        { name: "Ederson", pos: "GK", club: "Fenerbahçe", ovr: 85, pac: 84, sho: 46, pas: 84, dri: 85, def: 86, phy: 82 },
        { name: "Yan Couto", pos: "DF", club: "Borussia Dortmund", ovr: 80, pac: 85, sho: 60, pas: 76, dri: 82, def: 74, phy: 70 },
        { name: "Bremer", pos: "DF", club: "Juventus", ovr: 84, pac: 78, sho: 48, pas: 60, dri: 65, def: 85, phy: 84 },
        { name: "Léo Pereira", pos: "DF", club: "Flamengo", ovr: 79, pac: 70, sho: 54, pas: 65, dri: 68, def: 78, phy: 80 },
        { name: "Roger Ibañez", pos: "DF", club: "Al-Ahli", ovr: 81, pac: 78, sho: 48, pas: 62, dri: 65, def: 82, phy: 80 },
        { name: "Fabinho", pos: "MF", club: "Al-Ittihad", ovr: 81, pac: 62, sho: 69, pas: 76, dri: 74, def: 81, phy: 80 },
        { name: "Danilo Santos", pos: "MF", club: "Nott. Forest", ovr: 80, pac: 76, sho: 69, pas: 76, dri: 78, def: 76, phy: 78 },
        { name: "Douglas Luiz", pos: "MF", club: "Juventus", ovr: 82, pac: 74, sho: 76, pas: 82, dri: 80, def: 78, phy: 80 },
        { name: "Endrick", pos: "FW", club: "Real Madrid", ovr: 82, pac: 88, sho: 81, pas: 70, dri: 82, def: 35, phy: 80 },
        { name: "Igor Thiago", pos: "FW", club: "Brentford", ovr: 79, pac: 78, sho: 77, pas: 65, dri: 72, def: 34, phy: 81 },
        { name: "Gabriel Martinelli", pos: "FW", club: "Arsenal", ovr: 84, pac: 89, sho: 78, pas: 77, dri: 86, def: 42, phy: 72 },
        { name: "Luiz Henrique", pos: "FW", club: "Zenit", ovr: 81, pac: 86, sho: 76, pas: 73, dri: 83, def: 38, phy: 75 },
        { name: "Rayan", pos: "FW", club: "Vasco", ovr: 75, pac: 80, sho: 73, pas: 68, dri: 76, def: 28, phy: 70 },
        { name: "Pepê", pos: "FW", club: "Porto", ovr: 80, pac: 88, sho: 75, pas: 78, dri: 84, def: 45, phy: 72 }
      ]
    },
    ARG: {
      formation: "4-3-3",
      players: [
        { name: "E. Martínez", pos: "GK", no: 1, club: "Aston Villa", ovr: 87, pac: 83, sho: 48, pas: 82, dri: 85, def: 88, phy: 86, x: 50, y: 12 },
        { name: "N. Molina", pos: "DF", no: 2, club: "Atlético Madrid", ovr: 82, pac: 86, sho: 67, pas: 77, dri: 79, def: 77, phy: 74, x: 85, y: 35 },
        { name: "C. Romero", pos: "DF", no: 13, club: "Tottenham", ovr: 88, pac: 81, sho: 46, pas: 65, dri: 67, def: 90, phy: 87, x: 65, y: 28 },
        { name: "N. Otamendi", pos: "DF", no: 19, club: "Benfica", ovr: 82, pac: 60, sho: 48, pas: 63, dri: 59, def: 83, phy: 82, x: 35, y: 28 },
        { name: "N. Tagliafico", pos: "DF", no: 3, club: "Lyon", ovr: 81, pac: 78, sho: 58, pas: 73, dri: 74, def: 81, phy: 76, x: 15, y: 35 },
        { name: "R. De Paul", pos: "MF", no: 7, club: "Atlético Madrid", ovr: 84, pac: 77, sho: 76, pas: 83, dri: 81, def: 78, phy: 82, x: 70, y: 55 },
        { name: "Enzo F.", pos: "MF", no: 24, club: "Chelsea", ovr: 83, pac: 72, sho: 75, pas: 84, dri: 80, def: 76, phy: 78, x: 50, y: 50 },
        { name: "Mac Allister", pos: "MF", no: 20, club: "Liverpool", ovr: 86, pac: 73, sho: 80, pas: 86, dri: 84, def: 78, phy: 79, x: 30, y: 55 },
        { name: "L. Messi", pos: "FW", no: 10, club: "Inter Miami", ovr: 90, pac: 78, sho: 89, pas: 90, dri: 92, def: 33, phy: 62, x: 80, y: 80 },
        { name: "J. Álvarez", pos: "FW", no: 9, club: "Atlético Madrid", ovr: 84, pac: 85, sho: 83, pas: 78, dri: 83, def: 48, phy: 78, x: 50, y: 85 },
        { name: "Ángel Di María", pos: "FW", no: 11, club: "Benfica", ovr: 84, pac: 80, sho: 80, pas: 83, dri: 85, def: 45, phy: 68, x: 20, y: 80 }
      ],
      bench: [
        { name: "G. Rulli", pos: "GK", club: "Marseille", ovr: 81, pac: 80, sho: 44, pas: 75, dri: 79, def: 81, phy: 78 },
        { name: "Franco Armani", pos: "GK", club: "River Plate", ovr: 81, pac: 78, sho: 40, pas: 72, dri: 77, def: 82, phy: 79 },
        { name: "Lisandro M.", pos: "DF", club: "Manchester United", ovr: 83, pac: 78, sho: 45, pas: 80, dri: 78, def: 84, phy: 82 },
        { name: "G. Montiel", pos: "DF", club: "Sevilla", ovr: 79, pac: 81, sho: 60, pas: 72, dri: 75, def: 77, phy: 78 },
        { name: "G. Pezzella", pos: "DF", club: "Real Betis", ovr: 80, pac: 74, sho: 46, pas: 68, dri: 67, def: 81, phy: 80 },
        { name: "Marcos Acuña", pos: "DF", club: "Sevilla", ovr: 80, pac: 75, sho: 48, pas: 70, dri: 69, def: 80, phy: 81 },
        { name: "L. Martínez Q.", pos: "DF", club: "Fiorentina", ovr: 80, pac: 74, sho: 50, pas: 68, dri: 70, def: 80, phy: 78 },
        { name: "L. Paredes", pos: "MF", club: "Roma", ovr: 82, pac: 58, sho: 73, pas: 81, dri: 77, def: 78, phy: 80 },
        { name: "G. Lo Celso", pos: "MF", club: "Tottenham", ovr: 81, pac: 74, sho: 75, pas: 82, dri: 83, def: 68, phy: 72 },
        { name: "E. Palacios", pos: "MF", club: "Bayer Leverkusen", ovr: 82, pac: 75, sho: 74, pas: 81, dri: 80, def: 78, phy: 79 },
        { name: "Guido Rodríguez", pos: "MF", club: "Real Betis", ovr: 81, pac: 68, sho: 65, pas: 76, dri: 74, def: 81, phy: 80 },
        { name: "V. Carboni", pos: "MF", club: "Monza", ovr: 75, pac: 78, sho: 70, pas: 75, dri: 78, def: 50, phy: 65 },
        { name: "Nico González", pos: "FW", club: "Fiorentina", ovr: 81, pac: 83, sho: 78, pas: 74, dri: 81, def: 50, phy: 78 },
        { name: "A. Garnacho", pos: "FW", club: "Manchester United", ovr: 80, pac: 86, sho: 76, pas: 72, dri: 84, def: 45, phy: 65 },
        { name: "Lautaro M.", pos: "FW", club: "Inter de Milão", ovr: 88, pac: 80, sho: 88, pas: 73, dri: 83, def: 48, phy: 84 }
      ]
    },
    FRA: {
      formation: "4-2-3-1",
      players: [
        { name: "Mike Maignan", pos: "GK", no: 16, club: "Milan", ovr: 87, pac: 84, sho: 50, pas: 83, dri: 85, def: 88, phy: 83, x: 50, y: 12 },
        { name: "Jules Koundé", pos: "DF", no: 5, club: "Barcelona", ovr: 85, pac: 81, sho: 52, pas: 74, dri: 79, def: 85, phy: 79, x: 85, y: 35 },
        { name: "William Saliba", pos: "DF", no: 17, club: "Arsenal", ovr: 88, pac: 82, sho: 40, pas: 72, dri: 73, def: 90, phy: 84, x: 65, y: 28 },
        { name: "D. Upamecano", pos: "DF", no: 4, club: "Bayern Munique", ovr: 83, pac: 81, sho: 51, pas: 69, dri: 68, def: 82, phy: 85, x: 35, y: 28 },
        { name: "Theo Hernández", pos: "DF", no: 19, club: "Milan", ovr: 86, pac: 93, sho: 71, pas: 78, dri: 82, def: 79, phy: 82, x: 15, y: 35 },
        { name: "A. Tchouaméni", pos: "MF", no: 8, club: "Real Madrid", ovr: 85, pac: 72, sho: 72, pas: 80, dri: 79, def: 83, phy: 84, x: 40, y: 50 },
        { name: "N'Golo Kanté", pos: "MF", no: 13, club: "Al-Ittihad", ovr: 84, pac: 73, sho: 66, pas: 78, dri: 80, def: 84, phy: 78, x: 60, y: 50 },
        { name: "O. Dembélé", pos: "FW", no: 7, club: "PSG", ovr: 86, pac: 93, sho: 77, pas: 81, dri: 90, def: 36, phy: 58, x: 80, y: 70 },
        { name: "Adrien Rabiot", pos: "MF", no: 14, club: "Marseille", ovr: 84, pac: 76, sho: 77, pas: 81, dri: 80, def: 80, phy: 82, x: 50, y: 68 },
        { name: "Bradley Barcola", pos: "FW", no: 12, club: "PSG", ovr: 83, pac: 88, sho: 76, pas: 75, dri: 85, def: 35, phy: 68, x: 20, y: 70 },
        { name: "Kylian Mbappé", pos: "FW", no: 10, club: "Real Madrid", ovr: 92, pac: 97, sho: 90, pas: 80, dri: 92, def: 36, phy: 78, x: 50, y: 86 }
      ],
      bench: [
        { name: "Brice Samba", pos: "GK", club: "Lens", ovr: 81, pac: 78, sho: 40, pas: 75, dri: 78, def: 82, phy: 80 },
        { name: "Robin Risser", pos: "GK", club: "Strasbourg", ovr: 75, pac: 73, sho: 38, pas: 68, dri: 72, def: 76, phy: 74 },
        { name: "Malo Gusto", pos: "DF", club: "Chelsea", ovr: 81, pac: 85, sho: 58, pas: 76, dri: 80, def: 78, phy: 75 },
        { name: "Lucas Digne", pos: "DF", club: "Aston Villa", ovr: 80, pac: 75, sho: 62, pas: 77, dri: 76, def: 77, phy: 74 },
        { name: "Ibrahima Konaté", pos: "DF", club: "Liverpool", ovr: 83, pac: 78, sho: 39, pas: 62, dri: 65, def: 84, phy: 85 },
        { name: "Lucas Hernández", pos: "DF", club: "PSG", ovr: 84, pac: 76, sho: 54, pas: 71, dri: 72, def: 85, phy: 81 },
        { name: "Maxence Lacroix", pos: "DF", club: "Crystal Palace", ovr: 80, pac: 82, sho: 42, pas: 60, dri: 66, def: 81, phy: 80 },
        { name: "Manu Koné", pos: "MF", club: "Roma", ovr: 80, pac: 78, sho: 68, pas: 75, dri: 81, def: 77, phy: 80 },
        { name: "W. Zaïre-Emery", pos: "MF", club: "PSG", ovr: 84, pac: 80, sho: 72, pas: 82, dri: 83, def: 79, phy: 81 },
        { name: "Marcus Thuram", pos: "FW", club: "Inter de Milão", ovr: 84, pac: 86, sho: 82, pas: 74, dri: 83, def: 38, phy: 81 },
        { name: "Michael Olise", pos: "FW", club: "Bayern Munique", ovr: 85, pac: 84, sho: 81, pas: 84, dri: 87, def: 50, phy: 70 },
        { name: "Désiré Doué", pos: "FW", club: "PSG", ovr: 80, pac: 82, sho: 75, pas: 77, dri: 84, def: 45, phy: 72 },
        { name: "J.-P. Mateta", pos: "FW", club: "Crystal Palace", ovr: 81, pac: 76, sho: 81, pas: 65, dri: 74, def: 38, phy: 82 },
        { name: "Rayan Cherki", pos: "FW", club: "Lyon", ovr: 80, pac: 74, sho: 76, pas: 81, dri: 86, def: 32, phy: 65 },
        { name: "M. Akliouche", pos: "FW", club: "Monaco", ovr: 80, pac: 78, sho: 75, pas: 79, dri: 83, def: 45, phy: 68 }
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
        { name: "Víctor Muñoz", pos: "FW", club: "Lazio", ovr: 75, pac: 78, sho: 72, pas: 70, dri: 76, def: 30, phy: 68 },
        { name: "Dani Olmo", pos: "MF", club: "Barcelona", ovr: 84, pac: 75, sho: 80, pas: 82, dri: 85, def: 50, phy: 68 }
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
        { name: "Matheus Nunes", pos: "MF", club: "Manchester City", ovr: 81, pac: 82, sho: 72, pas: 78, dri: 83, def: 72, phy: 76 },
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
        { name: "Federico Viñas", pos: "FW", club: "Oviedo", ovr: 76, pac: 75, sho: 76, pas: 65, dri: 72, def: 35, phy: 78 },
        { name: "R. Bentancur", pos: "MF", club: "Tottenham", ovr: 83, pac: 72, sho: 70, pas: 81, dri: 83, def: 78, phy: 80 }
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
        { name: "Ibrahim Mbaye", pos: "FW", club: "PSG", ovr: 74, pac: 82, sho: 70, pas: 66, dri: 76, def: 28, phy: 65 },
        { name: "F. Mendy", pos: "DF", club: "Lorient", ovr: 76, pac: 78, sho: 40, pas: 60, dri: 62, def: 75, phy: 78 },
        { name: "N. Mendy", pos: "MF", club: "Lens", ovr: 77, pac: 68, sho: 58, pas: 75, dri: 72, def: 76, phy: 74 },
        { name: "B. Dia", pos: "FW", club: "Lazio", ovr: 80, pac: 84, sho: 81, pas: 70, dri: 79, def: 38, phy: 76 },
        { name: "H. Diallo", pos: "FW", club: "Damac", ovr: 78, pac: 80, sho: 79, pas: 66, dri: 75, def: 35, phy: 78 }
      ]
    },
    USA: {
      formation: "4-2-3-1",
      players: [
        { name: "Matt Freese", pos: "GK", no: 1, club: "Local", ovr: 78, pac: 75, sho: 35, pas: 65, dri: 70, def: 78, phy: 75, x: 50, y: 12 },
        { name: "Alex Freeman", pos: "DF", no: 2, club: "Local", ovr: 76, pac: 80, sho: 50, pas: 68, dri: 72, def: 74, phy: 75, x: 85, y: 35 },
        { name: "Chris Richards", pos: "DF", no: 3, club: "Crystal Palace", ovr: 78, pac: 74, sho: 40, pas: 65, dri: 68, def: 79, phy: 80, x: 65, y: 28 },
        { name: "Tim Ream", pos: "DF", no: 4, club: "Fulham", ovr: 77, pac: 60, sho: 38, pas: 68, dri: 65, def: 80, phy: 78, x: 35, y: 28 },
        { name: "A. Robinson", pos: "DF", no: 5, club: "Fulham", ovr: 81, pac: 88, sho: 55, pas: 75, dri: 79, def: 78, phy: 82, x: 15, y: 35 },
        { name: "Malik Tillman", pos: "MF", no: 6, club: "PSV", ovr: 79, pac: 78, sho: 74, pas: 77, dri: 80, def: 60, phy: 72, x: 30, y: 55 },
        { name: "Tyler Adams", pos: "MF", no: 8, club: "Bournemouth", ovr: 79, pac: 75, sho: 60, pas: 75, dri: 76, def: 81, phy: 80, x: 70, y: 55 },
        { name: "Sergiño Dest", pos: "MF", no: 10, club: "PSV", ovr: 80, pac: 85, sho: 68, pas: 76, dri: 83, def: 74, phy: 70, x: 80, y: 80 },
        { name: "W. McKennie", pos: "MF", no: 11, club: "Juventus", ovr: 81, pac: 77, sho: 73, pas: 78, dri: 80, def: 79, phy: 84, x: 20, y: 80 },
        { name: "Ricardo Pepi", pos: "FW", no: 9, club: "PSV", ovr: 77, pac: 79, sho: 78, pas: 65, dri: 75, def: 35, phy: 76, x: 50, y: 70 },
        { name: "F. Balogun", pos: "FW", no: 7, club: "Monaco", ovr: 80, pac: 86, sho: 80, pas: 70, dri: 81, def: 30, phy: 75, x: 50, y: 85 }
      ],
      bench: [
        { name: "Matt Turner", pos: "GK", club: "Local", ovr: 79, pac: 75, sho: 30, pas: 65, dri: 70, def: 80, phy: 75 },
        { name: "Chris Brady", pos: "GK", club: "Local", ovr: 75, pac: 70, sho: 30, pas: 60, dri: 65, def: 76, phy: 70 },
        { name: "Auston Trusty", pos: "DF", club: "Local", ovr: 76, pac: 72, sho: 40, pas: 65, dri: 68, def: 77, phy: 80 },
        { name: "Miles Robinson", pos: "DF", club: "Local", ovr: 77, pac: 75, sho: 40, pas: 62, dri: 65, def: 78, phy: 80 },
        { name: "Max Arfsten", pos: "DF", club: "Local", ovr: 74, pac: 78, sho: 45, pas: 65, dri: 70, def: 72, phy: 70 },
        { name: "Mark McKenzie", pos: "DF", club: "Local", ovr: 76, pac: 76, sho: 40, pas: 65, dri: 68, def: 76, phy: 78 },
        { name: "Joe Scally", pos: "DF", club: "Local", ovr: 76, pac: 80, sho: 50, pas: 68, dri: 72, def: 75, phy: 76 },
        { name: "Giovanni Reyna", pos: "MF", club: "Local", ovr: 78, pac: 78, sho: 75, pas: 80, dri: 82, def: 45, phy: 65 },
        { name: "S. Berhalter", pos: "MF", club: "Local", ovr: 74, pac: 72, sho: 65, pas: 72, dri: 74, def: 68, phy: 70 },
        { name: "Cristian Roldan", pos: "MF", club: "Local", ovr: 75, pac: 74, sho: 68, pas: 74, dri: 75, def: 70, phy: 72 },
        { name: "Yunus Musah", pos: "MF", club: "AC Milan", ovr: 78, pac: 80, sho: 65, pas: 75, dri: 78, def: 70, phy: 75 },
        { name: "B. Aaronson", pos: "FW", club: "Local", ovr: 77, pac: 82, sho: 70, pas: 75, dri: 80, def: 55, phy: 65 },
        { name: "Haji Wright", pos: "FW", club: "Local", ovr: 78, pac: 84, sho: 78, pas: 68, dri: 76, def: 40, phy: 82 },
        { name: "Timothy Weah", pos: "FW", club: "Local", ovr: 79, pac: 88, sho: 75, pas: 72, dri: 80, def: 50, phy: 75 },
        { name: "A. Zendejas", pos: "FW", club: "Local", ovr: 76, pac: 80, sho: 74, pas: 72, dri: 78, def: 45, phy: 70 }
      ]
    },
    AUS: {
      formation: "5-4-1",
      players: [
        { name: "Patrick Beach", pos: "GK", no: 1, club: "Local", ovr: 72, pac: 70, sho: 30, pas: 60, dri: 65, def: 73, phy: 70, x: 50, y: 12 },
        { name: "Jacob Italiano", pos: "DF", no: 2, club: "Local", ovr: 71, pac: 78, sho: 45, pas: 65, dri: 70, def: 68, phy: 68, x: 85, y: 35 },
        { name: "A. Circati", pos: "DF", no: 3, club: "Local", ovr: 74, pac: 72, sho: 35, pas: 60, dri: 65, def: 75, phy: 76, x: 68, y: 28 },
        { name: "Harry Souttar", pos: "DF", no: 4, club: "Local", ovr: 76, pac: 60, sho: 40, pas: 60, dri: 60, def: 78, phy: 88, x: 50, y: 28 },
        { name: "C. Burgess", pos: "DF", no: 5, club: "Local", ovr: 73, pac: 65, sho: 35, pas: 62, dri: 62, def: 75, phy: 82, x: 32, y: 28 },
        { name: "Jordan Bos", pos: "DF", no: 6, club: "Local", ovr: 74, pac: 82, sho: 55, pas: 68, dri: 74, def: 70, phy: 72, x: 15, y: 35 },
        { name: "Aiden O'Neill", pos: "MF", no: 8, club: "Local", ovr: 73, pac: 70, sho: 65, pas: 72, dri: 70, def: 70, phy: 74, x: 65, y: 55 },
        { name: "P. Okon-Engstler", pos: "MF", no: 10, club: "Local", ovr: 71, pac: 72, sho: 60, pas: 70, dri: 72, def: 65, phy: 68, x: 35, y: 55 },
        { name: "Mathew Leckie", pos: "FW", no: 7, club: "Local", ovr: 74, pac: 78, sho: 72, pas: 70, dri: 75, def: 55, phy: 72, x: 80, y: 80 },
        { name: "N. Velupillay", pos: "FW", no: 11, club: "Local", ovr: 70, pac: 80, sho: 68, pas: 65, dri: 72, def: 40, phy: 65, x: 20, y: 80 },
        { name: "Mohamed Touré", pos: "FW", no: 9, club: "Local", ovr: 71, pac: 82, sho: 70, pas: 60, dri: 70, def: 35, phy: 74, x: 50, y: 85 }
      ],
      bench: [
        { name: "Mathew Ryan", pos: "GK", club: "Local", ovr: 77, pac: 72, sho: 35, pas: 68, dri: 72, def: 78, phy: 74 },
        { name: "Paul Izzo", pos: "GK", club: "Local", ovr: 70, pac: 68, sho: 30, pas: 60, dri: 65, def: 72, phy: 70 },
        { name: "Miloš Degenek", pos: "DF", club: "Local", ovr: 74, pac: 68, sho: 40, pas: 65, dri: 65, def: 75, phy: 78 },
        { name: "Jason Geria", pos: "DF", club: "Local", ovr: 71, pac: 76, sho: 40, pas: 62, dri: 68, def: 70, phy: 72 },
        { name: "Kai Trewin", pos: "DF", club: "Local", ovr: 69, pac: 70, sho: 35, pas: 60, dri: 62, def: 70, phy: 70 },
        { name: "Aziz Behich", pos: "DF", club: "Local", ovr: 73, pac: 75, sho: 50, pas: 68, dri: 70, def: 72, phy: 74 },
        { name: "L. Herrington", pos: "DF", club: "Local", ovr: 68, pac: 72, sho: 40, pas: 58, dri: 60, def: 68, phy: 70 },
        { name: "Connor Metcalfe", pos: "MF", club: "Local", ovr: 73, pac: 74, sho: 68, pas: 72, dri: 74, def: 65, phy: 70 },
        { name: "Cammy Devlin", pos: "MF", club: "Local", ovr: 72, pac: 70, sho: 60, pas: 70, dri: 72, def: 72, phy: 74 },
        { name: "Jackson Irvine", pos: "MF", club: "Local", ovr: 75, pac: 72, sho: 70, pas: 74, dri: 74, def: 75, phy: 80 },
        { name: "Ajdin Hrustić", pos: "FW", club: "Local", ovr: 74, pac: 75, sho: 72, pas: 75, dri: 76, def: 55, phy: 68 },
        { name: "Awer Mabil", pos: "FW", club: "Local", ovr: 73, pac: 84, sho: 70, pas: 70, dri: 75, def: 40, phy: 65 },
        { name: "N. Irankunda", pos: "FW", club: "Local", ovr: 71, pac: 86, sho: 72, pas: 65, dri: 76, def: 35, phy: 68 },
        { name: "C. Volpato", pos: "FW", club: "Local", ovr: 72, pac: 78, sho: 68, pas: 72, dri: 75, def: 45, phy: 65 },
        { name: "Tete Yengi", pos: "FW", club: "Local", ovr: 69, pac: 76, sho: 68, pas: 60, dri: 68, def: 35, phy: 75 }
      ]
    },
    HAI: {
      formation: "4-3-3",
      players: [
        { name: "Johny Placide", pos: "GK", no: 1, club: "Local", ovr: 69, pac: 68, sho: 30, pas: 60, dri: 62, def: 69, phy: 70, x: 50, y: 12 },
        { name: "Carlens Arcus", pos: "DF", no: 2, club: "Local", ovr: 71, pac: 78, sho: 45, pas: 62, dri: 65, def: 68, phy: 72, x: 85, y: 35 },
        { name: "Ricardo Adé", pos: "DF", no: 4, club: "Local", ovr: 70, pac: 65, sho: 35, pas: 55, dri: 58, def: 72, phy: 78, x: 65, y: 28 },
        { name: "Hannes Delcroix", pos: "DF", no: 5, club: "Local", ovr: 72, pac: 68, sho: 40, pas: 60, dri: 62, def: 74, phy: 75, x: 35, y: 28 },
        { name: "Keeto Thermoncy", pos: "DF", no: 3, club: "Local", ovr: 68, pac: 75, sho: 40, pas: 60, dri: 65, def: 66, phy: 68, x: 15, y: 35 },
        { name: "J. Bellegarde", pos: "MF", no: 10, club: "Local", ovr: 74, pac: 78, sho: 68, pas: 74, dri: 76, def: 65, phy: 72, x: 50, y: 50 },
        { name: "Carl-Fred Sainté", pos: "MF", no: 6, club: "Local", ovr: 69, pac: 70, sho: 58, pas: 68, dri: 66, def: 68, phy: 74, x: 30, y: 55 },
        { name: "D. Jean Jacques", pos: "MF", no: 17, club: "Local", ovr: 71, pac: 72, sho: 65, pas: 70, dri: 72, def: 65, phy: 70, x: 70, y: 55 },
        { name: "D. Etienne Jr.", pos: "FW", no: 7, club: "Local", ovr: 72, pac: 84, sho: 68, pas: 70, dri: 75, def: 40, phy: 65, x: 80, y: 80 },
        { name: "Duckens Nazon", pos: "FW", no: 9, club: "Local", ovr: 73, pac: 78, sho: 75, pas: 65, dri: 72, def: 35, phy: 80, x: 50, y: 85 },
        { name: "L. Don Deedson", pos: "FW", no: 11, club: "Local", ovr: 70, pac: 80, sho: 68, pas: 65, dri: 72, def: 38, phy: 68, x: 20, y: 80 }
      ],
      bench: [
        { name: "Alexandre Pierre", pos: "GK", club: "Local", ovr: 66, pac: 65, sho: 25, pas: 55, dri: 58, def: 66, phy: 68 },
        { name: "Josué Duverger", pos: "GK", club: "Local", ovr: 65, pac: 62, sho: 22, pas: 52, dri: 55, def: 65, phy: 66 },
        { name: "M. Expérience", pos: "DF", club: "Local", ovr: 68, pac: 74, sho: 40, pas: 60, dri: 62, def: 65, phy: 68 },
        { name: "Duke Lacroix", pos: "DF", club: "Local", ovr: 67, pac: 72, sho: 42, pas: 58, dri: 60, def: 66, phy: 65 },
        { name: "J. Duverne", pos: "DF", club: "Local", ovr: 72, pac: 70, sho: 45, pas: 62, dri: 65, def: 74, phy: 76 },
        { name: "W. Paugain", pos: "DF", club: "Local", ovr: 66, pac: 68, sho: 38, pas: 55, dri: 58, def: 65, phy: 66 },
        { name: "Leverton Pierre", pos: "MF", club: "Local", ovr: 68, pac: 70, sho: 58, pas: 66, dri: 68, def: 65, phy: 70 },
        { name: "Dominique Simon", pos: "MF", club: "Local", ovr: 67, pac: 68, sho: 55, pas: 65, dri: 66, def: 62, phy: 65 },
        { name: "Woodensky Pierre", pos: "MF", club: "Local", ovr: 65, pac: 66, sho: 52, pas: 62, dri: 64, def: 60, phy: 64 },
        { name: "R. Providence", pos: "FW", club: "Local", ovr: 69, pac: 80, sho: 65, pas: 62, dri: 72, def: 35, phy: 60 },
        { name: "Lenny Joseph", pos: "FW", club: "Local", ovr: 68, pac: 78, sho: 66, pas: 60, dri: 70, def: 32, phy: 72 },
        { name: "Wilson Isidor", pos: "FW", club: "Local", ovr: 74, pac: 85, sho: 72, pas: 68, dri: 76, def: 40, phy: 72 },
        { name: "Yassin Fortuné", pos: "FW", club: "Local", ovr: 67, pac: 76, sho: 64, pas: 62, dri: 68, def: 35, phy: 65 },
        { name: "Frantzdy Pierrot", pos: "FW", club: "Local", ovr: 73, pac: 70, sho: 74, pas: 62, dri: 68, def: 40, phy: 85 },
        { name: "Josué Casimir", pos: "FW", club: "Local", ovr: 68, pac: 75, sho: 65, pas: 60, dri: 68, def: 38, phy: 66 }
      ]
    },
    NED: {
      formation: "4-3-3",
      players: [
        { name: "Bart Verbruggen", pos: "GK", no: 1, club: "Brighton", ovr: 80, pac: 80, sho: 40, pas: 75, dri: 78, def: 81, phy: 78, x: 50, y: 12 },
        { name: "L. Geertruida", pos: "DF", no: 2, club: "Feyenoord", ovr: 81, pac: 80, sho: 55, pas: 74, dri: 76, def: 80, phy: 82, x: 85, y: 35 },
        { name: "M. de Ligt", pos: "DF", no: 3, club: "Bayern Munique", ovr: 85, pac: 74, sho: 58, pas: 68, dri: 65, def: 85, phy: 85, x: 65, y: 28 },
        { name: "Virgil van Dijk", pos: "DF", no: 4, club: "Liverpool", ovr: 89, pac: 78, sho: 60, pas: 72, dri: 70, def: 90, phy: 88, x: 35, y: 28 },
        { name: "Nathan Aké", pos: "DF", no: 5, club: "Manchester City", ovr: 83, pac: 78, sho: 52, pas: 75, dri: 76, def: 84, phy: 80, x: 15, y: 35 },
        { name: "G. Wijnaldum", pos: "MF", no: 8, club: "Al-Ettifaq", ovr: 81, pac: 72, sho: 75, pas: 80, dri: 82, def: 75, phy: 78, x: 50, y: 50 },
        { name: "Tijjani Reijnders", pos: "MF", no: 14, club: "Milan", ovr: 82, pac: 80, sho: 74, pas: 82, dri: 84, def: 72, phy: 75, x: 30, y: 55 },
        { name: "Joey Veerman", pos: "MF", no: 16, club: "PSV", ovr: 80, pac: 72, sho: 75, pas: 85, dri: 80, def: 70, phy: 75, x: 70, y: 55 },
        { name: "Xavi Simons", pos: "FW", no: 7, club: "RB Leipzig", ovr: 84, pac: 85, sho: 80, pas: 83, dri: 86, def: 55, phy: 68, x: 80, y: 80 },
        { name: "Wout Weghorst", pos: "FW", no: 9, club: "Hoffenheim", ovr: 80, pac: 65, sho: 82, pas: 65, dri: 70, def: 45, phy: 85, x: 50, y: 85 },
        { name: "Memphis Depay", pos: "FW", no: 10, club: "Atlético Madrid", ovr: 83, pac: 80, sho: 84, pas: 80, dri: 84, def: 35, phy: 78, x: 20, y: 80 }
      ],
      bench: [
        { name: "Justin Bijlow", pos: "GK", club: "Feyenoord", ovr: 80, pac: 80, sho: 35, pas: 72, dri: 75, def: 80, phy: 75 },
        { name: "Mark Flekken", pos: "GK", club: "Brentford", ovr: 80, pac: 78, sho: 40, pas: 75, dri: 76, def: 81, phy: 75 },
        { name: "Stefan de Vrij", pos: "DF", club: "Inter de Milão", ovr: 83, pac: 65, sho: 45, pas: 65, dri: 65, def: 85, phy: 80 },
        { name: "J. Frimpong", pos: "DF", club: "Bayer Leverkusen", ovr: 84, pac: 94, sho: 75, pas: 80, dri: 85, def: 75, phy: 72 },
        { name: "Micky van de Ven", pos: "DF", club: "Tottenham", ovr: 82, pac: 88, sho: 45, pas: 70, dri: 72, def: 82, phy: 80 },
        { name: "Daley Blind", pos: "DF", club: "Girona", ovr: 80, pac: 60, sho: 65, pas: 82, dri: 75, def: 78, phy: 74 },
        { name: "Denzel Dumfries", pos: "DF", club: "Inter de Milão", ovr: 82, pac: 85, sho: 70, pas: 75, dri: 78, def: 78, phy: 84 },
        { name: "Ian Maatsen", pos: "DF", club: "Borussia Dortmund", ovr: 80, pac: 86, sho: 65, pas: 76, dri: 80, def: 75, phy: 70 },
        { name: "Teun Koopmeiners", pos: "MF", club: "Atalanta", ovr: 83, pac: 75, sho: 82, pas: 84, dri: 80, def: 76, phy: 82 },
        { name: "Jerdy Schouten", pos: "MF", club: "PSV", ovr: 80, pac: 70, sho: 68, pas: 80, dri: 78, def: 78, phy: 76 },
        { name: "R. Gravenberch", pos: "MF", club: "Liverpool", ovr: 81, pac: 76, sho: 74, pas: 80, dri: 83, def: 72, phy: 76 },
        { name: "Cody Gakpo", pos: "FW", club: "Liverpool", ovr: 84, pac: 86, sho: 84, pas: 80, dri: 84, def: 45, phy: 78 },
        { name: "Donyell Malen", pos: "FW", club: "Borussia Dortmund", ovr: 82, pac: 90, sho: 80, pas: 75, dri: 84, def: 35, phy: 72 },
        { name: "Brian Brobbey", pos: "FW", club: "Ajax", ovr: 80, pac: 84, sho: 78, pas: 68, dri: 76, def: 35, phy: 88 },
        { name: "Joshua Zirkzee", pos: "FW", club: "Bologna", ovr: 80, pac: 78, sho: 80, pas: 75, dri: 82, def: 40, phy: 80 }
      ]
    },
    UZB: {
      formation: "4-3-3",
      players: [
        { name: "U. Yusupov", pos: "GK", no: 1, club: "Local", ovr: 72, pac: 70, sho: 30, pas: 65, dri: 70, def: 72, phy: 70, x: 50, y: 12 },
        { name: "A. Khusanov", pos: "DF", no: 2, club: "Lens", ovr: 72, pac: 74, sho: 40, pas: 60, dri: 62, def: 73, phy: 75, x: 85, y: 35 },
        { name: "K. Alijonov", pos: "DF", no: 3, club: "Pakhtakor", ovr: 70, pac: 76, sho: 50, pas: 65, dri: 68, def: 68, phy: 72, x: 65, y: 28 },
        { name: "F. Sayfiev", pos: "DF", no: 4, club: "Pakhtakor", ovr: 71, pac: 75, sho: 55, pas: 68, dri: 70, def: 70, phy: 74, x: 35, y: 28 },
        { name: "R. Ashurmatov", pos: "DF", no: 5, club: "Rubin Kazan", ovr: 71, pac: 70, sho: 45, pas: 62, dri: 60, def: 72, phy: 76, x: 15, y: 35 },
        { name: "A. Mozgovoy", pos: "MF", no: 6, club: "Nasaf", ovr: 70, pac: 68, sho: 60, pas: 70, dri: 68, def: 68, phy: 72, x: 50, y: 50 },
        { name: "O. Shukurov", pos: "MF", no: 7, club: "Kayserispor", ovr: 73, pac: 72, sho: 65, pas: 72, dri: 74, def: 70, phy: 75, x: 30, y: 55 },
        { name: "J. Iskanderov", pos: "MF", no: 8, club: "Navbahor", ovr: 71, pac: 74, sho: 68, pas: 74, dri: 75, def: 55, phy: 65, x: 70, y: 55 },
        { name: "J. Masharipov", pos: "FW", no: 10, club: "Esteghlal", ovr: 74, pac: 80, sho: 72, pas: 75, dri: 78, def: 45, phy: 68, x: 80, y: 80 },
        { name: "E. Shomurodov", pos: "FW", no: 14, club: "Cagliari", ovr: 75, pac: 78, sho: 76, pas: 68, dri: 74, def: 40, phy: 78, x: 50, y: 85 },
        { name: "Oston Urunov", pos: "FW", no: 11, club: "Persepolis", ovr: 72, pac: 82, sho: 70, pas: 68, dri: 76, def: 42, phy: 70, x: 20, y: 80 }
      ],
      bench: [
        { name: "A. Nematov", pos: "GK", club: "Nasaf", ovr: 68, pac: 65, sho: 25, pas: 60, dri: 65, def: 68, phy: 66 },
        { name: "B. Ergashev", pos: "GK", club: "Neftchi", ovr: 66, pac: 60, sho: 22, pas: 55, dri: 60, def: 66, phy: 65 },
        { name: "S. Nasrullaev", pos: "DF", club: "Nasaf", ovr: 69, pac: 74, sho: 48, pas: 65, dri: 68, def: 68, phy: 70 },
        { name: "U. Eshmurodov", pos: "DF", club: "Nasaf", ovr: 70, pac: 68, sho: 45, pas: 60, dri: 62, def: 72, phy: 75 },
        { name: "B. Karimov", pos: "DF", club: "Local", ovr: 65, pac: 70, sho: 40, pas: 58, dri: 60, def: 66, phy: 68 },
        { name: "A. Ulmasaliev", pos: "DF", club: "Local", ovr: 66, pac: 68, sho: 42, pas: 60, dri: 62, def: 68, phy: 70 },
        { name: "J. Urozov", pos: "DF", club: "Local", ovr: 65, pac: 72, sho: 38, pas: 55, dri: 60, def: 65, phy: 68 },
        { name: "O. Hamrobekov", pos: "MF", club: "Navbahor", ovr: 71, pac: 68, sho: 60, pas: 72, dri: 70, def: 70, phy: 74 },
        { name: "D. Khamdamov", pos: "MF", club: "Pakhtakor", ovr: 70, pac: 75, sho: 68, pas: 68, dri: 72, def: 50, phy: 65 },
        { name: "A. Abdullaev", pos: "MF", club: "Khor Fakkan", ovr: 70, pac: 72, sho: 62, pas: 68, dri: 70, def: 68, phy: 72 },
        { name: "Azizjon Ganiev", pos: "MF", club: "Shabab Al-Ahli", ovr: 72, pac: 74, sho: 68, pas: 74, dri: 75, def: 65, phy: 70 },
        { name: "A. Fayzullaev", pos: "MF", club: "CSKA Moscow", ovr: 74, pac: 78, sho: 70, pas: 75, dri: 78, def: 45, phy: 62 },
        { name: "S. Esanov", pos: "MF", club: "Local", ovr: 65, pac: 70, sho: 55, pas: 62, dri: 65, def: 58, phy: 60 },
        { name: "A. Amonov", pos: "FW", club: "Khor Fakkan", ovr: 69, pac: 78, sho: 68, pas: 65, dri: 72, def: 35, phy: 68 },
        { name: "Igor Sergeev", pos: "FW", club: "BG Pathum", ovr: 72, pac: 74, sho: 74, pas: 65, dri: 70, def: 40, phy: 76 }
      ]
    },
    IRN: {
      formation: "4-3-3",
      players: [
        { name: "A. Beiranvand", pos: "GK", no: 1, club: "Persepolis", ovr: 75, pac: 72, sho: 30, pas: 68, dri: 72, def: 75, phy: 74, x: 50, y: 12 },
        { name: "S. Moharrami", pos: "DF", no: 2, club: "Dinamo Zagreb", ovr: 74, pac: 78, sho: 50, pas: 70, dri: 72, def: 73, phy: 72, x: 85, y: 35 },
        { name: "S. Khalilzadeh", pos: "DF", no: 4, club: "Tractor", ovr: 75, pac: 70, sho: 45, pas: 65, dri: 65, def: 76, phy: 78, x: 65, y: 28 },
        { name: "H. Kanaanizadegan", pos: "DF", no: 13, club: "Persepolis", ovr: 75, pac: 68, sho: 42, pas: 66, dri: 64, def: 77, phy: 80, x: 35, y: 28 },
        { name: "Ehsan Hajsafi", pos: "DF", no: 3, club: "AEK Athens", ovr: 74, pac: 72, sho: 60, pas: 72, dri: 70, def: 73, phy: 74, x: 15, y: 35 },
        { name: "Saeid Ezatolahi", pos: "MF", no: 6, club: "Vejle", ovr: 73, pac: 68, sho: 65, pas: 72, dri: 70, def: 73, phy: 76, x: 50, y: 50 },
        { name: "Saman Ghoddos", pos: "MF", no: 14, club: "Brentford", ovr: 74, pac: 76, sho: 72, pas: 75, dri: 76, def: 60, phy: 70, x: 30, y: 55 },
        { name: "Vahid Amiri", pos: "MF", no: 11, club: "Persepolis", ovr: 73, pac: 75, sho: 68, pas: 72, dri: 74, def: 65, phy: 72, x: 70, y: 55 },
        { name: "A. Jahanbakhsh", pos: "FW", no: 7, club: "Feyenoord", ovr: 76, pac: 78, sho: 74, pas: 72, dri: 76, def: 55, phy: 70, x: 80, y: 80 },
        { name: "Mehdi Taremi", pos: "FW", no: 9, club: "Porto", ovr: 82, pac: 80, sho: 82, pas: 76, dri: 80, def: 45, phy: 80, x: 50, y: 85 },
        { name: "Sardar Azmoun", pos: "FW", no: 20, club: "Roma", ovr: 78, pac: 80, sho: 80, pas: 70, dri: 76, def: 40, phy: 75, x: 20, y: 80 }
      ],
      bench: [
        { name: "Payam Niazmand", pos: "GK", club: "Sepahan", ovr: 72, pac: 70, sho: 25, pas: 65, dri: 70, def: 72, phy: 70 },
        { name: "H. Hosseini", pos: "GK", club: "Esteghlal", ovr: 72, pac: 68, sho: 28, pas: 64, dri: 68, def: 73, phy: 72 },
        { name: "M. Mohammadi", pos: "DF", club: "AEK Athens", ovr: 73, pac: 78, sho: 55, pas: 68, dri: 70, def: 72, phy: 74 },
        { name: "M. Pouraliganji", pos: "DF", club: "Persepolis", ovr: 74, pac: 70, sho: 48, pas: 64, dri: 65, def: 76, phy: 76 },
        { name: "Rouzbeh Cheshmi", pos: "DF", club: "Esteghlal", ovr: 72, pac: 65, sho: 55, pas: 68, dri: 66, def: 74, phy: 78 },
        { name: "Majid Hosseini", pos: "DF", club: "Kayserispor", ovr: 73, pac: 72, sho: 45, pas: 62, dri: 64, def: 75, phy: 76 },
        { name: "Ramin Rezaeian", pos: "DF", club: "Sepahan", ovr: 74, pac: 78, sho: 68, pas: 74, dri: 75, def: 72, phy: 74 },
        { name: "Aria Yousefi", pos: "DF", club: "Sepahan", ovr: 68, pac: 75, sho: 50, pas: 62, dri: 68, def: 66, phy: 68 },
        { name: "Ali Karimi", pos: "MF", club: "Kayserispor", ovr: 72, pac: 68, sho: 65, pas: 72, dri: 70, def: 70, phy: 74 },
        { name: "Samir Mohammad", pos: "MF", club: "Local", ovr: 68, pac: 70, sho: 60, pas: 66, dri: 68, def: 64, phy: 68 },
        { name: "Milad Sarlak", pos: "MF", club: "Persepolis", ovr: 71, pac: 72, sho: 62, pas: 70, dri: 72, def: 70, phy: 72 },
        { name: "Karim Ansarifard", pos: "FW", club: "Aris", ovr: 74, pac: 72, sho: 76, pas: 68, dri: 72, def: 40, phy: 74 },
        { name: "Mehdi Torabi", pos: "FW", club: "Persepolis", ovr: 74, pac: 78, sho: 72, pas: 74, dri: 76, def: 45, phy: 68 },
        { name: "Ali Gholizadeh", pos: "FW", club: "Lech Poznań", ovr: 73, pac: 76, sho: 70, pas: 72, dri: 75, def: 42, phy: 66 },
        { name: "M. Mohammad", pos: "FW", club: "Rostov", ovr: 72, pac: 78, sho: 72, pas: 65, dri: 70, def: 38, phy: 74 }
      ]
    },
    IRQ: {
      formation: "4-3-3",
      players: [
        { name: "Fahad Talib", pos: "GK", no: 1, club: "Local", ovr: 68, pac: 65, sho: 25, pas: 60, dri: 62, def: 68, phy: 66, x: 50, y: 12 },
        { name: "Rebin Sulaka", pos: "DF", no: 2, club: "Local", ovr: 69, pac: 68, sho: 40, pas: 62, dri: 60, def: 70, phy: 72, x: 85, y: 35 },
        { name: "Zaid Tahseen", pos: "DF", no: 4, club: "Local", ovr: 68, pac: 65, sho: 38, pas: 58, dri: 55, def: 68, phy: 70, x: 65, y: 28 },
        { name: "Munaf Younis", pos: "DF", no: 6, club: "Local", ovr: 67, pac: 66, sho: 35, pas: 55, dri: 52, def: 67, phy: 71, x: 35, y: 28 },
        { name: "Hussein Ali", pos: "DF", no: 3, club: "Local", ovr: 70, pac: 72, sho: 50, pas: 65, dri: 68, def: 68, phy: 70, x: 15, y: 35 },
        { name: "Ibrahim Bayesh", pos: "MF", no: 8, club: "Local", ovr: 70, pac: 74, sho: 65, pas: 68, dri: 70, def: 60, phy: 68, x: 50, y: 50 },
        { name: "Amir Al-Ammari", pos: "MF", no: 16, club: "Local", ovr: 69, pac: 70, sho: 62, pas: 70, dri: 68, def: 65, phy: 66, x: 30, y: 55 },
        { name: "Zidane Iqbal", pos: "MF", no: 14, club: "Utrecht", ovr: 71, pac: 75, sho: 65, pas: 72, dri: 75, def: 55, phy: 60, x: 70, y: 55 },
        { name: "Youssef Amyn", pos: "FW", no: 7, club: "Eintracht Braunschweig", ovr: 68, pac: 78, sho: 65, pas: 64, dri: 72, def: 40, phy: 60, x: 80, y: 80 },
        { name: "Mohanad Ali", pos: "FW", no: 10, club: "Local", ovr: 71, pac: 76, sho: 72, pas: 60, dri: 70, def: 35, phy: 72, x: 50, y: 85 },
        { name: "Ali Al-Hamadi", pos: "FW", no: 9, club: "Ipswich Town", ovr: 72, pac: 80, sho: 70, pas: 65, dri: 72, def: 38, phy: 74, x: 20, y: 80 }
      ],
      bench: [
        { name: "Jalal Hassan", pos: "GK", club: "Local", ovr: 69, pac: 66, sho: 28, pas: 62, dri: 64, def: 69, phy: 68 },
        { name: "Ahmed Basil", pos: "GK", club: "Local", ovr: 66, pac: 64, sho: 25, pas: 58, dri: 60, def: 66, phy: 65 },
        { name: "Akam Hashim", pos: "DF", club: "Local", ovr: 65, pac: 66, sho: 35, pas: 55, dri: 58, def: 66, phy: 68 },
        { name: "Ahmed Maknazi", pos: "DF", club: "Local", ovr: 66, pac: 68, sho: 40, pas: 58, dri: 60, def: 65, phy: 66 },
        { name: "Mustafa Saadoon", pos: "DF", club: "Local", ovr: 67, pac: 70, sho: 45, pas: 60, dri: 62, def: 67, phy: 68 },
        { name: "Frans Putros", pos: "DF", club: "Local", ovr: 68, pac: 68, sho: 42, pas: 62, dri: 64, def: 68, phy: 70 },
        { name: "Kevin Yakob", pos: "MF", club: "Local", ovr: 68, pac: 72, sho: 65, pas: 68, dri: 70, def: 55, phy: 66 },
        { name: "Aimar Sher", pos: "MF", club: "Local", ovr: 67, pac: 70, sho: 60, pas: 68, dri: 72, def: 58, phy: 64 },
        { name: "Marko Farji", pos: "MF", club: "Local", ovr: 65, pac: 68, sho: 58, pas: 65, dri: 66, def: 55, phy: 62 },
        { name: "Merchas Doski", pos: "MF", club: "Local", ovr: 68, pac: 74, sho: 55, pas: 66, dri: 68, def: 64, phy: 70 },
        { name: "Zaid Ismael", pos: "MF", club: "Local", ovr: 66, pac: 68, sho: 58, pas: 64, dri: 65, def: 60, phy: 65 },
        { name: "Ahmed Qasem", pos: "FW", club: "Local", ovr: 67, pac: 74, sho: 65, pas: 62, dri: 68, def: 40, phy: 64 },
        { name: "Ali Yousif", pos: "FW", club: "Local", ovr: 68, pac: 75, sho: 68, pas: 64, dri: 70, def: 38, phy: 66 },
        { name: "Ali Jasim", pos: "FW", club: "Local", ovr: 69, pac: 78, sho: 66, pas: 65, dri: 72, def: 42, phy: 65 },
        { name: "Aymen Hussein", pos: "FW", club: "Local", ovr: 72, pac: 70, sho: 75, pas: 65, dri: 68, def: 45, phy: 80 }
      ]
    },
    NZL: {
      formation: "4-3-3",
      players: [
        { name: "Oliver Sail", pos: "GK", no: 1, club: "Local", ovr: 68, pac: 66, sho: 25, pas: 60, dri: 62, def: 68, phy: 66, x: 50, y: 12 },
        { name: "Michael Boxall", pos: "DF", no: 2, club: "Local", ovr: 69, pac: 68, sho: 40, pas: 62, dri: 60, def: 70, phy: 72, x: 85, y: 35 },
        { name: "Nando Pijnaker", pos: "DF", no: 4, club: "Local", ovr: 68, pac: 65, sho: 38, pas: 58, dri: 55, def: 68, phy: 70, x: 65, y: 28 },
        { name: "Tommy Smith", pos: "DF", no: 5, club: "Local", ovr: 67, pac: 66, sho: 35, pas: 55, dri: 52, def: 67, phy: 71, x: 35, y: 28 },
        { name: "Liberato Cacace", pos: "DF", no: 3, club: "Local", ovr: 70, pac: 72, sho: 50, pas: 65, dri: 68, def: 68, phy: 70, x: 15, y: 35 },
        { name: "Joe Bell", pos: "MF", no: 6, club: "Local", ovr: 70, pac: 74, sho: 65, pas: 68, dri: 70, def: 60, phy: 68, x: 50, y: 50 },
        { name: "Matthew Garbett", pos: "MF", no: 7, club: "Local", ovr: 69, pac: 70, sho: 62, pas: 70, dri: 68, def: 65, phy: 66, x: 30, y: 55 },
        { name: "Marko Stamenić", pos: "MF", no: 8, club: "Local", ovr: 71, pac: 75, sho: 65, pas: 72, dri: 75, def: 55, phy: 60, x: 70, y: 55 },
        { name: "Elijah Just", pos: "FW", no: 11, club: "Local", ovr: 68, pac: 78, sho: 65, pas: 64, dri: 72, def: 40, phy: 60, x: 80, y: 80 },
        { name: "Chris Wood", pos: "FW", no: 9, club: "Nott. Forest", ovr: 76, pac: 76, sho: 78, pas: 60, dri: 70, def: 35, phy: 80, x: 50, y: 85 },
        { name: "K. Barbarouses", pos: "FW", no: 10, club: "Local", ovr: 72, pac: 80, sho: 70, pas: 65, dri: 72, def: 38, phy: 74, x: 20, y: 80 }
      ],
      bench: [
        { name: "Alex Paulsen", pos: "GK", club: "Local", ovr: 69, pac: 66, sho: 28, pas: 62, dri: 64, def: 69, phy: 68 },
        { name: "Max Crocombe", pos: "GK", club: "Local", ovr: 66, pac: 64, sho: 25, pas: 58, dri: 60, def: 66, phy: 65 },
        { name: "Dalton Wilkins", pos: "DF", club: "Local", ovr: 65, pac: 66, sho: 35, pas: 55, dri: 58, def: 66, phy: 68 },
        { name: "Finn Surman", pos: "DF", club: "Local", ovr: 66, pac: 68, sho: 40, pas: 58, dri: 60, def: 65, phy: 66 },
        { name: "Tyler Bindon", pos: "DF", club: "Local", ovr: 67, pac: 70, sho: 45, pas: 60, dri: 62, def: 67, phy: 68 },
        { name: "Storm Roux", pos: "DF", club: "Local", ovr: 68, pac: 68, sho: 42, pas: 62, dri: 64, def: 68, phy: 70 },
        { name: "Tim Payne", pos: "DF", club: "Local", ovr: 68, pac: 72, sho: 65, pas: 68, dri: 70, def: 55, phy: 66 },
        { name: "Alex Rufer", pos: "MF", club: "Local", ovr: 67, pac: 70, sho: 60, pas: 68, dri: 72, def: 58, phy: 64 },
        { name: "C. Howieson", pos: "MF", club: "Local", ovr: 65, pac: 68, sho: 58, pas: 65, dri: 66, def: 55, phy: 62 },
        { name: "Clayton Lewis", pos: "MF", club: "Local", ovr: 68, pac: 74, sho: 55, pas: 66, dri: 68, def: 64, phy: 70 },
        { name: "Sarpreet Singh", pos: "MF", club: "Local", ovr: 66, pac: 68, sho: 58, pas: 64, dri: 65, def: 60, phy: 65 },
        { name: "Ben Waine", pos: "FW", club: "Local", ovr: 67, pac: 74, sho: 65, pas: 62, dri: 68, def: 40, phy: 64 },
        { name: "Max Mata", pos: "FW", club: "Local", ovr: 68, pac: 75, sho: 68, pas: 64, dri: 70, def: 38, phy: 66 },
        { name: "Ben Old", pos: "FW", club: "Local", ovr: 69, pac: 78, sho: 66, pas: 65, dri: 72, def: 42, phy: 65 },
        { name: "Callum McCowatt", pos: "FW", club: "Local", ovr: 72, pac: 70, sho: 75, pas: 65, dri: 68, def: 45, phy: 80 }
      ]
    },
    BIH: {
      formation: "4-3-3",
      players: [
        { name: "Nikola Vasilj", pos: "GK", no: 1, club: "St. Pauli", ovr: 74, pac: 72, sho: 30, pas: 68, dri: 70, def: 74, phy: 72, x: 50, y: 12 },
        { name: "Amar Dedić", pos: "DF", no: 7, club: "Salzburg", ovr: 76, pac: 80, sho: 60, pas: 72, dri: 74, def: 74, phy: 72, x: 85, y: 35 },
        { name: "Nihad Mujakić", pos: "DF", no: 2, club: "Partizan", ovr: 72, pac: 70, sho: 45, pas: 65, dri: 62, def: 74, phy: 75, x: 65, y: 28 },
        { name: "D. Hadžikadunić", pos: "DF", no: 3, club: "Hamburger SV", ovr: 74, pac: 68, sho: 42, pas: 64, dri: 60, def: 75, phy: 78, x: 35, y: 28 },
        { name: "Sead Kolašinac", pos: "DF", no: 5, club: "Atalanta", ovr: 78, pac: 76, sho: 60, pas: 72, dri: 70, def: 78, phy: 84, x: 15, y: 35 },
        { name: "Armin Gigović", pos: "MF", no: 8, club: "Kiel", ovr: 72, pac: 70, sho: 65, pas: 72, dri: 70, def: 68, phy: 74, x: 50, y: 50 },
        { name: "B. Tahirović", pos: "MF", no: 6, club: "Ajax", ovr: 74, pac: 68, sho: 60, pas: 75, dri: 72, def: 70, phy: 72, x: 30, y: 55 },
        { name: "Ivan Bašić", pos: "MF", no: 13, club: "Orenburg", ovr: 72, pac: 72, sho: 68, pas: 74, dri: 75, def: 60, phy: 65, x: 70, y: 55 },
        { name: "E. Bajraktarević", pos: "FW", no: 20, club: "New England", ovr: 70, pac: 80, sho: 68, pas: 70, dri: 76, def: 45, phy: 60, x: 80, y: 80 },
        { name: "Edin Džeko", pos: "FW", no: 11, club: "Fenerbahçe", ovr: 81, pac: 60, sho: 84, pas: 72, dri: 76, def: 45, phy: 80, x: 50, y: 85 },
        { name: "E. Demirović", pos: "FW", no: 10, club: "Stuttgart", ovr: 80, pac: 78, sho: 82, pas: 75, dri: 78, def: 45, phy: 82, x: 20, y: 80 }
      ],
      bench: [
        { name: "Mladen Jurkas", pos: "GK", club: "Local", ovr: 68, pac: 65, sho: 25, pas: 60, dri: 62, def: 68, phy: 66 },
        { name: "M. Zlomislić", pos: "GK", club: "Rijeka", ovr: 69, pac: 66, sho: 28, pas: 62, dri: 64, def: 69, phy: 68 },
        { name: "T. Muharemović", pos: "DF", club: "Juventus", ovr: 70, pac: 68, sho: 40, pas: 62, dri: 60, def: 72, phy: 74 },
        { name: "Nikola Katić", pos: "DF", club: "Zurich", ovr: 72, pac: 65, sho: 55, pas: 65, dri: 62, def: 74, phy: 80 },
        { name: "S. Radeljić", pos: "DF", club: "Rijeka", ovr: 70, pac: 66, sho: 45, pas: 60, dri: 58, def: 72, phy: 78 },
        { name: "Arjan Malić", pos: "DF", club: "Sturm Graz", ovr: 68, pac: 72, sho: 42, pas: 64, dri: 66, def: 68, phy: 70 },
        { name: "Ivan Šunjić", pos: "MF", club: "Pafos", ovr: 72, pac: 70, sho: 60, pas: 68, dri: 70, def: 72, phy: 76 },
        { name: "Amar Memić", pos: "MF", club: "Bravo", ovr: 68, pac: 74, sho: 60, pas: 66, dri: 70, def: 55, phy: 62 },
        { name: "A. Hadžiahmetović", pos: "MF", club: "Beşiktaş", ovr: 75, pac: 70, sho: 68, pas: 76, dri: 75, def: 70, phy: 72 },
        { name: "Dženis Burnić", pos: "MF", club: "Karlsruher SC", ovr: 71, pac: 72, sho: 65, pas: 70, dri: 72, def: 68, phy: 70 },
        { name: "Ermin Mahmić", pos: "MF", club: "Local", ovr: 66, pac: 68, sho: 55, pas: 64, dri: 65, def: 60, phy: 66 },
        { name: "Samed Baždar", pos: "FW", club: "Zaragoza", ovr: 72, pac: 78, sho: 72, pas: 68, dri: 74, def: 40, phy: 68 },
        { name: "K. Alajbegović", pos: "FW", club: "Bayer Leverkusen", ovr: 68, pac: 80, sho: 66, pas: 64, dri: 72, def: 35, phy: 60 },
        { name: "Haris Tabaković", pos: "FW", club: "Hoffenheim", ovr: 74, pac: 65, sho: 76, pas: 64, dri: 68, def: 40, phy: 80 },
        { name: "Jovo Lukić", pos: "FW", club: "U Craiova", ovr: 68, pac: 70, sho: 68, pas: 60, dri: 65, def: 35, phy: 75 }
      ]
    },
    SCO: {
      formation: "4-3-3",
      players: [
        { name: "Angus Gunn", pos: "GK", no: 1, club: "Norwich City", ovr: 74, pac: 70, sho: 30, pas: 68, dri: 72, def: 74, phy: 72, x: 50, y: 12 },
        { name: "Aaron Hickey", pos: "DF", no: 2, club: "Brentford", ovr: 76, pac: 80, sho: 55, pas: 72, dri: 74, def: 73, phy: 72, x: 85, y: 35 },
        { name: "Grant Hanley", pos: "DF", no: 5, club: "Norwich City", ovr: 73, pac: 60, sho: 40, pas: 60, dri: 55, def: 74, phy: 80, x: 65, y: 28 },
        { name: "Kieran Tierney", pos: "DF", no: 6, club: "Real Sociedad", ovr: 78, pac: 84, sho: 60, pas: 74, dri: 76, def: 76, phy: 78, x: 35, y: 28 },
        { name: "Andy Robertson", pos: "DF", no: 3, club: "Liverpool", ovr: 86, pac: 82, sho: 60, pas: 82, dri: 80, def: 81, phy: 78, x: 15, y: 35 },
        { name: "S. McTominay", pos: "MF", no: 4, club: "Napoli", ovr: 80, pac: 72, sho: 78, pas: 75, dri: 74, def: 76, phy: 84, x: 50, y: 50 },
        { name: "John McGinn", pos: "MF", no: 7, club: "Aston Villa", ovr: 82, pac: 75, sho: 76, pas: 80, dri: 82, def: 75, phy: 84, x: 30, y: 55 },
        { name: "Tyler Fletcher", pos: "MF", no: 8, club: "Local", ovr: 68, pac: 70, sho: 62, pas: 68, dri: 70, def: 60, phy: 66, x: 70, y: 55 },
        { name: "Ryan Christie", pos: "FW", no: 11, club: "Bournemouth", ovr: 76, pac: 76, sho: 74, pas: 75, dri: 78, def: 55, phy: 70, x: 80, y: 80 },
        { name: "Che Adams", pos: "FW", no: 10, club: "Torino", ovr: 75, pac: 80, sho: 74, pas: 68, dri: 75, def: 40, phy: 74, x: 50, y: 85 },
        { name: "Lyndon Dykes", pos: "FW", no: 9, club: "QPR", ovr: 73, pac: 68, sho: 72, pas: 65, dri: 68, def: 45, phy: 82, x: 20, y: 80 }
      ],
      bench: [
        { name: "Liam Kelly", pos: "GK", club: "Motherwell", ovr: 68, pac: 66, sho: 25, pas: 62, dri: 64, def: 68, phy: 66 },
        { name: "Craig Gordon", pos: "GK", club: "Hearts", ovr: 72, pac: 60, sho: 30, pas: 65, dri: 65, def: 74, phy: 70 },
        { name: "Jack Hendry", pos: "DF", club: "Al-Ettifaq", ovr: 73, pac: 70, sho: 45, pas: 62, dri: 60, def: 74, phy: 76 },
        { name: "John Souttar", pos: "DF", club: "Rangers", ovr: 72, pac: 65, sho: 40, pas: 64, dri: 60, def: 72, phy: 75 },
        { name: "Dom Hyam", pos: "DF", club: "Blackburn", ovr: 70, pac: 62, sho: 35, pas: 58, dri: 55, def: 70, phy: 74 },
        { name: "N. Patterson", pos: "DF", club: "Everton", ovr: 74, pac: 82, sho: 55, pas: 70, dri: 72, def: 70, phy: 70 },
        { name: "A. Ralston", pos: "DF", club: "Celtic", ovr: 72, pac: 78, sho: 50, pas: 68, dri: 70, def: 68, phy: 74 },
        { name: "Scott McKenna", pos: "DF", club: "FC Copenhagen", ovr: 73, pac: 60, sho: 40, pas: 60, dri: 55, def: 74, phy: 82 },
        { name: "Lewis Ferguson", pos: "MF", club: "Bologna", ovr: 77, pac: 74, sho: 76, pas: 75, dri: 76, def: 70, phy: 75 },
        { name: "Kenny McLean", pos: "MF", club: "Norwich City", ovr: 72, pac: 68, sho: 65, pas: 72, dri: 70, def: 68, phy: 72 },
        { name: "Ross Stewart", pos: "FW", club: "Southampton", ovr: 71, pac: 74, sho: 72, pas: 60, dri: 68, def: 40, phy: 76 },
        { name: "B. Gannon-Doak", pos: "FW", club: "Liverpool", ovr: 68, pac: 84, sho: 64, pas: 65, dri: 74, def: 35, phy: 60 },
        { name: "George Hirst", pos: "FW", club: "Ipswich Town", ovr: 70, pac: 72, sho: 70, pas: 62, dri: 68, def: 35, phy: 74 },
        { name: "L. Shankland", pos: "FW", club: "Hearts", ovr: 72, pac: 68, sho: 75, pas: 65, dri: 70, def: 40, phy: 75 },
        { name: "Findlay Curtis", pos: "FW", club: "Local", ovr: 65, pac: 70, sho: 62, pas: 60, dri: 65, def: 35, phy: 60 }
      ]
    },
    URU: {
      formation: "4-3-3",
      players: [
        { name: "Sergio Rochet", pos: "GK", no: 1, club: "Internacional", ovr: 80, pac: 72, sho: 30, pas: 68, dri: 72, def: 82, phy: 78, x: 50, y: 12 },
        { name: "Nahitan Nández", pos: "DF", no: 8, club: "Cagliari", ovr: 78, pac: 80, sho: 65, pas: 75, dri: 76, def: 74, phy: 80, x: 85, y: 35 },
        { name: "J. M. Giménez", pos: "DF", no: 2, club: "Atlético Madrid", ovr: 83, pac: 68, sho: 45, pas: 60, dri: 55, def: 85, phy: 84, x: 65, y: 28 },
        { name: "Ronald Araújo", pos: "DF", no: 4, club: "Barcelona", ovr: 86, pac: 80, sho: 50, pas: 65, dri: 65, def: 86, phy: 88, x: 35, y: 28 },
        { name: "M. Olivera", pos: "DF", no: 15, club: "Napoli", ovr: 80, pac: 82, sho: 60, pas: 74, dri: 76, def: 78, phy: 80, x: 15, y: 35 },
        { name: "Manuel Ugarte", pos: "MF", no: 5, club: "PSG", ovr: 82, pac: 74, sho: 65, pas: 78, dri: 76, def: 82, phy: 85, x: 50, y: 50 },
        { name: "F. Valverde", pos: "MF", no: 16, club: "Real Madrid", ovr: 89, pac: 86, sho: 84, pas: 86, dri: 84, def: 80, phy: 82, x: 30, y: 55 },
        { name: "N. de la Cruz", pos: "MF", no: 7, club: "Flamengo", ovr: 81, pac: 82, sho: 78, pas: 82, dri: 84, def: 65, phy: 70, x: 70, y: 55 },
        { name: "F. Pellistri", pos: "FW", no: 20, club: "Granada", ovr: 76, pac: 86, sho: 68, pas: 72, dri: 80, def: 45, phy: 60, x: 80, y: 80 },
        { name: "Darwin Núñez", pos: "FW", no: 11, club: "Liverpool", ovr: 82, pac: 90, sho: 82, pas: 72, dri: 78, def: 45, phy: 86, x: 50, y: 85 },
        { name: "M. Araújo", pos: "FW", no: 21, club: "Toluca", ovr: 76, pac: 84, sho: 72, pas: 70, dri: 76, def: 40, phy: 70, x: 20, y: 80 }
      ],
      bench: [
        { name: "Franco Israel", pos: "GK", club: "Sporting CP", ovr: 74, pac: 68, sho: 28, pas: 65, dri: 68, def: 75, phy: 72 },
        { name: "Santiago Mele", pos: "GK", club: "Junior", ovr: 72, pac: 65, sho: 25, pas: 60, dri: 65, def: 74, phy: 70 },
        { name: "S. Cáceres", pos: "DF", club: "América", ovr: 76, pac: 72, sho: 40, pas: 65, dri: 62, def: 78, phy: 76 },
        { name: "G. Varela", pos: "DF", club: "Flamengo", ovr: 75, pac: 78, sho: 55, pas: 70, dri: 72, def: 74, phy: 72 },
        { name: "A. Sant'Anna", pos: "DF", club: "Defensa y Justicia", ovr: 73, pac: 76, sho: 50, pas: 68, dri: 70, def: 72, phy: 70 },
        { name: "Matías Viña", pos: "DF", club: "Flamengo", ovr: 76, pac: 78, sho: 55, pas: 72, dri: 74, def: 75, phy: 76 },
        { name: "Santiago Bueno", pos: "DF", club: "Wolverhampton", ovr: 75, pac: 65, sho: 40, pas: 62, dri: 60, def: 76, phy: 78 },
        { name: "N. Marichal", pos: "DF", club: "Dinamo Moscow", ovr: 72, pac: 66, sho: 40, pas: 60, dri: 58, def: 74, phy: 76 },
        { name: "R. Bentancur", pos: "MF", club: "Tottenham", ovr: 82, pac: 68, sho: 70, pas: 82, dri: 84, def: 76, phy: 76 },
        { name: "G. Arrascaeta", pos: "MF", club: "Flamengo", ovr: 82, pac: 76, sho: 80, pas: 84, dri: 85, def: 55, phy: 70 },
        { name: "E. Martínez", pos: "MF", club: "Midtjylland", ovr: 74, pac: 70, sho: 65, pas: 72, dri: 72, def: 70, phy: 74 },
        { name: "Luis Suárez", pos: "FW", club: "Inter Miami", ovr: 83, pac: 65, sho: 86, pas: 80, dri: 82, def: 45, phy: 80 },
        { name: "B. Rodríguez", pos: "FW", club: "América", ovr: 76, pac: 85, sho: 72, pas: 74, dri: 78, def: 40, phy: 65 },
        { name: "L. Rodríguez", pos: "FW", club: "Liverpool (URU)", ovr: 74, pac: 82, sho: 74, pas: 68, dri: 76, def: 40, phy: 72 },
        { name: "C. Olivera", pos: "FW", club: "LAFC", ovr: 72, pac: 84, sho: 70, pas: 66, dri: 74, def: 35, phy: 68 }
      ]
    },
    JPN: {
      formation: "4-3-3",
      players: [
        { name: "Daiya Maekawa", pos: "GK", no: 1, club: "Vissel Kobe", ovr: 72, pac: 68, sho: 30, pas: 65, dri: 68, def: 74, phy: 70, x: 50, y: 12 },
        { name: "Y. Sugawara", pos: "DF", no: 2, club: "AZ", ovr: 76, pac: 82, sho: 60, pas: 74, dri: 75, def: 72, phy: 70, x: 85, y: 35 },
        { name: "S. Taniguchi", pos: "DF", no: 3, club: "Al-Rayyan", ovr: 74, pac: 65, sho: 40, pas: 65, dri: 60, def: 75, phy: 76, x: 65, y: 28 },
        { name: "Ko Itakura", pos: "DF", no: 4, club: "M'gladbach", ovr: 78, pac: 72, sho: 45, pas: 70, dri: 68, def: 78, phy: 76, x: 35, y: 28 },
        { name: "Hiroki Ito", pos: "DF", no: 21, club: "Stuttgart", ovr: 76, pac: 75, sho: 50, pas: 72, dri: 70, def: 75, phy: 76, x: 15, y: 35 },
        { name: "Hidemasa Morita", pos: "MF", no: 5, club: "Sporting CP", ovr: 80, pac: 74, sho: 70, pas: 78, dri: 80, def: 76, phy: 78, x: 50, y: 50 },
        { name: "Wataru Endo", pos: "MF", no: 6, club: "Liverpool", ovr: 80, pac: 68, sho: 65, pas: 76, dri: 74, def: 80, phy: 82, x: 30, y: 55 },
        { name: "Ao Tanaka", pos: "MF", no: 17, club: "Düsseldorf", ovr: 75, pac: 72, sho: 70, pas: 75, dri: 75, def: 72, phy: 72, x: 70, y: 55 },
        { name: "Ayase Ueda", pos: "FW", no: 7, club: "Feyenoord", ovr: 76, pac: 80, sho: 78, pas: 65, dri: 72, def: 35, phy: 75, x: 80, y: 80 },
        { name: "Takumi Minamino", pos: "FW", no: 8, club: "Monaco", ovr: 78, pac: 78, sho: 76, pas: 75, dri: 80, def: 45, phy: 68, x: 50, y: 85 },
        { name: "Daizen Maeda", pos: "FW", no: 9, club: "Celtic", ovr: 75, pac: 92, sho: 72, pas: 68, dri: 75, def: 55, phy: 78, x: 20, y: 80 }
      ],
      bench: [
        { name: "Keisuke Osako", pos: "GK", club: "Sanfrecce", ovr: 74, pac: 66, sho: 25, pas: 64, dri: 65, def: 74, phy: 72 },
        { name: "M. Suzuki", pos: "GK", club: "Sint-Truiden", ovr: 70, pac: 68, sho: 20, pas: 62, dri: 64, def: 70, phy: 74 },
        { name: "Zion Suzuki", pos: "GK", club: "Sint-Truiden", ovr: 71, pac: 68, sho: 20, pas: 65, dri: 65, def: 72, phy: 76 },
        { name: "Koki Machida", pos: "DF", club: "Union SG", ovr: 74, pac: 68, sho: 40, pas: 65, dri: 60, def: 75, phy: 78 },
        { name: "Yuta Nakayama", pos: "DF", club: "Huddersfield", ovr: 72, pac: 72, sho: 55, pas: 68, dri: 68, def: 70, phy: 72 },
        { name: "T. Watanabe", pos: "DF", club: "Gent", ovr: 74, pac: 65, sho: 35, pas: 60, dri: 55, def: 75, phy: 78 },
        { name: "Daiki Hashioka", pos: "DF", club: "Luton Town", ovr: 72, pac: 78, sho: 45, pas: 65, dri: 68, def: 72, phy: 75 },
        { name: "Reo Hatate", pos: "MF", club: "Celtic", ovr: 76, pac: 78, sho: 72, pas: 76, dri: 78, def: 70, phy: 74 },
        { name: "Ritsu Doan", pos: "FW", club: "Freiburg", ovr: 78, pac: 82, sho: 75, pas: 75, dri: 80, def: 55, phy: 68 },
        { name: "Mao Hosoya", pos: "FW", club: "Kashiwa R.", ovr: 70, pac: 78, sho: 70, pas: 60, dri: 68, def: 35, phy: 72 },
        { name: "Keito Nakamura", pos: "FW", club: "Reims", ovr: 74, pac: 82, sho: 74, pas: 70, dri: 76, def: 40, phy: 65 },
        { name: "Junya Ito", pos: "FW", club: "Reims", ovr: 80, pac: 90, sho: 75, pas: 78, dri: 82, def: 55, phy: 70 },
        { name: "Takuma Asano", pos: "FW", club: "Bochum", ovr: 74, pac: 88, sho: 72, pas: 68, dri: 75, def: 45, phy: 70 },
        { name: "Takefusa Kubo", pos: "FW", club: "Real Sociedad", ovr: 81, pac: 84, sho: 76, pas: 80, dri: 85, def: 45, phy: 62 },
        { name: "Kaoru Mitoma", pos: "FW", club: "Brighton", ovr: 82, pac: 86, sho: 75, pas: 78, dri: 86, def: 55, phy: 65 }
      ]
    },
    ESP: {
      formation: "4-3-3",
      players: [
        { name: "David Raya", pos: "GK", no: 1, club: "Arsenal", ovr: 82, pac: 70, sho: 30, pas: 75, dri: 72, def: 84, phy: 78, x: 50, y: 12 },
        { name: "Dani Carvajal", pos: "DF", no: 2, club: "Real Madrid", ovr: 84, pac: 80, sho: 55, pas: 78, dri: 78, def: 82, phy: 80, x: 85, y: 35 },
        { name: "Robin Le Normand", pos: "DF", no: 3, club: "Real Sociedad", ovr: 82, pac: 70, sho: 40, pas: 70, dri: 65, def: 84, phy: 80, x: 65, y: 28 },
        { name: "Nacho Fernández", pos: "DF", no: 4, club: "Real Madrid", ovr: 82, pac: 72, sho: 40, pas: 70, dri: 68, def: 82, phy: 78, x: 35, y: 28 },
        { name: "Álex Grimaldo", pos: "DF", no: 12, club: "Leverkusen", ovr: 84, pac: 85, sho: 72, pas: 84, dri: 84, def: 78, phy: 74, x: 15, y: 35 },
        { name: "Mikel Merino", pos: "MF", no: 6, club: "Real Sociedad", ovr: 84, pac: 72, sho: 78, pas: 82, dri: 82, def: 80, phy: 84, x: 50, y: 50 },
        { name: "Fabián Ruiz", pos: "MF", no: 8, club: "PSG", ovr: 82, pac: 70, sho: 78, pas: 84, dri: 84, def: 74, phy: 75, x: 30, y: 55 },
        { name: "Dani Olmo", pos: "MF", no: 10, club: "Leipzig", ovr: 83, pac: 80, sho: 80, pas: 84, dri: 86, def: 55, phy: 68, x: 70, y: 55 },
        { name: "Lamine Yamal", pos: "FW", no: 19, club: "Barcelona", ovr: 80, pac: 86, sho: 75, pas: 78, dri: 86, def: 40, phy: 60, x: 80, y: 80 },
        { name: "Álvaro Morata", pos: "FW", no: 7, club: "Atlético Madrid", ovr: 83, pac: 78, sho: 82, pas: 72, dri: 78, def: 45, phy: 80, x: 50, y: 85 },
        { name: "Nico Williams", pos: "FW", no: 17, club: "Athletic Club", ovr: 81, pac: 92, sho: 76, pas: 75, dri: 85, def: 40, phy: 68, x: 20, y: 80 }
      ],
      bench: [
        { name: "Álex Remiro", pos: "GK", club: "Real Sociedad", ovr: 82, pac: 68, sho: 30, pas: 70, dri: 68, def: 82, phy: 75 },
        { name: "Unai Simón", pos: "GK", club: "Athletic Club", ovr: 84, pac: 72, sho: 35, pas: 72, dri: 72, def: 85, phy: 80 },
        { name: "Daniel Vivian", pos: "DF", club: "Athletic Club", ovr: 80, pac: 72, sho: 45, pas: 65, dri: 60, def: 82, phy: 84 },
        { name: "Aymeric Laporte", pos: "DF", club: "Al-Nassr", ovr: 84, pac: 65, sho: 50, pas: 76, dri: 70, def: 85, phy: 80 },
        { name: "Jesús Navas", pos: "DF", club: "Sevilla", ovr: 80, pac: 78, sho: 65, pas: 80, dri: 82, def: 74, phy: 65 },
        { name: "Marc Cucurella", pos: "DF", club: "Chelsea", ovr: 80, pac: 80, sho: 60, pas: 76, dri: 78, def: 78, phy: 75 },
        { name: "Alex Baena", pos: "MF", club: "Villarreal", ovr: 80, pac: 78, sho: 76, pas: 82, dri: 82, def: 60, phy: 68 },
        { name: "M. Zubimendi", pos: "MF", club: "Real Sociedad", ovr: 82, pac: 68, sho: 65, pas: 80, dri: 78, def: 80, phy: 78 },
        { name: "Pedri", pos: "MF", club: "Barcelona", ovr: 86, pac: 78, sho: 76, pas: 88, dri: 88, def: 68, phy: 68 },
        { name: "Fermín López", pos: "MF", club: "Barcelona", ovr: 76, pac: 78, sho: 74, pas: 75, dri: 78, def: 55, phy: 65 },
        { name: "Aleix García", pos: "MF", club: "Girona", ovr: 82, pac: 70, sho: 75, pas: 86, dri: 82, def: 74, phy: 72 },
        { name: "Joselu", pos: "FW", club: "Real Madrid", ovr: 82, pac: 65, sho: 84, pas: 70, dri: 76, def: 45, phy: 84 },
        { name: "Ferran Torres", pos: "FW", club: "Barcelona", ovr: 82, pac: 82, sho: 80, pas: 78, dri: 82, def: 45, phy: 72 },
        { name: "Mikel Oyarzabal", pos: "FW", club: "Real Sociedad", ovr: 83, pac: 78, sho: 82, pas: 80, dri: 84, def: 55, phy: 70 },
        { name: "Ayoze Pérez", pos: "FW", club: "Betis", ovr: 78, pac: 78, sho: 78, pas: 75, dri: 82, def: 45, phy: 68 }
      ]
    },
    BEL: {
      formation: "4-3-3",
      players: [
        { name: "Koen Casteels", pos: "GK", no: 1, club: "Wolfsburg", ovr: 82, pac: 70, sho: 30, pas: 72, dri: 72, def: 84, phy: 78, x: 50, y: 12 },
        { name: "Zeno Debast", pos: "DF", no: 2, club: "Anderlecht", ovr: 76, pac: 72, sho: 45, pas: 70, dri: 68, def: 76, phy: 75, x: 85, y: 35 },
        { name: "Arthur Theate", pos: "DF", no: 3, club: "Rennes", ovr: 78, pac: 75, sho: 50, pas: 70, dri: 68, def: 78, phy: 78, x: 65, y: 28 },
        { name: "Wout Faes", pos: "DF", no: 4, club: "Leicester", ovr: 77, pac: 68, sho: 40, pas: 65, dri: 65, def: 78, phy: 80, x: 35, y: 28 },
        { name: "Jan Vertonghen", pos: "DF", no: 5, club: "Anderlecht", ovr: 80, pac: 55, sho: 55, pas: 74, dri: 70, def: 82, phy: 78, x: 15, y: 35 },
        { name: "Axel Witsel", pos: "DF", no: 6, club: "Atlético Madrid", ovr: 80, pac: 50, sho: 70, pas: 78, dri: 74, def: 80, phy: 82, x: 50, y: 50 },
        { name: "Youri Tielemans", pos: "MF", no: 8, club: "Aston Villa", ovr: 82, pac: 68, sho: 80, pas: 85, dri: 82, def: 70, phy: 72, x: 30, y: 55 },
        { name: "Orel Mangala", pos: "MF", no: 18, club: "Lyon", ovr: 76, pac: 72, sho: 65, pas: 75, dri: 76, def: 74, phy: 75, x: 70, y: 55 },
        { name: "Johan Bakayoko", pos: "FW", no: 19, club: "PSV", ovr: 78, pac: 86, sho: 74, pas: 75, dri: 84, def: 40, phy: 65, x: 80, y: 80 },
        { name: "Romelu Lukaku", pos: "FW", no: 10, club: "Roma", ovr: 84, pac: 78, sho: 85, pas: 72, dri: 76, def: 40, phy: 86, x: 50, y: 85 },
        { name: "Jérémy Doku", pos: "FW", no: 7, club: "Man City", ovr: 82, pac: 92, sho: 74, pas: 76, dri: 88, def: 40, phy: 62, x: 20, y: 80 }
      ],
      bench: [
        { name: "Thomas Kaminski", pos: "GK", club: "Luton Town", ovr: 76, pac: 65, sho: 30, pas: 68, dri: 65, def: 78, phy: 74 },
        { name: "Matz Sels", pos: "GK", club: "Nott'm Forest", ovr: 78, pac: 68, sho: 25, pas: 70, dri: 68, def: 80, phy: 76 },
        { name: "Thomas Meunier", pos: "DF", club: "Trabzonspor", ovr: 76, pac: 70, sho: 70, pas: 74, dri: 72, def: 74, phy: 78 },
        { name: "T. Castagne", pos: "DF", club: "Fulham", ovr: 78, pac: 78, sho: 65, pas: 74, dri: 75, def: 76, phy: 74 },
        { name: "M. De Cuyper", pos: "DF", club: "Club Brugge", ovr: 75, pac: 80, sho: 60, pas: 74, dri: 74, def: 72, phy: 70 },
        { name: "Hugo Siquet", pos: "DF", club: "Cercle Brugge", ovr: 74, pac: 78, sho: 55, pas: 72, dri: 72, def: 70, phy: 70 },
        { name: "Aster Vranckx", pos: "MF", club: "Wolfsburg", ovr: 75, pac: 70, sho: 65, pas: 72, dri: 74, def: 72, phy: 78 },
        { name: "A. Vermeeren", pos: "MF", club: "Atlético Madrid", ovr: 76, pac: 72, sho: 64, pas: 76, dri: 78, def: 70, phy: 68 },
        { name: "Amadou Onana", pos: "MF", club: "Everton", ovr: 78, pac: 72, sho: 65, pas: 72, dri: 72, def: 78, phy: 84 },
        { name: "Leandro Trossard", pos: "FW", club: "Arsenal", ovr: 82, pac: 80, sho: 82, pas: 80, dri: 84, def: 45, phy: 60 },
        { name: "Dodi Lukebakio", pos: "FW", club: "Sevilla", ovr: 77, pac: 84, sho: 76, pas: 72, dri: 80, def: 40, phy: 74 },
        { name: "Dries Mertens", pos: "FW", club: "Galatasaray", ovr: 80, pac: 74, sho: 82, pas: 82, dri: 84, def: 40, phy: 55 },
        { name: "C. De Ketelaere", pos: "FW", club: "Atalanta", ovr: 78, pac: 76, sho: 76, pas: 78, dri: 80, def: 55, phy: 72 },
        { name: "Loïs Openda", pos: "FW", club: "Leipzig", ovr: 82, pac: 92, sho: 82, pas: 70, dri: 80, def: 40, phy: 75 },
        { name: "J. Doku (Alt)", pos: "FW", club: "Man City", ovr: 82, pac: 92, sho: 74, pas: 76, dri: 88, def: 40, phy: 62 }
      ]
    },
    COL: {
      formation: "4-3-3",
      players: [
        { name: "David Ospina", pos: "GK", no: 1, club: "Al Nassr", ovr: 78, pac: 68, sho: 35, pas: 70, dri: 70, def: 80, phy: 72, x: 50, y: 12 },
        { name: "Daniel Muñoz", pos: "DF", no: 21, club: "Crystal Palace", ovr: 78, pac: 82, sho: 60, pas: 72, dri: 74, def: 76, phy: 82, x: 85, y: 35 },
        { name: "Yerry Mina", pos: "DF", no: 13, club: "Cagliari", ovr: 76, pac: 55, sho: 50, pas: 60, dri: 55, def: 78, phy: 84, x: 65, y: 28 },
        { name: "Jhon Lucumí", pos: "DF", no: 3, club: "Bologna", ovr: 78, pac: 70, sho: 40, pas: 68, dri: 65, def: 78, phy: 80, x: 35, y: 28 },
        { name: "Johan Mojica", pos: "DF", no: 17, club: "Osasuna", ovr: 75, pac: 84, sho: 55, pas: 70, dri: 72, def: 72, phy: 70, x: 15, y: 35 },
        { name: "Kevin Castaño", pos: "MF", no: 5, club: "Krasnodar", ovr: 74, pac: 72, sho: 65, pas: 74, dri: 74, def: 70, phy: 72, x: 50, y: 50 },
        { name: "Richard Ríos", pos: "MF", no: 6, club: "Palmeiras", ovr: 76, pac: 76, sho: 70, pas: 75, dri: 80, def: 72, phy: 76, x: 30, y: 55 },
        { name: "James Rodríguez", pos: "MF", no: 10, club: "São Paulo", ovr: 80, pac: 65, sho: 82, pas: 86, dri: 82, def: 55, phy: 65, x: 70, y: 55 },
        { name: "Rafael Borré", pos: "FW", no: 19, club: "Internacional", ovr: 77, pac: 76, sho: 78, pas: 72, dri: 76, def: 55, phy: 74, x: 80, y: 80 },
        { name: "Luis Díaz", pos: "FW", no: 7, club: "Liverpool", ovr: 85, pac: 90, sho: 80, pas: 78, dri: 88, def: 45, phy: 72, x: 50, y: 85 },
        { name: "Jhon Arias", pos: "FW", no: 9, club: "Fluminense", ovr: 80, pac: 84, sho: 76, pas: 78, dri: 82, def: 55, phy: 72, x: 20, y: 80 }
      ],
      bench: [
        { name: "Camilo Vargas", pos: "GK", club: "Atlas", ovr: 78, pac: 65, sho: 30, pas: 68, dri: 68, def: 78, phy: 74 },
        { name: "Álvaro Montero", pos: "GK", club: "Millonarios", ovr: 74, pac: 60, sho: 25, pas: 60, dri: 62, def: 75, phy: 76 },
        { name: "Carlos Cuesta", pos: "DF", club: "Genk", ovr: 76, pac: 75, sho: 40, pas: 65, dri: 62, def: 76, phy: 75 },
        { name: "Santiago Arias", pos: "DF", club: "Bahia", ovr: 74, pac: 75, sho: 55, pas: 72, dri: 74, def: 70, phy: 68 },
        { name: "D. Sánchez", pos: "DF", club: "Galatasaray", ovr: 78, pac: 70, sho: 45, pas: 62, dri: 60, def: 78, phy: 82 },
        { name: "Deiver Machado", pos: "DF", club: "Lens", ovr: 76, pac: 84, sho: 55, pas: 68, dri: 74, def: 72, phy: 74 },
        { name: "Jorge Carrascal", pos: "MF", club: "Dinamo Moscow", ovr: 76, pac: 78, sho: 70, pas: 75, dri: 82, def: 45, phy: 60 },
        { name: "Mateus Uribe", pos: "MF", club: "Al-Sadd", ovr: 78, pac: 70, sho: 74, pas: 76, dri: 75, def: 75, phy: 78 },
        { name: "Jefferson Lerma", pos: "MF", club: "Crystal Palace", ovr: 78, pac: 72, sho: 70, pas: 74, dri: 74, def: 78, phy: 82 },
        { name: "J. F. Quintero", pos: "MF", club: "Racing", ovr: 76, pac: 68, sho: 76, pas: 82, dri: 80, def: 40, phy: 55 },
        { name: "Yáser Asprilla", pos: "MF", club: "Watford", ovr: 74, pac: 78, sho: 70, pas: 72, dri: 78, def: 45, phy: 60 },
        { name: "Jhon Durán", pos: "FW", club: "Aston Villa", ovr: 74, pac: 80, sho: 74, pas: 60, dri: 70, def: 40, phy: 80 },
        { name: "Andrés Gómez", pos: "FW", club: "Real Salt Lake", ovr: 70, pac: 84, sho: 68, pas: 65, dri: 74, def: 35, phy: 60 },
        { name: "Luis Sinisterra", pos: "FW", club: "Bournemouth", ovr: 78, pac: 86, sho: 76, pas: 72, dri: 82, def: 40, phy: 68 },
        { name: "Jhon Córdoba", pos: "FW", club: "Krasnodar", ovr: 78, pac: 82, sho: 78, pas: 65, dri: 74, def: 45, phy: 84 }
      ]
    },
    MEX: {
      formation: "4-3-3",
      players: [
        { name: "Julio González", pos: "GK", no: 1, club: "Pumas UNAM", ovr: 74, pac: 68, sho: 30, pas: 65, dri: 68, def: 75, phy: 72, x: 50, y: 12 },
        { name: "Jorge Sánchez", pos: "DF", no: 2, club: "Porto", ovr: 75, pac: 80, sho: 55, pas: 70, dri: 72, def: 72, phy: 74, x: 85, y: 35 },
        { name: "César Montes", pos: "DF", no: 3, club: "Almería", ovr: 78, pac: 68, sho: 40, pas: 65, dri: 60, def: 78, phy: 80, x: 65, y: 28 },
        { name: "Johan Vásquez", pos: "DF", no: 4, club: "Genoa", ovr: 76, pac: 70, sho: 45, pas: 68, dri: 65, def: 76, phy: 78, x: 35, y: 28 },
        { name: "Gerardo Arteaga", pos: "DF", no: 5, club: "Monterrey", ovr: 75, pac: 82, sho: 55, pas: 70, dri: 74, def: 72, phy: 70, x: 15, y: 35 },
        { name: "Luis Romo", pos: "MF", no: 6, club: "Monterrey", ovr: 76, pac: 70, sho: 72, pas: 75, dri: 74, def: 72, phy: 76, x: 50, y: 50 },
        { name: "Luis Chávez", pos: "MF", no: 7, club: "Dinamo Moscow", ovr: 78, pac: 74, sho: 78, pas: 78, dri: 76, def: 70, phy: 72, x: 30, y: 55 },
        { name: "Érick Sánchez", pos: "MF", no: 14, club: "Pachuca", ovr: 76, pac: 78, sho: 72, pas: 75, dri: 78, def: 65, phy: 65, x: 70, y: 55 },
        { name: "Uriel Antuna", pos: "FW", no: 15, club: "Cruz Azul", ovr: 75, pac: 88, sho: 70, pas: 72, dri: 78, def: 40, phy: 60, x: 80, y: 80 },
        { name: "S. Giménez", pos: "FW", no: 9, club: "Feyenoord", ovr: 80, pac: 80, sho: 82, pas: 70, dri: 76, def: 45, phy: 82, x: 50, y: 85 },
        { name: "Alexis Vega", pos: "FW", no: 10, club: "Toluca", ovr: 78, pac: 82, sho: 76, pas: 75, dri: 82, def: 45, phy: 68, x: 20, y: 80 }
      ],
      bench: [
        { name: "Carlos Acevedo", pos: "GK", club: "Santos Laguna", ovr: 76, pac: 68, sho: 25, pas: 65, dri: 68, def: 76, phy: 74 },
        { name: "Raúl Rangel", pos: "GK", club: "Guadalajara", ovr: 70, pac: 65, sho: 20, pas: 60, dri: 65, def: 70, phy: 68 },
        { name: "Bryan González", pos: "DF", club: "Pachuca", ovr: 70, pac: 78, sho: 55, pas: 65, dri: 70, def: 65, phy: 62 },
        { name: "Israel Reyes", pos: "DF", club: "América", ovr: 74, pac: 72, sho: 45, pas: 68, dri: 65, def: 74, phy: 72 },
        { name: "Jesús Orozco", pos: "DF", club: "Guadalajara", ovr: 72, pac: 70, sho: 40, pas: 65, dri: 62, def: 72, phy: 74 },
        { name: "Brian García", pos: "DF", club: "Toluca", ovr: 72, pac: 76, sho: 50, pas: 68, dri: 70, def: 70, phy: 68 },
        { name: "Rodrigo Huescas", pos: "DF", club: "Cruz Azul", ovr: 72, pac: 82, sho: 60, pas: 68, dri: 74, def: 65, phy: 65 },
        { name: "C. Rodríguez", pos: "MF", club: "Cruz Azul", ovr: 76, pac: 72, sho: 68, pas: 78, dri: 76, def: 65, phy: 68 },
        { name: "Orbelín Pineda", pos: "MF", club: "AEK Athens", ovr: 77, pac: 78, sho: 74, pas: 76, dri: 80, def: 60, phy: 65 },
        { name: "Marcelo Flores", pos: "MF", club: "Tigres UANL", ovr: 70, pac: 80, sho: 65, pas: 68, dri: 76, def: 40, phy: 55 },
        { name: "Santiago Muñoz", pos: "FW", club: "Santos Laguna", ovr: 70, pac: 76, sho: 70, pas: 65, dri: 72, def: 35, phy: 68 },
        { name: "César Huerta", pos: "FW", club: "Pumas UNAM", ovr: 75, pac: 84, sho: 72, pas: 70, dri: 78, def: 45, phy: 65 },
        { name: "Julián Quiñones", pos: "FW", club: "América", ovr: 78, pac: 85, sho: 78, pas: 72, dri: 80, def: 45, phy: 78 },
        { name: "G. Martínez", pos: "FW", club: "Pumas UNAM", ovr: 74, pac: 68, sho: 76, pas: 65, dri: 68, def: 40, phy: 82 },
        { name: "R. Alvarado", pos: "FW", club: "Guadalajara", ovr: 76, pac: 78, sho: 74, pas: 76, dri: 78, def: 55, phy: 68 }
      ]
    },
    QAT: {
      formation: "4-3-3",
      players: [
        { name: "Saad Al-Sheeb", pos: "GK", no: 1, club: "Al Sadd", ovr: 72, pac: 68, sho: 25, pas: 65, dri: 68, def: 74, phy: 70, x: 50, y: 12 },
        { name: "Ro-Ro", pos: "DF", no: 2, club: "Al Sadd", ovr: 74, pac: 80, sho: 50, pas: 68, dri: 72, def: 70, phy: 72, x: 85, y: 35 },
        { name: "Tarek Salman", pos: "DF", no: 5, club: "Al Sadd", ovr: 72, pac: 65, sho: 40, pas: 65, dri: 60, def: 74, phy: 75, x: 65, y: 28 },
        { name: "Al-Mahdi Ali", pos: "DF", no: 3, club: "Al-Gharafa", ovr: 70, pac: 60, sho: 45, pas: 60, dri: 58, def: 72, phy: 74, x: 35, y: 28 },
        { name: "Homam Ahmed", pos: "DF", no: 14, club: "Al-Gharafa", ovr: 73, pac: 82, sho: 55, pas: 68, dri: 74, def: 68, phy: 70, x: 15, y: 35 },
        { name: "Abdulaziz Hatem", pos: "MF", no: 6, club: "Al-Rayyan", ovr: 74, pac: 68, sho: 70, pas: 75, dri: 74, def: 65, phy: 72, x: 50, y: 50 },
        { name: "Mohammed Waad", pos: "MF", no: 4, club: "Al Sadd", ovr: 72, pac: 72, sho: 65, pas: 72, dri: 72, def: 68, phy: 68, x: 30, y: 55 },
        { name: "Ali Assadalla", pos: "MF", no: 8, club: "Al Sadd", ovr: 73, pac: 70, sho: 68, pas: 74, dri: 75, def: 55, phy: 65, x: 70, y: 55 },
        { name: "Hassan Al-Haydos", pos: "FW", no: 10, club: "Al Sadd", ovr: 75, pac: 72, sho: 74, pas: 76, dri: 78, def: 45, phy: 65, x: 80, y: 80 },
        { name: "Akram Afif", pos: "FW", no: 11, club: "Al Sadd", ovr: 78, pac: 84, sho: 75, pas: 78, dri: 82, def: 40, phy: 68, x: 20, y: 80 },
        { name: "M. Muntari", pos: "FW", no: 9, club: "Al-Duhail", ovr: 73, pac: 78, sho: 72, pas: 65, dri: 70, def: 35, phy: 75, x: 50, y: 85 }
      ],
      bench: [
        { name: "Yousef Hassan", pos: "GK", club: "Al-Gharafa", ovr: 68, pac: 65, sho: 20, pas: 60, dri: 62, def: 68, phy: 66 },
        { name: "Meshaal Barsham", pos: "GK", club: "Al Sadd", ovr: 70, pac: 66, sho: 22, pas: 62, dri: 65, def: 70, phy: 68 },
        { name: "Musab Kheder", pos: "DF", club: "Al Sadd", ovr: 70, pac: 75, sho: 45, pas: 65, dri: 68, def: 65, phy: 65 },
        { name: "Bassam Al-Rawi", pos: "DF", club: "Al-Rayyan", ovr: 74, pac: 72, sho: 55, pas: 70, dri: 68, def: 74, phy: 72 },
        { name: "B. Khoukhi", pos: "DF", club: "Al Sadd", ovr: 74, pac: 68, sho: 65, pas: 70, dri: 65, def: 75, phy: 78 },
        { name: "Jassem Gaber", pos: "DF", club: "Al-Arabi", ovr: 68, pac: 70, sho: 40, pas: 60, dri: 62, def: 68, phy: 70 },
        { name: "Karim Boudiaf", pos: "MF", club: "Al-Duhail", ovr: 74, pac: 60, sho: 65, pas: 74, dri: 70, def: 72, phy: 78 },
        { name: "Salem Al-Hajri", pos: "MF", club: "Al Sadd", ovr: 70, pac: 68, sho: 55, pas: 68, dri: 65, def: 68, phy: 70 },
        { name: "Assim Madibo", pos: "MF", club: "Al-Duhail", ovr: 72, pac: 72, sho: 50, pas: 65, dri: 68, def: 72, phy: 75 },
        { name: "N. Al-Hadhrami", pos: "MF", club: "Al-Rayyan", ovr: 68, pac: 74, sho: 60, pas: 65, dri: 70, def: 55, phy: 62 },
        { name: "Mostafa Meshaal", pos: "MF", club: "Al Sadd", ovr: 66, pac: 70, sho: 55, pas: 64, dri: 66, def: 60, phy: 65 },
        { name: "Ahmed Alaaeldin", pos: "FW", club: "Al-Gharafa", ovr: 72, pac: 76, sho: 70, pas: 65, dri: 72, def: 35, phy: 70 },
        { name: "I. Mohammad", pos: "FW", club: "Al-Duhail", ovr: 73, pac: 82, sho: 68, pas: 70, dri: 75, def: 55, phy: 68 },
        { name: "Khalid Muneer", pos: "FW", club: "Al-Wakrah", ovr: 70, pac: 78, sho: 65, pas: 68, dri: 72, def: 40, phy: 62 },
        { name: "Almoez Ali", pos: "FW", club: "Al-Duhail", ovr: 76, pac: 80, sho: 76, pas: 68, dri: 75, def: 40, phy: 72 }
      ]
    },
    TUR: {
      formation: "4-3-3",
      players: [
        { name: "Mert Günok", pos: "GK", no: 1, club: "Beşiktaş", ovr: 78, pac: 68, sho: 30, pas: 70, dri: 72, def: 80, phy: 75, x: 50, y: 12 },
        { name: "Zeki Çelik", pos: "DF", no: 2, club: "Roma", ovr: 78, pac: 82, sho: 55, pas: 74, dri: 75, def: 76, phy: 76, x: 85, y: 35 },
        { name: "Merih Demiral", pos: "DF", no: 3, club: "Al-Ahli", ovr: 79, pac: 68, sho: 45, pas: 60, dri: 62, def: 80, phy: 84, x: 65, y: 28 },
        { name: "Çağlar Söyüncü", pos: "DF", no: 4, club: "Fenerbahçe", ovr: 78, pac: 65, sho: 45, pas: 65, dri: 60, def: 80, phy: 82, x: 35, y: 28 },
        { name: "Ferdi Kadıoğlu", pos: "DF", no: 5, club: "Fenerbahçe", ovr: 80, pac: 85, sho: 68, pas: 78, dri: 82, def: 75, phy: 72, x: 15, y: 35 },
        { name: "Okay Yokuşlu", pos: "MF", no: 6, club: "West Brom", ovr: 76, pac: 60, sho: 65, pas: 72, dri: 70, def: 76, phy: 80, x: 50, y: 50 },
        { name: "H. Çalhanoğlu", pos: "MF", no: 10, club: "Inter", ovr: 85, pac: 72, sho: 82, pas: 86, dri: 84, def: 70, phy: 72, x: 30, y: 55 },
        { name: "Orkun Kökçü", pos: "MF", no: 24, club: "Benfica", ovr: 82, pac: 74, sho: 78, pas: 82, dri: 80, def: 68, phy: 70, x: 70, y: 55 },
        { name: "Arda Güler", pos: "FW", no: 8, club: "Real Madrid", ovr: 78, pac: 78, sho: 75, pas: 80, dri: 84, def: 40, phy: 60, x: 80, y: 80 },
        { name: "Cenk Tosun", pos: "FW", no: 9, club: "Beşiktaş", ovr: 76, pac: 68, sho: 78, pas: 70, dri: 74, def: 40, phy: 78, x: 50, y: 85 },
        { name: "K. Aktürkoğlu", pos: "FW", no: 7, club: "Galatasaray", ovr: 78, pac: 86, sho: 75, pas: 74, dri: 82, def: 45, phy: 65, x: 20, y: 80 }
      ],
      bench: [
        { name: "Altay Bayındır", pos: "GK", club: "Man United", ovr: 76, pac: 68, sho: 25, pas: 65, dri: 68, def: 76, phy: 74 },
        { name: "Uğurcan Çakır", pos: "GK", club: "Trabzonspor", ovr: 78, pac: 68, sho: 25, pas: 70, dri: 70, def: 80, phy: 76 },
        { name: "Samet Akaydin", pos: "DF", club: "Panathinaikos", ovr: 74, pac: 65, sho: 40, pas: 60, dri: 55, def: 75, phy: 80 },
        { name: "A. Bardakcı", pos: "DF", club: "Galatasaray", ovr: 78, pac: 70, sho: 55, pas: 70, dri: 68, def: 78, phy: 82 },
        { name: "Mert Müldür", pos: "DF", club: "Fenerbahçe", ovr: 75, pac: 80, sho: 55, pas: 70, dri: 72, def: 72, phy: 70 },
        { name: "Kaan Ayhan", pos: "DF", club: "Galatasaray", ovr: 76, pac: 65, sho: 60, pas: 72, dri: 70, def: 76, phy: 76 },
        { name: "Yusuf Yazıcı", pos: "MF", club: "Lille", ovr: 78, pac: 72, sho: 78, pas: 80, dri: 80, def: 55, phy: 70 },
        { name: "Salih Özcan", pos: "MF", club: "Dortmund", ovr: 78, pac: 70, sho: 65, pas: 76, dri: 75, def: 76, phy: 78 },
        { name: "İsmail Yüksek", pos: "MF", club: "Fenerbahçe", ovr: 77, pac: 74, sho: 65, pas: 74, dri: 76, def: 75, phy: 76 },
        { name: "Kaan Ayhan (2)", pos: "MF", club: "Galatasaray", ovr: 76, pac: 65, sho: 60, pas: 72, dri: 70, def: 76, phy: 76 },
        { name: "Kenan Yıldız", pos: "FW", club: "Juventus", ovr: 76, pac: 82, sho: 72, pas: 70, dri: 82, def: 35, phy: 68 },
        { name: "B. Alper Yılmaz", pos: "FW", club: "Galatasaray", ovr: 76, pac: 86, sho: 72, pas: 70, dri: 78, def: 55, phy: 80 },
        { name: "Umut Nayir", pos: "FW", club: "Pendikspor", ovr: 74, pac: 68, sho: 75, pas: 65, dri: 68, def: 40, phy: 82 },
        { name: "Yunus Akgün", pos: "FW", club: "Leicester", ovr: 75, pac: 82, sho: 70, pas: 72, dri: 78, def: 40, phy: 65 },
        { name: "Bertuğ Yıldırım", pos: "FW", club: "Rennes", ovr: 72, pac: 76, sho: 72, pas: 60, dri: 68, def: 35, phy: 80 }
      ]
    },
    SUI: {
      formation: "4-3-3",
      players: [
        { name: "Gregor Kobel", pos: "GK", no: 1, club: "Dortmund", ovr: 86, pac: 72, sho: 30, pas: 75, dri: 74, def: 88, phy: 80, x: 50, y: 12 },
        { name: "Silvan Widmer", pos: "DF", no: 2, club: "Mainz 05", ovr: 76, pac: 78, sho: 60, pas: 72, dri: 72, def: 74, phy: 76, x: 85, y: 35 },
        { name: "Manuel Akanji", pos: "DF", no: 5, club: "Man City", ovr: 84, pac: 78, sho: 50, pas: 76, dri: 72, def: 85, phy: 82, x: 65, y: 28 },
        { name: "Nico Elvedi", pos: "DF", no: 4, club: "M'gladbach", ovr: 78, pac: 70, sho: 45, pas: 68, dri: 65, def: 80, phy: 76, x: 35, y: 28 },
        { name: "Miro Muheim", pos: "DF", no: 3, club: "Hamburger SV", ovr: 74, pac: 78, sho: 60, pas: 70, dri: 72, def: 70, phy: 72, x: 15, y: 35 },
        { name: "Granit Xhaka", pos: "MF", no: 10, club: "Leverkusen", ovr: 84, pac: 60, sho: 80, pas: 86, dri: 78, def: 78, phy: 82, x: 50, y: 50 },
        { name: "Remo Freuler", pos: "MF", no: 8, club: "Bologna", ovr: 80, pac: 70, sho: 72, pas: 78, dri: 76, def: 76, phy: 78, x: 30, y: 55 },
        { name: "Denis Zakaria", pos: "MF", no: 6, club: "Monaco", ovr: 80, pac: 82, sho: 68, pas: 76, dri: 78, def: 78, phy: 84, x: 70, y: 55 },
        { name: "Ruben Vargas", pos: "FW", no: 11, club: "Augsburg", ovr: 77, pac: 84, sho: 74, pas: 75, dri: 80, def: 45, phy: 65, x: 80, y: 80 },
        { name: "Breel Embolo", pos: "FW", no: 7, club: "Monaco", ovr: 78, pac: 82, sho: 76, pas: 72, dri: 78, def: 45, phy: 82, x: 50, y: 85 },
        { name: "Cedric Itten", pos: "FW", no: 9, club: "Young Boys", ovr: 75, pac: 68, sho: 76, pas: 65, dri: 70, def: 40, phy: 80, x: 20, y: 80 }
      ],
      bench: [
        { name: "Yvon Mvogo", pos: "GK", club: "Lorient", ovr: 76, pac: 68, sho: 25, pas: 65, dri: 68, def: 76, phy: 74 },
        { name: "Marvin Keller", pos: "GK", club: "Winterthur", ovr: 68, pac: 65, sho: 20, pas: 60, dri: 62, def: 68, phy: 66 },
        { name: "R. Rodriguez", pos: "DF", club: "Torino", ovr: 78, pac: 65, sho: 68, pas: 78, dri: 75, def: 76, phy: 72 },
        { name: "Aurele Amenda", pos: "DF", club: "Young Boys", ovr: 70, pac: 72, sho: 40, pas: 60, dri: 62, def: 72, phy: 76 },
        { name: "Eray Comert", pos: "DF", club: "Nantes", ovr: 74, pac: 68, sho: 50, pas: 65, dri: 65, def: 74, phy: 76 },
        { name: "Luca Jaquez", pos: "DF", club: "Luzern", ovr: 66, pac: 70, sho: 35, pas: 55, dri: 60, def: 66, phy: 68 },
        { name: "M. Aebischer", pos: "MF", club: "Bologna", ovr: 76, pac: 72, sho: 70, pas: 76, dri: 75, def: 72, phy: 72 },
        { name: "Djibril Sow", pos: "MF", club: "Sevilla", ovr: 78, pac: 76, sho: 70, pas: 76, dri: 78, def: 74, phy: 76 },
        { name: "Fabian Rieder", pos: "MF", club: "Rennes", ovr: 75, pac: 74, sho: 72, pas: 76, dri: 76, def: 65, phy: 70 },
        { name: "Ardon Jashari", pos: "MF", club: "Luzern", ovr: 74, pac: 70, sho: 65, pas: 74, dri: 72, def: 70, phy: 72 },
        { name: "C. Fassnacht", pos: "MF", club: "Norwich", ovr: 74, pac: 76, sho: 72, pas: 72, dri: 74, def: 55, phy: 70 },
        { name: "Johan Manzambi", pos: "MF", club: "Freiburg", ovr: 65, pac: 70, sho: 60, pas: 65, dri: 68, def: 55, phy: 62 },
        { name: "Noah Okafor", pos: "FW", club: "Milan", ovr: 78, pac: 88, sho: 76, pas: 72, dri: 80, def: 40, phy: 72 },
        { name: "Dan Ndoye", pos: "FW", club: "Bologna", ovr: 75, pac: 86, sho: 70, pas: 70, dri: 78, def: 45, phy: 68 },
        { name: "Zeki Amdouni", pos: "FW", club: "Burnley", ovr: 75, pac: 78, sho: 76, pas: 70, dri: 76, def: 40, phy: 70 }
      ]
    },
    KOR: {
      formation: "4-3-3",
      players: [
        { name: "Kim Seung-gyu", pos: "GK", no: 1, club: "Al-Shabab", ovr: 75, pac: 68, sho: 25, pas: 65, dri: 68, def: 76, phy: 72, x: 50, y: 12 },
        { name: "Kim Moon-hwan", pos: "DF", no: 2, club: "Al-Duhail", ovr: 72, pac: 80, sho: 55, pas: 68, dri: 70, def: 68, phy: 70, x: 85, y: 35 },
        { name: "Kim Min-jae", pos: "DF", no: 3, club: "Bayern Munich", ovr: 84, pac: 82, sho: 40, pas: 68, dri: 65, def: 85, phy: 86, x: 65, y: 28 },
        { name: "Kim Tae-hyeon", pos: "DF", no: 4, club: "Sagan Tosu", ovr: 68, pac: 68, sho: 35, pas: 60, dri: 58, def: 68, phy: 70, x: 35, y: 28 },
        { name: "Seol Young-woo", pos: "DF", no: 13, club: "Ulsan HD", ovr: 72, pac: 78, sho: 50, pas: 68, dri: 70, def: 68, phy: 68, x: 15, y: 35 },
        { name: "Hwang In-beom", pos: "MF", no: 6, club: "Crvena Zvezda", ovr: 76, pac: 72, sho: 70, pas: 78, dri: 76, def: 70, phy: 72, x: 50, y: 50 },
        { name: "Lee Jae-sung", pos: "MF", no: 8, club: "Mainz 05", ovr: 77, pac: 74, sho: 72, pas: 76, dri: 78, def: 68, phy: 74, x: 30, y: 55 },
        { name: "Lee Kang-in", pos: "MF", no: 10, club: "PSG", ovr: 80, pac: 78, sho: 76, pas: 82, dri: 84, def: 45, phy: 65, x: 70, y: 55 },
        { name: "Son Heung-min", pos: "FW", no: 7, club: "Tottenham", ovr: 87, pac: 88, sho: 88, pas: 82, dri: 86, def: 45, phy: 72, x: 80, y: 80 },
        { name: "Cho Gue-sung", pos: "FW", no: 9, club: "Midtjylland", ovr: 75, pac: 72, sho: 76, pas: 65, dri: 70, def: 45, phy: 80, x: 50, y: 85 },
        { name: "Hwang Hee-chan", pos: "FW", no: 11, club: "Wolves", ovr: 78, pac: 86, sho: 78, pas: 72, dri: 80, def: 45, phy: 76, x: 20, y: 80 }
      ],
      bench: [
        { name: "Song Bum-keun", pos: "GK", club: "Shonan Bellmare", ovr: 70, pac: 65, sho: 20, pas: 60, dri: 62, def: 70, phy: 72 },
        { name: "Jo Hyeon-woo", pos: "GK", club: "Ulsan HD", ovr: 74, pac: 68, sho: 25, pas: 64, dri: 66, def: 75, phy: 70 },
        { name: "Park Jin-seob", pos: "DF", club: "Jeonbuk", ovr: 70, pac: 65, sho: 50, pas: 65, dri: 62, def: 70, phy: 75 },
        { name: "Jens Castrop", pos: "DF", club: "Nurnberg", ovr: 70, pac: 75, sho: 60, pas: 68, dri: 70, def: 65, phy: 72 },
        { name: "Lee Ki-hyuk", pos: "DF", club: "Jeju United", ovr: 68, pac: 72, sho: 45, pas: 65, dri: 65, def: 65, phy: 68 },
        { name: "Lee Tae-seok", pos: "DF", club: "FC Seoul", ovr: 66, pac: 76, sho: 40, pas: 62, dri: 65, def: 64, phy: 65 },
        { name: "Lee Han-beom", pos: "DF", club: "Midtjylland", ovr: 68, pac: 65, sho: 35, pas: 60, dri: 58, def: 68, phy: 72 },
        { name: "Cho Yu-min", pos: "DF", club: "Sharjah", ovr: 70, pac: 68, sho: 40, pas: 62, dri: 60, def: 70, phy: 74 },
        { name: "L. Dong-gyeong", pos: "MF", club: "Ulsan HD", ovr: 72, pac: 74, sho: 72, pas: 74, dri: 75, def: 55, phy: 65 },
        { name: "Eom Ji-sung", pos: "MF", club: "Gwangju FC", ovr: 70, pac: 80, sho: 68, pas: 68, dri: 74, def: 40, phy: 60 },
        { name: "Paik Seung-ho", pos: "MF", club: "Birmingham", ovr: 74, pac: 72, sho: 70, pas: 75, dri: 74, def: 70, phy: 72 },
        { name: "Bae Jun-ho", pos: "MF", club: "Stoke City", ovr: 70, pac: 76, sho: 65, pas: 70, dri: 74, def: 45, phy: 60 },
        { name: "Yang Hyun-jun", pos: "MF", club: "Celtic", ovr: 72, pac: 80, sho: 68, pas: 70, dri: 76, def: 40, phy: 65 },
        { name: "Kim Jing-yu", pos: "MF", club: "Jeonbuk", ovr: 70, pac: 70, sho: 65, pas: 72, dri: 70, def: 65, phy: 68 },
        { name: "Oh Hyeon-gyu", pos: "FW", club: "Celtic", ovr: 73, pac: 76, sho: 74, pas: 65, dri: 72, def: 35, phy: 78 }
      ]
    },
    TUN: {
      formation: "4-3-3",
      players: [
        { name: "Aymen Dahmen", pos: "GK", no: 1, club: "CS Sfaxien", ovr: 72, pac: 68, sho: 25, pas: 65, dri: 68, def: 74, phy: 70, x: 50, y: 12 },
        { name: "Yan Valery", pos: "DF", no: 2, club: "Angers", ovr: 72, pac: 78, sho: 50, pas: 65, dri: 70, def: 70, phy: 74, x: 85, y: 35 },
        { name: "Montassar Talbi", pos: "DF", no: 3, club: "Lorient", ovr: 76, pac: 68, sho: 40, pas: 60, dri: 65, def: 78, phy: 78, x: 65, y: 28 },
        { name: "Yassine Meriah", pos: "DF", no: 4, club: "ES Tunis", ovr: 74, pac: 65, sho: 45, pas: 65, dri: 60, def: 75, phy: 76, x: 35, y: 28 },
        { name: "Ali Maâloul", pos: "DF", no: 12, club: "Al Ahly", ovr: 75, pac: 78, sho: 65, pas: 76, dri: 74, def: 70, phy: 72, x: 15, y: 35 },
        { name: "Ellyes Skhiri", pos: "MF", no: 6, club: "E. Frankfurt", ovr: 80, pac: 70, sho: 65, pas: 76, dri: 76, def: 80, phy: 82, x: 50, y: 50 },
        { name: "Aïssa Laïdouni", pos: "MF", no: 14, club: "Union Berlin", ovr: 76, pac: 72, sho: 68, pas: 74, dri: 75, def: 74, phy: 80, x: 30, y: 55 },
        { name: "Hannibal Mejbri", pos: "MF", no: 8, club: "Sevilla", ovr: 74, pac: 76, sho: 65, pas: 74, dri: 76, def: 60, phy: 65, x: 70, y: 55 },
        { name: "Youssef Msakni", pos: "FW", no: 7, club: "Al-Arabi", ovr: 75, pac: 78, sho: 74, pas: 76, dri: 78, def: 40, phy: 68, x: 80, y: 80 },
        { name: "Issam Jebali", pos: "FW", no: 9, club: "Gamba Osaka", ovr: 72, pac: 74, sho: 72, pas: 65, dri: 70, def: 35, phy: 78, x: 50, y: 85 },
        { name: "T. Khenissi", pos: "FW", no: 11, club: "Kuwait SC", ovr: 70, pac: 76, sho: 72, pas: 60, dri: 68, def: 30, phy: 72, x: 20, y: 80 }
      ],
      bench: [
        { name: "A. Mathlouthi", pos: "GK", club: "Etoile Sahel", ovr: 68, pac: 65, sho: 20, pas: 60, dri: 62, def: 68, phy: 66 },
        { name: "Bechir Ben Saïd", pos: "GK", club: "US Monastir", ovr: 70, pac: 66, sho: 22, pas: 62, dri: 65, def: 70, phy: 68 },
        { name: "Nader Ghandri", pos: "DF", club: "Club Africain", ovr: 70, pac: 65, sho: 45, pas: 65, dri: 62, def: 72, phy: 78 },
        { name: "Mohamed Dräger", pos: "DF", club: "Basel", ovr: 72, pac: 80, sho: 55, pas: 68, dri: 70, def: 68, phy: 70 },
        { name: "Wajdi Kechrida", pos: "DF", club: "Atromitos", ovr: 72, pac: 82, sho: 50, pas: 65, dri: 72, def: 68, phy: 68 },
        { name: "Ali Abdi", pos: "DF", club: "Caen", ovr: 74, pac: 80, sho: 60, pas: 70, dri: 72, def: 70, phy: 74 },
        { name: "Dylan Bronn", pos: "DF", club: "Servette", ovr: 74, pac: 68, sho: 45, pas: 60, dri: 62, def: 75, phy: 76 },
        { name: "Ferjani Sassi", pos: "MF", club: "Al-Gharafa", ovr: 72, pac: 65, sho: 68, pas: 74, dri: 72, def: 65, phy: 72 },
        { name: "Ben Ouanes", pos: "MF", club: "Kasımpaşa", ovr: 72, pac: 78, sho: 65, pas: 70, dri: 74, def: 65, phy: 70 },
        { name: "G. Chaaleli", pos: "MF", club: "ES Tunis", ovr: 74, pac: 70, sho: 65, pas: 74, dri: 72, def: 70, phy: 74 },
        { name: "A. Ben Slimane", pos: "MF", club: "Sheffield Utd", ovr: 70, pac: 72, sho: 65, pas: 70, dri: 72, def: 65, phy: 72 },
        { name: "A. Ben Slimane 2", pos: "MF", club: "Sheffield Utd", ovr: 70, pac: 72, sho: 65, pas: 70, dri: 72, def: 65, phy: 72 },
        { name: "Ellyes Achouri", pos: "FW", club: "FC Copenhagen", ovr: 75, pac: 84, sho: 70, pas: 72, dri: 78, def: 40, phy: 65 },
        { name: "S. Jaziri", pos: "FW", club: "Zamalek", ovr: 72, pac: 78, sho: 72, pas: 65, dri: 70, def: 35, phy: 74 },
        { name: "Naïm Sliti", pos: "FW", club: "Al-Ahli SC", ovr: 76, pac: 78, sho: 74, pas: 76, dri: 80, def: 40, phy: 65 }
      ]
    }
  }
};
