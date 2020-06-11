import React, { useState, useEffect } from "react";

import fetchTopAlbums from "../data/top-albums";
import MusicCard from "./MusicCard";

function App() {
  const [albums, setAlbums] = useState();

  useEffect(() => {
    fetchTopAlbums().then((res) => {
      setAlbums(res.feed.entry.map((v) => ({ ...v, favorite: false })));
    });
  }, []);

  const setFavorite = (id) => {
    let album = albums.find((item) => {
      if (id.target.id === item.id.attributes["im:id"])
        return item.favorite = (item.favorite === false ? true : false);
    });
    setAlbums([...albums], album);
  };

  return (
    <div className="ui container">
      <div className="ui secondary pointing menu">
        <div className="right menu">
          <button className="ui item active">Top Albums</button>
          <button className="ui item">Favorite Albums</button>
        </div>
      </div>
      <div className="ui cards">
        {albums ? (
          albums.map((album) => {
            return <MusicCard info={album} setFavorite={setFavorite} />;
          })
        ) : (
          <div>loading</div>
        )}
      </div>
    </div>
  );
}

export default App;
