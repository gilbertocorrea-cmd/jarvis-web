# Meu roteiro de apresentação

1. Abro a Home e apresento meu assistente em React com Vite.
2. Digito “oi” e clico em Executar: mostro a resposta, o núcleo e o histórico.
3. Ligo o MIC, pergunto a hora e espero a resposta. Depois pergunto a data sem ligar o MIC novamente.
4. Mostro a resposta falada e explico que pauso a escuta durante a fala para evitar eco. Desligo o MIC pelo mesmo botão.
5. Se a chave estiver configurada, faço uma pergunta geral e explico o caminho `/api/chat` → OpenRouter.
6. Recarrego a página para mostrar o histórico persistente e uso “limpar histórico”.
7. Abro Comandos, favorito um card e mostro props, `.map()`, `key`, `useState` e `onClick`.
8. Abro Sobre e uso Voltar. Mostro o layout em uma largura de celular.
9. Finalizo com o GitHub e, depois da publicação, o endereço na Vercel.

## Como explico as partes

- Em `JarvisConsole`, guardo o texto, a resposta, o status e o histórico com `useState`.
- Em `CommandInput`, recebo valores e funções do pai por props.
- Em `JarvisCore`, desenho o rosto em SVG e recebo `status` para mudar anéis, brilho e animações.
- Na voz, seleciono somente pt-BR e depois procuro um nome masculino. Sem voz brasileira disponível, mantenho a resposta apenas na tela.
- Em `HistoryList`, uso `.map()` para transformar cada registro em um bloco na tela.
- Em `commands.js`, reúno as frases que reconheço localmente.
- Em `api/chat.js`, mantenho a chave no servidor e envio somente a pergunta atual ao OpenRouter.
- Em `App.jsx`, associo cada rota à sua página. Em `main.jsx`, envolvo a aplicação com BrowserRouter.

## O que preciso lembrar

Não preciso de IA para responder hora, data ou saudação. Perguntas gerais precisam
de internet e da chave configurada. A IA pode errar. O reconhecimento de voz pode
não estar disponível em todos os navegadores; o campo de texto continua utilizável.
Guardo até 50 registros neste navegador. Os favoritos do catálogo ficam apenas no
estado da página. Os cards do catálogo demonstram favoritos, não executam as ações simuladas.
