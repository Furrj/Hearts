import initCards, { Card as Card_Class } from "./initCards";
import { deal } from "./handleCards";

class GameManager {
  instance: GameManager;
  initHands: Card_Class[][];
  allHands: Card_Class[][];
  selectedCards: Card_Class[][];
  gamePhase: GamePhases;
  lastPlayedCard: Card_Class;
  turn: number;
  startingCardPosition: number[];
  startingPlayer: GamePhases;
  round: number;

  constructor() {
    this.instance = this;
    this.initHands = deal(initCards());
    this.allHands = [...this.initHands];
    this.selectedCards = [[], [], [], []];
    this.gamePhase = GamePhases.Trading;
    this.lastPlayedCard = new Card_Class(0, "Clubs", 100);
    this.turn = 1;
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

  //Next 3 functions handle each player's hand with this.allHands[]
  addPlayerCard(player: number, card: Card_Class): void {
    this.allHands[player - 1].push(card);
  }

  removePlayerCard(player: number, cardToRemove: Card_Class): void {
    this.allHands[player - 1] = this.allHands[player - 1].filter(
      (card) => card.id !== cardToRemove.id
    );
  }

  getPlayerCards(player: number): Card_Class[] {
    return this.allHands[player - 1];
  }

  //Next 4 functions handle each player's selected cards with this.selectedCards[]
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

  getLastPlayedCard(): Card_Class {
    return this.lastPlayedCard;
  }

  //To execute for each player's turn
  handleTurns(): void {
    console.log(`Turn: ${this.turn}`);
    console.log(`Round: ${this.round}`);
    if (this.turn === 1) {
      this.executeFirstTurn();
    } else {
      this.handlePlayerTurn();
    }
    //Advance gamePhase to next player in line
    this.nextPlayerTurn();
    this.turn++;
    if (this.turn !== 1 && this.turn % 4 === 1) {
      this.round++;
    }
    console.log(this.gamePhase);
  }

  //To execute on first turn (i.e. play the 2 of Clubs automatically)
  executeFirstTurn(): void {
    const i = this.startingCardPosition[0];
    const j = this.startingCardPosition[1];
    //Set gamePhase to player holding 2 of Clubs
    //Set 2 Of clubs to this.lastPlayedCard
    switch (this.startingPlayer) {
      case GamePhases.Player1:
        this.gamePhase = GamePhases.Player1;
        this.playCard(1, this.allHands[i][j]);
        break;
      case GamePhases.Player2:
        this.gamePhase = GamePhases.Player2;
        this.playCard(2, this.allHands[i][j]);
        break;
      case GamePhases.Player3:
        this.gamePhase = GamePhases.Player3;
        this.playCard(3, this.allHands[i][j]);
        break;
      case GamePhases.Player4:
        this.gamePhase = GamePhases.Player4;
        this.playCard(4, this.allHands[i][j]);
        break;
    }
  }

  //Remove card from player's hand and set to this.lastPlayedCard
  handlePlayerTurn(): void {
    switch (this.gamePhase) {
      case GamePhases.Player1:
        this.playCard(1, this.getSelectedCards(1)[0]);
        this.resetSelectedCards();
        break;
      case GamePhases.Player2:
        this.playCard(2, this.chooseCardCPU(2));
        break;
      case GamePhases.Player3:
        this.playCard(3, this.chooseCardCPU(3));
        break;
      case GamePhases.Player4:
        this.playCard(4, this.chooseCardCPU(4));
        break;
    }
  }

  getTurn(): number {
    return this.turn;
  }

  getRound(): number {
    return this.round;
  }

  //Remove card from player's hand and set to this.lastPlayedCard
  playCard(player: number, card: Card_Class): void {
    this.removePlayerCard(player, card);
    this.lastPlayedCard = card;
  }

  //Send 3 selected cards from each CPU in trading phase
  tradeCards(): void {
    this.generateSelectedCardsForTrading();

    //Add each player's selectedCards to next player's hand, then remove from their hand
    for (let i = 0; i <= 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (i < 3) {
          this.addPlayerCard(i + 2, this.selectedCards[i][j]);
          this.removePlayerCard(i + 1, this.selectedCards[i][j]);
        } else {
          this.addPlayerCard(1, this.selectedCards[i][j]);
          this.removePlayerCard(4, this.selectedCards[i][j]);
        }
      }
    }
    this.resetSelectedCards();
  }

  //Add 3 cards to each CPU's this.selectedCards[] for trading
  generateSelectedCardsForTrading(): void {
    for (let i = 1; i <= 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.selectedCards[i].push(this.allHands[i][j]);
      }
    }
  }

  //Select card to play for CPU
  chooseCardCPU(player: number): Card_Class {
    return this.allHands[player - 1][0];
  }

  //Find which player has 2 of Clubs
  //Set to this.startingPlayer
  //Store position of 2 of Clubs
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

  //Advance this.gamePhase to next player in line
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

  //Next 2 functions handle this.gamePhase
  getGamePhase(): GamePhases {
    return this.gamePhase;
  }

  setGamePhase(gamePhase: GamePhases): void {
    this.gamePhase = gamePhase;
  }
}

//Enum of possible GamePhases
export enum GamePhases {
  Trading = "trading",
  FirstTurn = "firstTurn",
  Player1 = "player1",
  Player2 = "player2",
  Player3 = "player3",
  Player4 = "player4",
  BetweenRounds = "betweenRounds",
  End = "end",
}

export default GameManager;
