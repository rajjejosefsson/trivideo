import React, { Component } from "react";
// import { PHONE } from "webrtc-sdk";
class CallPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: "sexy-moteu-call",
      phone: window.PHONE({
        number: props.room,
        autocam: false,
        publish_key: "pub-c-26f7ecab-7613-4f93-b660-b955d311eb03",
        subscribe_key: "sub-c-1de50116-3e2c-11e8-a2e8-d2288b7dcaaf"
      })
    };
    console.log("tomeu");
  }

  componentWillReciveProps(nextProps) {
    if (nextProps.room !== this.props.room) {
      this.initCall();
    }
  }

  startCamera = e => {
    const { phone } = this.state;
    phone.camera.start();
  };

  stopCamera = e => {
    const { phone } = this.state;
    phone.camera.stop();
  };

  render() {
    const { room } = this.props;
    return (
      <div>
        <div>
          <input value={room} />
          <button onClick={this.startCamera}>Start Camera</button>
          <div id="video" />
        </div>
      </div>
    );
  }
}

export default CallPage;
