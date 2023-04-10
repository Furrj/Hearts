import initCards, { Card as Card_Class } from "./initCards";
import { deal } from "./handleCards";

class GameManager {
  instance: GameManager;
  initHands: Card_Class[][];
  allHands: Card_Class[][];
  selectedCards: Card_Class[][];
  gamePhase: GamePhases;
  playerTurn: PlayerTurns;

  constructor() {
    this.instance = this;
    this.initHands = deal(initCards());
    this.allHands = [...this.initHands];
    this.selectedCards = [[], [], [], []];
    this.gamePhase = GamePhases.Init;
    this.playerTurn = PlayerTurns.Trading;
  }

  dealCards(): void {
    this.initHands = deal(initCards());
    this.allHands = [...this.initHands];
  }

  getAllHands(): Card_Class[][] {
    return this.allHands;
  }

  getPlayerCards(player: number): Card_Class[] {
    return this.allHands[player - 1];
  }

  getSelectedCards(player: number): Card_Class[] {
    return this.selectedCards[player - 1];
  }

  addSelectedCards(player: number, card: Card_Class): void {
    this.selectedCards[player - 1].push(card);
  }

  removeSelectedCards(player: number, cardId: number) {
    this.selectedCards[player - 1] = this.selectedCards[player - 1].filter(
      (card) => card.id !== cardId
    );
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
  gamePhase: GamePhases;
  playerTurn: PlayerTurns;
};

export default GameManager;
