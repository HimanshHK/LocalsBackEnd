import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { SideData } from "./SideData";
import axios from "axios";
import CardColumns from "./CardColumns";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [state, setState] = useState("");
  const [orders, setOrders] = useState([]);

  // useEffect(() => {

  // }, []);

  function loadData() {
    axios
      .get("http://localhost:3001/orders")
      .then((response) => {
        setData(response.data);
        return response.data;
      })
      .then((resData) => {
        const email = localStorage.getItem("Email");
        const type = localStorage.getItem("Type");
        const company = localStorage.getItem("Name");
        const items = [];
        if (type === "Buyer") {
          for (let i = 0; i < resData.length; i++) {
            if (resData[i].buyerEmail === email) {
              items.push(resData[i].cartItems);
            }
          }
          const arrFinal = [type, items];
          setOrders(arrFinal);
        } else {
          for (let i = 0; i < resData.length; i++) {
            for (let j = 0; j < resData[i].cartItems.length; j++) {
              if (resData[i].cartItems[j].company === company) {
                items.push(resData[i].cartItems[j]);
              }
            }
          }
          const arrFinal = [type, items];
          setOrders(arrFinal);
        }
        console.log(orders);
      })
      .catch((err) => console.log(err));
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
        {/* <div className="boxer">
          <div id="pro">UPGRADE TO PRO</div>
        </div> */}
      </div>

      {/* finally loading data here */}
      <div className="orders">
        <button className="btn" onClick={loadData}>
          Show My Current Orders
        </button>
        {/* {state.map((item) => {
          return <Card item={item} />;
        })} */}

        {/* <Card item={orders[1]} type={orders[0]} /> */}
        {orders[1]?.map((items) => <CardColumns type={orders[0]} items={items} />)}
      </div>
    </div>
  );
}
