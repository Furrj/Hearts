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
    for (let card of gameManager.getSelectedCards(1)) {
      gameManager.removePlayerCard(1, card.id);
      gameManager.addPlayerCard(2, card);
    }
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
