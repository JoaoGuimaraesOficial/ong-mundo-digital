# Conecta Futuro

Site institucional da ONG fictícia **Conecta Futuro**, desenvolvido como protótipo acadêmico sobre inclusão digital, educação e participação comunitária.

## Objetivo

Apresentar a iniciativa, seus cursos e projetos de forma acessível e responsiva, incentivando a participação de alunos, voluntários e doadores.

## Páginas

- **Início** (`index.html`): apresentação da ONG, cursos e chamada para contato.
- **Sobre** (`content/sobre.html`): missão, público atendido e painel interativo sobre como a ONG pode ajudar.
- **Projetos** (`content/projetos.html`): três projetos com cards, missões expansíveis e formas de participação da comunidade.
- **Contato** (`content/contato.html`): formulário com validação em JavaScript e área de voluntariado.
- **Créditos e fontes** (`content/creditos.html`): registro dos materiais utilizados e observações de licença/autoria.

## Funcionalidades

- Header e footer reutilizados nas páginas por meio de `fetch`.
- Menu responsivo para telas pequenas.
- Cards de projetos com botão para abrir e fechar a missão de cada iniciativa.
- Indicação de como a comunidade pode apoiar cada projeto.
- Validação de nome, e-mail, assunto e mensagem no formulário.
- Mensagem explícita de que o envio do formulário é simulado.
- Animações de entrada com suporte a `prefers-reduced-motion`.
- Layout responsivo para aproximadamente 390 px e 1280 px.

## Tecnologias

- HTML5 semântico
- CSS3
- JavaScript nativo (ES6+)
- Imagens locais na pasta `assets/`

Não há dependências ou bibliotecas externas obrigatórias.

## Como executar

Como o projeto carrega header e footer com `fetch`, ele deve ser aberto por um servidor local, e não diretamente pelo protocolo `file://`.

### Live Server no VS Code

1. Abra a pasta do projeto no VS Code.
2. Instale a extensão **Live Server**, caso ainda não esteja instalada.
3. Clique com o botão direito em `index.html`.
4. Selecione **Open with Live Server**.
5. Acesse as páginas pelos links do menu.

### Outro servidor local

Também é possível executar, na raiz do projeto:

```bash
python3 -m http.server 5500
```

Depois, acesse <http://localhost:5500>.

## Estrutura

```text
.
├── assets/                 # Imagens e ícones locais
├── content/                # Páginas internas
├── css/style.css           # Estilos globais e responsivos
├── js/                     # Layout, animações, formulário e interações
├── layout/                 # Header e footer reutilizáveis
├── index.html
├── CREDITOS.md
└── README.md
```

## Formulário

O formulário é apenas uma simulação acadêmica. A validação acontece no navegador e nenhum dado é enviado, armazenado ou coletado.

## Créditos e licença

Consulte [`content/creditos.html`](content/creditos.html) e [`CREDITOS.md`](CREDITOS.md). A origem/licença de algumas imagens já existentes no repositório não foi registrada no histórico disponível; portanto, elas devem ser confirmadas antes de qualquer publicação comercial ou institucional.

## Checklist de revisão

- [x] Header e footer carregados por Live Server.
- [x] Cards de projetos com interação das missões.
- [x] Participação da comunidade descrita em cada projeto.
- [x] README criado.
- [x] Página de créditos e fontes criada.
- [x] Formulário com validação e aviso de simulação.
- [ ] Confirmar autoria/licença de cada imagem antes da publicação real.
