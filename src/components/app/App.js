import { useState } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from "../../resources/img/vision.png";
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";

const App = () => {
  const [charId, setCharId] = useState(null);

  const getCharId = (id) => {
    setCharId(id);
  };

  return (
    <div className="app">
      <AppHeader />
      <main>
        {/* <RandomChar />
        <div className="char__content">
          <CharList getCharId={getCharId} />
          <CharInfo charId={charId} />
        </div>
        <img className="bg-decoration" src={decoration} alt="vision" /> */}
        <AppBanner />
        <ComicsList />
      </main>
    </div>
  );
};

export default App;
