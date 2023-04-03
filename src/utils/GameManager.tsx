import initCards, { Card as Card_Class } from "./initCards";
import { deal } from "./handleCards";

//COMPS
import Card from "../components/Card";

class GameManager {
  allHands: Card_Class[][];
  player1Hand: Card_Class[];
  player2Hand: Card_Class[];
  player3Hand: Card_Class[];
  player4Hand: Card_Class[];

  constructor() {
    this.allHands = deal(initCards());
    this.player1Hand = this.allHands[0];
    this.player2Hand = this.allHands[1];
    this.player3Hand = this.allHands[2];
    this.player4Hand = this.allHands[3];
  }

  dealCards(): Card_Class[][] {
    this.allHands = deal(initCards());

    this.player1Hand = this.allHands[0];
    this.player2Hand = this.allHands[1];
    this.player3Hand = this.allHands[2];
    this.player4Hand = this.allHands[3];

    return this.allHands;
  }

  getAllHands(): Card_Class[][] {
    return this.allHands;
  }

  getPlayer1Cards(): JSX.Element[] {
    const arr: JSX.Element[] = [];

    for (let card of this.allHands[0]) {
      arr.push(<Card value={card.value} suit={card.suit} id={card.id} />);
    }

    return arr;
  }

  getPlayer2Cards(): JSX.Element[] {
    const arr: JSX.Element[] = [];

    for (let card of this.allHands[1]) {
      arr.push(<Card value={card.value} suit={card.suit} id={card.id} />);
    }

    return arr;
  }

  getPlayer3Cards(): JSX.Element[] {
    const arr: JSX.Element[] = [];

    for (let card of this.allHands[2]) {
      arr.push(<Card value={card.value} suit={card.suit} id={card.id} />);
    }

    return arr;
  }

  getPlayer4Cards(): JSX.Element[] {
    const arr: JSX.Element[] = [];

    for (let card of this.allHands[3]) {
      arr.push(<Card value={card.value} suit={card.suit} id={card.id} />);
    }

    return arr;
  }
}

export default GameManager;
