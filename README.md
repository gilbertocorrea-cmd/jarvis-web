# JARVIS Web

Sou Gilberto Correa, estudante de ADS na FATEC. Neste projeto de
Desenvolvimento Mobile, apresento uma SPA inspirada no JARVIS.
Uso React, Vite, JavaScript/JSX, React Router e CSS/Flexbox para atender à Avaliação 1.

## Funcionalidades

- Console local: `oi`, `olá`, `hora`, `data` e `ajuda`.
- Catálogo com seis comandos carregados de JSON.
- Cards reutilizáveis com props, `.map()` e `key`.
- Favoritar/desfavoritar e contador controlados por `useState` e `onClick`.
- Rotas `/` (Home) e `/comandos` (catálogo), com navegação sem recarregar.
- Botão Voltar; no acesso direto ao catálogo, retorna à Home.
- Layout responsivo com Flexbox.

Guardo os favoritos no estado da página: eles são reiniciados quando saio do
catálogo ou recarrego a página. No console, uso regras locais, sem API ou voz.

## Executar

Para executar meu projeto, preciso de Node.js compatível com o Vite e npm.
Na pasta do projeto, uso os comandos abaixo:
Ambiente usado na verificação: Node.js 26.8.1 e npm 12.0.2.

```bash
npm ci
npm run dev
```

Abro no navegador o endereço informado pelo Vite.
Para conferir o código, gerar a versão de produção e visualizá-la, uso:

```bash
npm run lint
npm run build
npm run preview
```

Encontro os arquivos da versão de produção em `dist/`.

## Organização

- `src/main.jsx`: BrowserRouter e inicialização do React.
- `src/App.jsx`: Header, Footer e definição das duas rotas.
- `src/pages/HomePage.jsx`: apresentação e console.
- `src/pages/CommandsPage.jsx`: dados, favoritos e renderização dos cards.
- `src/components/`: Header, Footer, BackButton, CommandCard e JarvisConsole.
- `src/data/commands.json`: lista de comandos.
- `src/index.css` e `src/App.css`: estilos base e layout.
- `vercel.json`: reescrita para abrir diretamente as rotas da SPA.

## Conferência da avaliação

| Requisito | Onde conferir |
| --- | --- |
| Componentização e reuso | `src/components/` |
| Props, `.map()` e `key` | `CommandsPage.jsx` e `CommandCard.jsx` |
| Estado e eventos | Favoritos e `JarvisConsole.jsx` |
| Duas rotas e navegação | `App.jsx`, `main.jsx`, Header e BackButton |
| CSS e Flexbox | `App.css`, incluindo adaptação para telas pequenas |
| Documentação e publicação | Este README e `vercel.json`; publicação depende das contas |

## Verificações realizadas

- Lint e build de produção concluídos sem erros.
- Chrome automatizado: seis casos do console, navegação SPA, seis cards,
  favoritos de 0 para 2 e depois 1, botão Voltar e acesso direto à rota.
- Layout verificado nas larguras 320, 390 e 1280 pixels, sem transbordamento horizontal.
- Nenhum erro no console do navegador durante os testes locais.
- A reescrita em produção ainda precisa ser validada após o deploy na Vercel.

## Teste manual

1. Na Home, executo `oi`, `hora`, `data`, `ajuda`, um comando desconhecido e um vazio.
2. Clico em Ver comandos: a URL deve mudar para `/comandos` e mostrar seis cards.
3. Favorito dois comandos e removo um: o contador deve mostrar 2 e depois 1.
4. Clico em Voltar e confiro a Home.
5. Abro `/comandos` diretamente e atualizo a página.
6. Testo em larguras de celular e desktop e verifico se há rolagem horizontal.
7. Confiro se o console do navegador está sem erros.

## Publicação

Repositório: https://github.com/gilbertocorrea-cmd/jarvis-web

Ainda preciso conectar minha conta da Vercel para concluir a publicação.
Depois do deploy, incluo aqui o link de produção.

1. Mantenho o código no meu repositório público no GitHub.
2. Na Vercel, importo o repositório e seleciono o framework **Vite**.
3. Seleciono como Root Directory a pasta que contém `package.json`; neste repositório, é a raiz.
4. Configuro Build Command como `npm run build` e Output Directory como `dist`.
5. Faço o deploy e testo Home, favoritos, Voltar e atualização direta de `/comandos`.
6. Entrego os links do repositório público e da aplicação publicada.

## Apresentação e estudo

Organizo meu roteiro e a explicação dos conceitos em [APRESENTACAO.md](APRESENTACAO.md).
