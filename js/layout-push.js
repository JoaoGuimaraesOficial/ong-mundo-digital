// Carrega um componente HTML
async function include(arquivo, elemento) {
  const resposta = await fetch(arquivo);
  const conteudo = await resposta.text();

  document.querySelector(elemento).innerHTML = conteudo;

  return document.querySelector(elemento);
}

// Carrega o Header e o Footer
window.addEventListener("DOMContentLoaded", async () => {
  const header = await include("../layout/header.html", "#header");
  const footer = await include("../layout/footer.html", "#footer");

  // Animação do Header
  const navbar = header.querySelector(".navbar");

  if (navbar) {
    requestAnimationFrame(() => {
      navbar.classList.add("visible");
    });
  }

  // Animação do Footer
  const footerElement = footer.querySelector(".footer");

  if (footerElement) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      },
    );

    observer.observe(footerElement);
  }
});
