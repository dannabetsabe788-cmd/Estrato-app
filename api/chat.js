// Función serverless (Vercel). Guarda la API key en el servidor, nunca en el navegador.
// Usa la API gratuita de Google Gemini (no requiere tarjeta de crédito).

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Método no permitido" });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Falta configurar GEMINI_API_KEY en las variables de entorno del hosting." });
    return;
  }

  try {
    const { system, messages, useTools, maxTokens } = req.body || {};

    const contents = (messages || []).map((m) => {
      const role = m.role === "assistant" ? "model" : "user";
      let parts = [];
      if (typeof m.content === "string") {
        parts = [{ text: m.content }];
      } else if (Array.isArray(m.content)) {
        parts = m.content.map((block) => {
          if (block.type === "document") {
            return {
              inlineData: {
                mimeType: block.source.media_type,
                data: block.source.data,
              },
            };
          }
          return { text: block.text || "" };
        });
      }
      return { role, parts };
    });

    const model = "gemini-2.5-flash";
    const body = {
      contents,
      systemInstruction: { parts: [{ text: system || "" }] },
      generationConfig: { maxOutputTokens: maxTokens || 1500 },
    };
    if (useTools) {
      body.tools = [{ google_search: {} }];
    }

    const upstream = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const data = await upstream.json();

    if (!upstream.ok) {
      res.status(upstream.status).json({ error: data?.error?.message || "Error de la API de Gemini" });
      return;
    }

    const parts = data?.candidates?.[0]?.content?.parts || [];
    const text = parts.map((p) => p.text || "").join("\n\n");

    res.status(200).json({ content: [{ type: "text", text }] });
  } catch (err) {
    res.status(500).json({ error: err.message || "Error interno" });
  }
};
