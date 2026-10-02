# Meu roteiro de apresentação

1. Abro a Home e apresento: “Este é meu projeto JARVIS Web, uma SPA em React com Vite.”
2. Digito `hora` e clico em Executar. Explico que o clique chama uma função que atualiza a resposta na tela.
3. Clico em Ver comandos. Mostro que a URL muda para `/comandos` sem recarregar toda a aplicação.
4. Abro `commands.json` para mostrar os dados e `CommandsPage.jsx` para explicar a criação dos cards.
5. Favorito dois comandos e removo um. Mostro como o contador acompanha essas mudanças.
6. Clico em Voltar e reduzo a largura da janela para demonstrar o layout no celular.
7. Mostro meu repositório no GitHub e, após o deploy, o endereço na Vercel.

## Como explico meu código

- **Componente:** uso uma função que retorna JSX para representar uma parte da tela, como Header.
- **Props:** envio os dados de CommandsPage para CommandCard. Também envio a função que o botão chama.
- **Estado:** guardo os IDs dos favoritos em `favoriteIds`. Quando atualizo esse estado, o React atualiza a interface.
- **map:** percorro os comandos do JSON e retorno um CommandCard para cada objeto.
- **key:** uso o ID de cada comando para o React identificar os itens da lista.
- **onClick:** associo o clique do botão à função que executa a ação.
- **BrowserRouter:** envolvo a aplicação para disponibilizar a navegação aos componentes.
- **Routes/Route:** associo cada endereço à página correspondente.
- **Link:** uso esse componente para navegar sem recarregar toda a página.
- **Flexbox:** organizo os elementos em linhas ou colunas. Com a media query, adapto o layout às telas menores.
- **vercel.json:** configuro a hospedagem para entregar a aplicação quando acesso `/comandos` diretamente.

## Limites que preciso explicar

Guardo os favoritos apenas no estado da página. Ao sair do catálogo ou recarregar,
eles são reiniciados. No console, uso regras locais para responder aos comandos,
sem serviço externo ou reconhecimento de voz.

No catálogo, apresento comandos simulados. O botão de cada card controla os
favoritos; ele não executa a ação descrita no card.
