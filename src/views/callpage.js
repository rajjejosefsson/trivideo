import React, { Component } from "react";
import SimpleWebRTC from "simplewebrtc";
import TrivagoLogo from "../components/TrivagoLogo";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faMicrophone from "@fortawesome/fontawesome-free-solid/faMicrophone";
import faMicrophoneSlash from "@fortawesome/fontawesome-free-solid/faMicrophoneSlash";
import faCamera from "@fortawesome/fontawesome-free-solid/faCamera";
import faSlideshare from "@fortawesome/fontawesome-free-brands/faSlideshare";

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
      this.setState({ users: this.state.users + 1 });
    });

    this.webrtc.on("videoRemoved", (video, peer) => {
      this.setState({ users: this.state.users - 1 });
    });

    // we have to wait until it's ready
    this.webrtc.on("readyToCall", () => {
      // you can name it anything
      this.webrtc.joinRoom(props.room);
    });

    this.webrtc.on("localScreenAdded", function(video) {
      console.log(" sharing coming");

      video.onclick = function() {
        video.style.width = video.videoWidth + "px";
        video.style.height = video.videoHeight + "px";
      };
      document.getElementById("localScreenContainer").appendChild(video);
      document.getElementById("localScreenContainer").show();
    });

    // local screen removed
    this.webrtc.on("localScreenRemoved", function(video) {
      document.getElementById("localScreenContainer").removeChild(video);
      document.getElementById("localScreenContainer").hide();
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

  onShareScreen = () => {
    if (this.webrtc.getLocalScreen()) {
      this.webrtc.stopScreenShare();
    } else {
      console.log("start sharing");
      this.webrtc.shareScreen(err => {
        if (err) {
          console.log(err);
        } else {
          console.log("ok");
        }
      });
    }
  };

  render() {
    const { room } = this.props;
    const { users, isMute } = this.state;
    return (
      <React.Fragment>
        <header className="header">
          <TrivagoLogo />
          <span className="header__room">
            Room: {room} - Users: {users}
          </span>
        </header>
        <main className="grid">
          <div className="videos_you">
            <p className="videos_you__title">You</p>
            <video id="localVideo" />
            <div className="videos_you__controls">
              <button
                onClick={this.toggleMuteHandler}
                style={{ background: isMute ? "red" : "green" }}
              >
                {isMute ? (
                  <FontAwesomeIcon size="lg" icon={faMicrophone} />
                ) : (
                  <FontAwesomeIcon size="lg" icon={faMicrophoneSlash} />
                )}
              </button>
              <button>
                <FontAwesomeIcon size="lg" icon={faCamera} />
              </button>
              <button onClick={this.onShareScreen} className="btn">
                <FontAwesomeIcon size="lg" icon={faSlideshare} />
              </button>
            </div>
            <div id="localScreenContainer" />
            <div id="remoteVideos" />
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default CallPage;
