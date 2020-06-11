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
          <div class="ui grid container">
            <div class="three wide column">
              <img src={modalInfo["im:image"][2].label} />
            </div>
            <div class="nine wide column">
              <div class="ui grid container">
                <div class="four wide column">
                  <h5>Album Name</h5>
                  <h5>Artist Name</h5>
                  <h5>Category</h5>
                  <h5>Number of Songs</h5>
                  <h5>Price</h5>
                </div>
                <div class="eight wide column">
                  <p>{modalInfo["im:name"].label}</p>
                  <p>{modalInfo["im:artist"].label}</p>
                  <p>{modalInfo.category.attributes.label}</p>
                  <p>{modalInfo["im:itemCount"].label}</p>
                  <p>{modalInfo["im:price"].label}</p>
                </div>
              </div>
              <FavoriteWrapper>
                <FavoriteIcon
                  className="favorite icon"
                  onClick={setFavorite}
                  id={modalInfo.id.attributes["im:id"]}
                  isFavorite={modalInfo.favorite}
                />
                <button
                  onClick={setFavorite}
                  id={modalInfo.id.attributes["im:id"]}
                >
                  {modalInfo.favorite
                    ? "Remove from Favorites"
                    : "Add to Favorites"}
                </button>
              </FavoriteWrapper>
            </div>
          </div>

          <button onClick={handleCloseModal}>Close Modal</button>
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
