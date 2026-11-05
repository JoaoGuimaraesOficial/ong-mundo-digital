# Conecta Futuro

O **Conecta Futuro** é um site institucional desenvolvido como projeto acadêmico para uma ONG fictícia que trabalha com inclusão digital, educação e participação comunitária. A proposta é apresentar como a tecnologia pode ampliar oportunidades e facilitar o acesso ao conhecimento.

## RGM dos integrantes do grupo

| Integrante | RGM |
|---|---|
| Augusto de Almeida Guelere | 48832588 |
| Felipe Rodrigues da Silva | 47868384 |
| Gabriel Alves Rodrigues | 47818191 |
| João Victor Guimarães Moura | 48298549 |
| Lucas Freitas de Oliveira | 48587885 |
| Matheus Faustino da Silva | 47854928 |
| Otavio Estevam Ventura Cristiano | 48763390 |

## Objetivo

O projeto tem como objetivo apresentar a organização, divulgar seus cursos e iniciativas e mostrar como a comunidade pode participar de suas atividades. O site foi desenvolvido com foco em uma navegação simples, informações organizadas e adaptação para diferentes dispositivos.

## Páginas do site

O site é composto por quatro páginas:

- **Início (`index.html`):** apresenta a Conecta Futuro, sua proposta de atuação, os cursos oferecidos e chamadas para conhecer melhor a organização.
- **Sobre (`content/sobre.html`):** apresenta a missão da ONG, seu público-alvo, seus objetivos e um painel interativo com informações adicionais.
- **Projetos (`content/projetos.html`):** reúne três iniciativas da organização, cada uma com descrição, imagem, informações sobre sua missão e formas de participação da comunidade.
- **Contato (`content/contato.html`):** disponibiliza um formulário para mensagens e uma área com orientações sobre voluntariado e participação nos projetos.

## Funcionalidades de JavaScript

O projeto conta com duas funcionalidades principais em JavaScript:

1. **Validação do formulário de contato (`js/formulario.js`):** verifica nome, e-mail, assunto e mensagem com regras próprias, incluindo quantidade mínima de caracteres, formato de e-mail válido e preenchimento obrigatório dos campos. Mostra mensagens de erro por campo, destaca os campos inválidos em vermelho e exibe uma confirmação simulada após o preenchimento correto. Também pré-preenche o assunto quando o visitante chega por meio de um link dos projetos.

2. **Painéis interativos de mostrar e ocultar (`js/interacao.js`):** controla o painel de ajuda da página Sobre, por meio do botão "Mostrar como podemos ajudar você", e os painéis de missão de cada projeto na página Projetos, por meio do botão "Ver missão do projeto". Os atributos `aria-expanded` e `aria-controls` são atualizados a cada clique para auxiliar na acessibilidade.

## Funcionalidades desenvolvidas

Para tornar o site mais organizado e interativo, foram implementados os seguintes recursos:

- **Header e footer compartilhados:** os mesmos elementos de navegação e rodapé são carregados nas páginas por meio de JavaScript e `fetch`, evitando a repetição de código.
- **Menu responsivo:** navegação adaptada para dispositivos menores, com botão hambúrguer para abrir e fechar o menu.
- **Painel interativo na página Sobre:** permite mostrar e ocultar informações adicionais sobre a atuação da ONG.
- **Projetos expansíveis:** cada iniciativa possui um botão que permite visualizar ou ocultar informações sobre sua missão.
- **Formulário com validação:** verifica o preenchimento do nome, e-mail, assunto e mensagem antes de apresentar o retorno ao usuário.
- **Confirmação de envio simulado:** apresenta uma mensagem após o preenchimento correto, deixando claro que o formulário é demonstrativo.
- **Animações de entrada:** elementos da página aparecem gradualmente durante a navegação, respeitando a preferência do dispositivo por movimentos reduzidos.
- **Layout responsivo:** organização dos elementos para proporcionar uma boa visualização em telas de diferentes tamanhos.

## Tecnologias utilizadas

- **HTML5:** estruturação das páginas com elementos semânticos.
- **CSS3:** estilização, organização dos componentes, Flexbox, animações e responsividade.
- **JavaScript:** carregamento dos elementos compartilhados, controle das interações e validação do formulário.
- **Imagens locais:** recursos visuais armazenados na pasta `assets/` e utilizados para complementar o conteúdo das páginas.

Todo o desenvolvimento foi realizado com tecnologias nativas da web, sem utilização de frameworks ou bibliotecas externas obrigatórias.

## Como executar o projeto

Para visualizar o site corretamente, é necessário utilizar um servidor local, pois o carregamento do header e do footer utiliza `fetch`.

### Utilizando o Live Server no Visual Studio Code

1. Abra a pasta do projeto no Visual Studio Code.
2. Instale a extensão **Live Server**, caso ainda não esteja instalada.
3. Abra o arquivo `index.html`.
4. Clique com o botão direito no editor.
5. Selecione **Open with Live Server**.

O site será aberto no navegador e suas páginas poderão ser acessadas pelo menu de navegação.

### Utilizando Python

Também é possível iniciar um servidor local pelo terminal, dentro da pasta principal do projeto:

```bash
py -m http.server 5500
```

Depois, abra o navegador e acesse:

`http://localhost:5500`

## Créditos

Este projeto é um protótipo acadêmico fictício, sem fins lucrativos, desenvolvido para a disciplina de Desenvolvimento Web. Todos os dados de contato, endereços e informações institucionais da Conecta Futuro são fictícios e não representam uma organização real.

### Imagens

As imagens utilizadas no site estão identificadas conforme sua origem:

- **face.png:** Acervo próprio do grupo.
- **insta.png:** Acervo próprio do grupo.
- **x.png:** Acervo próprio do grupo.
- **primeiros-passos.jpg:** Magnific ([magnific.com](https://www.magnific.com/)).
- **professoraensinando.jpg:** Magnific ([magnific.com](https://www.magnific.com/)).
- **codigo-do-futuro.jpg:** Magnific ([magnific.com](https://www.magnific.com/)).
- **conecta-lab.jpg:** Magnific ([magnific.com](https://www.magnific.com/)).
- **imagem-inclusao-digital.jpg:** informar a origem correspondente.

### Recursos de terceiros

Não foram utilizadas bibliotecas, frameworks ou dependências externas. Todo o código foi desenvolvido com HTML5, CSS3 e JavaScript nativo.
