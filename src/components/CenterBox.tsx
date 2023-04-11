import React, { useState } from "react";

//UTILS
import GameManager, { GamePhases } from "../utils/GameManager";
import { Card as Card_Class } from "../utils/initCards";

//COMPONENTS
import Card from "./Card";

//TS
interface IProps {
  gameManager: GameManager;
  updateCards: () => void;
  validSelect: boolean;
}

const CenterBox: React.FC<IProps> = ({
  gameManager,
  updateCards,
  validSelect,
}) => {
  //STATE
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  //CONTENT
  let message: string = "";

  switch (gameManager.getGamePhase()) {
    case GamePhases.Trading:
      message = "Please select 3 cards to trade";
      break;
    case GamePhases.FirstTurn:
      message = "Press select button to start";
      break;
  }

  let card: JSX.Element = createCardComponent(gameManager.getLastPlayedCard());

  let buttonClass: string = validSelect ? "" : "invalidSelect";

  //FUNCTIONS
  function executeTurn(): void {
    if (gameManager.getGamePhase() === GamePhases.Trading) {
      gameManager.tradeCards();
      gameManager.findStartingPlayer();
      gameManager.resetSelectedCards();
      updateCards();
      console.log(gameManager.getGamePhase());
    } else {
      gameManager.handleTurns();
      card = createCardComponent(gameManager.getLastPlayedCard());
      updateCards();
      setGameStarted(true);
    }
  }

  function createCardComponent(cardInfo: Card_Class): JSX.Element {
    return <Card cardInfo={cardInfo} gameManager={gameManager} />;
  }

  return (
    <div className="centerBox">
      {gameStarted ? card : message}
      <button id={buttonClass} onClick={executeTurn}>
        Send
      </button>
    </div>
  );
};

export default CenterBox;
