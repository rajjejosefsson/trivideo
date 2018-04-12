import React, { Component } from "react";
import SimpleWebRTC from "simplewebrtc";
import TrivagoLogo from "../components/TrivagoLogo";

class CallPage extends Component {
  state = {
    isMuted: false
  };
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

  toggleMuteHandler = () => {
    this.setState(prevState => ({
      isMute: !prevState.isMute
    }));

    if (!this.state.isMuted) {
      this.webrtc.mute();
    } else {
      this.webrtc.unmute();
    }
  };

  render() {
    const { room } = this.props;
    return (
      <React.Fragment>
        <header className="header">
          <TrivagoLogo />
          <span className="header__title">trivago</span>
          <span className="header__room">Room: {room}</span>
        </header>
        <main>
          <video id="localVideo" />
          <div id="remoteVideos" />
          <button
            onClick={this.toggleMuteHandler}
            style={{
              background: this.state.isMute ? "red" : "green"
            }}
          >
            {this.state.isMute ? "Unmute" : "mute"}
          </button>
        </main>
      </React.Fragment>
    );
  }
}

export default CallPage;
