const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;

Deno.serve(async () => {
  const webhookUrl = `${SUPABASE_URL}/functions/v1/telegram-webhook`;
  const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: webhookUrl, allowed_updates: ["message"] }),
  });
  const data = await res.json();
  return new Response(JSON.stringify({ webhookUrl, telegram: data }, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
});
