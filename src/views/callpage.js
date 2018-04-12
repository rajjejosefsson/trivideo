import React, { Component } from "react";
import SimpleWebRTC from "simplewebrtc";
import TrivagoLogo from "../components/TrivagoLogo";

class CallPage extends Component {
  state = {
    isMuted: false,
    users: 1
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
      video.controls = true;
      this.setState({ users: this.state.users + 1})
    });

    this.webrtc.on("videoRemoved", (video, peer) => {
      this.setState({ users: this.state.users - 1})
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
    const { users } = this.state;
    return (
      <React.Fragment>
        <header className="header">
          <TrivagoLogo />
          <span className="header__title">trivago</span>
          <span className="header__room">
            Room: {room} - Users: {users}

          </span>
        </header>
        <main>
          <div id="remoteVideos" />
          <div className="videos_you">
            <p>You</p>
            <video id="localVideo" />
            <button
              onClick={this.toggleMuteHandler}
              style={{
                background: this.state.isMute ? "red" : "green"
              }}
            >
              {this.state.isMute ? "Unmute" : "mute"}
            </button>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default CallPage;
