<div align="center">

<img src="./docs/jarvis-banner.png" width="100%" alt="JARVIS Web">

# J A R V I S　W E B

### `ARTIFICIAL INTELLIGENCE • VOICE ASSISTANT • SYSTEM ONLINE`

</div>
<div align="center">

# J A R V I S　W E B

### `ARTIFICIAL INTELLIGENCE • VOICE ASSISTANT • SYSTEM ONLINE`

**Assistente virtual com voz, comandos locais e Inteligência Artificial**

<br>

[![React](https://img.shields.io/badge/REACT-19-00D8FF?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/VITE-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
![JavaScript](https://img.shields.io/badge/JAVASCRIPT-ES6+-111827?style=for-the-badge&logo=javascript&logoColor=00D8FF)
[![Vercel](https://img.shields.io/badge/VERCEL-ONLINE-111827?style=for-the-badge&logo=vercel&logoColor=white)](https://jarvis-7wktg97tp-gil-testa.vercel.app/)
![OpenRouter](https://img.shields.io/badge/AI-OPENROUTER-00BFFF?style=for-the-badge)

<br>

### [ ◉ ACESSAR JARVIS ONLINE ](https://jarvis-7wktg97tp-gil-testa.vercel.app/)

</div>

---

## `JARVIS // VISÃO GERAL`

O **JARVIS Web** é uma SPA desenvolvida com **React + Vite** para a P1 de Desenvolvimento Mobile do curso de **Análise e Desenvolvimento de Sistemas da FATEC**.

Inspirado no conceito de um assistente virtual futurista, o sistema combina **comandos locais, reconhecimento de voz, respostas faladas e Inteligência Artificial** em uma interface interativa.

O JARVIS consegue executar comandos diretamente no navegador, como informar **hora, data, status e diagnóstico**. Quando recebe uma pergunta que não corresponde a um comando local, utiliza **Inteligência Artificial através do OpenRouter** para gerar a resposta.

---

## `SYSTEM // STATUS`

| Módulo | Estado |
| :--- | :---: |
| Interface React | `● ONLINE` |
| Comandos locais | `● ONLINE` |
| Inteligência Artificial | `● ONLINE` |
| Histórico | `● ONLINE` |
| Navegação SPA | `● ONLINE` |
| Reconhecimento de voz | `◉ DISPONÍVEL*` |
| Síntese de voz | `◉ DISPONÍVEL*` |

> **VOICE SYSTEM:** reconhecimento e síntese de voz dependem do navegador, dispositivo, permissões de microfone e disponibilidade de uma voz `pt-BR`.

---

## `JARVIS // FUNCIONALIDADES`

| Sistema | Função |
| --- | --- |
| `COMMAND CORE` | Executa comandos locais cadastrados no sistema |
| `ARTIFICIAL INTELLIGENCE` | Responde perguntas gerais através do OpenRouter |
| `VOICE INPUT` | Reconhece comandos falados em português brasileiro |
| `VOICE OUTPUT` | Reproduz as respostas usando síntese de voz |
| `COMMAND CARDS` | Permite executar comandos diretamente pelos cards |
| `FAVORITES` | Permite marcar comandos favoritos durante a sessão |
| `HISTORY` | Mantém os últimos 50 registros no `localStorage` |
| `SPA ROUTER` | Navegação entre Início, Comandos e Sobre |
| `JARVIS CORE` | Núcleo visual animado conforme o estado do sistema |

O microfone pausa enquanto o JARVIS fala para evitar que o sistema reconheça a própria resposta como um novo comando.

---

## `AI CORE // INTELIGÊNCIA ARTIFICIAL`

O JARVIS possui dois caminhos para processar uma entrada.

**Comandos conhecidos** são executados diretamente no navegador. **Perguntas gerais** são encaminhadas para a Inteligência Artificial.

```text
                    ┌──────────────────┐
                    │     USUÁRIO      │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │      JARVIS      │
                    └────────┬─────────┘
                             │
                   VERIFICA O COMANDO
                             │
              ┌──────────────┴──────────────┐
              │                             │
              ▼                             ▼
      COMANDO CONHECIDO              PERGUNTA GERAL
              │                             │
              ▼                             ▼
       RESPOSTA LOCAL                  /api/chat
                                            │
                                            ▼
                                       OPENROUTER
                                            │
                                            ▼
                                  INTELIGÊNCIA ARTIFICIAL
                                            │
                                            ▼
                                   RESPOSTA DO JARVIS
                                            │
                                     ┌──────┴──────┐
                                     ▼             ▼
                                    TELA          VOZ
```

### Exemplos

```text
> Quem foi Alan Turing?

> O que é uma API?

> Explique Java de forma simples.
```

A aplicação envia apenas a pergunta atual para `/api/chat`. O servidor consulta o OpenRouter e devolve a resposta ao JARVIS.

---

## `COMMAND CORE // COMANDOS LOCAIS`

Os comandos são definidos em:

```text
src/data/commands.js
src/data/commands.json
```

| Comando | Ação |
| --- | --- |
| `Olá` / `oi` | Responde à saudação |
| `Ajuda` / `comandos` | Mostra as opções locais |
| `Que horas são?` | Informa a hora do dispositivo |
| `Que dia é hoje?` | Informa a data do dispositivo |
| `Limpar histórico` | Remove os registros do histórico |
| `Status do sistema` | Verifica o estado dos principais recursos |
| `Analisar missão` | Executa uma análise simulada |
| `Modo defesa` | Ativa uma animação de defesa por cinco segundos |
| `Diagnóstico` | Executa o diagnóstico local |
| `Banco de dados` | Executa uma consulta simulada |
| `Rede de sensores` | Exibe uma resposta simulada dos sensores |

Também são reconhecidas variações cadastradas, como:

```text
como está o sistema
ativar defesa
analise essa missão
```

> **SIMULATION NOTICE:** missão, modo defesa, banco de dados e rede de sensores são simulações visuais e textuais. O sistema não controla equipamentos externos nem consulta um banco de dados real.

Perguntas que não correspondem aos comandos locais seguem automaticamente para a **IA**.

---

## `TECH // TECNOLOGIAS`

<div align="center">

| Front-end | Inteligência / Voz | Infraestrutura |
| :---: | :---: | :---: |
| React | OpenRouter | Vercel |
| Vite | Web Speech API | Git / GitHub |
| JavaScript | Speech Recognition | Serverless Function |
| CSS / Flexbox | Speech Synthesis | Oxlint |
| React Router DOM | `/api/chat` | Node.js |

</div>

---

## `P1 // REQUISITOS ATENDIDOS`

| Requisito | Implementação |
| --- | --- |
| **React + Vite** | `package.json`, `vite.config.js` e `src/main.jsx` |
| **Componentização** | `CommandCard`, `CommandInput`, `HistoryList`, `BackButton` e outros componentes |
| **Props** | Comunicação entre `JarvisConsole` → `CommandInput` e `CommandsPage` → `CommandCard` |
| **`.map()` + `key`** | Cards, histórico e atalhos de comandos |
| **`useState`** | Console, histórico, favoritos e estados da interface |
| **`onClick`** | Botões de comando, cards, favoritos e navegação |
| **SPA** | `BrowserRouter`, `Routes` e `Route` |
| **3 rotas** | `/`, `/comandos` e `/about` |
| **Botão Voltar** | Componente reutilizável `BackButton` |
| **CSS / Flexbox** | `App.css` e `index.css` |
| **Dados estruturados** | `commands.js` e `commands.json` |
| **GitHub** | Repositório público e versionado |
| **Vercel** | Aplicação publicada em produção |

---

## `ARCHITECTURE // ESTRUTURA DO SISTEMA`

```text
jarvis-web/
│
├── api/
│   └── chat.js                 # Comunicação com a IA
│
├── public/
│   └── favicon.svg
│
├── src/
│   ├── components/             # Componentes reutilizáveis
│   ├── data/                   # Comandos do JARVIS
│   ├── pages/                  # Páginas da aplicação
│   │
│   ├── App.jsx                 # Rotas
│   ├── App.css                 # Interface
│   ├── index.css               # Estilos globais
│   └── main.jsx                # Inicialização React
│
├── APRESENTACAO.md
├── README.md
├── index.html
├── package.json
├── vercel.json
└── vite.config.js
```

---

## `BOOT SEQUENCE // EXECUÇÃO LOCAL`

Clone o projeto:

```bash
git clone https://github.com/gilbertocorrea-cmd/jarvis-web.git
```

Entre no diretório:

```bash
cd jarvis-web
```

Instale as dependências:

```bash
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

### Verificação

```bash
npm run lint
npm run build
```

Para testar também a função serverless da IA localmente:

```bash
npx vercel dev
```

---

## `AI CONFIG // CONFIGURAÇÃO`

A integração com IA é executada no servidor através de:

```text
api/chat.js
```

As credenciais **não ficam armazenadas no código-fonte**.

Na Vercel são utilizadas as variáveis:

```env
OPENROUTER_API_KEY=<sua-chave>
OPENROUTER_MODEL=<modelo-opcional>
```

`OPENROUTER_API_KEY` permite que `/api/chat` consulte o OpenRouter.

`OPENROUTER_MODEL` é opcional. Quando não informado, a aplicação utiliza o modelo definido como padrão pelo projeto.

> **SECURITY:** a chave da API nunca deve ser adicionada ao GitHub ou receber prefixo `VITE_`.

---

## `DEPLOY // PRODUÇÃO`

```text
GitHub
   │
   ▼
Branch main
   │
   ▼
Vercel
   │
   ├── React / Vite ──────► dist/
   │
   └── api/chat.js ───────► Serverless Function
   │
   ▼
JARVIS ONLINE
```

### Produção

**[jarvis-7wktg97tp-gil-testa.vercel.app](https://jarvis-7wktg97tp-gil-testa.vercel.app/)**

### Repositório

**[github.com/gilbertocorrea-cmd/jarvis-web](https://github.com/gilbertocorrea-cmd/jarvis-web)**

---

<div align="center">

## `JARVIS // SYSTEM ONLINE`

**Gilberto Correa**

Análise e Desenvolvimento de Sistemas  
FATEC

[Apresentação do projeto](APRESENTACAO.md)

<br>

`REACT`　•　`VOICE`　•　`AI`　•　`OPENROUTER`　•　`VERCEL`

**● SYSTEM STATUS: ONLINE**

</div>
