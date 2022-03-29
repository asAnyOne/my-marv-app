import { useEffect, useRef, useState } from "react";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

import "./comicsList.scss";

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]),
    [newComicsListLoading, setNewComicsListLoading] = useState(false),
    [offset, setOffset] = useState(150),
    [comicsEnded, setComicsEnded] = useState(false);

  const { loading, error, getAllComics } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewComicsListLoading(false) : setNewComicsListLoading(true);
    getAllComics(offset).then(onComicsListLoaded);
  };

  const onComicsListLoaded = (newComicsList) => {
    setComicsList([...comicsList, ...newComicsList]);
    setNewComicsListLoading(() => false);
    setOffset(offset + 8);
    setComicsEnded(newComicsList.length < 8);
  };

  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    itemRefs.current[id].classList.add("char__item_selected");
    itemRefs.current[id].focus();
  };

  const makeComicsCards = (arr) => {
    const comicses = arr.map((comics, i) => {
      return (
        <li
          className="comics__item"
          tabIndex={0}
          ref={(el) => (itemRefs.current[i] = el)}
          key={comics.id}
          onClick={() => {
            // props.getComicsId(comics.id);
            focusOnItem(i);
          }}
          onKeyPress={(e) => {
            if (e.key === " " || e.key === "Enter") {
              //   props.getComicsId(comics.id);
              focusOnItem(i);
            }
          }}
        >
          <a href="">
            {" "}
            <img
              className="comics__item-img"
              src={comics.thumbnail}
              alt={comics.title}
              style={
                comics.thumbnail ===
                "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
                  ? { objectFit: "fill" }
                  : null
              }
            />
            <div className="comics__item-name">{comics.title}</div>
            <div className="comics__item-price">{comics.price} </div>
          </a>
        </li>
      );
    });
    return <ul className="comics__grid">{comicses}</ul>;
  };
  const cards = makeComicsCards(comicsList);
  return (
    <div className="comics__list">
      {error ? (
        <ErrorMessage />
      ) : loading && !newComicsListLoading ? (
        <Spinner />
      ) : (
        cards
      )}
      <button
        className="button button__main button__long"
        onClick={() => onRequest(offset)}
        disabled={newComicsListLoading}
        style={comicsEnded ? { display: "none" } : {}}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
