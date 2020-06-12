import React from "react";
import ReactModal from "react-modal";
import styled from "styled-components";

const StyledReactModal = styled(ReactModal)`
  background-color: #c4d4d8;
  height: auto;
  padding: 3em;
  padding-top: 6em;
  box-shadow: 0px 4px 7px 0px rgba(50, 50, 49, 0.4);

  &:focus {
    outline: none;
  }
`;
const StyledImg = styled.img`
  width: 100%;
`;

const FavoriteIcon = styled.i`
  color: ${({ isFavorite }) => (isFavorite ? "yellow" : "black")};
  padding-right: 2em;
`;

const StyledTitle = styled.h5`
  height: 40px;
`;

const titles = [
  "Album Name",
  "Artist Name",
  "Category",
  "Number of Songs",
  "Price",
];

const MusicModal = ({
  modalIsOpen,
  albumInfo,
  setFavorite,
  handleCloseModal,
}) => {
  const img = albumInfo["im:image"][2].label;
  const id = albumInfo.id.attributes["im:id"];
  const favorite = albumInfo.favorite;
  const title = albumInfo["im:name"].label;
  const artist = albumInfo["im:artist"].label;
  const category = albumInfo.category.attributes.label;
  const itemCount = albumInfo["im:itemCount"].label;
  const price = albumInfo["im:price"].label;

  const details = [title, artist, category, itemCount, price];

  return (
    <StyledReactModal
      isOpen={modalIsOpen}
      ariaHideApp={false}
      contentLabel="Album Information"
    >
      <button className={"ui button right floated "} onClick={handleCloseModal}>
        Close Modal
      </button>
      <div className="ui stackable two column grid">
        <div className="four wide column">
          <StyledImg src={img} alt={details.title} />
        </div>
        <div className="twelve wide column">
          <div className="ui grid container">
            <div className="six wide column">
              {titles.map((title, index) => {
                return (
                  <div className="ui row" key={index}>
                    <StyledTitle>{title}</StyledTitle>
                  </div>
                );
              })}
            </div>
            <div className="ten wide column">
              {details.map((title, index) => {
                return (
                  <div className="ui row" key={index}>
                    <StyledTitle>{title}</StyledTitle>
                  </div>
                );
              })}
            </div>
          </div>
            <FavoriteIcon
              className="favorite icon"
              onClick={setFavorite}
              id={id}
              isFavorite={favorite}
            />
            <button className={"ui button"} onClick={setFavorite} id={id}>
              {favorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
        </div>
      </div>
    </StyledReactModal>
  );
};

export default MusicModal;
