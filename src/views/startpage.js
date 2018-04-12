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
            value={this.state.roomName}
            onChange={e => this.setState({ roomName: e.target.value })}
          />
          <button className="startpage__go-btn" onClick={this.onSubmit}>
            Goo
          </button>
        </div>
      </div>
    );
  }
}

export default StartPage;
