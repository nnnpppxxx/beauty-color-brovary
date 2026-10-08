import { createClient } from "npm:@supabase/supabase-js@2";

const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN") ?? "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

async function tg(method: string, body: unknown) {
  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (e) {
    console.error("tg send fail", e instanceof Error ? e.message : String(e));
  }
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("ok");

  try {
    const update = await req.json();
    const msg = update.message ?? update.edited_message;
    if (!msg?.chat?.id) return new Response(JSON.stringify({ ok: true }));

    const chatId = msg.chat.id as number;
    const text = (msg.text ?? "") as string;

    // Log every subscriber so IDs can be made permanent in send-booking.
    console.log("subscriber", JSON.stringify({ chatId, username: msg.from?.username, name: msg.from?.first_name }));

    // Optional database save — failure must never break the bot.
    try {
      if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
        const { error } = await supabase.from("telegram_subscribers").upsert(
          {
            chat_id: chatId,
            username: msg.from?.username ?? null,
            first_name: msg.from?.first_name ?? null,
          },
          { onConflict: "chat_id" },
        );
        if (error) console.error("db upsert error", error.message);
      }
    } catch (e) {
      console.error("db exception", e instanceof Error ? e.message : String(e));
    }

    if (text.startsWith("/start")) {
      await tg("sendMessage", {
        chat_id: chatId,
        text:
          "Вітаємо в Beauty Color!\n\nВи підписані на сповіщення про нові заявки з сайту.\nКожна нова заявка з'явиться тут автоматично.\n\nВаш ID: " +
          chatId,
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("webhook error", e instanceof Error ? e.message : String(e));
    return new Response(JSON.stringify({ ok: true }));
  }
});
