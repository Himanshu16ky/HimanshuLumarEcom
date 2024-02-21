// import logo from './logo.svg';
// import './App.css';
import React from 'react';
import { CartProvider } from './components/cart/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar/navbar';
import Cart from './components/cart/cart';
import Register from './components/login/register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateComponent from './components/privateComp';
import Dashbord from './components/dashboard/dashbord';
import Products from './components/products/product';
function App() {
  return (
    <div>
      <BrowserRouter>
      <CartProvider>

        <Routes>

          <Route  element={<PrivateComponent />}>
            <Route path='/' element={<Dashbord />}/>
            <Route path="/cart" element={<Cart />} />
            <Route path="/products/:category" element={<Products />} />
          </Route>

          <Route path="/login" element={<Register />} />
          
        </Routes>
        </CartProvider>

      </BrowserRouter>
    </div>
  );
}

export default App;
