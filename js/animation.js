// ============================================================
// ANIMATION.JS
// Função: duas coisas independentes.
//   1) Animar elementos (fade + subida) quando entram na tela.
//   2) Ativar o menu hambúrguer do mobile.
// As animações usam IntersectionObserver; o menu depende do
// header injetado pelo layout-push.js (por isso "layoutLoaded").
// ============================================================

// Anima os elementos conforme aparecem na tela
function iniciarAnimacoes() {
  // Seleciona todas as seções da página e os cards de curso
  // querySelectorAll com vírgula = seletor composto:
  //   "main section"  → todas as <section> dentro de <main>
  //   ".card-curso"   → todos os elementos com a classe .card-curso
  // O resultado é uma NodeList (parecida com array).
  const elementos = document.querySelectorAll("main section, .card-curso");

  // Adiciona a classe "reveal" (começa invisível e deslocado, definido no CSS)
  // No CSS: .reveal { opacity: 0; transform: translateY(20px); }
  // forEach percorre cada elemento da NodeList.
  // classList.add adiciona a classe sem remover as que já existem.
  elementos.forEach((elemento) => {
    elemento.classList.add("reveal");
  });

  // Se o navegador não suporta IntersectionObserver, mostra tudo de uma vez
  // A verificação "('IntersectionObserver' in window)" é o jeito
  // seguro de checar suporte a uma API sem quebrar em navegadores antigos.
  if (!("IntersectionObserver" in window)) {
    // Fallback: adiciona .visible em TODOS os elementos
    // (o CSS de .reveal.visible volta opacity: 1 e transform: none)
    elementos.forEach((elemento) => {
      elemento.classList.add("visible");
    });

    // return encerra a função AQUI (sem executar o resto)
    return;
  }

  // O observador avisa quando um elemento entra na área visível da tela
  // IntersectionObserver observa elementos e dispara um callback
  // quando eles cruzam o viewport (ou uma área definida).
  const observador = new IntersectionObserver(
    // Callback: roda quando algum elemento observado cruza o threshold.
    //   entradas: array de objetos { target, isIntersecting, ... }
    //   observer: o próprio observador (para chamar unobserve etc.)
    (entradas, observer) => {
      entradas.forEach((entrada) => {
        // Se o elemento está visível...
        // isIntersecting é true quando o elemento cruzou o threshold
        // (ou seja, entrou na área visível).
        if (entrada.isIntersecting) {
          // ...adiciona "visible", que dispara a animação de aparecer
          // A transição CSS (opacity e transform) faz a animação acontecer.
          entrada.target.classList.add("visible");
          // ...e para de observá-lo, para a animação acontecer só uma vez
          // unobserve remove o elemento da lista de observados.
          // Assim, se ele sair e voltar à tela, NÃO re-anima.
          observer.unobserve(entrada.target);
        }
      });
    },
    {
      // A animação começa quando 10% do elemento aparece na tela
      // threshold: 0.1 significa 10% do elemento visível.
      // Valores comuns: 0 (assim que 1 pixel aparece), 1 (100% visível).
      threshold: 0.1,
    },
  );

  // Manda o observador vigiar cada elemento
  // observe adiciona o elemento à lista de observados.
  // Quando ele entrar na tela, o callback acima é disparado.
  elementos.forEach((elemento) => {
    observador.observe(elemento);
  });
}

// Ativa o menu mobile depois que o header for carregado
// Por que "depois"? Porque .nav-toggle e .nav-menu estão dentro
// do layout/header.html, que é injetado via fetch pelo layout-push.js.
// Quando DOMContentLoaded dispara, esses elementos AINDA NÃO existem.
// O layout-push.js dispara "layoutLoaded" quando termina de inserir.
function iniciarMenu() {
  // Botão "hambúrguer" e menu de navegação
  // querySelector devolve o PRIMEIRO elemento que casa com o seletor.
  // (Só existe um .nav-toggle e um .nav-menu na página.)
  const botao = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu");

  // Se algum não existir, não faz nada
  // (ex.: se o header falhou ao carregar, ou se estamos numa página sem header)
  if (!botao || !menu) return;

  // Ao clicar no botão, abre ou fecha o menu
  botao.addEventListener("click", () => {
    // toggle adiciona a classe "open" se não tiver, ou remove se tiver; devolve true/false
    // Se a classe foi ADICIONADA, retorna true.
    // Se foi REMOVIDA, retorna false.
    // No CSS: .nav-menu.open { display: block; } (no @media mobile)
    const aberto = menu.classList.toggle("open");

    // Atualiza os atributos de acessibilidade conforme o estado
    // aria-expanded: "true" = menu aberto; "false" = menu fechado.
    // O valor é convertido automaticamente para string pelo setAttribute.
    botao.setAttribute("aria-expanded", aberto);
    // aria-label: leitor de tela lê "Fechar menu" quando aberto,
    // "Abrir menu" quando fechado.
    botao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  });

  // Ao clicar em qualquer link do menu, fecha o menu (útil no celular)
  // Sem isso, ao clicar em "Sobre" o menu ficaria aberto por cima do conteúdo.
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
// Os elementos animados (main section, .card-curso) estão no HTML da página,
// não vêm via fetch — por isso DOMContentLoaded é suficiente.
document.addEventListener("DOMContentLoaded", iniciarAnimacoes);

// O menu só é ativado quando o layout-push.js avisa que o header já está na página
// "layoutLoaded" é um evento CUSTOMIZADO (não existe nativamente no navegador).
// Quem dispara: layout-push.js no final, com:
//   document.dispatchEvent(new Event("layoutLoaded"));
// Assim garantimos que .nav-toggle e .nav-menu já existem no DOM.
document.addEventListener("layoutLoaded", iniciarMenu);