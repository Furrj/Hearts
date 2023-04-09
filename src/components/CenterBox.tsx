import React from "react";

import GameManager, { GamePhases, PlayerTurns } from "../utils/GameManager";

//TS
interface IProps {
  gameManager: GameManager;
  updateCards: () => void;
}

const CenterBox: React.FC<IProps> = ({ gameManager, updateCards }) => {
  let message: string = "";

  switch (gameManager.getGamePhase().playerTurn) {
    case PlayerTurns.Trading:
      message = "Please select 3 cards to pass";
  }

  function tradeCards(): void {
    gameManager.tradePlayer1Cards();
    updateCards();
  }

  return (
    <div className="centerBox">
      <p>{message}</p>
      <button onClick={tradeCards}>Send</button>
    </div>
  );
};

export default CenterBox;
