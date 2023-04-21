import React, { useEffect, useState,useContext } from 'react';
import './Dashboard.css';
import { SideData, sellerSideData } from './SideData';
import axios from 'axios';
import CardColumns from './CardColumns';
import CallIcon from '@mui/icons-material/Call';
import { UserContext } from '../App.js';
export default function Dashboard() {
  const [data, setData] = useState([]);
  const [prod,setProd] = useState([]);
  const user =  useContext(UserContext);
  const [selectedItem, setSelectedItem] = useState('');
  useEffect(() => {
    if (localStorage.getItem('Type') === 'Seller') {
      axios
        .get(
          `http://localhost:3001/orders/sell/${localStorage.getItem('Email')}`
        )
        .then((response) => {
          setData(response.data);
        });
        axios
        .get(
          `http://localhost:3001/products/seller/${localStorage.getItem('Email')}`
        )
        .then((response) => {
          setProd(response.data);
        });
      
    } 
  }, []);
  const handleItemClick = (link) => {
    setSelectedItem(link);
  };
  function handleDelete(id){
      setProd(prod.filter(prod => prod._id !== id));
      console.log(prod)
      fetch('http://localhost:3001/products/seller/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id:id })
    })
      alert('deleted');
  }

  useEffect(() => {
    if (localStorage.getItem('Type') === 'Buyer'){
      axios
        .get(`http://localhost:3001/orders/${localStorage.getItem('Email')}`)
        .then((response) => {
          console.log(response.data);
          setData(response.data);
        });
    }
}, []);
 
  const handleStatusChange = (oid,pid,newStatus)=>{
    const updatedData = data.map((product) => {
      if (product.oid === oid && product._id===pid)  {
        return { ...product, status: newStatus };
      }
      return product;
    });
    setData(updatedData);
    axios.put(`http://localhost:3001/orders/${oid}/items/${pid}/status/`,{
      status:newStatus
    }).then((response)=>{
      console.log(response.data);
      setData(response.data);
    })
  }

  
