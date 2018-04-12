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
        <TrivagoLogo />

        <div className="startpage__inputGroup">
          <input
            value={this.state.roomName}
            onChange={e => this.setState({ roomName: e.target.value })}
          />
          <button className="startpage__go-btn" onClick={this.onSubmit}>
            Go
          </button>
        </div>
      </div>
    );
  }
}

export default StartPage;
