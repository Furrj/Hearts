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
  setValidSelect?: React.Dispatch<React.SetStateAction<boolean>>;
}

enum ColorClass {
  normal = "",
  selected = "card-selected",
}

const Card: React.FC<IProps> = ({ cardInfo, gameManager, setValidSelect }) => {
  //State bool for adding card to selectedCards[] in GameManager
  const [selected, setSelected] = useState<Boolean>(false);

  //Classname to change color of selected cards
  let colorClass: ColorClass = selected
    ? ColorClass.selected
    : ColorClass.normal;

  //Generate icon based on suit of card
  let icon: any;

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
    //If game is currently in trading phase
    if (gameManager.getGamePhase() === GamePhases.Trading) {
      //If card is 3rd card to be selected, enable select button
      if (gameManager.getSelectedCards(1).length === 2 && !selected) {
        if (setValidSelect) {
          setValidSelect(true);
        }
      }

      //If card is eligible to be selected, add to selectedCards[]
      if (gameManager.getSelectedCards(1).length < 3 && !selected) {
        setSelected(true);
        gameManager.addSelectedCard(1, cardInfo);
        //If card has already been selected, remove from selectedCards[] and disable select button
      } else if (selected) {
        setSelected(false);
        gameManager.removeSelectedCard(1, cardInfo.id);
        if (setValidSelect) setValidSelect(false);
      }
      //If player1's turn
    } else if (gameManager.getGamePhase() === GamePhases.Player1) {
      //If card is eligible to be selected, add to selectedCards[] and enable select button
      if (gameManager.getSelectedCards(1).length === 0 && !selected) {
        setSelected(true);
        if (setValidSelect) setValidSelect(true);
        gameManager.addSelectedCard(1, cardInfo);
        //If card has already been selected, remove from selectedCards[] and disable select button
      } else if (selected) {
        setSelected(false);
        if (setValidSelect) setValidSelect(false);
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
