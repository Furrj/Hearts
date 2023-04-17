import React, { useState } from "react";

//COMPONENTS
import CenterBox from "./components/CenterBox";
import Card from "./components/Card";

//UTILS
import GameManager, { GamePhases } from "./utils/GameManager";
import { Card as Card_Class } from "./utils/initCards";

const gameManager: GameManager = new GameManager();

const App: React.FC = () => {
  //State bool for allowing select to be pressed
  const [validSelect, setValidSelect] = useState<boolean>(false);
  //State bool for tracking if in main game loop
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  //State arrays for keeping player hands
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

  //State card component for last played card in centerbox
  const [centerBoxCard, setCenterBoxCard] = useState<JSX.Element>();

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
    setCenterBoxCard(
      <Card
        cardInfo={gameManager.getLastPlayedCard()}
        gameManager={gameManager}
      />
    );
  }

  //Handle CPU turns
  let run: boolean = true;
  function cpuTurns(): void {
    console.log("Running cpuTurns()");
    if (gameManager.getGamePhase() !== GamePhases.Player1) {
      gameManager.handleTurns();
      updateCards();
      if (gameManager.getGamePhase() === GamePhases.Player1) {
        run = false;
      }
      if (gameManager.getTurn() % 4 === 1 && gameManager.getTurn() !== 1) {
        run = false;
      }
    }
  }

  //Main game loop, ideally will be self-executing instead of triggered each turn
  function mainLoop(): void {
    const gameInterval: number = setInterval(() => {
      if (!run) clearInterval(gameInterval);
      else {
        cpuTurns();
        setGameStarted(true);
      }
    }, 1000);
  }

  return (
    <div className="app">
      <div id="pbox4">
        <div className="pboxY">{player4Hand}</div>
      </div>
      <div id="pbox3">
        <div className="pboxX">{player3Hand}</div>
      </div>
      <div id="pbox2">
        <div className="pboxY">{player2Hand}</div>
      </div>
      <div id="pbox1">
        <div className="pboxX">{player1Hand}</div>
      </div>
      <CenterBox
        gameManager={gameManager}
        updateCards={updateCards}
        validSelect={validSelect}
        setValidSelect={setValidSelect}
        card={centerBoxCard}
        gameStarted={gameStarted}
        cpuTurns={cpuTurns}
        mainLoop={mainLoop}
      />
    </div>
  );
};

export default App;
