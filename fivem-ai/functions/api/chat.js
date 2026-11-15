// Cloudflare Pages Function: يخبّي مفتاح الـ API ويمرر الرد (stream) للموقع
const TEXT_MODEL = "llama-3.3-70b-versatile";
const VISION_MODEL = "meta-llama/llama-4-scout-17b-16e-instruct";
const SYSTEM = `You are FiveM AI, a friendly expert assistant for FiveM server owners and developers.
You are an expert in Lua, JavaScript/NUI (HTML/CSS/JS), SQL (oxmysql), ESX, QBCore, QBox, ox_lib, ox_inventory, fxmanifest.lua, client/server events, and server.cfg.
When asked for scripts, give complete, working, well-structured code with the file names (fxmanifest.lua, client.lua, server.lua, config.lua, html files) in separate code blocks, then briefly explain how to install it.
Reply in the same language and dialect the user writes in (Iraqi Arabic if they write Iraqi). Be concise and practical.`;

export async function onRequestPost({ request, env }) {
  if (!env.GROQ_API_KEY) return new Response("GROQ_API_KEY missing", { status: 500 });
  const { messages, vision } = await request.json();
  const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${env.GROQ_API_KEY}` },
    body: JSON.stringify({
      model: vision ? VISION_MODEL : TEXT_MODEL,
      messages: [{ role: "system", content: SYSTEM }, ...messages],
      stream: true, temperature: 0.6, max_tokens: 4096,
    }),
  });
  return new Response(r.body, { status: r.status, headers: { "Content-Type": r.headers.get("Content-Type") || "text/event-stream" } });
}
