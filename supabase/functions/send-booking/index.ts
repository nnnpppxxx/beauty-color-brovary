import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://esm.sh/zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const Body = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(6).max(30),
  service: z.string().trim().min(1).max(120),
  master: z.string().trim().max(80).optional().default(""),
  datetime: z.string().trim().max(60).optional().default(""),
  comment: z.string().trim().max(500).optional().default(""),
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const json = await req.json();
    const parsed = Body.safeParse(json);
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: "Invalid input", details: parsed.error.flatten() }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
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

    const { data: subs, error } = await supabase
      .from("telegram_subscribers")
      .select("chat_id");
    if (error) console.error("db error", JSON.stringify(error));

    const chatIds = (subs ?? []).map((r) => r.chat_id as number);

    let delivered = 0;
    await Promise.all(
      chatIds.map(async (chat_id) => {
        try {
          const r = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id, text, parse_mode: "HTML" }),
          });
          const j = await r.json();
          if (j.ok) delivered++;
          else console.error("telegram error", chat_id, JSON.stringify(j));
        } catch (e) {
          console.error("send fail", chat_id, String(e));
        }
      })
    );

    return new Response(JSON.stringify({ ok: true, delivered, subscribers: chatIds.length }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("send-booking error", e instanceof Error ? e.message : JSON.stringify(e));
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : JSON.stringify(e) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
