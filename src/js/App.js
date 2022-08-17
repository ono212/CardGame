import Title from "./components/Title.js";
import CardList from "./components/CardList.js";

export default function App({ $target }) {
  const title = new Title({ $target });
  const cardList = new CardList({ $target });
}
