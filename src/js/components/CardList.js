function shuffleCard(cardNum) {
  let cardTotalNum = cardNum * 2; // 쌍을 이뤄 존재하기 때문에 *2 를 해준다.
  const cardIndex = [];

  for (let i = 0; i < cardTotalNum; i++) {
    let randomNum = Math.floor(Math.random() * cardTotalNum);

    if (!cardIndex.includes(randomNum)) cardIndex.push(randomNum);
    else i--;
  }

  return cardIndex;
}

export default function CardList({ $target }) {
  const $cardListList = document.createElement("div");
  $cardListList.className = "cardList";
  $target.appendChild($cardListList);

  let shuffleIndex = shuffleCard(5);
  let cardIndex = -1;
  const cards = [];

  for (let i = 1; i < 6; i++) {
    const cardImage1 = new Image();
    const cardImage2 = new Image();

    cards.push([shuffleIndex[++cardIndex], i], [shuffleIndex[++cardIndex], i]);
  }

  cards.sort((a, b) => a[0] - b[0]);

  const $cardList = document.querySelector(".cardList");

  this.render = () => {
    $cardListList.innerHTML = `
      ${cards
        .map(
          (card) =>
            `<div class="card" data-shuffle-id="${card[0]}" data-card-id="${card[1]}">
              <img class="front" data-card-id="${card[1]}"src="/src/images/card_${card[1]}.png" alt="앞면"/>
              <img class="back" src="/src/images/back.png" alt="뒷면"/> 
            </div>
            `
        )
        .join("")}
    `;
  };

  this.render();
}
