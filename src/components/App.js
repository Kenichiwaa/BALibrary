import React, { useState, useEffect } from "react";
import styled from "styled-components";

import fetchTopAlbums from "../data/top-albums";
import MusicCard from "./MusicCard";
import ReactModal from "react-modal";

// import Modal from "./Modal";
// <Modal
// isOpen={modalIsOpen}
// ariaHideApp={false}
// modalInfo={modalInfo}
// contentLabel="Minimal Modal Example"
// / >

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

const FavoriteWrapper = styled.div`
  padding-top: 1em;
`;

const FavoriteIcon = styled.i`
  color: ${({ isFavorite }) => (isFavorite ? "yellow" : "black")};
`;

function App() {
  const [currAlbums, setCurrAlbums] = useState();
  const [albums, setAlbums] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState();

  useEffect(() => {
    fetchTopAlbums().then((res) => {
      let data = res.feed.entry.map((v) => ({ ...v, favorite: false }));
      setCurrAlbums(data);
      setAlbums(data);
    });
  }, []);

  var subtitle;
  function openModal() {
    setIsOpen(true);
  }

  const getAlbumInfo = (id) =>
    currAlbums.find((item) => {
      if (id === item.id.attributes["im:id"]) return item;
      else return id;
    });

  const handleOpenModal = (e) => {
    e.cancelBubble = true;
    // references are now sync'd and can be accessed.
    setModalInfo(
      currAlbums.find((item) => {
        if (e.target.id === item.id.attributes["im:id"]) return item;
      })
    );
    setIsOpen(true);
    console.log("id", e.target);
    console.log("modalIsOpen", modalIsOpen);
    console.log("data", e.target.id);
    console.log("album", getAlbumInfo(e.target.id));

    console.log("modalInfo", { modalInfo });
  };

  function handleCloseModal() {
    setIsOpen(false);
  }

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

      {modalIsOpen ? (
        <ReactModal
          isOpen={modalIsOpen}
          ariaHideApp={false}
          contentLabel="Minimal Modal Example"
        >
          {console.log("modalinfxxx", modalInfo)}
          <img src={modalInfo["im:image"][0].label} />
          <h5>Albuum Name</h5>
          {modalInfo["im:name"].label}
          <h5>Artist Name</h5>
          {modalInfo["im:artist"].label}
          <h5>Category</h5>
          {modalInfo.category.label}
          <h5>Number of Songs</h5>
          {modalInfo["im:itemCount"].label}
          <h5>Price</h5>
          {modalInfo.["im:Price"].label}

          <button onClick={handleCloseModal}>Close Modal</button>
          <FavoriteWrapper>
            <FavoriteIcon
              className="favorite icon"
              onClick={setFavorite}
              id={modalInfo.id.attributes["im:id"]}
              isFavorite={modalInfo.favorite}
            />
          </FavoriteWrapper>
        </ReactModal>
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
