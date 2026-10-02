# JARVIS Web

## Sobre o projeto

SPA (aplicação de página única) desenvolvida em React com Vite para a P1 de Desenvolvimento Mobile, no curso de ADS da FATEC. Inspirado no assistente JARVIS, o projeto recebe comandos por texto ou voz e mostra as respostas na tela, com leitura em português brasileiro quando há uma voz compatível.

O JARVIS possui comandos locais para ações como consultar hora, data, status e diagnóstico. Quando a pergunta não corresponde a um desses comandos, ela é enviada para uma Inteligência Artificial pela integração com OpenRouter. Assim, é possível fazer perguntas sobre programação, história, tecnologia e conhecimentos gerais. A resposta aparece na interface e também pode ser reproduzida pela voz do navegador.

## Aplicação online

[Acessar o JARVIS Web na Vercel](https://jarvis-7wktg97tp-gil-testa.vercel.app/)

## Funcionalidades

- Comandos digitados, enviados pelo botão Executar ou pela tecla Enter.
- Reconhecimento de voz em português brasileiro, conforme o suporte do navegador e a permissão do microfone.
- Respostas faladas quando o dispositivo oferece uma voz `pt-BR`.
- Comandos locais disponíveis no campo de texto, nos atalhos e nos cards.
- Cards com botões Executar e Favoritar. Os favoritos ficam no estado da página e não são salvos após sair dela.
- Histórico dos últimos 50 registros salvo no `localStorage` do navegador. Se o armazenamento estiver bloqueado, os registros ficam apenas no estado da aplicação.
- Perguntas gerais respondidas pela IA através do OpenRouter.
- Núcleo animado em SVG e CSS, com estados de escuta, processamento e resposta.
- Navegação entre Início (`/`), Comandos (`/comandos`) e Sobre (`/about`), com botão Voltar.

O microfone pausa durante a resposta falada para evitar que o JARVIS escute a própria voz. A escuta é retomada enquanto o microfone estiver ligado; falhas de permissão, rede ou encerramentos repetidos podem desligá-la. Sem uma voz brasileira disponível, a resposta continua na tela.

## Comandos disponíveis

Os comandos estão em `src/data/commands.js` e `src/data/commands.json`.

| Comando ou exemplo | Resultado |
| --- | --- |
| `Olá` ou `oi` | Responde à saudação. |
| `Ajuda` ou `comandos` | Lista as opções locais. |
| `Que horas são?` | Informa a hora do dispositivo. |
| `Que dia é hoje?` | Informa a data do dispositivo. |
| `Limpar histórico` | Apaga os registros do histórico. |
| `Status do sistema` | Mostra uma resposta local e verifica a disponibilidade das APIs de voz. |
| `Analisar missão` | Mostra uma análise simulada. |
| `Modo defesa` | Ativa uma animação de defesa por cinco segundos. |
| `Diagnóstico` | Mostra o diagnóstico local e a disponibilidade da voz. |
| `Banco de dados` | Mostra uma consulta simulada. |
| `Rede de sensores` | Mostra uma resposta simulada dos sensores. |

Também são aceitas variações cadastradas, como `como está o sistema`, `ativar defesa` e `analise essa missão`. Missão, defesa, banco de dados e sensores são simulações: não controlam equipamentos nem consultam um banco real.

Textos que não correspondem a um comando local, como “O que é um banco de dados?”, seguem para a IA.

## Inteligência Artificial

A integração com OpenRouter permite ao JARVIS responder perguntas gerais. O fluxo é simples:

```text
Usuário faz uma pergunta
→ JARVIS verifica os comandos locais
→ Se não encontrar um comando correspondente, envia a pergunta para /api/chat
→ O servidor consulta a IA pelo OpenRouter
→ A resposta volta para o JARVIS
→ É exibida na tela e pode ser falada pelo navegador
```

Exemplos de perguntas:

- "Quem foi Alan Turing?"
- "O que é uma API?"
- "Explique Java de forma simples."

## Tecnologias utilizadas

React, Vite, JavaScript, CSS, Flexbox, React Router DOM, Web Speech API, OpenRouter, Vercel e Git/GitHub. O projeto usa Oxlint para verificar o código.

## Requisitos da P1 atendidos

| Requisito | Onde aparece |
| --- | --- |
| React com Vite | `package.json`, `vite.config.js` e `src/main.jsx`. |
| Componentização | Componentes como `CommandCard`, `CommandInput`, `HistoryList` e `BackButton`. |
| Props | `JarvisConsole` passa dados e funções para `CommandInput`; `CommandsPage` passa os dados de cada card para `CommandCard`. |
| `.map()` e `key` | Cards em `CommandsPage`, registros em `HistoryList` e atalhos em `JarvisConsole`. |
| `useState` | Texto, resposta e histórico em `JarvisConsole`; favoritos em `CommandsPage`. |
| `onClick` | Botões em `CommandInput`, `CommandCard` e `BackButton`. |
| Pelo menos duas rotas SPA | `BrowserRouter` em `main.jsx` e três rotas em `App.jsx`: `/`, `/comandos` e `/about`. |
| Botão Voltar | `BackButton` usa `useNavigate` para voltar ou abrir o início quando não há uma página anterior na navegação. |
| CSS e Flexbox | Estilos em `src/App.css` e `src/index.css`. |
| Dados estruturados | Lista de objetos em `commands.js` e catálogo em `commands.json`. |
| GitHub | Repositório: [gilbertocorrea-cmd/jarvis-web](https://github.com/gilbertocorrea-cmd/jarvis-web). |
| Vercel | Aplicação publicada no link acima, com função `api/chat.js` e rotas configuradas em `vercel.json`. |

## Estrutura do projeto

```text
jarvis-web/
├── api/chat.js              # Consulta à IA no servidor
├── public/favicon.svg
├── src/
│   ├── components/          # Console, núcleo, cards, histórico e botões
│   ├── data/                # Comandos locais e catálogo dos cards
│   ├── pages/               # HomePage, CommandsPage e AboutPage
│   ├── App.jsx              # Rotas da aplicação
│   ├── App.css
│   ├── index.css
│   └── main.jsx             # Inicialização do React e BrowserRouter
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
├── README.md
└── APRESENTACAO.md          # Roteiro para a apresentação oral
```

## Como executar localmente

Com Node.js e npm instalados:

```bash
git clone https://github.com/gilbertocorrea-cmd/jarvis-web.git
cd jarvis-web
npm install
npm run dev
```

Abra o endereço informado no terminal. O Vite permite testar a interface, os comandos locais, o histórico e os recursos de voz disponíveis no navegador. Ele não executa sozinho a função `/api/chat`.

Para verificar o código e gerar os arquivos de produção:

```bash
npm run lint
npm run build
```

`npm run preview` permite visualizar a versão gerada da interface. Para testar também a função da IA localmente, use `npx vercel dev`, com o projeto e as variáveis de ambiente configurados.

## Configuração da IA

A chave é lida no servidor por `api/chat.js` e não deve ficar no código nem receber o prefixo `VITE_`. Os arquivos `.env` e `.env.*` estão no `.gitignore`.

Nas variáveis de ambiente do projeto na Vercel, configure:

| Variável | Uso |
| --- | --- |
| `OPENROUTER_API_KEY` | Chave da conta OpenRouter, necessária para consultar a IA. |
| `OPENROUTER_MODEL` | Identificador opcional do modelo. Quando não informado, o código usa `openrouter/auto`. |

Após configurar as variáveis, faça uma nova publicação para aplicá-las. O uso da IA depende da disponibilidade do modelo e dos créditos da conta.

O console envia a pergunta atual por `POST /api/chat`. A função valida o texto (até 2000 caracteres), consulta o OpenRouter e devolve a resposta. O histórico exibido na tela não é enviado como contexto. Erros de consulta também aparecem no histórico; os comandos locais continuam disponíveis sem a chave.

## Deploy

O projeto está publicado na Vercel. Para configurar a publicação, importe o repositório e use a pasta que contém `package.json`, `api/` e `vercel.json` como raiz. O comando de geração é `npm run build`, com saída em `dist`.

A publicação deve incluir a função `api/chat.js`. O arquivo `vercel.json` direciona `/about` e `/comandos` para a aplicação, permitindo abrir essas páginas diretamente.

Antes da entrega, teste a IA, a navegação direta pelas rotas e o microfone no site. A voz depende do navegador, de HTTPS ou localhost e das permissões do dispositivo; o reconhecimento pode precisar de internet.

## Autor

Gilberto Correa

Análise e Desenvolvimento de Sistemas — FATEC

O [roteiro de apresentação](APRESENTACAO.md) reúne a sequência sugerida para a demonstração oral.
