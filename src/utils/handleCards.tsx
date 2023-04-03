import { Card } from "./initCards";

export function deal(cards: Card[]): Card[][] {
  const player1Hand: Card[] = [];
  const player2Hand: Card[] = [];
  const player3Hand: Card[] = [];
  const player4Hand: Card[] = [];
  const allHands: Card[][] = [];
  let range = 52;
  let iterator = 0;

  for (let i = 0; i < 52; i++) {
    const cardIndex = Math.floor(Math.random() * range);

    switch (iterator) {
      case 0:
        player1Hand.push(cards[cardIndex]);
        cards.splice(cardIndex, 1);
        range--;
        iterator++;
        break;
      case 1:
        player2Hand.push(cards[cardIndex]);
        cards.splice(cardIndex, 1);
        range--;
        iterator++;
        break;
      case 2:
        player3Hand.push(cards[cardIndex]);
        cards.splice(cardIndex, 1);
        range--;
        iterator++;
        break;
      case 3:
        player4Hand.push(cards[cardIndex]);
        cards.splice(cardIndex, 1);
        range--;
        iterator++;
        break;
    }

    if (iterator > 3) iterator = 0;
  }

  allHands.push(player1Hand, player2Hand, player3Hand, player4Hand);

  return allHands;
}
