// ============================================================
// FORMULARIO.JS
// Função: validar o formulário da página de Contato.
// - Confere nome, e-mail, assunto e mensagem.
// - Mostra mensagens de erro por campo (borda vermelha).
// - Pré-preenche o assunto quando vem de um link dos projetos.
// - Ao final, mostra confirmação SIMULADA (nada é enviado de verdade).
// ============================================================

// Guarda em variáveis os elementos do formulário (campos e áreas de erro)
// getElementById procura UM elemento pelo id; retorna null se não existir.
// Como este script só roda de fato na página Contato, esses elementos
// existem lá; nas outras páginas o script nem chega a usar as variáveis
// (a guarda "if (form)" no meio do arquivo evita erro).
const form = document.getElementById("form");                 // <form id="form">
const campoNome = document.getElementById("nome");            // <input id="nome">
const campoEmail = document.getElementById("email");          // <input id="email">
const campoAssunto = document.getElementById("assunto");      // <input id="assunto">
const campoMsg = document.getElementById("msg");              // <textarea id="msg">
const erroNome = document.getElementById("erro-nome");        // <small id="erro-nome">
const erroEmail = document.getElementById("erro-email");      // <small id="erro-email">
const erroAssunto = document.getElementById("erro-assunto");  // <small id="erro-assunto">
const erroMsg = document.getElementById("erro-msg");          // <small id="erro-msg">
// Parágrafo onde aparece a mensagem final (sucesso ou erro)
const retorno = document.getElementById("retorno");           // <p id="retorno">

// Os links dos projetos podem sugerir um assunto sem impedir a edição.
// Lê o parâmetro "assunto" da URL (ex.: contato.html?assunto=doacao)
// URLSearchParams lê a "query string" (tudo depois do "?" na URL).
// window.location.search devolve essa parte (ex.: "?assunto=doacao").
// .get("assunto") devolve o valor ("doacao") ou null se não existir.
const assuntoSugerido = new URLSearchParams(window.location.search).get(
  "assunto",
);
// Se o campo de assunto existe E veio um parâmetro na URL...
if (campoAssunto && assuntoSugerido) {
  // Tabela que traduz o código da URL para o texto que vai no campo
  // (o código é curto para caber na URL; o texto é amigável para o usuário)
  const assuntos = {
    voluntariado: "Quero ser voluntário",
    mentoria: "Quero apoiar como mentor",
    doacao: "Quero doar",
  };
  // Preenche o campo; se o código não existir na tabela, deixa vazio
  // assuntos[assuntoSugerido] → busca o valor pela chave (ex.: "doacao")
  // || "" → se não achar (undefined), usa string vazia
  campoAssunto.value = assuntos[assuntoSugerido] || "";
}

