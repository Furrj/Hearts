import React, { useState } from "react";

//UTILS
import GameManager, { GamePhases, PlayerTurns } from "./utils/GameManager";

const gameManager: GameManager = new GameManager();

const App: React.FC = () => {
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
  function updateCards() {
    setPlayer1Hand(gameManager.getPlayer1Cards());
    setPlayer2Hand(gameManager.getPlayer2Cards());
    setPlayer3Hand(gameManager.getPlayer3Cards());
    setPlayer4Hand(gameManager.getPlayer4Cards());
  }

  return (
    <div className="app">
      <div id="pbox4">
        <p>Player 4</p>
        <div className="pbox">{player4Hand}</div>
      </div>
      {/* <div id="pbox2">
        <p>Player 2</p>
        <div className="pbox" id="pbox2">
          {player2Hand}
        </div>
      </div>
      <div id="pbox3">
        <p>Player 3</p>
        <div className="pbox" id="pbox3">
          {player3Hand}
        </div>
      </div> */}
      <div id="pbox1">
        <p>Player 1</p>
        <div className="pbox">{player1Hand}</div>
      </div>
    </div>
  );
};

export default App;
