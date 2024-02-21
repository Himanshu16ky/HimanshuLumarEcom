import React, { useState,useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import Cart from "../cart/cart";
import "./navbar.css";
import trolleyImage from "../../static/trolley.png";
// import '../../App.css'
export default function Navbar({ onSearch, onPriceFilter }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  // console.log("location.....",location)
  
  const isProductCategoryPage = location.pathname.startsWith("/products/");
  const [selectedPriceFilter, setSelectedPriceFilter] = useState('');


  // const [firstName,setfirstName] = useState("")
// Retrieve cart from local storage
const [totalItems, setTotalItems] = useState();
const [totalPrice, setTotalPrice] = useState();
const navcart = JSON.parse(localStorage.getItem('cart')) || [];

useEffect(() => {
  // Initialize sum variables
  let totalQuantity = 0;
  let totalAmount = 0;
console.log("cart",navcart)
  // Iterate over each item in the cart
  navcart.forEach(item => {
    totalQuantity += item.quantity;
    totalAmount += item.totalPrice;
    console.log(totalQuantity,totalAmount)
  });

  // Update the state after the initial render
  setTotalItems(totalQuantity);
  setTotalPrice(totalAmount);
}, [navcart]); // Add navcart as a dependency to re-run the effect when it changes

// Rest of your component code...


// Log the results
// console.log('Total Quantity:', totalQuantity);
// console.log('Total Price:', totalPrice);

  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const image = localStorage.getItem("image");
  const email = localStorage.getItem("email");
  const cart = localStorage.getItem("cart");
  const handlePriceFilterChange = (filter) => {
    setSelectedPriceFilter(filter);
    onPriceFilter(filter);
  };
  const tocart = async () => {
    console.log("tocart called");
  };
  const logout = async (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate('/login')
  };
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchQuery)
    onSearch(searchQuery);
  };
  return (
    <div className="navbarz">
      <nav className="navbarz">
        <div id="portrait-frame">
          <img id="portrait" src={image} alt="" />
          <h1 id="title" className="hf_text">
            {firstName} {lastName}
          </h1>
        </div>

        <div id="nav-items">
          <input type="checkbox" id="nav-check" />
          <div className="nav-icon">
            <label htmlFor="nav-check">
              <span></span>
              <span></span>
              <span></span>
            </label>
          </div>

          <ul className="nav-links">
            {isProductCategoryPage && (
              <>
              <li>
                <form className="form-inline">
                  <input
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                  onClick={handleSearch}
                    className="btn btn-outline-success my-2 my-sm-0"
                    type="submit">
                    Search
                  </button>
                </form>
              </li>
              <li>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Filter
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handlePriceFilterChange(30)}
                        >
                          30
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handlePriceFilterChange(100)}
                        >
                          100
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handlePriceFilterChange(600)}
                        >
                          600
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handlePriceFilterChange(1000)}
                        >
                          1000
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handlePriceFilterChange(1500)}
                        >
                          1500
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handlePriceFilterChange('all')}
                        >
                          All
                        </button>
                      </li>
                    </ul>
                  </div>
                </li>
              </>
            )}
            <li className="cartconatiner">
              <Link to="/cart" onClick={tocart}>
                <label className="count">{totalItems}</label>
                <img className="trolleyImage" src={trolleyImage} alt="cart" />
                <p className="price">
                  <label>{totalPrice}$</label>
                </p>
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={logout}>
                Logout
              </Link>
            </li>
          </ul>
          
        </div>
      </nav>
    </div>
  );
}
