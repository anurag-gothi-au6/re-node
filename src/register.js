import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Input1 from "./components/input";
import login_img from "./assests/img/register.jpg";
import "./assests/css/register.css";
import validator from "validator";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
const Toast = MySwal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

export default class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      regx159:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/g
    };
  }
  handlechange = (e) => {
    if (e.target.name === "name") {
      this.setState({ name: e.target.value });
    }
    if (e.target.name === "email") {
      this.setState({ email: e.target.value });
    }
    if (e.target.name === "password") {
      this.setState({ password: e.target.value });
    }
    if (e.target.name === "confirm_password") {
      this.setState({ confirm_password: e.target.value });
    }
  };
  handlesubmit = async (e) => {
    e.preventDefault();
    let a = validator.isLength(this.state.name, { min: 5 });
    let b = this.state.regx159.test(this.state.password)
    let c = validator.isEmail(this.state.email);
    let temp1 = this.state.password;
    let temp2 = this.state.confirm_password;
    let d = temp1 === temp2 ? true:false;
    if (a === true && b === true && c === true && d === true) {
      // let data = {
      //   name: this.state.name,
      //   email: this.state.email,
      //   password: this.state.password,
      // };
      //here is the animation
      Toast.fire({
      icon: 'success',
      title: 'Signed in successfully'
      })
      //end
  //     const url = "";
  //     fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //       body: JSON.stringify(data),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         localStorage.setItem("token", JSON.stringify(data.token));
  //         if (data.value === "success") {
  //           alert("congratulations signup successfull");
  //           window.location.href = "/home";
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //     console.log(data);
    } else {
        return Toast.fire({
          icon: 'error',
          title: "please enter valid value"
          })
      }
  };

  render() {
    // declaration and defination
    let errname = (
      <div className='maroon5'>
        <Input1
          typevalue={"text"}
          placeholdervalue={"Name"}
          namevalue={"name"}
          classvalue={"name_register"}
          inputvalue={this.state.name}
          onchangevalue={this.handlechange}
        />
        <p className="noerr">minimum 5 characters required</p>
      </div>
    );
    let errpassword = (
      <div className='maroon5'>
        <Input1
          typevalue={"password"}
          placeholdervalue={"Password"}
          namevalue={"password"}
          classvalue={"password_register"}
          inputvalue={this.state.password}
          onchangevalue={this.handlechange}
        />
          <p className="noerr">Min 8 letters,at least 1 uppercase,</p>
          <p className="noerr">lowercase letter,1 number,</p>
          <p className="noerr">and 1 special character</p>
      </div>
    );
    let errconfirm_password = (
      <div className='maroon5'>
        <Input1
          typevalue={"password"}
          placeholdervalue={"Confirm Password"}
          namevalue={"confirm_password"}
          classvalue={"password_register"}
          inputvalue={this.state.confirm_password}
          onchangevalue={this.handlechange}
        />
          <p className="noerr">password doesn't match</p>
      </div>
    );
    let erremail = (
      <div className='maroon5'>
        <Input1
          typevalue={"email"}
          placeholdervalue={"Email"}
          namevalue={"email"}
          classvalue={"email_register"}
          inputvalue={this.state.email}
          onchangevalue={this.handlechange}
        />
        <p className="noerr">must be a valid email</p>
      </div>
    );
    // end
    // code to check the validation
    let name1 = validator.isLength(this.state.name, { min: 5 });
    if (name1 === false && this.state.name !== "") {
      errname = (
        <div className='maroon5'>
          <Input1
            typevalue={"text"}
            placeholdervalue={"Name"}
            namevalue={"name"}
            classvalue={"name_register"}
            inputvalue={this.state.name}
            onchangevalue={this.handlechange}
          />
          <p className="err">minimum 5 characters required</p>
        </div>
      );
    }
    let email1 = validator.isEmail(this.state.email);
    if (email1 === false && this.state.email !== "") {
      erremail = (
        <div>
          <Input1
            typevalue={"email"}
            placeholdervalue={"Email"}
            namevalue={"email"}
            classvalue={"email_register"}
            inputvalue={this.state.email}
            onchangevalue={this.handlechange}
          />
          <p className="err">must be a valid email</p>
        </div>
      );
    }

    let pass1 = this.state.regx159.test(this.state.password);
    if (pass1 === false && this.state.password !== "") {
      errpassword = (
        <div>
          <Input1
            typevalue={"password"}
            placeholdervalue={"Password"}
            namevalue={"password"}
            classvalue={"password_register"}
            inputvalue={this.state.password}
            onchangevalue={this.handlechange}
          />
          <p className="err">Min 8 letters,at least 1 uppercase,</p>
          <p className="err">lowercase letter,1 number,</p>
          <p className="err">and 1 special character</p>
        </div>
      );
    }
    let a = this.state.password;
    let b = this.state.confirm_password;
    let pass2 = a === b;
    if (pass2 === false && this.state.confirm_password !== "") {
      errconfirm_password = (
        <div>
          <Input1
            typevalue={"password"}
            placeholdervalue={"Confirm Password"}
            namevalue={"confirm_password"}
            classvalue={"password_register"}
            inputvalue={this.state.confirm_password}
            onchangevalue={this.handlechange}
          />
          <p className="err">password doesn't match</p>
        </div>
      );
    }
    // end
    return (
      <Fragment>
        <div
          style={{
            backgroundColor: "white",
            width: "100%",
            height: "100vh",
            paddingTop: "4em",
          }}
        >
          <center>
            <div className="register_container">
              <div>
                <img src={login_img} alt="login" className="register_img" />
              </div>
              <div>
                <div style={{ marginLeft: "18em", marginTop: "1em" }}>
                  <div>
                    <h1>Registration</h1>
                    <br />
                  </div>
                </div>
                {/* logo */}
                <div className="mini_logo_container">
                  <div className="facebook_logo">
                    <img
                      src="https://img.icons8.com/material-two-tone/30/000000/facebook-f--v2.png"
                      alt="facebook"
                      style={{ marginTop: "0.5em" }}
                    />
                  </div>
                  <div className="google_logo">
                    <img
                      src="https://img.icons8.com/material-rounded/30/000000/google-logo.png"
                      alt="google"
                      style={{ marginTop: "0.5em" }}
                    />
                  </div>
                  <div className="linkedin_logo">
                    <img
                      src="https://img.icons8.com/windows/30/000000/linkedin-2.png"
                      alt="linkedin"
                      style={{ marginTop: "0.5em" }}
                    />
                  </div>
                </div>
                {/* end */}
                <div style={{ marginLeft: "17.7em", marginTop: "1em" }}>
                  <p style={{ fontWeight: "500",marginBottom:"0em" }}>
                    or use your email for registration
                  </p>
                </div>
                <form
                  className="form1"
                  style={{ marginLeft: "17.5em" }}
                  onSubmit={this.handlesubmit}
                >
                  {errname}
                  {erremail}
                  {errpassword}
                  {errconfirm_password}
                  <Input1
                    typevalue={"submit"}
                    inputvalue={"Register"}
                    namevalue={"Register"}
                    classvalue={"btn btn-outline-primary button_register"}
                  />
                  <br />
                </form>
                <p style={{ marginLeft: "17em" }}>
                  Already have an account ? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </center>
        </div>
      </Fragment>
    );
  }
}
