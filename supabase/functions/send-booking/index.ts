import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3.23.8";

/**
 * Permanent recipients. These Telegram chat IDs receive every booking even if the
 * database is empty, reset or unavailable. Add admin IDs here (the bot replies
 * with the ID when an admin presses /start).
 */
const ADMIN_CHAT_IDS: number[] = [];

const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN") ?? "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const Body = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(6).max(30),
  service: z.string().trim().min(1).max(120),
  master: z.string().trim().max(80).optional().default(""),
  datetime: z.string().trim().max(60).optional().default(""),
  comment: z.string().trim().max(500).optional().default(""),
});

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

function envChatIds(): number[] {
  return (Deno.env.get("TELEGRAM_CHAT_IDS") ?? "")
    .split(/[,\s]+/)
    .map((s) => Number(s.trim()))
    .filter((n) => Number.isFinite(n) && n !== 0);
}

/** Database subscribers are optional: any failure or slowness is ignored. */
async function dbChatIds(): Promise<number[]> {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return [];
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const query = supabase.from("telegram_subscribers").select("chat_id");
    const timeout = new Promise<{ data: null; error: Error }>((resolve) =>
      setTimeout(() => resolve({ data: null, error: new Error("db timeout") }), 4000)
    );
    const { data, error } = await Promise.race([query, timeout]);
    if (error) {
      console.error("db unavailable, using permanent recipients only:", error.message ?? String(error));
      return [];
    }
    return (data ?? []).map((r: { chat_id: number }) => Number(r.chat_id));
  } catch (e) {
    console.error("db exception:", e instanceof Error ? e.message : String(e));
    return [];
  }
}

async function sendTelegram(chat_id: number, text: string): Promise<boolean> {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 8000);
      const r = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id, text, parse_mode: "HTML" }),
        signal: ctrl.signal,
      });
      clearTimeout(t);
      const j = await r.json();
      if (j.ok) return true;
      console.error("telegram error", chat_id, JSON.stringify(j));
      // 403 = user blocked the bot, 400 = chat not found: retrying won't help
      if (j.error_code === 403 || j.error_code === 400) return false;
    } catch (e) {
      console.error("send fail", chat_id, attempt, e instanceof Error ? e.message : String(e));
    }
    await new Promise((res) => setTimeout(res, 500 * attempt));
  }
  return false;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    if (!TELEGRAM_BOT_TOKEN) {
      console.error("TELEGRAM_BOT_TOKEN missing");
      return json({ ok: false, error: "bot_not_configured" }, 503);
    }

    let raw: unknown;
    try {
      raw = await req.json();
    } catch {
      return json({ ok: false, error: "invalid_json" }, 400);
    }
    const parsed = Body.safeParse(raw);
    if (!parsed.success) {
      return json({ ok: false, error: "invalid_input", details: parsed.error.flatten().fieldErrors }, 400);
    }
    const b = parsed.data;

    const text =
      `💅 <b>Нова заявка — Beauty Color</b>\n\n` +
      `👤 <b>Ім'я:</b> ${escapeHtml(b.name)}\n` +
      `📞 <b>Телефон:</b> ${escapeHtml(b.phone)}\n` +
      `✨ <b>Послуга:</b> ${escapeHtml(b.service)}\n` +
      (b.master ? `💇 <b>Майстер:</b> ${escapeHtml(b.master)}\n` : "") +
      (b.datetime ? `🗓 <b>Бажаний час:</b> ${escapeHtml(b.datetime)}\n` : "") +
      (b.comment ? `\n💬 ${escapeHtml(b.comment)}` : "");

    const recipients = Array.from(
      new Set([...ADMIN_CHAT_IDS, ...envChatIds(), ...(await dbChatIds())])
    );

    const results = await Promise.all(recipients.map((id) => sendTelegram(id, text)));
    const delivered = results.filter(Boolean).length;

    console.log("booking processed", JSON.stringify({ recipients: recipients.length, delivered }));

    if (delivered === 0) {
      return json({ ok: false, error: "not_delivered", recipients: recipients.length }, 502);
    }
    return json({ ok: true, delivered, recipients: recipients.length });
  } catch (e) {
    console.error("send-booking error", e instanceof Error ? e.message : String(e));
    return json({ ok: false, error: "server_error" }, 500);
  }
});

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
