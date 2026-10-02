// Uso esta função apenas no servidor. A chave nunca é enviada ao navegador.
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Use POST para enviar uma pergunta.' });
  }
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); }
    catch { return res.status(400).json({ error: 'Envie um JSON válido.' }); }
  }
  const message = body?.message;
  if (typeof message !== 'string' || !message.trim() || message.length > 2000) {
    return res.status(400).json({ error: 'Envie uma pergunta entre 1 e 2000 caracteres.' });
  }
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return res.status(503).json({ error: 'A IA ainda não está configurada. Os comandos locais continuam disponíveis.' });
  try {
    const result = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL || 'openrouter/auto',
        messages: [
          { role: 'system', content: 'Você é JARVIS, um assistente educacional. Responda em português brasileiro, de forma clara e curta. Não finja executar ações fora desta conversa.' },
          { role: 'user', content: message.trim() },
        ],
        max_tokens: 500,
      }),
      signal: AbortSignal.timeout(20000),
    });
    if (!result.ok) {
      return res.status(result.status === 429 ? 429 : 502).json({ error: result.status === 429 ? 'A IA está ocupada. Aguarde um pouco e tente novamente.' : 'Não consegui consultar a IA. Confira a chave, os créditos e o modelo no servidor.' });
    }
    const data = await result.json();
    const response = data.choices?.[0]?.message?.content;
    if (typeof response !== 'string' || !response.trim()) return res.status(502).json({ error: 'A IA retornou uma resposta vazia. Tente novamente.' });
    return res.status(200).json({ response: response.trim() });
  } catch (error) {
    return res.status(error.name === 'TimeoutError' ? 504 : 502).json({ error: 'A consulta à IA falhou ou demorou demais. Tente novamente.' });
  }
}
