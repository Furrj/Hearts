function initCards(): Card[] {
  const cards: Card[] = [];

  for (let i = 0; i <= 3; i++) {
    let suit: string;

    switch (i) {
      case 0:
        suit = "Hearts";
        break;
      case 1:
        suit = "Diamonds";
        break;
      case 2:
        suit = "Clubs";
        break;
      default:
        suit = "Spades";
    }

    for (let j = 1; j <= 13; j++) {
      cards.push(new Card(j, suit, j + 13 * i));
    }
  }

  return cards;
}

export class Card {
  value: string | number;
  suit: string;
  id: number;

  constructor(value: number, suit: string, id: number) {
    this.suit = suit;
    this.id = id;
    switch (value) {
      case 1:
        this.value = "Ace";
        break;
      case 11:
        this.value = "Jack";
        break;
      case 12:
        this.value = "Queen";
        break;
      case 13:
        this.value = "King";
        break;
      default:
        this.value = value;
    }
  }

  toString(): string {
    return `(${this.id}) ${this.value} of ${this.suit}`;
  }
}

export default initCards;
