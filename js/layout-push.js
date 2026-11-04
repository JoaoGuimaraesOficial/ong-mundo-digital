// ============================================================
// LAYOUT-PUSH.JS
// Função: carregar header.html e footer.html em TODAS as páginas
// via fetch(), evitando repetir o mesmo HTML em cada arquivo.
// Também ajusta links/imagens e dispara o evento "layoutLoaded".
// ============================================================

// Carrega um arquivo HTML dentro de um elemento da página
// "async" permite usar "await" para esperar o arquivo ser baixado
// Parâmetros:
//   arquivo → caminho do HTML a carregar (ex.: "layout/header.html")
//   seletor → seletor CSS do elemento onde inserir (ex.: "#header")
async function include(arquivo, seletor) {
  // Procura na página o elemento onde o conteúdo será colocado (ex.: #header)
  const elemento = document.querySelector(seletor);
  // Se o elemento não existir, não há onde inserir: encerra devolvendo null
  if (!elemento) return null;

  try {
    // Faz a requisição do arquivo HTML (header.html ou footer.html)
    // await: espera a resposta chegar antes de continuar
    const resposta = await fetch(arquivo);
    // Se o servidor respondeu com erro (ex.: 404), lança um erro manualmente
    // resposta.ok é true para status 200-299, false para 404, 500 etc.
    if (!resposta.ok) throw new Error(`Erro ao carregar ${arquivo}`);
    // Lê o conteúdo como texto e coloca dentro do elemento
    // innerHTML substitui TODO o conteúdo interno do elemento pelo HTML recebido
    elemento.innerHTML = await resposta.text();
    // Devolve o elemento já preenchido para ser usado depois
    return elemento;
  } catch (erro) {
    // Em caso de falha, mostra o erro no console e devolve null
    // (o try/catch evita que o erro quebre o resto do script)
    console.error(erro);
    return null;
  }
}

// Executa quando o HTML da página termina de carregar
// DOMContentLoaded: dispara quando o HTML terminou de ser lido,
// antes de imagens e CSS externos terminarem de carregar.
// A função é async porque usa await dentro.
window.addEventListener("DOMContentLoaded", async () => {
  // Verifica se a página atual está dentro da pasta /content/
  // window.location.pathname devolve o caminho da URL (ex.: "/content/sobre.html")
  // .includes("/content/") retorna true se encontrar esse trecho
  const estaEmContent = window.location.pathname.includes("/content/");
  // Define o prefixo dos caminhos: "../" se estiver em /content/, "./" se estiver na raiz
  // OPERADOR TERNÁRIO: condição ? valorSeTrue : valorSeFalse
  const basePath = estaEmContent ? "../" : "./";
  // Carrega o cabeçalho e o rodapé nos seus espaços (#header e #footer)
  // await: espera cada include() terminar antes de seguir
  // header e footer recebem o ELEMENTO preenchido (ou null se falhou)
  const header = await include(`${basePath}layout/header.html`, "#header");
  const footer = await include(`${basePath}layout/footer.html`, "#footer");

  // Mapa: nome da página (data-page) -> caminho do arquivo
  // Chave: valor do atributo data-page no HTML (ex.: data-page="sobre")
  // Valor: caminho relativo à raiz do projeto
  const paginas = {
    index: "index.html",
    sobre: "content/sobre.html",
    projetos: "content/projetos.html",
    contato: "content/contato.html",
  };

  // Repete o mesmo ajuste de links para o header e para o footer
  // [header, footer] é um array; forEach percorre cada componente
  [header, footer].forEach((componente) => {
    // Se o componente não carregou (null), pula
    // (evita erro de "cannot read property of null")
    if (!componente) return;

    // Links com data-page: define o href correto a partir do mapa acima
    // querySelectorAll("[data-page]") pega TODOS os elementos com esse atributo
    componente.querySelectorAll("[data-page]").forEach((link) => {
      // link.dataset.page lê o valor do atributo data-page
      // (data-page="sobre" → link.dataset.page === "sobre")
      const pagina = link.dataset.page;
      // Se a página existe no mapa, define o href com o prefixo correto
      // Ex.: se está em /content/, vira "../content/sobre.html"
      //      se está na raiz, vira "./content/sobre.html"
      if (paginas[pagina]) link.href = basePath + paginas[pagina];
    });

    // Links com data-section: apontam para uma seção (âncora) de alguma página
    // Ex.: <a data-section="como-ajudar">Doe agora</a>
    componente.querySelectorAll("[data-section]").forEach((link) => {
      const secao = link.dataset.section;
      // "como-ajudar" fica na página de contato; as demais seções ficam na home
      // Se for "como-ajudar" → content/contato.html#como-ajudar
      // Senão → index.html#nome-da-secao
      link.href = secao === "como-ajudar"
        ? `${basePath}content/contato.html#como-ajudar`
        : `${basePath}index.html#${secao}`;
    });

    // Imagens com data-asset: define o src com o prefixo de caminho correto
    // Útil para imagens no header/footer que precisam de "../assets/..." ou "./assets/..."
    componente.querySelectorAll("[data-asset]").forEach((asset) => {
      asset.src = basePath + asset.dataset.asset;
    });
  });

  // Atualiza o ano do rodapé com o ano atual
  // footer?.querySelector: o "?." (optional chaining) evita erro se footer for null
  // (se footer não carregou, a expressão inteira vira undefined sem quebrar)
  const ano = footer?.querySelector("#footer-year");
  // new Date().getFullYear() devolve o ano atual (ex.: 2026)
  if (ano) ano.textContent = new Date().getFullYear();

  // Ativa a animação de entrada da barra de navegação (classe "visible")
  // requestAnimationFrame espera o navegador desenhar antes de aplicar a classe
  // (garante que a transição CSS seja percebida — sem isso, a classe poderia
  // ser aplicada antes do navegador pintar o estado inicial)
  const navbar = header?.querySelector(".navbar");
  if (navbar) requestAnimationFrame(() => navbar.classList.add("visible"));

  // Dispara um evento avisando que o layout foi carregado
  // (o animation.js escuta isso para ativar o menu mobile)
  // new Event("layoutLoaded") cria um evento customizado (não existe nativamente)
  // document.dispatchEvent dispara o evento no documento inteiro
  // Quem tiver document.addEventListener("layoutLoaded", ...) será notificado
  document.dispatchEvent(new Event("layoutLoaded"));
});