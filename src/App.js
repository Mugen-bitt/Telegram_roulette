import React, { useEffect } from "react";
import WebApp from "@twa-dev/sdk";

const App = () => {
  useEffect(() => {
    try {
      WebApp.ready();
      console.log("Web App API initialized");
      console.log("Telegram Web App Version:", WebApp.version);
    } catch (e) {
      console.error("Telegram Web App API initialization failed:", e);
    }
  }, []);

  return (
    <div>
      <h1>Минимальное приложение</h1>
      <p>Если вы видите этот текст, приложение работает.</p>
    </div>
  );
};

export default App;