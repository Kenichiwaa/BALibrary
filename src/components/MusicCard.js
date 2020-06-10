import React from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ImgCard = styled.div`
  font-size: 1em;
  max-width: 240px;
  text-align: center;
`;

const ImgWrapper = styled.div`

`;

const ArtistName = styled.div`
  font-weight: bolder;
`

const ArtistTitle = styled.div`
`

class MusicCard extends React.Component {
  render() {
    const album = this.props.album;
    return (
      <ImgCard className="ui card">
        <ImgWrapper className="image">
          <img src={this.props.img}/>
        </ImgWrapper>
        <ArtistName className="header">{this.props.artist}</ArtistName>
        <hr />
        <ArtistTitle className="title">{this.props.title}</ArtistTitle>
        <i className="user icon"></i>
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
  key: '11111111',
  img: null,
  artist: 'ABLibrary',
  title: 'title',
  favorite: false,
};

export default MusicCard;
