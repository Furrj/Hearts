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
  const [cardInCenter, setCardInCenter] = useState<boolean>(false);

  //CONTENT
  let content: JSX.Element = createCardComponent(
    gameManager.getLastPlayedCard()
  );

  //FUNCTIONS
  function tradeCards(): void {
    if (!cardInCenter) {
      gameManager.tradeCards();
      updateCards();
      gameManager.findStartingPlayer();
      gameManager.resetSelectedCards();
      setCardInCenter(true);
    } else {
      if (gameManager.getGamePhase() !== GamePhases.Player1) {
        gameManager.handleTurns();
        content = createCardComponent(gameManager.getLastPlayedCard());
        updateCards();
      } else if (gameManager.getGamePhase() === GamePhases.Player1) {
        gameManager.handleTurns();
        content = createCardComponent(gameManager.getLastPlayedCard());
        updateCards();
      }
    }
  }

  function createCardComponent(cardInfo: Card_Class): JSX.Element {
    return <Card cardInfo={cardInfo} gameManager={gameManager} />;
  }

  return (
    <div className="centerBox">
      {cardInCenter ? content : "Please Select 3 Cards To Trade"}
      <button onClick={tradeCards}>Send</button>
    </div>
  );
};

export default CenterBox;
