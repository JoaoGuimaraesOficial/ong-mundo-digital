// Anima os elementos conforme aparecem na tela
function iniciarAnimacoes() {
  const elementos = document.querySelectorAll("main section, .card-curso");

  elementos.forEach((elemento) => {
    elemento.classList.add("reveal");
  });

  if (!("IntersectionObserver" in window)) {
    elementos.forEach((elemento) => {
      elemento.classList.add("visible");
    });

    return;
  }

  const observador = new IntersectionObserver(
    (entradas, observer) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visible");
          observer.unobserve(entrada.target);
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  elementos.forEach((elemento) => {
    observador.observe(elemento);
  });
}

// Ativa o menu mobile depois que o header for carregado
function iniciarMenu() {
  const botao = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu");

  if (!botao || !menu) return;

  botao.addEventListener("click", () => {
    const aberto = menu.classList.toggle("open");

    botao.setAttribute("aria-expanded", aberto);
    botao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      botao.setAttribute("aria-expanded", "false");
      botao.setAttribute("aria-label", "Abrir menu");
    });
  });
}

// Inicialização
document.addEventListener("DOMContentLoaded", iniciarAnimacoes);
document.addEventListener("layoutLoaded", iniciarMenu);
