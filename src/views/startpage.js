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
        <span className="startpage__header">
          <span className="startpage__wabi"><TrivagoLogo /></span>
          <span className="startpage__title">trivideo</span>
        </span>

        <div className="startpage__inputGroup">
          <input
            className="startpage__input"
            value={this.state.roomName}
            placeholder="Create a room or join to one!"
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
