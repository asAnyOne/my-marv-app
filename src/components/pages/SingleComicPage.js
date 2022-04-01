import "./singleComicPage.scss";

import { Link, useParams } from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import { useEffect, useState } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

const SingleComicPage = () => {
  const [comic, setComic] = useState({});
  const { comicId } = useParams();

  const { loading, error, clearError, getComic } = useMarvelService();

  useEffect(() => {
    onRequest();
  }, [comicId]);

  const onLoaded = (data) => {
    setComic(data);
  };
  const onRequest = () => {
    clearError();
    getComic(comicId).then(onLoaded);
  };

  return (
    <div className="single-comic">
      {error ? (
        <ErrorMessage />
      ) : loading ? (
        <Spinner />
      ) : (
        <View comic={comic} />
      )}
    </div>
  );
};

const View = ({ comic }) => {
  const { title, thumbnail, price, description, pageCount } = comic;

  return (
    <>
      <img src={thumbnail} alt={title} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name"> {title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr"> {pageCount} pages</p>
        <p className="single-comic__descr">Language: en-us</p>
        <div className="single-comic__price"> {price}$</div>
      </div>{" "}
      <Link to="/comics" className="single-comic__back">
        Back to all
      </Link>
    </>
  );
};

export default SingleComicPage;
