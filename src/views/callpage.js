import React, { Component } from "react";

class CallPage extends Component {
  state = {
    username: `User ${Math.ceil(Math.random() * 10)}`,
    chat: [],
    message: "",
    phone: null
  };

  setPhone = () => {
    const { username } = this.state;
    this.setState({
      phone: window.PHONE({
        number: username,
        publish_key: "pub-c-26f7ecab-7613-4f93-b660-b955d311eb03",
        subscribe_key: "sub-c-1de50116-3e2c-11e8-a2e8-d2288b7dcaaf",
        media: { audio: true, video: true },
        ssl: true
      })
    });
  };

  onReady = () => {
    const { room } = this.props;
    const { phone } = this.state;
    let session = null;

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
        event => (session = phone.dial("1234"))
      );
      // Stop Call
      phone.bind("mousedown,touchstart", phone.$("stopcall"), event =>
        phone.hangup()
      );
    });
    // When Call Comes In or is to be Connected
    phone.receive(session => {
      // Display Your Friend's Live Video
      session.connected(stream => {
        phone.$("video-out").appendChild(stream.video);
      });
    });

    phone.message((session, message) => {
      this.setState({
        chat: [
          ...this.state.chat,
          { user: session.number, message: message.text }
        ]
      });
    });
  };

  sendMessage = () => {
    const { phone, chat, username, message } = this.state;
    phone.send({ text: message });
    this.setState({
      chat: [
        ...chat,
        {
          user: username,
          message: message
        }
      ],
      message: ""
    });
  };

  render() {
    const { username, chat } = this.state;
    return (
      <div>
        <div>
          <input
            value={username}
            onChange={({ target: { value } }) =>
              this.setState({ username: value })
            }
          />
          <button onClick={this.setPhone}>set phone</button>
          <section className="u-display--flex u-jutify-content--space-between">
            <button onClick={this.onReady}>Fire everthing</button>
            <button id="startcam">Start Camera</button>
            <button id="stopcam">stop Camera</button>
            <button id="startcall">startcall</button>
            <button id="stopcall">Stop Call</button>
          </section>
          <ul>
            {chat.map(message => {
              return (
                <li>
                  {message.user} wrote: {message.message}
                </li>
              );
            })}
          </ul>
          <input
            onChange={({ target: { value } }) =>
              this.setState({ message: value })
            }
          />
          <button onClick={this.sendMessage}>send message</button>
          <div id="video" />
          <div id="video-out" />
        </div>
      </div>
    );
  }
}

export default CallPage;
