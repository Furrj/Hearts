import React from "react";

//ICONS
import hearts from "../assets/hearts.svg";
import diamonds from "../assets/diamonds.svg";
import spades from "../assets/spades.svg";
import clubs from "../assets/clubs.svg";

//TS
interface IProps {
  suit: string;
  value: string | number;
  id: number;
}

const Card: React.FC<IProps> = ({ suit, value, id }) => {
  let icon: any;

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

  return (
    <div className="card">
      {icon}
      <br />
      {value}
      <br />
      {icon}
    </div>
  );
};

export default Card;
