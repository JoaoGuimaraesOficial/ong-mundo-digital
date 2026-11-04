// ---------- 1) PAINEL DO SOBRE (#btn-info / #painel-info) ----------
function iniciarPainelSobre() {
  const botao = document.getElementById("btn-info");
  const painel = document.getElementById("painel-info");

  // Se a página não for a Sobre (ou o HTML estiver incompleto), não faz nada
  if (!botao || !painel) return;

  botao.addEventListener("click", () => {
    // Lê o estado atual do aria-expanded (fonte da verdade)
    const aberto = botao.getAttribute("aria-expanded") === "true";

    if (aberto) {
      // Estava aberto -> fecha
      painel.style.display = "none";
      botao.setAttribute("aria-expanded", "false");
      botao.textContent = "Mostrar como podemos ajudar você";
    } else {
      // Estava fechado -> abre
      painel.style.display = "block";
      botao.setAttribute("aria-expanded", "true");
      botao.textContent = "Ocultar informações";
    }
  });
}

// ---------- 2) PAINÉIS DE MISSÃO DOS PROJETOS ----------
function iniciarMissoes() {
  const botoes = document.querySelectorAll(".btn-missao");

  botoes.forEach((botao) => {
    const painelId = botao.getAttribute("aria-controls");
    const painel = painelId ? document.getElementById(painelId) : null;

    if (!painel) return;

    botao.addEventListener("click", () => {
      const aberto = botao.getAttribute("aria-expanded") === "true";

      botao.setAttribute("aria-expanded", String(!aberto));
      botao.textContent = aberto
        ? "Ver missão do projeto"
        : "Ocultar missão do projeto";
      painel.hidden = aberto;
    });
  });
}

// Os botões estão no HTML de cada página (não vêm do layout-push.js),
// então DOMContentLoaded é suficiente.
document.addEventListener("DOMContentLoaded", () => {
  iniciarPainelSobre();
  iniciarMissoes();
});