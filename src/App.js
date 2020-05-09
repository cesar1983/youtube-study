import React, { Component } from "react";

import { Grid } from "@material-ui/core";

import youtube from "./api/Youtube";

import { SearchBar, VideoDetail, VideoList } from "./components";

class App extends Component {
  state = {
    videos: [],
    selectedVideo: null,
  };

  componentDidMount() {
    this.handleSubmit("pele");
  }

  handleSubmit = async (term) => {
    const response = await youtube.get("search", {
      params: {
        part: "snippet",
        maxResults: 5,
        key: "AIzaSyDxZyKcFLftbBM_dpjhge4iv2OuQ8TtZMg",
        q: term,
      },
    });

    this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[0],
    });
  };

  handleVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  };

  render() {
    const { videos, selectedVideo } = this.state;

    return (
      <div className="App">
        <Grid container justify="center" spacing={5}>
          <Grid item xs={12} md={10}>
            <h1>Video Streamer</h1>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <SearchBar onFormSubmit={this.handleSubmit} />
              </Grid>
              <Grid item xs={12} md={8}>
                <VideoDetail video={selectedVideo} />
              </Grid>
              <Grid item xs={12} md={4}>
                <VideoList
                  videos={videos}
                  handleVideoSelect={this.handleVideoSelect}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
