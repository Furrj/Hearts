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
}

const CenterBox: React.FC<IProps> = ({ gameManager, updateCards }) => {
  //STATE
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  //CONTENT
  let content: JSX.Element = createCardComponent(
    gameManager.getLastPlayedCard()
  );

  //FUNCTIONS
  function executeTurn(): void {
    if (gameManager.getGamePhase() === GamePhases.Trading) {
      gameManager.tradeCards();
      updateCards();
      gameManager.findStartingPlayer();
      gameManager.resetSelectedCards();
    } else {
      gameManager.handleTurns();
      content = createCardComponent(gameManager.getLastPlayedCard());
      updateCards();
      setGameStarted(true);
    }
  }

  function createCardComponent(cardInfo: Card_Class): JSX.Element {
    return <Card cardInfo={cardInfo} gameManager={gameManager} />;
  }

  return (
    <div className="centerBox">
      {gameStarted ? content : "Please Select 3 Cards To Trade"}
      <button onClick={executeTurn}>Send</button>
    </div>
  );
};

export default CenterBox;
