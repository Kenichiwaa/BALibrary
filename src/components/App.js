import React, { useState, useEffect } from "react";
import styled from "styled-components";

import fetchTopAlbums from "../data/top-albums";
import MusicCard from "./MusicCard";
import MusicModal from "./MusicModal";

const StyledNav = styled.div`
  &.ui.menu {
    background-color: #72b7ae;
    padding-left: 1em;
  }
`;

const StyledCardsWrapper = styled.div`
  &.ui.cards {
    position: relative;
    top: 60px;
  }
`;

function App() {
  const [currAlbums, setCurrAlbums] = useState([]);
  const [allAlbums, setAllAlbums] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [albumInfo, setAlbumInfo] = useState([]);

  const LOCAL_STORAGE_KEY = "MyABLAlbums";

  useEffect(() => {
    const localStorageData = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY)
    );

    if (localStorageData !== null && localStorageData.length > 99) {
      setCurrAlbums(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)));
    } else {
      fetchTopAlbums().then((res) => {
        let data = res.feed.entry.map((v) => ({ ...v, favorite: false }));
        setCurrAlbums(data);
        setAllAlbums(data);
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allAlbums));
  });

  const handleOpenModal = (e) => {
    setAlbumInfo(
      currAlbums.find((item) => e.target.id === item.id.attributes["im:id"])
    );
    return setModalOpen(true);
  };

  function handleCloseModal() {
    setModalOpen(false);
  }

  const setFavorite = (id) => {
    let album = allAlbums.find((item) => {
      if (id.target.id === item.id.attributes["im:id"])
        return (item.favorite = item.favorite === false ? true : false);
    });
    setCurrAlbums([...allAlbums], album);
    setAllAlbums([...allAlbums], album);
  };

  const getFavoriteAlbums = () => {
    setModalOpen(false);
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
        <div className=" menu left">
          <h1>Top Albums </h1>
        </div>
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

      <StyledCardsWrapper className="ui centered cards">
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
