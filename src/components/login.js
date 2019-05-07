import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import * as Config from "../configurations/config";
import "../styles/login.css";
import image from "../assets/4.jpg";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      fullName: "",
      accessToken: "",
      isSignup: false
    };
  }

  _onActionHandeller = () => {
    let dataToSend = {
      email: this.state.email,
      password: this.state.password
    };
    let url = `${Config.BASE_URL}user/login`;
    if (this.state.isSignup) {
      url = `${Config.BASE_URL}user/register`;
      dataToSend.fullName = this.state.fullName;
    }
    axios
      .post(url, dataToSend)
      .then(async response => {
        console.log(response);
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("name", response.data.data.fullName);
        window.location.reload();

        await swal({
          title: "Signup successfully",
          text: "",
          timer: 1000,
          icon: "success"
        });
      })
      .catch(error => {
        console.log(error, "sdshgdfysdgsg");
        swal({
          title: this.state.isSignup
            ? "Email already exists"
            : "invalid credentials",
          text: "",
          timer: 1000,
          icon: "error"
        });
      });
  };

  switchAction = () => {
    this.setState({ isSignup: !this.state.isSignup });
  };

  render() {
    return (
      <div
        className="main-section"
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          position : "fixed"
        }}
      >
        <div className="confirm-wrapper">
          <div className="content-sect">
            <h2 className="text-center">
              {this.state.isSignup ? "Sign Up" : "Sign In"}
            </h2>
            <hr />
          </div>
          <div className="content-sect">
            <div>
              {this.state.isSignup && (
                <div className="form-group">
                  <input
                    name="fullname"
                    id="fullName"
                    className="form-control custom-input"
                    type="text"
                    placeholder="Enter fullName"
                    value={this.state.fullName}
                    onChange={e => this.setState({ fullName: e.target.value })}
                  />
                </div>
              )}
              <div className="form-group">
                <input
                  name="email-address"
                  id="email"
                  className="form-control custom-input"
                  type="text"
                  placeholder="Enter Email"
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <input
                  name="password"
                  className="form-control custom-input"
                  id="confpassword"
                  type="password"
                  placeholder="Enter password"
                  value={this.state.password}
                  onChange={e => this.setState({ password: e.target.value })}
                />
              </div>
              <div className="form-group">
                <input
                  type="button"
                  className="form-control custom-button"
                  value={this.state.isSignup ? "Sign Up" : "Sign In"}
                  id="btnVerify"
                  onClick={this._onActionHandeller}
                />
              </div>
            </div>
          </div>
          <div className="content-sect">
            <h4
              className="text-center"
              style={{ cursor: "pointer", color : "#ffffff"}}
              onClick={() => this.switchAction()}
            >
              {this.state.isSignup
                ? "Already have an account ?"
                : "Create new account ?"}
            </h4>
            <hr />
          </div>
        </div>
      </div>
    );
  }
}
