const botao = document.getElementById("btn-info");
const painel = document.getElementById("painel-info");

// Se a página não tiver esses elementos, sai sem erro
if (botao && painel) {
  function alternarPainel() {
    if (painel.style.display === "none") {
      painel.style.display = "block";
      botao.textContent = "Ocultar informações";
      botao.setAttribute("aria-expanded", "true");
    } else {
      painel.style.display = "none";
      botao.textContent = "Mostrar como podemos ajudar você";
      botao.setAttribute("aria-expanded", "false");
    }
  }

  botao.addEventListener("click", alternarPainel);
}