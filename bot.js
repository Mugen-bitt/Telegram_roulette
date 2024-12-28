const { Telegraf } = require('telegraf');

// Укажите токен вашего бота
const bot = new Telegraf('7932492596:AAGSqGbzYKs3_tInoDWrXGwNbNcLcNw0MzA');

// Команда /start
bot.command('start',(ctx) => {
    ctx.reply('Запустите приложение, нажав кнопку ниже:', {
        reply_markup: {
        inline_keyboard: [
              [
                {
                  text: 'Открыть',
                  web_app: { url: 'https://mugen-bitt.github.io/Telegram_roulette/' }
                }
              ]
            ]
          }
        });
});

// Команда /help
bot.help((ctx) => {
    ctx.reply('Я могу:\n/start - начать работу\n/help - помощь');
});

bot.on('web_app_data', (ctx) => {
    const receivedData = ctx.message.web_app_data.data;
    console.log('Данные из Web App', receivedData);

// Ответ пользователю
    ctx.reply(`Вы Отправили: ${receivedData}`);

// Обработка текста
bot.on('text', (ctx) => {
    ctx.reply(`Вы написали: ${ctx.message.text}`);
});

// Запуск бота
bot.launch();
console.log('Бот запущен!')});