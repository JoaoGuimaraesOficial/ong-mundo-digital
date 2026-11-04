const form = document.getElementById("form");
const campoNome = document.getElementById("nome");
const campoEmail = document.getElementById("email");
const campoAssunto = document.getElementById("assunto");
const campoMsg = document.getElementById("msg");
const erroNome = document.getElementById("erro-nome");
const erroEmail = document.getElementById("erro-email");
const erroAssunto = document.getElementById("erro-assunto");
const erroMsg = document.getElementById("erro-msg");
const retorno = document.getElementById("retorno");

// Se a página não tiver o form, sai sem erro
if (form) {
  function mostrarErro(campo, areaErro, texto) {
    areaErro.textContent = texto;
    if (texto === "") {
      campo.classList.remove("invalido");
    } else {
      campo.classList.add("invalido");
    }
  }

  form.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nome = campoNome.value.trim();
    const email = campoEmail.value.trim();
    const assunto = campoAssunto.value.trim();
    const mensagem = campoMsg.value.trim();

    let tudoCerto = true;

    // NOME
    if (nome.length < 3) {
      mostrarErro(campoNome, erroNome, "O nome deve ter pelo menos 3 caracteres.");
      tudoCerto = false;
    } else {
      mostrarErro(campoNome, erroNome, "");
    }

    // E-MAIL
    if (email === "") {
      mostrarErro(campoEmail, erroEmail, "Digite seu e-mail.");
      tudoCerto = false;
    } else if (!campoEmail.checkValidity()) {
      mostrarErro(campoEmail, erroEmail, "Digite um e-mail válido, como nome@exemplo.com.");
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
      mostrarErro(campoMsg, erroMsg, "A mensagem deve ter pelo menos 10 caracteres.");
      tudoCerto = false;
    } else {
      mostrarErro(campoMsg, erroMsg, "");
    }

    // RESULTADO FINAL
    if (tudoCerto) {
      retorno.textContent =
        "Confirmação simulada: seus dados estão corretos, mas nenhuma mensagem foi enviada e nenhum dado foi coletado.";
      form.reset();
    } else {
      retorno.textContent = "Corrija os campos destacados em vermelho.";
    }
  });
}