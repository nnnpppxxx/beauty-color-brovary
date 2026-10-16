// Standalone booking relay for the self-hosted site (no dependencies, Node 18+).
// Receives POST /api/booking from the site form and sends the request to Telegram.
// Works completely independently from Lovable Cloud.
//
// Run:  TELEGRAM_BOT_TOKEN=xxxx node booking-server.mjs
// Optional env: PORT (default 3001), EXTRA_CHAT_IDS="111,222"

import http from "node:http";

const ADMIN_CHAT_IDS = [
  1563046408, // @nnnpppxxx
  527651544, // @b_y_studio
];

const TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const PORT = Number(process.env.PORT || 3001);
const EXTRA = (process.env.EXTRA_CHAT_IDS || "")
  .split(/[,\s]+/)
  .map(Number)
  .filter((n) => Number.isFinite(n) && n !== 0);
const RECIPIENTS = [...new Set([...ADMIN_CHAT_IDS, ...EXTRA])];

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const str = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");

async function send(chat_id, text) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const r = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id, text, parse_mode: "HTML" }),
        signal: AbortSignal.timeout(8000),
      });
      const j = await r.json();
      if (j.ok) return true;
      console.error("telegram error", chat_id, JSON.stringify(j));
      if (j.error_code === 400 || j.error_code === 403) return false;
    } catch (e) {
      console.error("send fail", chat_id, attempt, e?.message || e);
    }
    await new Promise((r) => setTimeout(r, 500 * attempt));
  }
  return false;
}

const reply = (res, status, data) => {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

http
  .createServer((req, res) => {
    if (req.method !== "POST" || !req.url?.startsWith("/api/booking")) return reply(res, 404, { ok: false });
    let body = "";
    req.on("data", (c) => {
      body += c;
      if (body.length > 10000) req.destroy();
    });
    req.on("end", async () => {
      try {
        if (!TOKEN) return reply(res, 503, { ok: false, error: "bot_not_configured" });
        const b = JSON.parse(body || "{}");
        const name = str(b.name, 80);
        const phone = str(b.phone, 30);
        const service = str(b.service, 120);
        const master = str(b.master, 80);
        const datetime = str(b.datetime, 60);
        const comment = str(b.comment, 500);
        if (name.length < 2 || phone.length < 6 || !service) return reply(res, 400, { ok: false, error: "invalid_input" });

        const text =
          `💅 <b>Нова заявка — Beauty Color</b>\n\n` +
          `👤 <b>Ім'я:</b> ${esc(name)}\n` +
          `📞 <b>Телефон:</b> ${esc(phone)}\n` +
          `✨ <b>Послуга:</b> ${esc(service)}\n` +
          (master ? `💇 <b>Майстер:</b> ${esc(master)}\n` : "") +
          (datetime ? `🗓 <b>Бажаний час:</b> ${esc(datetime)}\n` : "") +
          (comment ? `\n💬 ${esc(comment)}` : "");

        const results = await Promise.all(RECIPIENTS.map((id) => send(id, text)));
        const delivered = results.filter(Boolean).length;
        console.log("booking", JSON.stringify({ recipients: RECIPIENTS.length, delivered }));
        if (delivered === 0) return reply(res, 502, { ok: false, error: "not_delivered" });
        reply(res, 200, { ok: true, delivered, recipients: RECIPIENTS.length });
      } catch (e) {
        console.error("error", e?.message || e);
        reply(res, 500, { ok: false, error: "server_error" });
      }
    });
  })
  .listen(PORT, "127.0.0.1", () => console.log(`booking relay on 127.0.0.1:${PORT}`));
