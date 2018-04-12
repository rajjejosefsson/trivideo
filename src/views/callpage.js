import React, { Component } from "react";
import SimpleWebRTC from "simplewebrtc";
import TrivagoLogo from "../components/TrivagoLogo";

class CallPage extends Component {
  state = {
    mute: {
      isMuted: false,
      muteText: 'I no wanna talks',
      color: 'red'
    }
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
    let { mute } = this.state; 
    const copyMute = {...mute};
    if (!copyMute.isMuted) {
      this.webrtc.mute();
      copyMute.isMuted = true;
      copyMute.muteText = 'I wanna talks!';
      copyMute.color = 'green';
    } else {
      this.webrtc.unmute();
      copyMute.isMuted = false;
      copyMute.muteText = 'I no wanna talks!';
      copyMute.color = 'red';
    }
    this.setState({mute: copyMute});
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
          <button onClick={this.toggleMuteHandler()}> {this.state.mute.muteText} </button>
        </main>
      </React.Fragment>
    );
  }
}

export default CallPage;
