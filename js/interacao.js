// Interações dos projetos: cada card abre e fecha a sua própria missão.
function iniciarMissoes() {
  // Seleciona todos os botões "Ver missão do projeto"
  const botoes = document.querySelectorAll(".btn-missao");

  botoes.forEach((botao) => {
    // Lê no botão o id do painel que ele controla (atributo aria-controls)
    const painelId = botao.getAttribute("aria-controls");
    // Busca o painel correspondente na página
    const painel = painelId ? document.getElementById(painelId) : null;

    // Se não achou o painel, ignora este botão
    if (!painel) return;

    // Ao clicar no botão...
    botao.addEventListener("click", () => {
      // Descobre se o painel está aberto lendo o aria-expanded
      const aberto = botao.getAttribute("aria-expanded") === "true";

      // Inverte o estado (aberto vira fechado e vice-versa)
      botao.setAttribute("aria-expanded", String(!aberto));
      // Troca o texto do botão conforme o novo estado
      botao.textContent = aberto ? "Ver missão do projeto" : "Ocultar missão do projeto";
      // O atributo "hidden" esconde o painel: true = escondido, false = visível
      painel.hidden = aberto;
    });
  });
}

// Só liga os botões depois que o HTML terminou de carregar
document.addEventListener("DOMContentLoaded", iniciarMissoes);
