import React from "react";
import ReactModal from "react-modal";
import styled from "styled-components";

const StyledReactModal = styled(ReactModal)`
  background-color: #c4d4d8;
  height: 41vh;
  padding: 3em;
  padding-top: 6em;
  box-shadow: 0px 4px 7px 0px rgba(50, 50, 49, 0.4);

  &:focus {
    outline: none;
  }
`;

const FavoriteWrapper = styled.div`
  padding-top: 1em;
`;

const FavoriteIcon = styled.i`
  color: ${({ isFavorite }) => (isFavorite ? "yellow" : "black")};
`;

const StyledTitle = styled.h5`
  height: 35px;
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
  modalInfo,
  setFavorite,
  handleCloseModal,
}) => {
  const details = [
    { name: modalInfo["im:name"].label },
    { favorite: modalInfo.favorite },
  ];

  console.log("details", details);
  console.log("details", details.name);
  console.log("modalInfo", modalInfo);

  return (
    <StyledReactModal
      isOpen={modalIsOpen}
      ariaHideApp={false}
      contentLabel="Minimal Modal Example"
    >
      {console.log("modalinfxxx", modalInfo)}
      <div className="ui grid">
        <div className="three wide column">
          <img src={modalInfo["im:image"][2].label} />
        </div>
        <div className="nine wide column">
          <div className="ui grid container">
            <div className="four wide column">
              {titles.map((title) => {
                return (
                  <row>
                    <StyledTitle>{title}</StyledTitle>
                  </row>
                );
              })}
            </div>
            <div className="eight wide column">
              <row>
                <p>{modalInfo["im:name"].label}</p>
              </row>
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
            <button onClick={setFavorite} id={modalInfo.id.attributes["im:id"]}>
              {modalInfo.favorite
                ? "Remove from Favorites"
                : "Add to Favorites"}
            </button>
          </FavoriteWrapper>
        </div>
        <button onClick={handleCloseModal}>Close Modal</button>
      </div>
    </StyledReactModal>
  );
};

export default MusicModal;
