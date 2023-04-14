import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { SideDataAdmin } from "./SideData";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";



export default function Admin() {
 
  const [input, setInput] = useState("");
  const [delinput, setdelInput] = useState("");
  const [value, changeValue] = useState([]);

  function blockData(event) {
    event.preventDefault();
    console.log(input);
    fetch("http://localhost:3001/block-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: input }),
    })
      .then((response) => response.json())
      .then((resData) => console.log(resData))
      .catch((err) => console.log(err));
  }

  function unblockData(event) {
    event.preventDefault();
    // console.log(delinput+"hk ");
    fetch("http://localhost:3001/unblock-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: delinput }),
    })
      .then((response) => response.json())
      .then((resData) => console.log(resData))
      .catch((err) => console.log(err));
  }

  function loadData() {
    //fetch daata from blocked
    fetch("http://localhost:3001/usersBlocked")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.user)
        changeValue(data.user);
      });
  }


  return (
    <div className="divid">
      <div className="sidebar">
        <div className="image">
        <div className="imghk">
            <img
              src={localStorage.getItem("ProfilePicUrl")}
              alt="Profile Pic"  
              className="imghk"
            />
          </div>
          <div className="top-heading">
            {localStorage.getItem("loggedIn") === null
              ? "new user"
              : localStorage.getItem("Name")}
          </div>
        </div>
        <hr className="hr" />
        <ul className="sidebar-list">
          {SideDataAdmin.map((val, key) => {
            return (
              <li
                id={window.location.pathname == val.link ? "active" : ""}
                className="row"
                key={key}
                onClick={() => {
                  window.location.pathname = val.link;
                }}
              >
                <div id="icon">{val.icon}</div>
                <div id="title">{val.title}</div>
              </li>
            );
          })}
        </ul>
        <div className="boxer">
          <div id="pro">UPGRADE TO PRO</div>
        </div>
      </div>

      <div className="orders">
        <form onSubmit={blockData}>
          <div className="bhk">
            <input
              name="block"
              className="blockfld"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="btn" type="submit">
              Block
            </button>
          </div>
        </form>

        <form onSubmit={unblockData}>
          <div className="bhk">
            <input
              name="block"
              className="blockfld"
              value={delinput}
              onChange={(e) => setdelInput(e.target.value)}
            />
            <button className="btn" type="submit">
              UnBlock
            </button>
          </div>
        </form>

        <button className="btn" onClick={loadData}>
          Blocked users
        </button>
        <div className="blkdiv">
          {value.map((item) => {
            return <h5 className="blkfld">{item.email}</h5>;
          })}
        </div>
      </div>
    </div>
  );
}
