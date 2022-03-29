import { useEffect, useState } from "react";

import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";
import MarvelService from "../../services/MarvelService";

import "./charInfo.scss";

const CharInfo = (props) => {
  const [char, setChar] = useState(null),
    [loading, setLoading] = useState(false),
    [error, setError] = useState(false);

  const marvilService = new MarvelService();

  const updateCharById = (id) => {
    if (!props.charId) return;
    onCharLoading();
    marvilService.getCharacter(id).then(onCharLoaded).catch(onError);
  };

  useEffect(() => {
    updateCharById(props.charId);
  }, [props.charId]);

  const onCharLoaded = (char) => {
    setChar(char);
    setLoading(false);
    setError(false);
  };

  const onCharLoading = () => {
    setLoading(true);
  };
  const onError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <div className="char__info">
      {error ? (
        <ErrorMessage />
      ) : loading ? (
        <Spinner />
      ) : char ? (
        <View char={char} />
      ) : (
        <Skeleton />
      )}
    </div>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail, wiki, homePage, items } = char;
  return (
    <>
      <div className="char__basics">
        <img
          src={thumbnail}
          alt={name}
          style={
            thumbnail ===
            "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
              ? { objectFit: "contain" }
              : null
          }
        />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homePage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {items.map((item, i) => {
          return (
            <li key={i} className="char__comics-item">
              {item.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CharInfo;
