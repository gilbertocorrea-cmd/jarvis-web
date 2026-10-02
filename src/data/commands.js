import catalog from './commands.json';

// Reúno os comandos que consigo responder sem consultar o servidor.
export const commands = [
  { id: 1, keywords: ['oi', 'ola'], response: 'Olá, senhor. JARVIS online.', example: 'Olá' },
  { id: 2, keywords: ['ajuda', 'comandos'], response: 'Você pode pedir status do sistema, analisar missão, modo defesa, diagnóstico, banco de dados, rede de sensores, hora, data ou limpar histórico. Para outras perguntas, consulto a IA.', example: 'Ajuda' },
  { id: 3, keywords: ['hora', 'que horas sao', 'que hora e', 'horas'], example: 'Que horas são?' },
  { id: 4, keywords: ['data', 'que dia e hoje', 'que dia e', 'dia de hoje'], example: 'Que dia é hoje?' },
  { id: 5, keywords: ['limpar historico'], example: 'Limpar histórico' },
  // Uso os mesmos dados dos cards para os comandos digitados e falados.
  ...catalog.map((item) => ({
    id: item.id + 5,
    keywords: item.keywords,
    response: item.response,
    example: item.command,
  })),
];