// Se a página não tiver o form, sai sem erro
// Este bloco IF evita que o script quebre quando carregado em outra página.
if (form) {
  // Mostra ou limpa o erro de um campo
  // Parâmetros:
  //   campo    = o input (para adicionar/remover a classe .invalido)
  //   areaErro = o <small> onde escrever o texto
  //   texto    = a mensagem (string vazia "" significa "sem erro")
  function mostrarErro(campo, areaErro, texto) {
    // Escreve o texto no <small>. Se for "", apaga o conteúdo.
    areaErro.textContent = texto;
    if (texto === "") {
      // Sem erro: remove o destaque vermelho
      campo.classList.remove("invalido");
    } else {
      // Com erro: adiciona o destaque vermelho (classe definida no CSS)
      campo.classList.add("invalido");
    }
  }

  // Executa quando o usuário clica em "Enviar" (ou aperta Enter no form)
  // "submit" é o evento nativo do envio de formulário.
  // A função recebe o objeto "evento" com informações sobre o que aconteceu.
  form.addEventListener("submit", function (evento) {
    // Impede o envio padrão (que recarregaria a página)
    // Sem preventDefault(), o navegador tentaria enviar os dados e
    // recarregar a página, perdendo o que já foi digitado.
    evento.preventDefault();

    // Pega os valores digitados; trim() remove espaços no início e no fim
    // .value lê o conteúdo atual do campo.
    // .trim() evita aceitar "   " como nome válido, por exemplo.
    const nome = campoNome.value.trim();
    const email = campoEmail.value.trim();
    const assunto = campoAssunto.value.trim();
    const mensagem = campoMsg.value.trim();

    // Grava de volta o e-mail já sem espaços no próprio input.
    // Por quê? Para o navegador validar (checkValidity) o valor limpo,
    // e para o usuário ver o e-mail corrigido se digitou "  a@b.com  ".
    campoEmail.value = email;

    // Começa assumindo que está tudo certo; qualquer erro muda para false
    // let (não const): o valor pode mudar durante as validações abaixo.
    let tudoCerto = true;

    // ----- VALIDAÇÃO DO NOME -----
    // Regra: mínimo 3 caracteres.
    // .length devolve o número de caracteres da string.
    if (nome.length < 3) {
      mostrarErro(
        campoNome,
        erroNome,
        "O nome deve ter pelo menos 3 caracteres.",
      );
      tudoCerto = false;   // marca que há erro
    } else {
      mostrarErro(campoNome, erroNome, "");   // limpa o erro
    }

    // ----- VALIDAÇÃO DO E-MAIL -----
    if (email === "") {
      // Campo vazio
      mostrarErro(campoEmail, erroEmail, "Digite seu e-mail.");
      tudoCerto = false;
    } else if (!campoEmail.checkValidity()) {
      // checkValidity() usa a validação nativa do navegador para o formato do e-mail
      // O "!" inverte: "se NÃO for válido, mostra erro".
      // (O input é type="email", então o navegador sabe checar se tem "@" etc.)
      mostrarErro(
        campoEmail,
        erroEmail,
        "Digite um e-mail válido, como nome@exemplo.com.",
      );
      tudoCerto = false;
    } else {
      mostrarErro(campoEmail, erroEmail, "");   // limpa o erro
    }

    // ----- VALIDAÇÃO DO ASSUNTO -----
    // Regra: não pode ficar vazio.
    // === é "igual a" comparando valor E tipo (string vazia).
    if (assunto === "") {
      mostrarErro(campoAssunto, erroAssunto, "Digite o assunto.");
      tudoCerto = false;
    } else {
      mostrarErro(campoAssunto, erroAssunto, "");
    }

    // ----- VALIDAÇÃO DA MENSAGEM -----
    // Regra: mínimo 10 caracteres.
    if (mensagem.length < 10) {
      mostrarErro(
        campoMsg,
        erroMsg,
        "A mensagem deve ter pelo menos 10 caracteres.",
      );
      tudoCerto = false;
    } else {
      mostrarErro(campoMsg, erroMsg, "");
    }

    // ----- RESULTADO FINAL -----
    // Só chega aqui se todas as validações rodaram.
    // "tudoCerto" é true APENAS se nenhuma delas marcou erro.
    if (tudoCerto) {
      // Tudo válido: mostra confirmação simulada (nada é enviado de verdade)
      // textContent substitui o conteúdo de texto do <p id="retorno">.
      retorno.textContent =
        "Confirmação simulada: seus dados estão corretos, mas nenhuma mensagem foi enviada e nenhum dado foi coletado.";
      // Limpa os campos do formulário
      // reset() restaura os valores padrão (vazios) de todos os inputs.
      form.reset();
      // Obs.: os <small class="erro"> já foram limpos acima; o reset()
      // também apaga o texto dos inputs, mas NÃO mexe nas classes do CSS.
      // Como todas as validações passaram, nenhum campo tem .invalido,
      // então não precisa limpar o CSS manualmente.
    } else {
      // Há erros: pede para corrigir os campos destacados
      retorno.textContent = "Corrija os campos destacados em vermelho.";
    }
  });
}