if(localStorage.getItem('Type') === 'Seller'){
  return (
    <div className="divid">
      <div className="sidebar">
        <div className="image">
          <div className="imghk">
            <img
              src={localStorage.getItem('ProfilePicUrl')}
              alt="Profile Pic"
              className="imghk"
            />
          </div>
          <div className="top-heading">
            {localStorage.getItem('loggedIn') === null
              ? 'new user'
              : localStorage.getItem('Name')}
          </div>
        </div>
        <hr className="hr" />
        <ul className="sidebar-list">
          { sellerSideData.map((val, key) => (
                <li
                  id={
                    window.location.pathname === val.link ? 'active row' : 'row'
                  }
                  className="row"
                  key={key}
                  onClick={() => handleItemClick(val.link)}
                >
                  <div id="icon">{val.icon}</div>
                  <div id="title">{val.title}</div>
                </li>
              ))
            }
        </ul>
      </div>
      <div className="orders">
        {selectedItem === '/profile' && (
          <div className="/profile">
            <div>
              <h1 className="upperhk">{localStorage.getItem('Name')}</h1>
              <i>({localStorage.getItem('Type')})</i>
            </div>

            <div className="hk">
              <div>
                <img
                  src={localStorage.getItem('ProfilePicUrl')}
                  alt="profile-Pic-Admin"
                  className="imagehk"
                />
              </div>

              <div className="divhk">
                <h3 className="nhk">Details:</h3>
                <h5 className="uphk">Email :</h5>
                <h5 className="downhk">{localStorage.getItem('Email')}</h5>
                <h5 className="uphk">Contact :</h5>
                <h5 className="downhk">{localStorage.getItem('Phone')}</h5>

                <h5 className="uphk">Address :</h5>
                <h5 className="downhk">{localStorage.getItem('Address')}</h5>

                <div className="iconhk"></div>
              </div>
            </div>
          </div>
        )}
              {selectedItem === '/myProducts' && (
        <ul className="user-list">
          <li className="user-item">
            <strong></strong>
            <strong>Product</strong>
            <strong>Price</strong>
            <strong>Delete</strong>
          </li>
          {prod.map((prod) => (
            <li key={prod._id} className="user-item">
              <img src={prod.image} alt={prod.name} className="user-image"/>
              <i>{prod.name}</i>
              <i>{prod.price}</i>
              <i></i>
              <div classname="btnnn">
                <button
                  className="block-button"
                  onClick={() => handleDelete(prod._id)}
                >
                  Delete Product
                </button>
              </div>
            </li>
          ))}
        </ul>)}
        {selectedItem === '/ordersAll' && (
          <div>
            <h1>Your Orders</h1>
            <div className="product-list-container">
              <table className="product-list">
                <thead>
                  <tr>
                    <th></th>
                    <th>product</th>
                    <th>Price</th>
                    <th>Amount</th>
                    <th>User</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((product) => (
                    <tr key={product._id} className="product-list-item">
                      <td>
                        <div className="product-image-container">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="product-image"
                          />
                        </div>
                      </td>
                      <td>{product.name}</td>
                      <td>Rs.{product.price}</td>
                      <td>{product.amount}</td>
                      <td>{product.buyerEmail}</td>
                      <select
              value={product.status}
              onChange={(e) => {product.status=e.target.value; handleStatusChange(product.oid,product._id, e.target.value)}}
            >
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedItem === '/support' && (
          <div className="orders">
            <ul>
              <div className="support">
                <h3>Stay Connected</h3>
                <h5>
                  For More information, you can connect our Chief Engineer
                </h5>
                <h4>Mr. Talwar Veera </h4>
                <h4>
                  {' '}
                  <CallIcon /> 9876543210
                </h4>
              </div>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

else{
  return (
    <div className="divid">
      <div className="sidebar">
        <div className="image">
          <div className="imghk">
            <img
              src={localStorage.getItem('ProfilePicUrl')}
              alt="Profile Pic"
              className="imghk"
            />
          </div>
          <div className="top-heading">
            {localStorage.getItem('loggedIn') === null
              ? 'new user'
              : localStorage.getItem('Name')}
          </div>
        </div>
        <hr className="hr" />
        <ul className="sidebar-list">
          { SideData.map((val, key) => (
                <li
                  id={
                    window.location.pathname === val.link ? 'active row' : 'row'
                  }
                  className="row"
                  key={key}
                  onClick={() => handleItemClick(val.link)}
                >
                  <div id="icon">{val.icon}</div>
                  <div id="title">{val.title}</div>
                </li>
              ))}
        </ul>
      </div>
      <div className="orders">
        {selectedItem === '/profile' && (
          <div className="/profile">
            <div>
              <h1 className="upperhk">{localStorage.getItem('Name')}</h1>
              <i>({localStorage.getItem('Type')})</i>
            </div>

            <div className="hk">
              <div>
                <img
                  src={localStorage.getItem('ProfilePicUrl')}
                  alt="profile-Pic-Admin"
                  className="imagehk"
                />
              </div>

              <div className="divhk">
                <h3 className="nhk">Details:</h3>
                <h5 className="uphk">Email :</h5>
                <h5 className="downhk">{localStorage.getItem('Email')}</h5>
                <h5 className="uphk">Contact :</h5>
                <h5 className="downhk">{localStorage.getItem('Phone')}</h5>

                <h5 className="uphk">Address :</h5>
                <h5 className="downhk">{localStorage.getItem('Address')}</h5>

                <div className="iconhk"></div>
              </div>
            </div>
          </div>
        )}
      {selectedItem === '/orders' && (
          <div>
            <h1>Your Orders</h1>
            <div className="product-list-container">
              <table className="product-list">
                <thead>
                  <tr>
                    <th></th>
                    <th>product</th>
                    <th>Price</th>
                    <th>Amount</th>
                    <th>User</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((product) => (
                    <tr key={product._id} className="product-list-item">
                      <td>
                        <div className="product-image-container">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="product-image"
                          />
                        </div>
                      </td>
                      <td>{product.name}</td>
                      <td>Rs.{product.price}</td>
                      <td>{product.amount}</td>
                      <td>{product.buyerEmail}</td>
                      <td>{product.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        

        {selectedItem === '/support' && (
          <div className="orders">
            <ul>
              <div className="support">
                <h3>Stay Connected</h3>
                <h5>
                  For More information, you can connect our Chief Engineer
                </h5>
                <h4>Mr. Talwar Veera </h4>
                <h4>
                  {' '}
                  <CallIcon /> 9876543210
                </h4>
              </div>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
}