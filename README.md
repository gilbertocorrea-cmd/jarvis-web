# Meu JARVIS Web

Sou Gilberto Correa, estudante de ADS na FATEC. Neste projeto acadêmico,
uso React com Vite para montar um assistente com texto, voz, respostas faladas
e histórico. Mantenho o código em componentes simples, sem backend grande.

## Como executo

Na pasta `jarvis-web`, uso:

```bash
npm install
npm run dev
```

Abro o endereço informado pelo Vite. Para conferir o código e gerar a versão final:

```bash
npm run lint
npm run build
npm run preview
```

Com `npm run dev`, testo interface, comandos locais, voz e histórico. O Vite
sozinho não executa `api/chat.js`: para testar a função localmente, uso
`npx vercel dev` em vez de iniciar outro Vite. Para testar a IA com a chave
mantida apenas na Vercel, uso o endereço publicado após configurar a variável.

## Como envio um comando

1. Digito no campo ou clico em MIC e falo.
2. Em `executarComando`, retiro espaços, normalizo o texto e procuro uma frase em `commands.js`.
3. Se encontro um comando local, monto a resposta com `if/else`.
4. Se não encontro, envio `{ message }` por POST para `/api/chat`.
5. Mostro a resposta na tela, solicito a leitura e adiciono um registro ao histórico.

Reconheço `oi`, `olá`, `ajuda`, `hora`, `data`, `que horas são?`,
`que dia é hoje?` e `limpar histórico`. Comparo frases completas para não tratar
uma pergunta como “O que é banco de dados?” como um pedido de data.

## Como uso a voz e o microfone contínuo

Clico em **MIC OFF** para ligar. Uso `SpeechRecognition` ou
`webkitSpeechRecognition`, com `continuous = true`, `interimResults = false`
e idioma `pt-BR`. Recebo o último resultado final e envio a frase para
`executarComando`, a mesma função do campo de texto.

Guardo o modo ligado em `listening` e em `shouldListenRef`. O botão mostra
**OUVINDO...** durante a escuta e **MIC ATIVO** durante as pausas. Ao clicar
novamente, desligo o modo e cancelo qualquer reinício pendente.

Se o navegador encerrar a sessão, aguardo meio segundo e retomo a escuta.
Após quatro encerramentos seguidos sem uma frase, desligo o modo e mostro
um aviso. Não tento reiniciar automaticamente após falhas de permissão ou rede.

Antes de falar, pauso o reconhecimento com `abort()` e ignoro resultados
atrasados. Ao terminar a fala, retomo somente se o MIC continuar ligado.
Isso evita interpretar a própria resposta como um novo comando. Enquanto
processo ou falo, não executo outra frase: aguardo o estado OUVINDO para continuar.

### Como escolho a voz

Carrego as vozes com `getVoices()` e atualizo a lista pelo evento `voiceschanged`.
Filtro exclusivamente `voice.lang === "pt-BR"`. Entre essas vozes, prefiro
nomes masculinos conhecidos; se não encontro, uso a primeira voz brasileira.
Nunca seleciono outro idioma. Se nenhuma voz pt-BR estiver disponível, mostro
“Nenhuma voz pt-BR encontrada.” e mantenho a resposta na tela, sem leitura.
Uso `lang = "pt-BR"`, `rate = 0.9` e `pitch = 0.7`.

A API não informa gênero: a preferência masculina é uma tentativa pelo nome.
Mantenho temporariamente um `console.log` dos nomes e idiomas das vozes pt-BR
no carregamento inicial e quando recebo o evento `voiceschanged`.

### Como desenho o núcleo

Em `JarvisCore`, desenho um rosto original com linhas e pontos em SVG.
Uso CSS para anéis girando, scanner, partículas, olhos e indicadores laterais.
O estado recebido por props controla cor, velocidade e brilho. As barras durante
RESPONDENDO são uma animação ilustrativa ativa durante a fala, não uma medição
do áudio. Respeito a preferência do navegador por movimento reduzido.

Uso HTTPS na publicação ou localhost no desenvolvimento e permito o microfone.
O suporte depende do navegador; o reconhecimento pode enviar áudio a um serviço
externo e precisar de internet. A voz de saída depende das vozes disponíveis no dispositivo.

## Como guardo o histórico

Uso `useState` para uma lista com `id`, `command` e `response`. Em HistoryList,
percorro essa lista com `.map()` e identifico cada item por `key={item.id}`.
Guardo os últimos 50 registros no `localStorage`. Ao limpar, deixo a lista vazia,
sem adicionar o próprio comando de limpeza. Se o armazenamento estiver bloqueado,
mantenho os registros apenas enquanto a página estiver aberta.

## Onde encontro cada conceito

