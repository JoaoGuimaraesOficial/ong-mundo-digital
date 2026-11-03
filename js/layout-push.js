
console.log("layout-push.js carregado!");

window.addEventListener("DOMContentLoaded", async () => {

  // Identifica a pasta principal do projeto
  const script = document.querySelector(
    'script[src*="layout-push.js"]'
  );

  const pastaProjeto = new URL("../", script.src);

  // Função responsável por carregar os arquivos HTML
  async function carregar(caminho, seletor) {
    const url = new URL(caminho, pastaProjeto);

    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error("Erro ao carregar: " + url.href);
    }

    const html = await resposta.text();

    const elemento = document.querySelector(seletor);

    if (!elemento) {
      throw new Error("Elemento não encontrado: " + seletor);
    }

    elemento.innerHTML = html;

    return elemento;
  }

  try {

    // Carrega o Header
    const header = await carregar(
      "layout/header.html",
      "#header"
    );

    // Ativa a animação do Header
    const navbar = header.querySelector(".navbar");

    if (navbar) {
      requestAnimationFrame(() => {
        navbar.classList.add("visible");
      });
    }

    // Carrega o Footer
    const footer = await carregar(
      "layout/footer.html",
      "#footer"
    );

    // Ativa a animação do Footer quando aparecer na tela
    const footerElement = footer.querySelector(".footer");

    if (footerElement) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1
      });

      observer.observe(footerElement);
    }

    console.log("Header e Footer carregados!");

  } catch (erro) {
    console.error("Erro ao carregar layout:", erro);
  }

});
