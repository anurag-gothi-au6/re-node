import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import "../../styles/dashboard.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  input: {
    color: "black",
    borderRadius: "20px",
    padding: "10px",
    width: "200px",
  },
  button: {
    color: "black",
    borderRadius: "10px",
    padding: "10px",
    width: "200px",
    "&:disabled": {
      backgroundColor: "gray",
    },
  },
  submit: {
    backgroundColor: "#78e08f",
    borderRadius: "10px",
    margin: "10px",
    padding: "10px",
    width: "200px",
    color: "white",
    fontSize: "1rem",
    fontWeight: "bolder",
  },
  toggle: {
    borderRadius: "50%",
    color: "black",
    backgroundColor: "white",
    height: "50px",
    width: "50px",
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const [agentView, setAgentView] = useState(false);
  const [onlineView, setOnlineView] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [time,setTime] = useState(0)
  

  // 

  // useEffect(()=>{
  //   setTime(Math.floor((new Date - new Date(localStorage.getItem("loggedInTime")))/1000/60))
  // })

  return (
    <div>
      <div className="inline">
        <h3 className="gray">ReNode</h3>
        <span className='right'>
        <span className="gray">Session: 1 Minutes</span>
        <span className="gray" style={{marginLeft:'70px'}}>User: random</span>
        </span>
      </div>
      <div className="margin-2">
        <h1 className="dark">Converstation</h1>
        <span style={{ marginLeft: "15px" }}>
          <span className="input-icons">
            <img
              src="https://img.icons8.com/android/16/000000/search.png"
              className="searchicon"
              alt="searchicon"
            />
            <input
              className="input-field"
              type="text"
              style={{
                padding: "3px",
                paddingLeft: "5px",
                borderRadius: "20px",
                border: "1px solid grey",
                marginRight: "10px",
              }}
              placeholder="Quick search"
            ></input>
          </span>
          <button
            style={{
              padding: "3px",
              paddingLeft: "3px",
              borderRadius: "20px",
              backgroundColor: "#ebebeb",
              border: "0",
              width: "110px",
            }}
          >
            <img
              src="https://img.icons8.com/material-sharp/20/000000/sorting-options.png"
              style={{ height: "15px", width: "15px" }}
              alt="icon"
            />
            <b style={{ marginLeft: "5px", fontWeight: "normal" }}>Filter</b>
          </button>
        </span>
        <div className="right">
          {onlineView ? (
            <div>
              <button
                className="online"
                onClick={() => setOnlineView(false)}
                style={{
                  backgroundColor: "white",
                  border: "1px solid #B0B0B0",
                  padding: "3px",
                  borderRadius: "20px",
                  width: "120px",
                  marginTop: "7px"
                }}
              >
                <span
                  style={{
                    backgroundColor: "#50d950",
                    height: "7px",
                    width: "7px",
                    display: "inline-block",
                    borderRadius: "50%",
                    marginRight: "2px",
                    
                  }}
                ></span>{" "}
                Online{" "}
                <span
                  style={{
                    marginLeft: "2px",
                    height: "5px",
                    width: "5px",
                    display: "inline-block",
                  }}
                >
                  ▲
                </span>
              </button>
              <br></br>
              <button
                onClick={props.logout}
                style={{
                  backgroundColor: "white",
                  border: "1px solid #B0B0B0",
                  padding: "3px",
                  borderRadius: "20px",
                  width: "100px",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <button
                className="online"
                onClick={() => setOnlineView(true)}
                style={{
                  backgroundColor: "white",
                  border: "1px solid #B0B0B0",
                  padding: "3px",
                  borderRadius: "20px",
                  width: "120px",
                  marginTop: "7px"
                }}
              >
                <span
                  style={{
                    backgroundColor: "#50d950",
                    height: "7px",
                    width: "7px",
                    display: "inline-block",
                    borderRadius: "50%",
                    marginRight: "2px",
                  }}
                ></span>{" "}
                Online{" "}
                <span
                  style={{
                    marginLeft: "2px",
                    height: "5px",
                    width: "5px",
                    display: "inline-block",
                  }}
                >
                  ▼
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
