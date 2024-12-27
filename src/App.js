import React, { useState, useEffect } from "react";
import WebApp from '@twa-dev/sdk';

const actions = [
  "Пойти в спортзал",
  "Познакомиться с девушкой",
  "Сыграть в CS2 с друзьями",
  "Прочитать книгу",
  "Посмотреть новый фильм",
  "Позвонить другу",
  "Научиться чему-то новому"
];

const App = () => {
  const [result, setResult] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isTelegramWebApp] = useState(() => {
    try {
      return WebApp.platform !== undefined;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      WebApp.ready();
      // Применяем тему Telegram только если это Telegram Web App
      if (isTelegramWebApp) {
        document.body.style.backgroundColor = WebApp.backgroundColor;
        document.body.style.color = WebApp.themeParams?.text_color || '#000000';
      }
    } catch (e) {
      console.log('Not running in Telegram Web App');
    }
  }, [isTelegramWebApp]);

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    const newRotation = rotation + 1800 + Math.random() * 360;
    setRotation(newRotation);

    // Анимация перебора вариантов
    let count = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * actions.length);
      setResult(actions[randomIndex]);
      count++;
      
      if (count >= 20) {
        clearInterval(interval);
        const finalIndex = Math.floor(Math.random() * actions.length);
        const finalResult = actions[finalIndex];
        setResult(finalResult);
        setIsSpinning(false);
        
        // Показываем результат в Telegram только если это Telegram Web App
        try {
          if (isTelegramWebApp && WebApp.showPopup) {
            WebApp.showPopup({
              message: `Ваш выбор на сегодня: ${finalResult}`,
              buttons: [
                { id: "ok", type: "ok", text: "Отлично!" }
              ]
            });
          }
        } catch (e) {
          console.log('ShowPopup not available');
        }
      }
    }, 100);
  };

  // Получаем цвета в зависимости от среды выполнения
  const getThemeColor = (telegramColor, defaultColor) => {
    try {
      return isTelegramWebApp ? WebApp.themeParams?.[telegramColor] || defaultColor : defaultColor;
    } catch {
      return defaultColor;
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      backgroundColor: getThemeColor('bg_color', '#ffffff')
    }}>
      <h1 style={{
        color: getThemeColor('text_color', '#000000'),
        marginBottom: "30px",
        fontSize: "28px"
      }}>
        Рулетка
      </h1>

      <div style={{
        width: "280px",
        height: "280px",
        border: `4px solid ${getThemeColor('button_color', '#0088cc')}`,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "30px",
        padding: "20px",
        textAlign: "center",
        transition: "transform 1.5s cubic-bezier(0.2, 0.8, 0.3, 1)",
        transform: `rotate(${rotation}deg)`,
        backgroundColor: getThemeColor('secondary_bg_color', '#f0f0f0'),
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}>
        <p style={{
          fontSize: "20px",
          transform: `rotate(${-rotation}deg)`,
          transition: "transform 1.5s cubic-bezier(0.2, 0.8, 0.3, 1)",
          opacity: isSpinning ? 0.5 : 1
        }}>
          {result || "Нажмите кнопку"}
        </p>
      </div>

      <button
        onClick={spinWheel}
        disabled={isSpinning}
        style={{
          backgroundColor: getThemeColor('button_color', '#0088cc'),
          color: "#ffffff",
          border: "none",
          borderRadius: "10px",
          padding: "15px 30px",
          fontSize: "18px",
          cursor: isSpinning ? "not-allowed" : "pointer",
          opacity: isSpinning ? 0.7 : 1,
          transition: "opacity 0.3s, transform 0.2s",
          transform: "scale(1)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}
        onMouseDown={e => e.currentTarget.style.transform = "scale(0.98)"}
        onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      >
        {isSpinning ? "Крутится..." : "Крутить"}
      </button>
    </div>
  );
};

export default App;
