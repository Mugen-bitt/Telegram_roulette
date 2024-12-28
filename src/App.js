import React, { useState, useEffect } from 'react';
import WebApp from '@twa-dev/sdk';

const App = () => {
  const [result, setResult] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [actions] = useState([
    "Пойти в спортзал",
    "Познакомиться с девушкой",
    "Сыграть в CS2 с друзьями",
    "Прочитать книгу",
    "Посмотреть новый фильм",
    "Позвонить другу",
    "Научиться чему-то новому"
  ]);

  useEffect(() => {
    // Инициализация Telegram Web App
    WebApp.ready();
    
    // Настраиваем основной цвет в соответствии с темой Telegram
    document.body.style.backgroundColor = WebApp.backgroundColor;
  }, []);

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setResult(null);
    
    // Добавляем случайную задержку для большей непредсказуемости
    const spinDuration = 2000 + Math.random() * 1000;
    
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * actions.length);
      setResult(actions[randomIndex]);
      setIsSpinning(false);
      
      // Отправляем уведомление в Telegram
      WebApp.showPopup({
        message: `Ваш выбор: ${actions[randomIndex]}`,
        buttons: [{
          type: 'ok',
          text: 'Супер!'
        }]
      });
    }, spinDuration);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-8">Рулетка выбора</h1>
      
      <div className={`relative w-64 h-64 mb-8 ${isSpinning ? 'animate-pulse' : ''}`}>
        <div className="absolute inset-0 border-4 border-blue-500 rounded-full flex items-center justify-center">
          {isSpinning ? (
            <div className="text-xl">🎲</div>
          ) : (
            result && <p className="text-lg font-semibold p-4 text-center">{result}</p>
          )}
        </div>
      </div>
      
      <button
        onClick={spinWheel}
        disabled={isSpinning}
        className={`
          px-6 py-3 rounded-lg font-bold text-white
          ${isSpinning 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'}
          transition-colors duration-200
        `}
      >
        {isSpinning ? 'Крутится...' : 'Крутить рулетку'}
      </button>

      {result && !isSpinning && (
        <div className="mt-8 text-center">
          <h2 className="text-xl font-semibold">Ваш выбор:</h2>
          <p className="text-2xl font-bold text-blue-500 mt-2">{result}</p>
        </div>
      )}
    </div>
  );
};

export default App;
