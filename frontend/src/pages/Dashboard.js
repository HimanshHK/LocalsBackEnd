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

    let email="himanshuhkcoding@gmail.com"
    let seller=[]
    seller[0]=0
    for(let i=0;i<data.length;i++){
      if(data[i].sellerEmail===email){
        seller[0]=1; //he is seller
      }else if(data[i].buyerEmail===email){
        seller[0]=2; //he is buyer
      }
    }
    let arrFinal=[seller,[]]
    console.log(seller)
    if(seller[0]===1){
      let arr=[]
      for(let i=0;i<data.length;i++){
        if(data[i].sellerEmail===email){
          arr.push(data[i])
        }
      }
      arrFinal=[seller,arr]
      setOrders(arrFinal)
    }else if(seller[0]===2){
      let arr=[]
      for(let i=0;i<data.length;i++){
        if(data[i].buyerEmail===email){
          arr.push(data[i])
        }
      }
      
      arrFinal=[seller,arr]
      setOrders(arrFinal)
    }else
    setOrders(arrFinal)

    console.log(orders)
  }


  return (
    <div className="divid">
      <div className="sidebar">
        <div className="image">
          <div className="img">
            <img
              src={localStorage.getItem("ProfilePicUrl")}
              alt="Profile Pic"
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
