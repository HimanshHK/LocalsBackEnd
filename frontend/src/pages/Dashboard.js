import React, { useEffect, useState } from "react";
// import { FaBeer, FaWindows } from "react-icons/fa";
import "./Dashboard.css";
import { SideData } from "./SideData";
// import { Link } from "react-router-dom";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";

// import Box from "@mui/material/Box";
import Card from "./Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import SkipNextIcon from "@mui/icons-material/SkipNext";
// import { CardActionArea } from "@mui/material";
// import { validateYupSchema } from "formik";
// import {userState} from '../components/index.js'

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [state, setState] = useState("");
  const [orders, setOrders] = useState([]);

  function loadData() {

    axios.get("http://localhost:3001/orders").then((response) => {
      setData(response.data);
    });


    let email=localStorage.getItem("Email")
    let type=localStorage.getItem("Type")
    let company=localStorage.getItem("Name")
    console.log(email)
    console.log(type)
    let arr=[]
    if(type==="Buyer"){
      for(let i=0;i<data.length;i++){
        if(data[i].buyerEmail===email){
          arr.push(data[i].cartItems)
        }
      }
      let arrFinal=[type,arr]
      setOrders(arrFinal)
    }
    else{
      for(let i=0;i<data.length;i++){
        for(let j=0;j<data[i].cartItems.length;j++){
          if(data[i].cartItems[j].company===company){
            arr.push(data[i].cartItems[j])
          }
        }
      }
      let arrFinal=[type,arr]
      setOrders(arrFinal)
    }
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
          {SideData.map((val, key) => {
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


      {/* finally loading data here */}
      <div className="orders">   
        <button className="btn" onClick={loadData}>
          Show My Current Orders
        </button>
        {/* {orders.map((item) => {
          return <Card item={item} />;
        })} */}
      </div>


    </div>
  );
}
