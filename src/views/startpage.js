import React, { Component } from "react";
import "./styles.css";
import TrivagoLogo from "../components/TrivagoLogo";

class StartPage extends Component {
  state = {
    roomName: ""
  };

  render() {
    return (
      <div className="container">
        <TrivagoLogo />
        <h1>trivideo</h1>
        <div className="startpage__inputGroup">
          <input
            value={this.state.roomName}
            onChange={e => this.setState({ roomName: e.value.target })}
          />
          <button className="startpage__go-btn">Go</button>
        </div>
      </div>
    );
  }
}

export default StartPage;
