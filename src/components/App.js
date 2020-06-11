import React, { useState, useEffect } from "react";
import styled from "styled-components";

import fetchTopAlbums from "../data/top-albums";
import MusicCard from "./MusicCard";
import MusicModal from "./MusicModal";

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
  const [allAlbums, setAllAlbums] = useState();
  const [isModalOpen, setIsOpen] = useState(false);
  const [albumInfo, setAlbumInfo] = useState();

  const LOCAL_STORAGE_KEY = "MyABLAlbums";

  useEffect(() => {
    const localStorageData = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY)
    );

    if (localStorageData) {
      setCurrAlbums(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)));
    } else {
      fetchTopAlbums().then((res) => {
        let data = res.feed.entry.map((v) => ({ ...v, favorite: false }));
        setCurrAlbums(data);
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currAlbums));
  });

  const handleOpenModal = (e) => {
    setAlbumInfo(
      currAlbums.find((item) => {
        if (e.target.id === item.id.attributes["im:id"]) {
          return item;
        }
      })
    );
    setIsOpen(true);
  };

  function handleCloseModal() {
    setIsOpen(false);
  }

  const setFavorite = (id) => {
    console.log("setFavorite event.taget.value ", id.target);
    let album = currAlbums.find((item) => {
      if (id.target.id === item.id.attributes["im:id"])
        return (item.favorite = item.favorite === false ? true : false);
    });
    setCurrAlbums([...currAlbums], album);
  };

  const getFavoriteAlbums = () => {
    let favoriteAlbums = [];
    currAlbums.map((album) => {
      if (album.favorite === true) return favoriteAlbums.push(album);
    });
    setAllAlbums(currAlbums);
    setCurrAlbums(favoriteAlbums);
  };

  const geAllAlbums = () => {
    return setCurrAlbums(allAlbums);
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

      {isModalOpen ? (
        <MusicModal
          modalIsOpen={isModalOpen}
          albumInfo={albumInfo}
          setFavorite={setFavorite}
          handleCloseModal={handleCloseModal}
        />
      ) : (
        <div></div>
      )}

      <StyledCardsWrapper className="ui cards">
        {currAlbums ? (
          currAlbums.map((album, index) => {
            return (
              <MusicCard
                album={album}
                key={index}
                setFavorite={setFavorite}
                openModel={handleOpenModal}
              />
            );
          })
        ) : (
          <div>loading</div>
        )}
      </StyledCardsWrapper>
    </div>
  );
}

export default App;
