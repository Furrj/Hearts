import React, { useState } from "react";

//UTILS
import { Card as Card_Class } from "../utils/initCards";

//ICONS
import hearts from "../assets/hearts.svg";
import diamonds from "../assets/diamonds.svg";
import spades from "../assets/spades.svg";
import clubs from "../assets/clubs.svg";

//TS
import GameManager, { GamePhases } from "../utils/GameManager";

interface IProps {
  cardInfo: Card_Class;
  gameManager: GameManager;
  setValidSelect?: any;
}

enum ColorClass {
  normal = "",
  selected = "card-selected",
}

const Card: React.FC<IProps> = ({ cardInfo, gameManager, setValidSelect }) => {
  const [selected, setSelected] = useState<Boolean>(false);

  let icon: any;
  let colorClass: ColorClass = selected
    ? ColorClass.selected
    : ColorClass.normal;

  switch (cardInfo.suit) {
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
    if (gameManager.getGamePhase() === GamePhases.Trading) {
      if (gameManager.getSelectedCards(1).length === 2 && !selected) {
        if (setValidSelect) {
          setValidSelect(true);
        }
      }

      if (gameManager.getSelectedCards(1).length < 3 && !selected) {
        setSelected(true);
        gameManager.addSelectedCard(1, cardInfo);
      } else if (selected) {
        setSelected(false);
        gameManager.removeSelectedCard(1, cardInfo.id);
        setValidSelect(false);
      }
    } else if (gameManager.getGamePhase() === GamePhases.Player1) {
      if (gameManager.getSelectedCards(1).length === 0 && !selected) {
        setSelected(true);
        gameManager.addSelectedCard(1, cardInfo);
      } else if (selected) {
        setSelected(false);
        gameManager.removeSelectedCard(1, cardInfo.id);
      }
    }
    console.log(gameManager.getSelectedCards(1));
  }

  return (
    <div className={`card ${colorClass}`} onClick={selectCard}>
      {icon}
      <br />
      {cardInfo.value}
      <br />
      {icon}
    </div>
  );
};

export default Card;
