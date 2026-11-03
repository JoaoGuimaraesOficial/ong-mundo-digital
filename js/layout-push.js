// Carrega um arquivo HTML dentro de um elemento da página
async function include(arquivo, seletor) {
  const elemento = document.querySelector(seletor);

  if (!elemento) return null;

  try {
    const resposta = await fetch(arquivo);

    if (!resposta.ok) {
      throw new Error(`Erro ao carregar ${arquivo}`);
    }

    elemento.innerHTML = await resposta.text();
    return elemento;
  } catch (erro) {
    console.error(erro);
    return null;
  }
}

// Carrega o header e o footer
window.addEventListener("DOMContentLoaded", async () => {
  const estaEmContent = window.location.pathname.includes("/content/");
  const basePath = estaEmContent ? "../" : "./";

  const header = await include(`${basePath}layout/header.html`, "#header");

  const footer = await include(`${basePath}layout/footer.html`, "#footer");

  const paginas = {
    index: "index.html",
    sobre: "content/sobre.html",
    projetos: "content/projetos.html",
    contato: "content/contato.html",
  };

  // Ajusta os links do header e do footer
  [header, footer].forEach((componente) => {
    if (!componente) return;

    componente.querySelectorAll("[data-page]").forEach((link) => {
      const pagina = link.dataset.page;

      if (paginas[pagina]) {
        link.href = basePath + paginas[pagina];
      }
    });

    componente.querySelectorAll("[data-section]").forEach((link) => {
      const secao = link.dataset.section;

      if (secao === "como-ajudar") {
        link.href = `${basePath}content/contato.html#como-ajudar`;
      } else {
        link.href = `${basePath}index.html#${secao}`;
      }
    });
  });

  // Atualiza o ano do footer
  const ano = footer?.querySelector("#footer-year");

  if (ano) {
    ano.textContent = new Date().getFullYear();
  }

  // Anima a entrada do header
  const navbar = header?.querySelector(".navbar");

  if (navbar) {
    requestAnimationFrame(() => {
      navbar.classList.add("visible");
    });
  }

  // Avisa que os componentes foram carregados
  document.dispatchEvent(new Event("layoutLoaded"));
});
