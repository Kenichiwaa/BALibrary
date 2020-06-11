import React, { useState, useEffect } from "react";

import fetchTopAlbums from "../data/top-albums";
import MusicCard from "./MusicCard";
import styled from "styled-components";

const StyledNav = styled.div`
  &.ui.menu {
    background-color: white;
  }
`;

const StyledCardsWrapper = styled.div`
  &.ui.cards {
    position: relative;
    top: 60px;
  }
`;

function App() {
  const [currAlbums, setCurrAlbums] = useState();
  const [albums, setAlbums] = useState();

  useEffect(() => {
    fetchTopAlbums().then((res) => {
      let data = res.feed.entry.map((v) => ({ ...v, favorite: false }));
      setCurrAlbums(data);
      setAlbums(data);
    });
  }, []);

  const setFavorite = (id) => {
    let album = currAlbums.find((item) => {
      if (id.target.id === item.id.attributes["im:id"])
        return (item.favorite = item.favorite === false ? true : false);
    });
    setAlbums([...currAlbums], album);
  };

  const getFavoriteAlbums = () => {
    let favoriteAlbums = [];
    albums.map((album) => {
      if (album.favorite === true) favoriteAlbums.push(album);
    });

    return setCurrAlbums(favoriteAlbums);
  };

  const geAllAlbums = () => {
    return setCurrAlbums(albums);
  };

  return (
    <div className="ui container">
      <StyledNav className="ui secondary pointing menu top fixed">
        <div className="right menu">
          <button className="ui item" onClick={geAllAlbums}>
            Top Albums
          </button>
          <button className="ui item" onClick={getFavoriteAlbums}>
            Favorite Albums
          </button>
        </div>
      </StyledNav>
      <StyledCardsWrapper className="ui cards">
        {currAlbums ? (
          currAlbums.map((album) => {
            return <MusicCard info={album} setFavorite={setFavorite} />;
          })
        ) : (
          <div>loading</div>
        )}
      </StyledCardsWrapper>
    </div>
  );
}

export default App;
