// Guarda em variáveis os elementos do formulário (campos e áreas de erro)
const form = document.getElementById("form");
const campoNome = document.getElementById("nome");
const campoEmail = document.getElementById("email");
const campoAssunto = document.getElementById("assunto");
const campoMsg = document.getElementById("msg");
const erroNome = document.getElementById("erro-nome");
const erroEmail = document.getElementById("erro-email");
const erroAssunto = document.getElementById("erro-assunto");
const erroMsg = document.getElementById("erro-msg");
// Parágrafo onde aparece a mensagem final (sucesso ou erro)
const retorno = document.getElementById("retorno");

// Os links dos projetos podem sugerir um assunto sem impedir a edição.
// Lê o parâmetro "assunto" da URL (ex.: contato.html?assunto=doacao)
const assuntoSugerido = new URLSearchParams(window.location.search).get(
  "assunto",
);
if (campoAssunto && assuntoSugerido) {
  // Tabela que traduz o código da URL para o texto que vai no campo
  const assuntos = {
    voluntariado: "Quero ser voluntário",
    mentoria: "Quero apoiar como mentor",
    doacao: "Quero doar",
  };
  // Preenche o campo; se o código não existir na tabela, deixa vazio
  campoAssunto.value = assuntos[assuntoSugerido] || "";
}

// Se a página não tiver o form, sai sem erro
if (form) {
  // Mostra ou limpa o erro de um campo
  // campo = o input; areaErro = onde escrever o texto; texto = mensagem ("" limpa o erro)
  function mostrarErro(campo, areaErro, texto) {
    areaErro.textContent = texto;
    if (texto === "") {
      // Sem erro: remove o destaque vermelho
      campo.classList.remove("invalido");
    } else {
      // Com erro: adiciona o destaque vermelho (classe definida no CSS)
      campo.classList.add("invalido");
    }
  }

  // Executa quando o usuário clica em "Enviar"
  form.addEventListener("submit", function (evento) {
    // Impede o envio padrão (que recarregaria a página)
    evento.preventDefault();

    // Pega os valores digitados; trim() remove espaços no início e no fim
    const nome = campoNome.value.trim();
    const email = campoEmail.value.trim();
    const assunto = campoAssunto.value.trim();
    const mensagem = campoMsg.value.trim();

    campoEmail.value = email;

    // Começa assumindo que está tudo certo; qualquer erro muda para false
    let tudoCerto = true;

    // NOME
    if (nome.length < 3) {
      mostrarErro(
        campoNome,
        erroNome,
        "O nome deve ter pelo menos 3 caracteres.",
      );
      tudoCerto = false;
    } else {
      mostrarErro(campoNome, erroNome, "");
    }

    // E-MAIL
    if (email === "") {
      // Campo vazio
      mostrarErro(campoEmail, erroEmail, "Digite seu e-mail.");
      tudoCerto = false;
    } else if (!campoEmail.checkValidity()) {
      // checkValidity() usa a validação nativa do navegador para o formato do e-mail
      mostrarErro(
        campoEmail,
        erroEmail,
        "Digite um e-mail válido, como nome@exemplo.com.",
      );
      tudoCerto = false;
    } else {
      mostrarErro(campoEmail, erroEmail, "");
    }

    // ASSUNTO
    if (assunto === "") {
      mostrarErro(campoAssunto, erroAssunto, "Digite o assunto.");
      tudoCerto = false;
    } else {
      mostrarErro(campoAssunto, erroAssunto, "");
    }

    // MENSAGEM
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

    // RESULTADO FINAL
    if (tudoCerto) {
      // Tudo válido: mostra confirmação simulada (nada é enviado de verdade)
      retorno.textContent =
        "Confirmação simulada: seus dados estão corretos, mas nenhuma mensagem foi enviada e nenhum dado foi coletado.";
      // Limpa os campos do formulário
      form.reset();
    } else {
      // Há erros: pede para corrigir os campos destacados
      retorno.textContent = "Corrija os campos destacados em vermelho.";
    }
  });
}
