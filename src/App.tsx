import React, { useState } from "react";

//UTILS
import GameManager from "./utils/GameManager";

const App: React.FC = () => {
  const gameManager: GameManager = new GameManager();

  //STATE
  const [player1Hand, setPlayer1Hand] = useState<JSX.Element[]>(
    gameManager.getPlayer1Cards()
  );

  const [player2Hand, setPlayer2Hand] = useState<JSX.Element[]>(
    gameManager.getPlayer2Cards()
  );

  const [player3Hand, setPlayer3Hand] = useState<JSX.Element[]>(
    gameManager.getPlayer3Cards()
  );

  const [player4Hand, setPlayer4Hand] = useState<JSX.Element[]>(
    gameManager.getPlayer4Cards()
  );

  //FUNCTIONS
  function dealCardsAgain() {
    gameManager.dealCards();
    setPlayer1Hand(gameManager.getPlayer1Cards());
    setPlayer2Hand(gameManager.getPlayer2Cards());
    setPlayer3Hand(gameManager.getPlayer3Cards());
    setPlayer4Hand(gameManager.getPlayer4Cards());
  }

  return (
    <div className="app">
      <p>Player 1</p>
      <div className="pbox">{player1Hand}</div>
      <p>Player 2</p>
      <div className="pbox">{player2Hand}</div>
      <p>Player 3</p>
      <div className="pbox">{player3Hand}</div>
      <p>Player 4</p>
      <div className="pbox">{player4Hand}</div>
    </div>
  );
};

export default App;
