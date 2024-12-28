const TelegramBot = require('node-telegram-bot-api');

// Вставьте API-ключ, выданный @BotFather
const token = '8026412974:AAFYCxtlWNLU65_tyWNJQV6ImLbuP-7u0_w';

// Создаем бота с поддержкой "polling"
const bot = new TelegramBot(token, { polling: true });

// Обработка команды /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Добро пожаловать в наше приложение!');
});

// Обработка любых сообщений
bot.on('message', (msg) => {
  console.log(`Получено сообщение от ${msg.chat.id}: ${msg.text}`);
});