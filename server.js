const TelegramBot = require('node-telegram-bot-api');

// Вставьте API-ключ, выданный @BotFather
const token = '8081847420:AAF9PoKw0TNZvtSXH-hBISTYWaw7LA2WT2I';

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