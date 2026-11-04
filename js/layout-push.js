// Carrega um arquivo HTML dentro de um elemento da página
// "async" permite usar "await" para esperar o arquivo ser baixado
async function include(arquivo, seletor) {
  // Procura na página o elemento onde o conteúdo será colocado (ex.: #header)
  const elemento = document.querySelector(seletor);
  // Se o elemento não existir, não há onde inserir: encerra devolvendo null
  if (!elemento) return null;

  try {
    // Faz a requisição do arquivo HTML (header.html ou footer.html)
    const resposta = await fetch(arquivo);
    // Se o servidor respondeu com erro (ex.: 404), lança um erro manualmente
    if (!resposta.ok) throw new Error(`Erro ao carregar ${arquivo}`);
    // Lê o conteúdo como texto e coloca dentro do elemento
    elemento.innerHTML = await resposta.text();
    // Devolve o elemento já preenchido para ser usado depois
    return elemento;
  } catch (erro) {
    // Em caso de falha, mostra o erro no console e devolve null
    console.error(erro);
    return null;
  }
}

// Executa quando o HTML da página termina de carregar
window.addEventListener("DOMContentLoaded", async () => {
  // Verifica se a página atual está dentro da pasta /content/
  const estaEmContent = window.location.pathname.includes("/content/");
  // Define o prefixo dos caminhos: "../" se estiver em /content/, "./" se estiver na raiz
  const basePath = estaEmContent ? "../" : "./";
  // Carrega o cabeçalho e o rodapé nos seus espaços (#header e #footer)
  const header = await include(`${basePath}layout/header.html`, "#header");
  const footer = await include(`${basePath}layout/footer.html`, "#footer");

  // Mapa: nome da página (data-page) -> caminho do arquivo
  const paginas = {
    index: "index.html",
    sobre: "content/sobre.html",
    projetos: "content/projetos.html",
    contato: "content/contato.html",
    creditos: "content/creditos.html",
  };

  // Repete o mesmo ajuste de links para o header e para o footer
  [header, footer].forEach((componente) => {
    // Se o componente não carregou (null), pula
    if (!componente) return;

    // Links com data-page: define o href correto a partir do mapa acima
    componente.querySelectorAll("[data-page]").forEach((link) => {
      const pagina = link.dataset.page;
      if (paginas[pagina]) link.href = basePath + paginas[pagina];
    });

    // Links com data-section: apontam para uma seção (âncora) de alguma página
    componente.querySelectorAll("[data-section]").forEach((link) => {
      const secao = link.dataset.section;
      // "como-ajudar" fica na página de contato; as demais seções ficam na home
      link.href = secao === "como-ajudar"
        ? `${basePath}content/contato.html#como-ajudar`
        : `${basePath}index.html#${secao}`;
    });

    // Imagens com data-asset: define o src com o prefixo de caminho correto
    componente.querySelectorAll("[data-asset]").forEach((asset) => {
      asset.src = basePath + asset.dataset.asset;
    });
  });

  // Atualiza o ano do rodapé com o ano atual
  const ano = footer?.querySelector("#footer-year");
  if (ano) ano.textContent = new Date().getFullYear();

  // Ativa a animação de entrada da barra de navegação (classe "visible")
  // requestAnimationFrame espera o navegador desenhar antes de aplicar a classe
  const navbar = header?.querySelector(".navbar");
  if (navbar) requestAnimationFrame(() => navbar.classList.add("visible"));

  // Dispara um evento avisando que o layout foi carregado
  // (o animation.js escuta isso para ativar o menu mobile)
  document.dispatchEvent(new Event("layoutLoaded"));
});
