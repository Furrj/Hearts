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
  gamePhase: GamePhases;
  playerTurn: PlayerTurns;

  constructor() {
    this.allHands = deal(initCards());
    this.player1Hand = this.allHands[0];
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
        <Card value={card.value} suit={card.suit} id={card.id} key={card.id} />
      );
    });
  }

  getPlayer2Cards(): JSX.Element[] {
    return this.allHands[1].map((card) => {
      return (
        <Card value={card.value} suit={card.suit} id={card.id} key={card.id} />
      );
    });
  }

  getPlayer3Cards(): JSX.Element[] {
    return this.allHands[2].map((card) => {
      return (
        <Card value={card.value} suit={card.suit} id={card.id} key={card.id} />
      );
    });
  }

  getPlayer4Cards(): JSX.Element[] {
    return this.allHands[3].map((card) => {
      return (
        <Card value={card.value} suit={card.suit} id={card.id} key={card.id} />
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
