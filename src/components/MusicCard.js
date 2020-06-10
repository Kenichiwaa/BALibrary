import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ImgCard = styled.div`
  text-align: center;
  padding: 1em !important;
  background-color: lightgray !important;
`;

const ArtistName = styled.div`
  font-weight: bolder;
  padding: 0.5em;
`;

const ArtistTitle = styled.div`
`;

const FavoriteWrapper = styled.div`
  padding-top: 1em;
`;

const FavoriteIcon = styled.i`
  color: ${({ color }) => (color ? 'yellow' : 'blue')};

`

class MusicCard extends React.Component {
  render() {
    return (
      <ImgCard className="ui card">
        <div className="image">
          <img src={this.props.img} />
        </div>
        <ArtistName className="header">{this.props.artist}</ArtistName>
        <ArtistTitle className="title">{this.props.title}</ArtistTitle>
        <FavoriteWrapper>
          <FavoriteIcon className="favorite icon" color={this.props.favorite} />
        </FavoriteWrapper>
      </ImgCard>
    );
  }
}

MusicCard.propTypes = {
  key: PropTypes.string,
  img: PropTypes.string,
  artist: PropTypes.string,
  title: PropTypes.string,
  favorite: PropTypes.bool,
};

MusicCard.defaultProps = {
  key: "11111111",
  img: null,
  artist: "ABLibrary",
  title: "title",
  favorite: true,
};

export default MusicCard;
