import React,{useEffect,useState} from 'react';
import { FaBeer, FaWindows } from 'react-icons/fa';
import './Dashboard.css';
import { SideDataAdmin } from './SideData';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios'


import Box from '@mui/material/Box';
import Card from './Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';



export default function ProfileAdmin() {  
//   useEffect(()=>{
//     axios.get('http://localhost:3001/orders')
//         .then(response => {
//             console.log(response)
//             setData(response.data)
//         })
//    },[])
  return (
    <div className="divid">
    <div className="sidebar">
      <div className="image">
        <div className="img">
          <AccountCircleIcon style={{ width: '40px', height: '40px' }} />
        </div>
        <div className="top-heading">{localStorage.getItem('loggedIn')===null?"new user":localStorage.getItem('Name')}</div>
      </div>
      <hr className="hr" />
      <ul className="sidebar-list">
        {SideDataAdmin.map((val, key) => {
          return (
            <li
              id={window.location.pathname == val.link ? 'active' : ''}
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
     
    <div className='profile'>
      <h3>Name  : Admin </h3>
      <h5>Email :shopper365@gmail.com</h5>
      <h5>Phone :9991375659</h5>
      <h5>Address : Abhi bnaa rhe hai!!!!</h5>
      </div>          
    </div>
  );
}


