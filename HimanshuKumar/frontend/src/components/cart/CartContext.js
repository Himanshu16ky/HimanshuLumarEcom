// CartContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [userEmail, setUserEmail] = useState("");  // State to store user email
  
  const getCartItemQuantity = (productId) => {
    const cartItem = cart.find(item => item.productId === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  useEffect(() => {
    setUserEmail(localStorage.getItem('email'))
    // Call your API to update the cart on the backend whenever the cart or userEmail changes
    const updateCartOnBackend = async () => {
      try {
        // Example: make a POST request to update the cart on the backend
        const response = await fetch('http://localhost:5000/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userEmail, cart }),
        });

        if (!response.ok) {
          console.error('Failed to update cart on backend');
        }
        else{
          
        }
      } catch (error) {
        console.error('Error updating cart on backend:', error);
      }
    };
    console.log("updateCartOnBackend",updateCartOnBackend());
    
  }, [cart]);  // Run this effect whenever the cart changes

 
  const addToCart = (productId, price, image, title, brand) => {
    setCart((prevCart) => {
        const existingItemIndex = prevCart.findIndex((item) => item.productId === productId);
    
        if (existingItemIndex !== -1) {
          // If the product already exists in the cart, update the quantity
          const updatedCart = [...prevCart];
          updatedCart[existingItemIndex].quantity += 1;
          updatedCart[existingItemIndex].totalPrice = updatedCart[existingItemIndex].quantity * price;
          
          return updatedCart;
        } else {
          // If the product is not in the cart, add a new item
          return [...prevCart, {image, title, brand, productId, price, quantity: 1 ,totalPrice: price}];
        }
      });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => {
          const existingItemIndex = prevCart.findIndex((item) => item.productId === productId);
    
          if (existingItemIndex !== -1) {
            const updatedCart = [...prevCart];
            // If quantity is greater than 1, decrement the quantity
            if (updatedCart[existingItemIndex].quantity > 1) {
              updatedCart[existingItemIndex].quantity -= 1;
              updatedCart[existingItemIndex].totalPrice = updatedCart[existingItemIndex].quantity * updatedCart[existingItemIndex].price;
            } else {
              // If quantity is 1, remove the item from the cart
              updatedCart.splice(existingItemIndex, 1);
            }
            return updatedCart;
          } else {
            return prevCart;
          }
        });
      };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, clearCart, setUserEmail,getCartItemQuantity,  }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