| Conceito | Onde uso |
| --- | --- |
| useState | Comando, resposta, status, avisos e histórico em JarvisConsole; favoritos em CommandsPage |
| Props e pai/filho | JarvisConsole envia status ao JarvisCore, dados e funções ao CommandInput e a lista ao HistoryList |
| Array de objetos | Comandos locais em `commands.js` e catálogo em `commands.json` |
| .map() e key | Atalhos do console, HistoryList e cards de CommandsPage |
| onClick | Executar, MIC, atalhos, favoritos e Voltar |
| Rotas | BrowserRouter em main.jsx; Routes e Route em App.jsx; Link no Header |
| CSS e Flexbox | Layout, núcleo, botões, histórico e cards em App.css |
| useEffect e useRef | Sincronizo o histórico e interrompo microfone, fala e consulta ao sair da página |

## Meus arquivos principais

- `src/components/JarvisConsole.jsx`: concentro o fluxo de texto, voz e IA.
- `src/components/JarvisCore.jsx`: recebo o estado por props e mostro o núcleo.
- `src/components/CommandInput.jsx`: mostro campo e botões; recebo as funções por props.
- `src/components/HistoryList.jsx`: mostro os registros com `.map()`.
- `src/data/commands.js`: defino frases e respostas locais.
- `api/chat.js`: consulto o OpenRouter no servidor, sem expor a chave.
- `src/pages/HomePage.jsx`: mostro o assistente na rota `/`.
- `src/pages/AboutPage.jsx`: explico o projeto na rota `/about`.
- `src/pages/CommandsPage.jsx`: preservo o catálogo e os favoritos em `/comandos`.
- `src/App.css`: organizo o visual com círculos, brilho, animações e Flexbox.
- `vercel.json`: permito abrir as rotas diretamente sem interceptar `/api/chat`.

## Como configuro a IA na Vercel

1. No projeto da Vercel, abro **Settings → Environment Variables**.
2. Adiciono `OPENROUTER_API_KEY` com a chave da minha conta OpenRouter.
3. Seleciono os ambientes em que vou usar a IA, como Production e Preview.
4. Opcionalmente, adiciono `OPENROUTER_MODEL` com o identificador de um modelo.
   Sem essa variável, uso `openrouter/auto`, que seleciona um modelo automaticamente.
5. Faço um novo deploy para aplicar as variáveis.
6. Abro o site, envio uma pergunta geral e confiro a resposta e o histórico.

Nunca uso o prefixo `VITE_` na chave e não escrevo a chave nos arquivos ou no Git.
A função lê `process.env.OPENROUTER_API_KEY` apenas no servidor. Uso créditos e
limites da minha conta OpenRouter; o modo automático não garante uso gratuito.
Posso definir um limite de crédito na chave para controlar o gasto do endpoint público.

Em `api/chat.js`, valido o método POST e perguntas com até 2000 caracteres.
Limito o tamanho da resposta e trato indisponibilidade, excesso de requisições,
resposta vazia e demora. Envio apenas a pergunta atual: o histórico da tela
não é enviado como contexto da conversa.

## Como publico

Meu repositório é https://github.com/gilbertocorrea-cmd/jarvis-web.
Mantenho neste repositório o código do assistente, incluindo voz, histórico e integração com IA.

Na Vercel, importo o repositório, seleciono Vite e uso a raiz que contém
`package.json`, `api/` e `vercel.json`. Configuro `npm run build` e saída `dist`.
Publico o projeto completo, não apenas a pasta dist, para incluir a função.

## Como testo

- Executo os comandos locais pelo campo, Enter e atalhos.
- Uso MIC, permito acesso e falo “que horas são?”.
- Nego a permissão e confiro a mensagem sem travar os comandos digitados.
- Confiro a leitura da resposta com volume ativo.
- Envio uma pergunta geral para testar a IA configurada.
- Recarrego a página e confiro o histórico; depois uso “limpar histórico”.
- Navego entre `/`, `/about` e `/comandos`, testo favoritos e Voltar.
- Atualizo `/about` e `/comandos` diretamente no site publicado.
- Confiro o layout no celular e com preferência por movimento reduzido.

Os testes automatizados de voz usam eventos simulados; não substituem o teste
com meu microfone e alto-falante. A IA real e o deploy dependem da chave e do acesso
à Vercel. Não considero esses testes concluídos apenas porque a build passou.

## Referências que consulto

- [Reconhecimento de voz — MDN](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition)
- [Síntese de voz — MDN](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)
- [OpenRouter](https://openrouter.ai/docs/quickstart)
- [Variáveis da Vercel](https://vercel.com/docs/environment-variables)
- [Vercel dev](https://vercel.com/docs/cli/dev)

Meu roteiro de demonstração está em [APRESENTACAO.md](APRESENTACAO.md).
