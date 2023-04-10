import initCards, { Card as Card_Class } from "./initCards";
import { deal } from "./handleCards";

class GameManager {
  instance: GameManager;
  initHands: Card_Class[][];
  allHands: Card_Class[][];
  selectedCards: Card_Class[][];
  gamePhase: GamePhases;
  lastPlayedCard: Card_Class;

  constructor() {
    this.instance = this;
    this.initHands = deal(initCards());
    this.allHands = [...this.initHands];
    this.selectedCards = [[], [], [], []];
    this.gamePhase = GamePhases.Trading;
    this.lastPlayedCard = new Card_Class(2, "Clubs", 28);
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

  addPlayerCard(player: number, card: Card_Class): void {
    this.allHands[player - 1].push(card);
  }

  removePlayerCard(player: number, cardId: number): void {
    this.allHands[player - 1] = this.allHands[player - 1].filter(
      (card) => card.id !== cardId
    );
  }

  getSelectedCards(player: number): Card_Class[] {
    return this.selectedCards[player - 1];
  }

  addSelectedCard(player: number, card: Card_Class): void {
    this.selectedCards[player - 1].push(card);
  }

  removeSelectedCard(player: number, cardId: number): void {
    this.selectedCards[player - 1] = this.selectedCards[player - 1].filter(
      (card) => card.id !== cardId
    );
  }

  resetSelectedCards(): void {
    this.selectedCards = [[], [], [], []];
  }

  setLastPlayedCard(player: number, card: Card_Class): void {
    this.removePlayerCard(player, card.id);
    this.lastPlayedCard = card;
  }

  getLastPlayedCard(): Card_Class {
    return this.lastPlayedCard;
  }

  handleTurns(): void {
    console.log(this.gamePhase);
    switch (this.gamePhase) {
      case GamePhases.Player1:
        this.setLastPlayedCard(1, this.getSelectedCards(1)[0]);
        this.resetSelectedCards();
        break;
      case GamePhases.Player2:
        this.setLastPlayedCard(2, this.allHands[1][0]);
        break;
      case GamePhases.Player3:
        this.setLastPlayedCard(3, this.allHands[2][0]);
        break;
      case GamePhases.Player4:
        this.setLastPlayedCard(4, this.allHands[3][0]);
        break;
    }
    this.nextPlayerTurn();
  }

  tradeCards(): void {
    this.generateSelectedCards();

    for (let i = 0; i <= 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (i < 3) {
          this.addPlayerCard(i + 2, this.selectedCards[i][j]);
          this.removePlayerCard(i + 1, this.selectedCards[i][j].id);
        } else {
          this.addPlayerCard(1, this.selectedCards[i][j]);
          this.removePlayerCard(4, this.selectedCards[i][j].id);
        }
      }
    }
  }

  generateSelectedCards(): void {
    for (let i = 1; i <= 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.selectedCards[i].push(this.allHands[i][j]);
      }
    }
  }

  findStartingPlayer(): void {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 13; j++) {
        if (this.allHands[i][j].id === 28) {
          switch (i) {
            case 0:
              this.setGamePhase(GamePhases.Player1);
              break;
            case 1:
              this.setGamePhase(GamePhases.Player2);
              break;
            case 2:
              this.setGamePhase(GamePhases.Player3);
              break;
            case 3:
              this.setGamePhase(GamePhases.Player4);
              break;
          }
        }
      }
    }
    console.log(this.gamePhase);
  }

  nextPlayerTurn(): void {
    switch (this.gamePhase) {
      case GamePhases.Player1:
        this.setGamePhase(GamePhases.Player2);
        break;
      case GamePhases.Player2:
        this.setGamePhase(GamePhases.Player3);
        break;
      case GamePhases.Player3:
        this.setGamePhase(GamePhases.Player4);
        break;
      case GamePhases.Player4:
        this.setGamePhase(GamePhases.Player1);
        break;
    }
  }

  getGamePhase(): GamePhases {
    return this.gamePhase;
  }

  setGamePhase(gamePhase: GamePhases): void {
    this.gamePhase = gamePhase;
  }
}

//TS
export enum GamePhases {
  Trading = "trading",
  Player1 = "player1",
  Player2 = "player2",
  Player3 = "player3",
  Player4 = "player4",
  End = "end",
}

export default GameManager;
