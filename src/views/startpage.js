import React, { Component } from "react";
import "./styles.css";
import TrivagoLogo from "../components/TrivagoLogo";

class StartPage extends Component {
  state = {
    roomName: ""
  };

  onSubmit = () => {
    this.props.history.push("/" + this.state.roomName);
  };

  render() {
    return (
      <div className="container">
        <TrivagoLogo style={{ marginBottom: "10px" }} />

        <div className="startpage__inputGroup">
          <input
            className="startpage__input"
            value={this.state.roomName}
            placeholder="Create a room or join to one!"
            onKeyPress={({ key }) => (key === "Enter" ? this.onSubmit() : null)}
            onChange={e => this.setState({ roomName: e.target.value })}
          />
          <button className="startpage__go-btn" onClick={this.onSubmit}>
            Let's go!
          </button>
        </div>
      </div>
    );
  }
}

export default StartPage;
