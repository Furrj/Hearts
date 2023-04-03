import React from "react";

//UTILS
import GameManager from "./utils/GameManager";

const App: React.FC = () => {
  const gameManager: GameManager = new GameManager();

  return (
    <div className="app">
      <p>Player 1</p>
      <div className="pbox">{gameManager.getPlayer1Cards()}</div>
      <p>Player 2</p>
      <div className="pbox">{gameManager.getPlayer2Cards()}</div>
      <p>Player 3</p>
      <div className="pbox">{gameManager.getPlayer3Cards()}</div>
      <p>Player 4</p>
      <div className="pbox">{gameManager.getPlayer4Cards()}</div>
    </div>
  );
};

export default App;
