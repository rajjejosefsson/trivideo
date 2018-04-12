import React, { Component } from "react";
import SimpleWebRTC from "simplewebrtc";
import TrivagoLogo from "../components/TrivagoLogo";

class CallPage extends Component {
  webrct = null;
  constructor(props) {
    super();
    this.webrtc = new SimpleWebRTC({
      // the id/element dom element that will hold "our" video
      localVideoEl: "localVideo",
      // the id/element dom element that will hold remote videos
      remoteVideosEl: "remoteVideos",
      // immediately ask for camera access
      autoRequestMedia: true
    });

    // a peer video has been added
    this.webrtc.on("videoAdded", (video, peer) => {
      console.log("video added", peer);
    });

    // we have to wait until it's ready
    this.webrtc.on("readyToCall", () => {
      // you can name it anything
      this.webrtc.joinRoom(props.room);
    });

  }

  muteMicroHandler = () => {
    this.webrtc.mute();
  };

  render() {
    return (
      <React.Fragment>
        <header className="header">
          <TrivagoLogo />
          <span className="header__title">trivago</span>
        </header>
        <main>
          <h1>Hello</h1>
          <video id="localVideo" />
          <div id="remoteVideos" />
          <button onClick={this.muteMicroHandler}> fuck mute </button>
        </main>
      </React.Fragment>
    );
  }
}

export default CallPage;
