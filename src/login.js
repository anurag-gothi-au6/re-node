import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Input1 from "./components/input";
import login_img from "./assests/img/login.jpg";
import "./assests/css/login.css";
import validator from "validator";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const Toast = MySwal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export default class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email1: "",
      password1: "",
    };
  }

  handlechange = (e) => {
    if (e.target.name === "email") {
      this.setState({ email1: e.target.value });
    }
    if (e.target.name === "password") {
      this.setState({ password1: e.target.value });
    }
  };
  handlesubmit = (e) => {
    e.preventDefault();
    let data = {
      email: this.state.email1,
      password: this.state.password1,
    };
    const url = "http://localhost:1234/api/user/login";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        localStorage.setItem("token", JSON.stringify(data.accessToken));
        if (data.status === "success") {
          //here is the animation
          Toast.fire({
            icon: "success",
            title: "Signed in successfully",
          }).then(()=>{
           this.props.history.push('/home')
          })
          //  end
        } else {
          Toast.fire({
            icon: "error",
            title: data.message
          })
        }
      })
      .catch((err) => console.log(err));
    // console.log(data);
  };
  render() {
    let erremail = (
      <div className="maroon5">
        <Input1
          typevalue={"email"}
          placeholdervalue={"Email"}
          namevalue={"email"}
          classvalue={"email_login"}
          inputvalue={this.state.email}
          onchangevalue={this.handlechange}
        />
        <p className="noerr">must be a valid email</p>
      </div>
    );
    let email1 = validator.isEmail(this.state.email1);
    if (email1 === false && this.state.email1 !== "") {
      erremail = (
        <div>
          <Input1
            typevalue={"email"}
            placeholdervalue={"Email"}
            namevalue={"email"}
            classvalue={"email_login"}
            inputvalue={this.state.email}
            onchangevalue={this.handlechange}
          />
          <p className="err">must be a valid email</p>
        </div>
      );
    }
    return (
      <Fragment>
        <div
          style={{
            backgroundColor: "white",
            width: "100%",
            height: "100vh",
            paddingTop: "5em",
          }}
        >
          <center>
            <div className="login_container">
              <br />
              <br />
              <div>
                <img src={login_img} alt="login" className="login_img" />
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    marginLeft: "18em",
                    marginTop: "1em",
                  }}
                >
                  <div style={{ marginTop: "0.4em" }}>
                    <h1>Login</h1>
                    <br />
                  </div>
                  <div>
                    <i className="material-icons" style={{ fontSize: "4.5em" }}>
                      login
                    </i>
                  </div>
                </div>
                {/* end */}
                {/* logo */}
                <div className="mini_logo_container1">
                  <div className="facebook_logo1">
                    <img
                      src="https://img.icons8.com/material-two-tone/30/000000/facebook-f--v2.png"
                      alt="facebook"
                      style={{ marginTop: "0.5em" }}
                    />
                  </div>
                  <div className="google_logo1">
                    <img
                      src="https://img.icons8.com/material-rounded/30/000000/google-logo.png"
                      alt="google"
                      style={{ marginTop: "0.5em" }}
                    />
                  </div>
                  <div className="linkedin_logo1">
                    <img
                      src="https://img.icons8.com/windows/30/000000/linkedin-2.png"
                      alt="linkedin"
                      style={{ marginTop: "0.5em" }}
                    />
                  </div>
                </div>
                {/* end */}
                <div style={{ marginLeft: "16.5em", marginTop: "3em" }}>
                  <p style={{ fontWeight: "500" }}>
                    or use your email for registration
                  </p>
                </div>
                <form
                  className="form1"
                  style={{ marginLeft: "16.5em" }}
                  onSubmit={this.handlesubmit}
                >
                  {erremail}
                  <br />
                  <Input1
                    typevalue={"password"}
                    placeholdervalue={"Password"}
                    namevalue={"password"}
                    classvalue={"password_login"}
                    onchangevalue={this.handlechange}
                    inputvalue={this.state.password}
                  />
                  <br />
                  <Input1
                    typevalue={"submit"}
                    inputvalue={"Login"}
                    namevalue={"Login"}
                    classvalue={"btn btn-outline-primary button_login"}
                  />
                  <br />
                </form>
                <p style={{ marginLeft: "16em" }}>
                  Don't have an account ? <Link to="/register">Register</Link>
                </p>
              </div>
            </div>
          </center>
        </div>
      </Fragment>
    );
  }
}
