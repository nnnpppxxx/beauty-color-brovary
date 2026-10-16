# Резервна відправка заявок (на вашому сервері)

Форма запису спочатку надсилає заявку через цей скрипт на вашому сервері,
а якщо він недоступний — через Lovable Cloud. Достатньо, щоб працював хоча б один.

## Встановлення (Ubuntu, один раз)

```bash
# 1. Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash - && sudo apt install -y nodejs

# 2. Скопіювати скрипт
sudo mkdir -p /opt/beauty-booking
sudo cp server/booking-server.mjs /opt/beauty-booking/

# 3. Служба, що запускається сама і перезапускається при збоях
sudo tee /etc/systemd/system/beauty-booking.service > /dev/null <<'EOF'
[Unit]
Description=Beauty Color booking relay
After=network-online.target

[Service]
Environment=TELEGRAM_BOT_TOKEN=ВСТАВТЕ_ТОКЕН_БОТА
Environment=PORT=3001
ExecStart=/usr/bin/node /opt/beauty-booking/booking-server.mjs
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
EOF
sudo systemctl daemon-reload
sudo systemctl enable --now beauty-booking
```

## nginx

У блок `server { ... }` сайту beauty-color.site додайте:

```nginx
location /api/booking {
    proxy_pass http://127.0.0.1:3001;
    proxy_set_header Host $host;
    proxy_read_timeout 30s;
}
```

Потім: `sudo nginx -t && sudo systemctl reload nginx`

## Перевірка

```bash
curl -X POST https://www.beauty-color.site/api/booking \
  -H "Content-Type: application/json" \
  -d '{"name":"Тест","phone":"+380000000","service":"Стрижка"}'
```

Відповідь `{"ok":true,...}` — і заявка «Тест» приходить у бот.
