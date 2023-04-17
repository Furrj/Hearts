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
  setValidSelect: React.Dispatch<React.SetStateAction<boolean>>;
  card?: JSX.Element;
  gameStarted: boolean;
  cpuTurns: () => void;
  mainLoop: () => void;
}

const CenterBox: React.FC<IProps> = ({
  gameManager,
  updateCards,
  validSelect,
  setValidSelect,
  card,
  gameStarted,
  cpuTurns,
  mainLoop,
}) => {
  //Message for centerbox in trading phase/first turn
  let message: string = "";

  switch (gameManager.getGamePhase()) {
    case GamePhases.Trading:
      message = "Please select 3 cards to trade";
      break;
    case GamePhases.FirstTurn:
      message =
        gameManager.getStartingPlayer() === GamePhases.Player1
          ? "You have the 2 of Clubs"
          : `${gameManager.getStartingPlayer()} has the 2 of Clubs`;
      break;
  }

  //Classname for enabling/disabling select button
  let buttonClass: string = validSelect ? "" : "invalidSelect";

  //FUNCTIONS
  function executeTurn(): void {
    switch (gameManager.getGamePhase()) {
      case GamePhases.Trading:
        gameManager.tradeCards();
        gameManager.findStartingPlayer();
        gameManager.resetSelectedCards();
        setValidSelect(false);
        updateCards();
        mainLoop();
        break;
      case GamePhases.Player1:
        gameManager.handleTurns();
        updateCards();
        mainLoop();
        setValidSelect(false);
        break;
    }
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
