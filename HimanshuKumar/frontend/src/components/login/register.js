import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useCart } from '../cart/CartContext';  // Adjust the path

import './login.css';

export default function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { cart,setCart } = useCart();
  const { addToCart } = useCart();
  const {setUserEmail} = useCart();
  // const [userEmail, setUserEmail] = useState(""); // Define user email state

  const collectData = async (e) => {
    e.preventDefault();
    console.log(name, password);
    try {
      const result = await fetch('http://localhost:5000/login', {
        method: 'post',
        body: JSON.stringify({ "name": name.trim(), "password": password.trim() }),
        headers: {
          'Content-type': 'application/json'
        }
      });

      const rawData = await result.json(); // Parsing the response as JSON
        console.log('Raw Data:', rawData);
      if (result.ok) {
        const cartData = rawData.cart;
        if(cartData){
          Object.entries(cartData).forEach(([productId,quantity])=>{
            addToCart([productId,quantity]);
          });
          console.log(cart)
        }
        setUserEmail(rawData.email);
        console.log('Data:', rawData);
        // Assuming you want to check for success based on the HTTP status code
        localStorage.setItem('authToken', rawData.token);
        console.log('Data:', rawData);
        localStorage.setItem("firstName",rawData.firstName)
        localStorage.setItem("lastName",rawData.lastName)
        localStorage.setItem("image",rawData.image)
        localStorage.setItem("email",rawData.email)
        if (rawData.cart) {
          localStorage.setItem("cart", JSON.stringify(rawData.cart));
          setCart(rawData.cart);
        } else {
          localStorage.setItem("cart", "[]");  // Store an empty array as a string
          setCart([]);
        }
        // if (rawData.cart)
        navigate('/')
      } else {
        console.log('Data:', rawData);
        throw new Error('Request failed with status ' + result.status);
      }
    } catch (error) {
      console.log("Error from backend",error)
      //   console.error('Error:', error.message);
    }
  };

  return (
    <form className="login">
      <h2>Welcome, User!</h2>
      <p>Please log in</p>
      <input type="text" onChange={(e) => setName(e.target.value)} placeholder="User Name" value={name} />
      <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" value={password} />
      {/* <input type="submit" value="Log In" /> */}
      <input type="submit" value="Log In" onClick={collectData} />
    </form>
  )
}
