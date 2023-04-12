import React, { useState } from "react";

//COMPONENTS
import CenterBox from "./components/CenterBox";
import Card from "./components/Card";

//UTILS
import GameManager, { GamePhases } from "./utils/GameManager";
import { Card as Card_Class } from "./utils/initCards";

const gameManager: GameManager = new GameManager();

const App: React.FC = () => {
  //STATE
  const [validSelect, setValidSelect] = useState<boolean>(false);

  const [player1Hand, setPlayer1Hand] = useState<JSX.Element[]>(
    mapToCardComponent(gameManager.getPlayerCards(1))
  );

  const [player2Hand, setPlayer2Hand] = useState<JSX.Element[]>(
    mapToCardComponent(gameManager.getPlayerCards(2))
  );

  const [player3Hand, setPlayer3Hand] = useState<JSX.Element[]>(
    mapToCardComponent(gameManager.getPlayerCards(3))
  );

  const [player4Hand, setPlayer4Hand] = useState<JSX.Element[]>(
    mapToCardComponent(gameManager.getPlayerCards(4))
  );

  //FUNCTIONS
  function mapToCardComponent(cards: Card_Class[]): JSX.Element[] {
    return cards.map((card) => {
      return (
        <Card
          cardInfo={card}
          gameManager={gameManager}
          setValidSelect={setValidSelect}
          key={card.id}
        />
      );
    });
  }

  function updateCards() {
    setPlayer1Hand(mapToCardComponent(gameManager.getPlayerCards(1)));
    setPlayer2Hand(mapToCardComponent(gameManager.getPlayerCards(2)));
    setPlayer3Hand(mapToCardComponent(gameManager.getPlayerCards(3)));
    setPlayer4Hand(mapToCardComponent(gameManager.getPlayerCards(4)));
  }

  function mainLoop(): void {}

  return (
    <div className="app">
      <div id="pbox4">
        <div className="pboxY">{player4Hand}</div>
        <p>Player 4</p>
      </div>
      <div id="pbox3">
        <div className="pboxX">{player3Hand}</div>
        <p>Player 3</p>
      </div>
      <div id="pbox2">
        <div className="pboxY">{player2Hand}</div>
        <p>Player 2</p>
      </div>
      <div id="pbox1">
        <p>Player 1</p>
        <div className="pboxX">{player1Hand}</div>
      </div>
      <CenterBox
        gameManager={gameManager}
        updateCards={updateCards}
        validSelect={validSelect}
        setValidSelect={setValidSelect}
      />
    </div>
  );
};

export default App;
