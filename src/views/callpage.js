import React, { Component } from "react";

class CallPage extends Component {
  componentDidMount() {
    const { room } = this.props;
    console.log(room)
    const phone = window.PHONE({
      number: this.props.room,
      publish_key: "pub-c-26f7ecab-7613-4f93-b660-b955d311eb03",
      subscribe_key: "sub-c-1de50116-3e2c-11e8-a2e8-d2288b7dcaaf",
      ssl: true
    });
    let session = phone.dial(room);

    // Start Camera
    phone.bind("mousedown,touchstart", phone.$("startcam"), event =>
      phone.camera.start()
    );
    // Stop Camera
    phone.bind("mousedown,touchstart", phone.$("stopcam"), event =>
      phone.camera.stop()
    );
    // Local Camera Display
    phone.camera.ready(video => {
      phone.$("video").appendChild(video);
    });
    // As soon as the phone is ready we can make calls
    phone.ready(() => {
      // Start Call
      phone.bind(
        "mousedown,touchstart",
        phone.$("startcall"),
        event => (session = phone.dial(room))
      );
      // Stop Call
      phone.bind("mousedown,touchstart", phone.$("stopcall"), event =>
        phone.hangup()
      );
    });
    // When Call Comes In or is to be Connected
    phone.receive(function(session) {
      // Display Your Friend's Live Video
      session.connected(function(session) {
        phone.$("video-out").appendChild(session.video);
      });
    });
  }

  render() {
    const { room } = this.props;
    return (
      <div>
        <div>
          <input
            value={room}
            onChange={({ target: { value } }) => this.setState({ room: value })}
          />
          <button id="startcam">Start Camera</button>
          <button id="stopcam">stop Camera</button>
          <button id="startcall">startcall</button>
          <button id="stopcall">Stop Call</button>
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
