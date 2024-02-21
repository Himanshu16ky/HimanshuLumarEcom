import React from 'react'
import Navbar from '../navbar/navbar'
import { Link } from 'react-router-dom';
import './dashbord.css'
export default function Dashbord() {
  // useEffect(() => {
  //   const storedCart = localStorage.getItem('cart');
  //   if (storedCart) {
  //     setCart(JSON.parse(storedCart));
  //   }
  // }, []);
  
  return (
    <div>
        <Navbar />
        <div id='container'>
        <Link to="/products/laptops" className="element">
        <div id="first"  className="element">
          <p>Laptops</p></div>
          </Link>
          <Link to="/products/smartphones" className="element">
          <div id='second' className="element"><p>Smartphones</p></div>
          </Link>
          <Link to="/products/groceries" className="element">
          <div id='third' className="element"><p>Grocerry</p></div>
          </Link>
          <Link to="/products/fragrances" className="element">
          <div id='fourth' className="element"><p>Fragrances</p></div>
          </Link>
          <Link to="/products/skincare" className="element">
          <div id='fifth' className="element"><p>Skincare</p></div>
          </Link>
          <Link to="/products/home-decoration" className="element">
          <div id='sixth' className="element"><p>Dome-decoration</p></div>
          </Link>
    </div>
    </div>
  )
}
