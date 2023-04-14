import initCards, { Card as Card_Class } from "./initCards";
import { deal } from "./handleCards";

class GameManager {
  instance: GameManager;
  initHands: Card_Class[][];
  allHands: Card_Class[][];
  selectedCards: Card_Class[][];
  gamePhase: GamePhases;
  lastPlayedCard: Card_Class;
  round: number;
  startingCardPosition: number[];
  startingPlayer: GamePhases;

  constructor() {
    this.instance = this;
    this.initHands = deal(initCards());
    this.allHands = [...this.initHands];
    this.selectedCards = [[], [], [], []];
    this.gamePhase = GamePhases.Trading;
    this.lastPlayedCard = new Card_Class(0, "Clubs", 100);
    this.round = 1;
    this.startingCardPosition = [];
    this.startingPlayer = GamePhases.FirstTurn;
  }

  dealCards(): void {
    this.initHands = deal(initCards());
    this.allHands = [...this.initHands];
  }

  getAllHands(): Card_Class[][] {
    return this.allHands;
  }

  //Next 3 functions for handling each player's hand with this.allHands[]
  addPlayerCard(player: number, card: Card_Class): void {
    this.allHands[player - 1].push(card);
  }

  removePlayerCard(player: number, cardId: number): void {
    this.allHands[player - 1] = this.allHands[player - 1].filter(
      (card) => card.id !== cardId
    );
  }

  getPlayerCards(player: number): Card_Class[] {
    return this.allHands[player - 1];
  }

  //Next 4 functions for handling each player's selected cards with this.selectedCards[]
  addSelectedCard(player: number, card: Card_Class): void {
    this.selectedCards[player - 1].push(card);
  }

  removeSelectedCard(player: number, cardId: number): void {
    this.selectedCards[player - 1] = this.selectedCards[player - 1].filter(
      (card) => card.id !== cardId
    );
  }

  getSelectedCards(player: number): Card_Class[] {
    return this.selectedCards[player - 1];
  }

  resetSelectedCards(): void {
    this.selectedCards = [[], [], [], []];
  }

  //Next 2 functions for handling this.lastPlayedCard
  setLastPlayedCard(player: number, card: Card_Class): void {
    this.removePlayerCard(player, card.id);
    this.lastPlayedCard = card;
  }

  getLastPlayedCard(): Card_Class {
    return this.lastPlayedCard;
  }

  //Functino to be executed for each player's turn
  handleTurns(): void {
    console.log(this.round);
    //To be executed on the first turn (i.e. play the 2 of Clubs automatically)
    if (this.round === 1) {
      const i = this.startingCardPosition[0];
      const j = this.startingCardPosition[1];
      //Set gamePhase to player holding 2 of Clubs and set it to this.lastPlayedCard
      switch (this.startingPlayer) {
        case GamePhases.Player1:
          this.gamePhase = GamePhases.Player1;
          this.setLastPlayedCard(1, this.allHands[i][j]);
          break;
        case GamePhases.Player2:
          this.gamePhase = GamePhases.Player2;
          this.setLastPlayedCard(2, this.allHands[i][j]);
          break;
        case GamePhases.Player3:
          this.gamePhase = GamePhases.Player3;
          this.setLastPlayedCard(3, this.allHands[i][j]);
          break;
        case GamePhases.Player4:
          this.gamePhase = GamePhases.Player4;
          this.setLastPlayedCard(4, this.allHands[i][j]);
          break;
      }
      //To be executed every turn after the first
    } else {
      //Set this.lastPlayedCard to selected card based on player turn
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
    }
    //Advance gamePhase to next player in line
    this.nextPlayerTurn();
    this.round++;
    console.log(this.gamePhase);
  }

  //Function to send 3 selected cards from each player in trading phase
  tradeCards(): void {
    this.generateSelectedCards();

    //Add each player's selectedCards to next player's hand, then remove from their hand
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
    this.resetSelectedCards();
  }

  //Function to add 3 cards to each cpu player's this.selectedCards[]
  generateSelectedCards(): void {
    for (let i = 1; i <= 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.selectedCards[i].push(this.allHands[i][j]);
      }
    }
  }

  //Find which player has 2 of Clubs, set to this.startingPlayer, and store position of 2 of Clubs
  findStartingPlayer(): void {
    this.setGamePhase(GamePhases.FirstTurn);
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 13; j++) {
        if (this.allHands[i][j].id === 28) {
          switch (i) {
            case 0:
              this.startingPlayer = GamePhases.Player1;
              this.startingCardPosition.push(i);
              this.startingCardPosition.push(j);
              break;
            case 1:
              this.startingPlayer = GamePhases.Player2;
              this.startingCardPosition.push(i);
              this.startingCardPosition.push(j);
              break;
            case 2:
              this.startingPlayer = GamePhases.Player3;
              this.startingCardPosition.push(i);
              this.startingCardPosition.push(j);
              break;
            case 3:
              this.startingPlayer = GamePhases.Player4;
              this.startingCardPosition.push(i);
              this.startingCardPosition.push(j);
              break;
          }
        }
      }
    }
    console.log(this.startingPlayer);
    console.log(this.startingCardPosition);
  }

  getStartingPlayer(): GamePhases {
    return this.startingPlayer;
  }

  //Function to change this.gamePhase to next player in line
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

  //Next 2 functions for handling this.gamePhase
  getGamePhase(): GamePhases {
    return this.gamePhase;
  }

  setGamePhase(gamePhase: GamePhases): void {
    this.gamePhase = gamePhase;
  }
}

//Enum to keep track of possible GamePhases
export enum GamePhases {
  Trading = "trading",
  FirstTurn = "firstTurn",
  Player1 = "player1",
  Player2 = "player2",
  Player3 = "player3",
  Player4 = "player4",
  End = "end",
}

export default GameManager;
