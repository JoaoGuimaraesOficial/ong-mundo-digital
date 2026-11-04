// ============================================================
// INTERACAO.JS
// Função: controlar dois tipos de painel que abrem/fecham ao clicar:
//   1) Painel da página Sobre (#btn-info / #painel-info)
//   2) Painéis de missão dos Projetos (.btn-missao / .missao-panel)
// Ambos usam o mesmo padrão: um botão alterna o estado do painel.
// ============================================================

// ---------- 1) PAINEL DO SOBRE (#btn-info / #painel-info) ----------
// Esta função é chamada no DOMContentLoaded (final do arquivo).
// Ela só faz algo se a página tiver o botão #btn-info e o painel #painel-info
// (ou seja, se estiver na página Sobre).
function iniciarPainelSobre() {
  // getElementById procura UM elemento pelo id.
  // Retorna null se não existir (ex.: na home, no contato, nos projetos).
  const botao = document.getElementById("btn-info");
  const painel = document.getElementById("painel-info");

  // Se a página não for a Sobre (ou o HTML estiver incompleto), não faz nada
  // "if (!botao || !painel) return;" = se QUALQUER UM for null, sai da função.
  // Isso evita erro de "Cannot read property of null" nas outras páginas,
  // onde esses elementos não existem.
  if (!botao || !painel) return;

  // addEventListener("click", função) fica "escutando" cliques no botão.
  // A função de callback roda a cada clique.
  botao.addEventListener("click", () => {
    // Lê o estado atual do aria-expanded (fonte da verdade)
    // getAttribute("aria-expanded") devolve uma STRING ("true" ou "false")
    // Comparar com "true" (string) evita confusão com o boolean true.
    // A variável "aberto" será true se o painel estiver visível.
    const aberto = botao.getAttribute("aria-expanded") === "true";

    if (aberto) {
      // Estava aberto -> fecha
      // style.display = "none" esconde o painel (equivale a CSS display: none).
      // Como o painel tem display:none inline no HTML, usar style.display
      // é a forma correta de mostrar/esconder (o atributo inline tem prioridade).
      painel.style.display = "none";
      // Atualiza o estado para leitores de tela
      botao.setAttribute("aria-expanded", "false");
      // Troca o texto do botão para refletir a ação disponível
      botao.textContent = "Mostrar como podemos ajudar você";
    } else {
      // Estava fechado -> abre
      painel.style.display = "block";   // "block" = visível
      botao.setAttribute("aria-expanded", "true");
      botao.textContent = "Ocultar informações";
    }
  });
}

// ---------- 2) PAINÉIS DE MISSÃO DOS PROJETOS ----------
// Diferente do painel do Sobre, aqui há VÁRIOS botões (um por projeto).
// Cada botão controla SEU próprio painel, identificado pelo aria-controls.
function iniciarMissoes() {
  // querySelectorAll(".btn-missao") devolve uma NodeList com todos
  // os botões que têm a classe .btn-missao (3 na página de projetos).
  const botoes = document.querySelectorAll(".btn-missao");

  // forEach percorre cada botão individualmente.
  // Para cada botão, configuramos seu próprio listener de clique.
  botoes.forEach((botao) => {
    // Lê o atributo aria-controls do botão (ex.: "missao-primeiros-passos").
    // Esse atributo diz QUAL elemento o botão controla.
    const painelId = botao.getAttribute("aria-controls");
    // Busca o painel correspondente pelo id.
    // O ternário evita erro se aria-controls estiver ausente:
    // se painelId for null, painel também será null.
    const painel = painelId ? document.getElementById(painelId) : null;

    // Se o painel não existir, ignora este botão e passa para o próximo.
    // (Não quebra o loop, só pula este item.)
    if (!painel) return;

    // Configura o listener de clique DESTE botão específico.
    // Cada iteração do forEach cria uma closure que lembra
    // seu próprio "botao" e "painel" — não há confusão entre os 3 projetos.
    botao.addEventListener("click", () => {
      // Lê o estado atual pelo aria-expanded (mesma lógica do painel do Sobre)
      const aberto = botao.getAttribute("aria-expanded") === "true";

      // Inverte o estado e converte para string:
      // String(!aberto) → se aberto era true, vira "false"; se era false, vira "true".
      // (setAttribute sempre grava string.)
      botao.setAttribute("aria-expanded", String(!aberto));
      // Troca o texto do botão conforme o novo estado.
      // Se estava aberto, o botão agora deve dizer "Ver missão do projeto".
      // Se estava fechado, o botão agora deve dizer "Ocultar missão do projeto".
      botao.textContent = aberto
        ? "Ver missão do projeto"
        : "Ocultar missão do projeto";
      // painel.hidden = true esconde; false mostra.
      // Aqui usamos o atributo "hidden" (não style.display) porque o HTML
      // dos painéis de missão usa <div hidden> em vez de style="display:none".
      painel.hidden = aberto;
    });
  });
}

// Os botões estão no HTML de cada página (não vêm do layout-push.js),
// então DOMContentLoaded é suficiente.
// Se os botões viessem do header/footer injetados, precisaríamos escutar
// "layoutLoaded" em vez de (ou além de) "DOMContentLoaded".
document.addEventListener("DOMContentLoaded", () => {
  // Chama as duas funções de inicialização.
  // Cada uma verifica se os elementos existem na página e, se não existirem,
  // simplesmente retornam sem erro. É seguro chamar as duas em qualquer página.
  iniciarPainelSobre();
  iniciarMissoes();
});