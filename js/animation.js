// Anima os elementos conforme aparecem na tela
function iniciarAnimacoes() {
  // Seleciona todas as seções da página e os cards de curso
  const elementos = document.querySelectorAll("main section, .card-curso");

  // Adiciona a classe "reveal" (começa invisível e deslocado, definido no CSS)
  elementos.forEach((elemento) => {
    elemento.classList.add("reveal");
  });

  // Se o navegador não suporta IntersectionObserver, mostra tudo de uma vez
  if (!("IntersectionObserver" in window)) {
    elementos.forEach((elemento) => {
      elemento.classList.add("visible");
    });

    return;
  }

  // O observador avisa quando um elemento entra na área visível da tela
  const observador = new IntersectionObserver(
    (entradas, observer) => {
      entradas.forEach((entrada) => {
        // Se o elemento está visível...
        if (entrada.isIntersecting) {
          // ...adiciona "visible", que dispara a animação de aparecer
          entrada.target.classList.add("visible");
          // ...e para de observá-lo, para a animação acontecer só uma vez
          observer.unobserve(entrada.target);
        }
      });
    },
    {
      // A animação começa quando 10% do elemento aparece na tela
      threshold: 0.1,
    },
  );

  // Manda o observador vigiar cada elemento
  elementos.forEach((elemento) => {
    observador.observe(elemento);
  });
}

// Ativa o menu mobile depois que o header for carregado
function iniciarMenu() {
  // Botão "hambúrguer" e menu de navegação
  const botao = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu");

  // Se algum não existir, não faz nada
  if (!botao || !menu) return;

  // Ao clicar no botão, abre ou fecha o menu
  botao.addEventListener("click", () => {
    // toggle adiciona a classe "open" se não tiver, ou remove se tiver; devolve true/false
    const aberto = menu.classList.toggle("open");

    // Atualiza os atributos de acessibilidade conforme o estado
    botao.setAttribute("aria-expanded", aberto);
    botao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  });

  // Ao clicar em qualquer link do menu, fecha o menu (útil no celular)
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      botao.setAttribute("aria-expanded", "false");
      botao.setAttribute("aria-label", "Abrir menu");
    });
  });
}

// Inicialização
// As animações começam quando o HTML termina de carregar
document.addEventListener("DOMContentLoaded", iniciarAnimacoes);
// O menu só é ativado quando o layout-push.js avisa que o header já está na página
document.addEventListener("layoutLoaded", iniciarMenu);
