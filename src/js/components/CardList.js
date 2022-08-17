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

  const selectedCards = [];

  const stopClick = function (e) {
    e.preventDefault();
    e.stopPropagation();
    //return false;
  };

  $cardList.addEventListener("click", (e) => {
    e.preventDefault();

    if (e.target.className === "cardList") return; // 카드들 사이의 공백을 누를 경우에도 동작하므로 확인하여 바로 return해준다.

    const $card = e.target.closest("div");
    const cardId = $card.dataset.cardId;
    const shuffleId = $card.dataset.shuffleId;

    // 이미 클릭해서 뒤집어져있는 카드를 또 클릭할 경우를 방지하기 위해서
    if (selectedCards.length === 1 && selectedCards[0][1] === shuffleId) return;

    $cardList.addEventListener("click", stopClick, true);

    // 1. 뒤집힌 카드가 하나도 없을 때
    if (selectedCards.length === 0) {
      $card.classList.add("flipped");
      selectedCards.push([cardId, shuffleId]);
      $cardList.removeEventListener("click", stopClick, true);
    }
    // 2. 이미 카드가 1개 뒤집혀있는 상황에서 다른 카드를 클릭했을 때
    else if (selectedCards.length === 1) {
      // 일단 뒤집는다.
      $card.classList.add("flipped");

      setTimeout(() => {
        // 2-1. 짝이 같은 카드일 때
        if (selectedCards[0][0] === cardId) {
          document.querySelectorAll(".flipped").forEach((item) => {
            //item.style.opacity = 0;
            item.style.visibility = "hidden";
            item.classList.remove("flipped");
            item.classList.add("ended");

            item.addEventListener("click", stopClick, true); // 이후의 클릭을 막기 위해서
          });
        }
        // 2-2. 짝이 틀린 카드일 때
        else {
          document.querySelectorAll(".flipped").forEach((item) => {
            item.classList.remove("flipped");
          });
        }

        selectedCards.pop();
        $cardList.removeEventListener("click", stopClick, true);
      }, 400);
    }
  });
}
