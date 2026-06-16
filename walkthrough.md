# Walkthrough - Comparacopa 2026 (Estética Anos 80)

Concluímos o desenvolvimento da aplicação **Comparacopa 2026** com a estética retrô dos anos 80, inspirada no site *7a0.com.br/play* e aplicando cores da Seleção Brasileira em estilo Neo-Brutalista.

## Arquivos Criados

Os arquivos foram gravados diretamente na pasta independente do seu projeto:

1. [index.html](file:///Users/joaopauloesmeraldo/Dropbox/ANTIGRAVITY%20COMPARACOPA/index.html): Estrutura HTML5 semântica contendo as abas do Comparador/Simulador e Painel do Torneio.
2. [style.css](file:///Users/joaopauloesmeraldo/Dropbox/ANTIGRAVITY%20COMPARACOPA/style.css): Estilos baseados em variáveis HSL vintage do Brasil com bordas grossas pretas de 3px e sombras deslocadas sem desfoque (Neo-Brutalist), campo de futebol de feltro escuro e botões físicos de futebol de botão para os jogadores.
3. [data.js](file:///Users/joaopauloesmeraldo/Dropbox/ANTIGRAVITY%20COMPARACOPA/data.js): Base de dados contendo os elencos táticos detalhados das 8 seleções principais (Brasil, Argentina, França, Alemanha, Portugal, Inglaterra, Espanha, Uruguai) com atributos retro (PAC, SHO, PAS, DRI, DEF, PHY) e OVR, além dos 12 grupos oficiais da Copa de 2026 com 48 seleções e o chaveamento preliminar.
4. [app.js](file:///Users/joaopauloesmeraldo/Dropbox/ANTIGRAVITY%20COMPARACOPA/app.js): Lógica de renderização de cartas Panini no modal ao clicar nos botões de jogadores, gráfico de barras com estatísticas dos últimos 100 confrontos, tabela de classificação em tempo real e o simulador de rádio AM com narrativa dinâmica minuto a minuto.
5. [task.md](file:///Users/joaopauloesmeraldo/Dropbox/ANTIGRAVITY%20COMPARACOPA/task.md): Registro das tarefas concluídas do projeto.

## Recursos Visuais & Funcionais
- **Tema Anos 80**: Fundo de feltro verde texturizado de mesa de futebol retrô, fontes pixel/display digitais e botões interativos que "afundam" fisicamente quando clicados.
- **Transmissão Retro de Rádio AM**: Feed de narração em terminal estilo tela fósforo verde antiga, simulando lances e gritos de gol com base nas qualidades de ataque/defesa de cada país.
- **Tabela e Chaveamento**: Visualização dos 12 grupos e brackets do mata-mata, onde clicar em uma partida carrega instantaneamente as duas seleções para simulação direta.
- **Cartões Panini**: Ao clicar em qualquer jogador no campo tático, um modal no estilo de carta colecionável com visual envelhecido é exibido.
