// Interações dos projetos: cada card abre e fecha a sua própria missão.
function iniciarMissoes() {
  const botoes = document.querySelectorAll(".btn-missao");

  botoes.forEach((botao) => {
    const painelId = botao.getAttribute("aria-controls");
    const painel = painelId ? document.getElementById(painelId) : null;

    if (!painel) return;

    botao.addEventListener("click", () => {
      const aberto = botao.getAttribute("aria-expanded") === "true";

      botao.setAttribute("aria-expanded", String(!aberto));
      botao.textContent = aberto ? "Ver missão do projeto" : "Ocultar missão do projeto";
      painel.hidden = aberto;
    });
  });
}

document.addEventListener("DOMContentLoaded", iniciarMissoes);
