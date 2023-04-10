import React, { useState } from "react";

import { Card as Card_Class } from "../utils/initCards";

//ICONS
import hearts from "../assets/hearts.svg";
import diamonds from "../assets/diamonds.svg";
import spades from "../assets/spades.svg";
import clubs from "../assets/clubs.svg";

//TS
import GameManager, { GamePhases, PlayerTurns } from "../utils/GameManager";

interface IProps {
  suit: string;
  value: string | number;
  id: number;
  gameManager: GameManager;
}

enum ColorClass {
  normal = "",
  selected = "card-selected",
}

const Card: React.FC<IProps> = ({ suit, value, id, gameManager }) => {
  const [selected, setSelected] = useState<Boolean>(false);

  let icon: any;
  let colorClass: ColorClass = selected
    ? ColorClass.selected
    : ColorClass.normal;

  switch (suit) {
    case "Hearts":
      icon = <img src={hearts} />;
      break;
    case "Diamonds":
      icon = <img src={diamonds} />;
      break;
    case "Spades":
      icon = <img src={spades} />;
      break;
    case "Clubs":
      icon = <img src={clubs} />;
      break;
  }

  //FUNCTIONS
  function selectCard(): void {
    if (
      gameManager.getGamePhase().playerTurn === PlayerTurns.Trading &&
      gameManager.getGamePhase().gamePhase === GamePhases.Init
    ) {
      console.log(true);
    }
  }

  return (
    <div className={`card ${colorClass}`} onClick={selectCard}>
      {icon}
      <br />
      {value}
      <br />
      {icon}
    </div>
  );
};

export default Card;
