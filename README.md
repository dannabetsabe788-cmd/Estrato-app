# ESTRATO — Guía para publicar la aplicación

Esta carpeta ya tiene todo listo: la app (`index.html`) y el backend que protege tu clave de API (`api/chat.js`). Solo te falta conectar tu cuenta de Anthropic y subirlo a un hosting gratuito (Vercel).

## Paso 1: Crear tu API key de Anthropic

1. Entra a **https://console.anthropic.com** y crea una cuenta (o inicia sesión).
2. Ve a **Settings → API Keys** y crea una nueva clave (botón "Create Key").
3. Cópiala y guárdala en un lugar seguro — no la compartas ni la subas a ningún repositorio público. **Nunca la pegues dentro de `index.html`.**
4. Nota: necesitarás cargar saldo/crédito en la cuenta para que la API funcione (Anthropic cobra por uso, aunque es muy barato para un proyecto escolar).

## Paso 2: Subir el código a GitHub

1. Crea una cuenta en **https://github.com** si no tienes.
2. Crea un repositorio nuevo (puede ser privado), por ejemplo `estrato-app`.
3. Sube estos 3 elementos tal cual están: `index.html`, la carpeta `api/` (con `chat.js` adentro), y `package.json`.
   - Puedes hacerlo arrastrando los archivos desde la página web de GitHub ("Add file → Upload files"), no necesitas usar comandos.

## Paso 3: Publicar en Vercel

1. Entra a **https://vercel.com** y crea una cuenta gratuita (puedes usar tu cuenta de GitHub para entrar directo).
2. Click en **Add New → Project**.
3. Elige el repositorio `estrato-app` que subiste.
4. En "Framework Preset" déjalo en **Other** (no necesita build).
5. Antes de darle a "Deploy", abre **Environment Variables** y agrega:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** (pega aquí tu clave del paso 1)
6. Dale a **Deploy**. En un minuto te da una URL pública como `https://estrato-app.vercel.app`.

Listo — esa URL ya es tu aplicación funcionando de verdad, con tu propia clave protegida en el servidor, sin mencionar a Claude ni Anthropic en ningún lado visible.

## Cómo probarla

- Abre la URL en tu celular o computadora.
- Prueba el chat, el modo profundo, sube un archivo para generar un cuestionario, y revisa el perfil.

## Si algo falla

- Si el chat no responde: revisa en Vercel que la variable `ANTHROPIC_API_KEY` esté bien escrita (sin espacios) y que tu cuenta de Anthropic tenga saldo.
- Si haces un cambio en el código: solo vuelve a subir el archivo modificado a GitHub y Vercel lo vuelve a publicar automáticamente.
- Los datos (chats, cuestionarios, perfil) se guardan en el navegador de cada persona que usa la app (no se comparten entre dispositivos).

## Si quieres cambiar el modelo de IA que usa

Dentro de `api/chat.js` está la línea `model: "claude-sonnet-5"`. Puedes ver los modelos disponibles y sus nombres exactos en **https://docs.claude.com**.
