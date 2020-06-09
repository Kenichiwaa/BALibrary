import React from "react";
import ReactDOM from "react-dom";
import fetchTopAlbums from "./data/top-albums";


const card = (album) => {
    return(
       <div className="ui card">
           {album['im:name'].label}
       </div> 
    )
}

class App extends React.Component {
    state = {
        albums: []
    }

    componentDidMount() {
        fetchTopAlbums().then(res => {
            console.log('outside', res.feed.entry)
            this.setState({albums: res.feed.entry})
        })
    }

  render() {
      console.log(this.state.albums.map(v => v['im:name'].label))
    return (
      <div className="ui container">
        <div className="ui secondary pointing menu">
          <div className="right menu">
            <button className="ui item active">Top Albums</button>
            <button className="ui item">Favorite Albums</button>
          </div>
        </div>
        <div className="ui content">
          <div>{this.state.albums.map(v => card(v))}</div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
