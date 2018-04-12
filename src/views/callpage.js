import React, { Component } from "react";

class CallPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: window.PHONE({
        number: props.room,
        autocam: false,
        publish_key: "pub-c-26f7ecab-7613-4f93-b660-b955d311eb03",
        subscribe_key: "sub-c-1de50116-3e2c-11e8-a2e8-d2288b7dcaaf"
      })
    };
  }

  componentWillReciveProps(nextProps) {
    if (nextProps.room !== this.props.room) {
      this.initCall();
    }
  }

  startCamera = e => {
    const { phone } = this.state;
    phone.camera.start();

    console.log(phone);
    phone.receive(function(session) {
      // Display Your Friend's Live Video
      session.connected(function(session) {
        phone.$("video").appendChild(session.video);
      });
    });

    phone.camera.ready(video => {
      phone.$("video-out").appendChild(video);
    });
  };

  render() {
    const { room } = this.props;
    return (
      <div>
        <div>
          <input
            value={room}
            onChange={({ target: { value } }) => this.setState({ room: value })}
          />
          <button onClick={this.startCamera}>Start Camera</button>
          <div
            id="video"
            style={{
              height: "300px",
              width: "300px",
              border: "1px solid black"
            }}
          />
          <div
            id="video-out"
            style={{
              height: "300px",
              width: "300px",
              border: "1px solid black"
            }}
          />
        </div>
      </div>
    );
  }
}

export default CallPage;
