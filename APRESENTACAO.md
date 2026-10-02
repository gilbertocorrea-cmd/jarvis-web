# Roteiro de apresentação oral

Este arquivo serve de apoio para demonstrar a P1. A documentação principal do projeto está no [README.md](README.md).

## Demonstração

1. Abrir o início e apresentar a proposta: um assistente em React com Vite que recebe texto e voz.
2. Digitar `Olá` e clicar em Executar. Mostrar a resposta, a animação e o registro no histórico.
3. Ligar o microfone, perguntar a hora e depois a data. Mostrar a resposta falada e desligar o microfone.
4. Fazer uma pergunta geral para mostrar a integração com a IA, se a chave estiver configurada.
5. Recarregar a página para mostrar que o histórico foi salvo. Executar `Limpar histórico`.
6. Abrir Comandos, executar Diagnóstico e Modo defesa. Favoritar um card e mostrar a contagem.
7. Abrir Sobre, usar Voltar e mostrar a interface em uma largura de celular.
8. Mostrar o repositório no GitHub e a aplicação publicada na Vercel.

## Trechos para explicar no código

- `JarvisConsole.jsx`: `useState` guarda os dados do console; comandos locais são tratados antes da consulta à IA.
- `CommandInput.jsx`: recebe valores e funções por props; os botões usam `onClick`.
- `HistoryList.jsx`: `.map()` monta a lista e `key` identifica cada registro.
- `CommandsPage.jsx`: guarda os favoritos no estado e monta os cards com os dados do catálogo.
- `main.jsx` e `App.jsx`: `BrowserRouter`, `Routes` e `Route` organizam a navegação.
- `api/chat.js`: consulta o OpenRouter no servidor usando uma chave de ambiente.

## Antes de apresentar

Testar o microfone, o volume e uma pergunta à IA no navegador da apresentação. Se a voz não estiver disponível, demonstrar pelo campo de texto. Lembrar que os favoritos não são persistidos e que missão, defesa, banco de dados e sensores são simulações.
