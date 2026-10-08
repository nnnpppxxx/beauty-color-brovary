CREATE TABLE IF NOT EXISTS public.telegram_subscribers (
  chat_id BIGINT PRIMARY KEY,
  username TEXT,
  first_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT ALL ON public.telegram_subscribers TO service_role;
REVOKE ALL ON public.telegram_subscribers FROM anon, authenticated;
ALTER TABLE public.telegram_subscribers ENABLE ROW LEVEL SECURITY;