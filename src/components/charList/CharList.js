import "./charList.scss";

import { useState, useEffect, useRef } from "react";
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

const CharList = (props) => {
  const [charList, setCharList] = useState([]),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(false),
    [newCharListLoading, setNewCharListLoading] = useState(false),
    [offset, setOffset] = useState(1540),
    [charEnded, setCharEnded] = useState(false);

  const marvelService = new MarvelService();

  useEffect(() => {
    onRequest();
  }, []);

  const onRequest = (offset) => {
    onNewCharListLoading();
    marvelService
      .getAllCharacters(offset)
      .then(onCharListLoaded)
      .catch(onError);
  };
  const onNewCharListLoading = () => {
    setNewCharListLoading(true);
  };
  const onCharListLoaded = (newCharList) => {
    setCharList([...charList, ...newCharList]);
    setLoading(false);
    setNewCharListLoading(false);
    setOffset(offset + 9);
    setCharEnded(newCharList.length < 9);
  };

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    itemRefs.current[id].classList.add("char__item_selected");
    itemRefs.current[id].focus();
  };

  const makeCharCards = (arr) => {
    const chars = arr.map((char, i) => {
      return (
        <li
          className="char__item"
          tabIndex={0}
          ref={(el) => (itemRefs.current[i] = el)}
          key={char.id}
          onClick={() => {
            props.getCharId(char.id);
            focusOnItem(i);
          }}
          onKeyPress={(e) => {
            if (e.key === " " || e.key === "Enter") {
              props.getCharId(char.id);
              focusOnItem(i);
            }
          }}
        >
          <img
            src={char.thumbnail}
            alt={char.name}
            style={
              char.thumbnail ===
              "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
                ? { objectFit: "fill" }
                : null
            }
          />
          <div className="char__name">{char.name}</div>
        </li>
      );
    });
    return <ul className="char__grid">{chars}</ul>;
  };

  const cards = makeCharCards(charList);
  return (
    <div className="char__list">
      {error ? <ErrorMessage /> : loading ? <Spinner /> : cards}
      <button
        className="button button__main button__long"
        onClick={() => onRequest(offset)}
        disabled={newCharListLoading}
        style={charEnded ? { display: "none" } : {}}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default CharList;
