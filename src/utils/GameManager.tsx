import initCards, { Card as Card_Class } from "./initCards";
import { deal } from "./handleCards";

//COMPS
import Card from "../components/Card";

class GameManager {
  instance: GameManager;
  allHands: Card_Class[][];
  player1Hand: Card_Class[];
  player1SelectedCards: Card_Class[];
  player2Hand: Card_Class[];
  player3Hand: Card_Class[];
  player4Hand: Card_Class[];
  gamePhase: GamePhases;
  playerTurn: PlayerTurns;

  constructor() {
    this.instance = this;
    this.allHands = deal(initCards());
    this.player1Hand = this.allHands[0];
    this.player1SelectedCards = [];
    this.player2Hand = this.allHands[1];
    this.player3Hand = this.allHands[2];
    this.player4Hand = this.allHands[3];
    this.gamePhase = GamePhases.Init;
    this.playerTurn = PlayerTurns.Trading;
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
    return this.allHands[0].map((card) => {
      return (
        <Card
          value={card.value}
          suit={card.suit}
          id={card.id}
          key={card.id}
          gameManager={this.instance}
        />
      );
    });
  }

  getPlayer1SelectedCards(): Card_Class[] {
    return this.player1SelectedCards;
  }

  addPlayer1SelectedCard(id: number): void {
    this.allHands[0].forEach((card) => {
      if (card.id === id) this.player1SelectedCards.push(card);
    });
  }

  getPlayer2Cards(): JSX.Element[] {
    return this.allHands[1].map((card) => {
      return (
        <Card
          value={card.value}
          suit={card.suit}
          id={card.id}
          key={card.id}
          gameManager={this.instance}
        />
      );
    });
  }

  getPlayer3Cards(): JSX.Element[] {
    return this.allHands[2].map((card) => {
      return (
        <Card
          value={card.value}
          suit={card.suit}
          id={card.id}
          key={card.id}
          gameManager={this.instance}
        />
      );
    });
  }

  getPlayer4Cards(): JSX.Element[] {
    return this.allHands[3].map((card) => {
      return (
        <Card
          value={card.value}
          suit={card.suit}
          id={card.id}
          key={card.id}
          gameManager={this.instance}
        />
      );
    });
  }

  getGamePhase(): gamePhaseObject {
    return { gamePhase: this.gamePhase, playerTurn: this.playerTurn };
  }

  setGamePhase(gamePhase: GamePhases, playerTurn: PlayerTurns): void {
    this.gamePhase = gamePhase;
    this.playerTurn = playerTurn;
  }
}

//TS
export enum GamePhases {
  Init = "init",
  PlayerTurns = "playerTurns",
  End = "end",
}

export enum PlayerTurns {
  Trading = "trading",
  Player1 = "player1",
  Player2 = "player2",
  Player3 = "player3",
  Player4 = "player4",
  End = "end",
}

type gamePhaseObject = {
  gamePhase: string;
  playerTurn: string;
};

export default GameManager;
