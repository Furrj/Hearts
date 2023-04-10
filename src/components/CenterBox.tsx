import React from "react";

//UTILS
import GameManager, { GamePhases } from "../utils/GameManager";

//TS
interface IProps {
  gameManager: GameManager;
  updateCards: () => void;
}

const CenterBox: React.FC<IProps> = ({ gameManager, updateCards }) => {
  let message: string = "";

  switch (gameManager.getGamePhase()) {
    case GamePhases.Trading:
      message = "Please select 3 cards to pass";
      break;
    case GamePhases.Player1:
      message = "Player 1 Turn";
  }

  //FUNCTIONS
  function tradeCards(): void {
    gameManager.tradeCards();
    updateCards();
    gameManager.setGamePhase(GamePhases.Player1);
  }

  return (
    <div className="centerBox">
      <p>{message}</p>
      <button onClick={tradeCards}>Send</button>
    </div>
  );
};

export default CenterBox;
