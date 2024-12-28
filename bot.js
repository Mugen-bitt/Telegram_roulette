const { Telegraf } = require('telegraf');

// Укажите токен вашего бота
const bot = new Telegraf('<Ваш_Token>');

// Команда /start
bot.start((ctx) => {
    ctx.reply('Привет! Я ваш первый бот 🚀');
});

// Команда /help
bot.help((ctx) => {
    ctx.reply('Я могу:\n/start - начать работу\n/help - помощь');
});

// Обработка текста
bot.on('text', (ctx) => {
    ctx.reply(`Вы написали: ${ctx.message.text}`);
});

// Запуск бота
bot.launch();
console.log('Бот запущен!');