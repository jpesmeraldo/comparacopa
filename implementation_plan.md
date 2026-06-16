# Plano de Implementação - Comparacopa 2026 (Estética Anos 80 Retro-Brutalista)

O **Comparacopa** é uma aplicação web interativa projetada para comparar seleções da Copa do Mundo de 2026. O design visual será totalmente inspirado na **estética vintage/retro dos anos 80**, utilizando elementos do **Neo-brutalisno** (bordas grossas pretas, sombras sólidas projetadas, tipografia marcante) com uma leve inspiração no estilo de cartas e tabuleiros do site **7a0.com.br/play**.

A paleta de cores será baseada nas cores clássicas da Seleção Brasileira em tons vintage e neon:
- **Verde**: Verde Floresta Escuro (Fundo principal), Verde Canário/Neon (Destaques).
- **Amarelo**: Amarelo Ouro Vintage (Fundos de cards, botões de ação principal).
- **Azul**: Azul Cobalto Retrô (Destaques, cabeçalhos, botões secundários).
- **Branco**: Off-White (Textos e áreas de contraste para leitura limpa).
- **Preto**: Preto puro (Bordas espessas de 3px, sombras duras).

## Mudanças Propostas

Criaremos os seguintes arquivos no diretório raiz do projeto:

### Componentes e Arquivos Frontend

---

#### [NEW] index.html
- Estrutura HTML5 semântica para a aplicação.
- Painéis organizados em formato de "Fichas" de Álbum de Figurinhas dos Anos 80.
- Seções:
  1. **Cabeçalho Retrô**: Logo estilo letreiro de fliperama/Neon e Seletores de Times como "Botões de Futebol de Mesa".
  2. **Comparador Geral**: Estatísticas comparativas dos últimos 100 jogos modeladas como um placar eletrônico antigo (fontes digitais/monospace).
  3. **Campo Tático Vintage**: Tabuleiro de futebol verde retro-futurista, exibindo os jogadores em formato de "Botão" (Futebol de Botão) ou cartas Panini antigas com suas notas de Overall.
  4. **Painel do Torneio (Copa 2026)**: Grade de grupos reais (12 abas de A a L) e chaveamento do mata-mata (Bracket) com design de jornal esportivo antigo ou infográfico de TV dos anos 80.
  5. **Simulador de Confrontos**: Placar analógico piscando e feed de lances simulando transmissão de rádio AM antiga ("Gooool!").

#### [NEW] style.css
- Design system completo com variáveis de cores vintage baseadas na bandeira brasileira:
  ```css
  --retro-green: #0a3d20;
  --neon-green: #00ff66;
  --retro-yellow: #f1c40f;
  --retro-blue: #1b4f72;
  --off-white: #f5f5f0;
  --border-dark: #111111;
  ```
- Estilo **Neo-Brutalista**:
  - `border: 3px solid var(--border-dark);`
  - `box-shadow: 6px 6px 0px var(--border-dark);`
  - Transições de clique simulando o "aperto de botões físicos" (`transform: translate(2px, 2px); box-shadow: 4px 4px 0px var(--border-dark);`).
- Linhas do campo de futebol feitas em CSS com linhas de cal brancas tracejadas e círculos retrô.
- Rolagem horizontal estilizada para o chaveamento.

#### [NEW] data.js
- Base de dados contendo as seleções da Copa do Mundo 2026.
- Dados das seleções do G8 (Brasil, Argentina, França, Espanha, Inglaterra, Alemanha, Portugal, Uruguai) com o histórico de 100 jogos.
- Definição dos **12 grupos reais** com todas as 48 seleções e o chaveamento do mata-mata.
- Lista completa de jogadores com atributos clássicos retrô.

#### [NEW] app.js
- Lógica de controle do Comparacopa.
- Motor de simulação de partidas com comentários estilo "Rádio Retro".
- Renderização dinâmica do mata-mata e classificação de grupos interativa.

## Plano de Verificação

### Testes Manuais
- Verificar se o visual Neo-Brutalist se comporta bem em telas de celulares (ajustando sombras e bordas para não poluir).
- Testar a navegação tática e a simulação de partidas.
