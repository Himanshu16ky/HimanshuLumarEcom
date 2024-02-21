import React, { useEffect, useState } from 'react';
import { useCart } from '../cart/CartContext';
import './cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, getCartItemQuantity, addToCart, setCart } = useCart();
  const [cartProducts, setCartProducts] = useState([]);
  const navigatetodashboard = useNavigate();
  useEffect(() => {
    fetchCartProducts();
    // setCartProducts(cart);

    // Update backend with the updated cart information
    // updateBackendCart(cart);
  }, [cart]);

  const fetchCartProducts = () => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartProducts(storedCart);

    // Update backend with the updated cart information
    updateBackendCart(storedCart);
  };

  const updateBackendCart = async (updatedCart) => {
    const userEmail = localStorage.getItem('email');

    try {
      const response = await fetch('http://localhost:5000/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail, cart: updatedCart }),
      });

      if (!response.ok) {
        console.error('Failed to update cart on backend');
      }
    } catch (error) {
      console.error('Error updating cart on backend:', error);
    }
  };

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);

    // Update local storage with the latest cart state
    localStorage.setItem('cart', JSON.stringify(cart));
    fetchCartProducts(); // Fetch updated data after removing from the cart
  };
  // const billAmount = localStorage.getItem("")
  const handleAddToCart = (productId, price, image, title, brand) => {
    addToCart(productId, price, image, title, brand);

    // Update local storage with the latest cart state
    localStorage.setItem('cart', JSON.stringify(cart));
    fetchCartProducts(); // Fetch updated data after adding to the cart
  };
  const amountTobePaid = cartProducts.reduce((total, product) => {
    return total + product.totalPrice;
  }, 0);

  const handlePurchase = async () => {
    // Assume you have the user's email stored in localStorage
    const userEmail = localStorage.getItem('email');
  
    try {
      const response = await fetch('http://localhost:5000/clear-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail }),
      });
  
      if (response.ok) {
        // Cart cleared successfully
  
        // Additional logic after successfully clearing the cart
        console.log('Cart cleared successfully');
        alert("Thankyou for shoping")
        localStorage.clear();
        navigatetodashboard('/login')
        window.location.reload();
      } else {
        console.error('Failed to clear cart from the backend');
      }
    } catch (error) {
      console.error('Error clearing cart from the backend:', error);
    }
  };
  
  return (
    <div>
      <a href=""><h1>CART</h1></a>
      <div className="container">
        {cartProducts.length === 0 ? (
          <p>NO DATA AVAILABLE</p>
        ) : (
          cartProducts.map(product => (
            <div key={product.productId}>
              {/* Other product details */}
              <div className="card dark">
                <div className='cartgallery'>
                  <img src={product.image} className="cartimage" alt="..." />
                </div>
                <div className="card-body">
                  <div className="text-section">
                    <h3 className="card-title"><span>{product.brand} : </span>{product.title}</h3>
                    <br />
                    <p className="card-text">Cost : ${product.price}.00</p>
                    <br />
                    <p className="card-text">Quantity : x <span className='largetext'>{product.quantity}</span></p>
                  </div>
                  <div className="cta-section">
                    <br />
                    {/* <div><span>Discount : </span>{product.discountPercentage} % Off</div> */}
                    <div></div>
                    <div>Sub Total : ${product.totalPrice}.00</div>
                    <div className="quantity-section">
                      {getCartItemQuantity(product.productId) === 0 ? (
                        <button onClick={() => handleRemoveFromCart(product.productId)} className="btn btn-light">
                          REMOVE FROM CART
                        </button>
                      ) : (
                        <>
                          <button onClick={() => handleRemoveFromCart(product.productId)} className="btn btn-light">
                            -
                          </button>
                          <span className='quantity'>{getCartItemQuantity(product.productId)}</span>
                          <button onClick={() => handleAddToCart(product.productId, product.price, product.image, product.title, product.brand)} className="btn btn-light">
                            +
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
            
          ))
        )}
      </div>
      {cartProducts.length > 0 && (
      <div className="total-section">
        <p className='finaltext'>Total Amount: ${amountTobePaid.toFixed(2)}</p>
        <button onClick={handlePurchase} className="btn btn-success border ">
          Purchase
        </button>
      </div>
    )}
    </div>
  );
};

export default Cart;
