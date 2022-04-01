import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const { loading, error, request, clearError } = useHttp();
  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=35ce66c9948b2d1e6ca91816bfbd7d29";
  const _baseOffset = 150;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset= ${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformCharacterData);
  };

  const getCharacter = async (id) => {
    const res = await request(` ${_apiBase}characters/${id}?${_apiKey}`);

    return _transformCharacterData(res.data.results[0]);
  };

  const getAllComics = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}comics?limit=8&offset= ${offset}&${_apiKey}`
    );

    return res.data.results.map(_transformComicsData);
  };

  const getComic = async (id) => {
    const res = await request(` ${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComicsData(res.data.results[0]);
  };

  const _transformComicsData = ({
    id,
    title,
    thumbnail: { path, extension },
    urls,
    prices,
    description,
    pageCount,
  }) => {
    return {
      id,
      title,
      thumbnail: path + "." + extension,
      homePage: urls[0].url,
      price: prices[0].price,
      description,
      pageCount,
    };
  };

  const _transformCharacterData = ({
    id,
    name,
    thumbnail: { path, extension },
    description,
    urls,
    comics: { items },
  }) => {
    return {
      id,
      name,
      thumbnail: path + "." + extension,
      description,
      homePage: urls[0].url,
      wiki: urls[1].url,
      items,
    };
  };

  return {
    loading,
    error,
    clearError,
    getAllCharacters,
    getCharacter,
    getAllComics,
    getComic,
  };
};

export default useMarvelService;
