module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Método no permitido" });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Falta configurar ANTHROPIC_API_KEY en las variables de entorno del hosting." });
    return;
  }

  try {
    const { system, messages, useTools, maxTokens } = req.body || {};

    const body = {
      model: "claude-sonnet-5",
      max_tokens: maxTokens || 1500,
      system,
      messages,
    };
    if (useTools) {
      body.tools = [{ type: "web_search_20250305", name: "web_search" }];
    }

    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(body),
    });

    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message || "Error interno" });
  }
};
