import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/navbar';
// import { FaPlus, FaMinus } from 'react-icons/fa'
import { useParams, useLocation } from 'react-router-dom';
import { useCart } from '../cart/CartContext';
import './product.css';


export default function Product() {

  console.log('Product component rendered');
  const [products, setProducts] = useState([]);
  const { category } = useParams();
  const { cart, addToCart, removeFromCart, setCart } = useCart();
  const [selectedPriceFilter, setSelectedPriceFilter] = useState(''); // New state for price filter
  // const { addToCart } = useCart();
  const handlePriceFilter = async (filter) => {
    setSelectedPriceFilter(filter);
    console.log(filter)
    fetchProducts(filter);
  };
  const fetchProducts = async (priceFilter = '') => {
    try {
      const response = await fetch(`http://localhost:5000/products/${category}?priceFilter=${priceFilter}`);
      if (!response.ok) {
        console.error(`Error fetching products. Status: ${response.status}`);
        return;
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // const applyFilters = (filter) => {
  //   console.log("about ot filter by : ",filter)

  //   // Filter products based on selectedPriceFilter
  //   let filteredProducts = products;
  //   if (selectedPriceFilter != "None") {
  //     filteredProducts = filteredProducts.filter(product => product.price < filter);
  //   }
  //   console.log("filteredProducts",filteredProducts)
  //   setProducts(filteredProducts);
  //   console.log("products",products)
  // };
  const handleSearch = async (query) => {
    console.log("handel search called")
    try {
      const response = await fetch(`http://localhost:5000/products/${category}?search=${query}`);
      if (!response.ok) {
        console.error(`Error fetching products. Status: ${response.status}`);
        return;
      }
      const data = await response.json();
      console.log("data : ",data)
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };


  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
    // console.log("stored cart : ",storedCart)
    const fetchProducts = async () => {
      console.log("fetched products called")
      try {
        const response = await fetch(`http://localhost:5000/products/${category}`);
        if (!response.ok) {
          console.error(`Error fetching products. Status: ${response.status}`);
          // Handle the error (e.g., show an error message to the user)
          return;
        }
        const data = await response.json();
        // Assuming your backend responds with an array of products
        setProducts(data);
        console.log("data received", data);
        if (data.length===0){
          console.log("no data avaoable")
        }
        // console.log("products received",products)
      } catch (error) {
          console.error('Error fetching products:', error);
      }
    };
    
    fetchProducts();
  }, []);  // Include category as a dependency
  // const isProductInCart = (productId) => cart.some((item) => item.productId === productId);
  // console.log("Current Cart:", cart);
  const handleAddToCart = (productId, price,image, title, brand) => {
    addToCart(productId, price, image, title, brand);
    setCart((updatedCart) => {
      // Update local storage with the latest cart state
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
    console.log(`Product with ID ${productId} added to cart`,cart);
  };
  const getCartItemQuantity = (productId) => {
    const cartItem = cart.find(item => item.productId === productId);
    return cartItem ? cartItem.quantity : 0;
  };
  const handleRemoveToCart = (productId, price) => {
    removeFromCart(productId, price);
    setCart((updatedCart) => {
      // Update local storage with the latest cart state
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
    console.log(`Product with ID ${productId} added to cart`,cart);
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} onPriceFilter={handlePriceFilter} />
      <h1>PRODUCTS</h1>
      <div className="container">
      {products.length === 0 ? (
          <p>NO DATA AVAILABLE</p>
        ) : (
        products.map(product => (
          <div key={product._id}>
            {/* <h3>{product.title}</h3> */}
            {/* Other product details */}
            <div className="card dark">
              <div className='gallery'>
                <img src={product.thumbnail} className="card-img-top" alt="..." />
                <img src={product.images[0]} className="card-img-top" alt="..." />
                <img src={product.images[1]} className="card-img-top" alt="..." />
                <img src={product.images[2]} className="card-img-top" alt="..." />
                <img src={product.images[3]} className="card-img-top" alt="..." />
              </div>
              <div className="card-body">
                <div className="text-section">
                  <h3 className="card-title"><span>{product.brand} : </span>{product.title}</h3>
                  <br />
                  <p className="card-text">{product.description}</p>
                  <br />
                  <div>
                    <div>Rating : {product.rating}🌟</div>
                    <div>Only {product.stock} left in stock. Hurry!!</div>
                  </div>
                </div>
                <div className="cta-section">
                  <br />
                  <div><span>Discount : </span>{product.discountPercentage} % Off</div>
                  <div>Cost : ${product.price}.00</div>
                  <div className="quantity-section">
                  {getCartItemQuantity(product.id) === 0 ? (
                  <button onClick={() => handleAddToCart(product.id, product.price,product.images[0],product.title,product.brand)} className="btn btn-light">
                    ADD TO CART
                  </button>
                ) : (
                  <>
                    <button onClick={() => handleRemoveToCart(product.id, product.price)} className="btn btn-light">
                      -
                    </button>
                    <span className='quantity'>{getCartItemQuantity(product.id)}</span>
                    <button onClick={() => handleAddToCart(product.id, product.price)} className="btn btn-light">
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

    </div>
  );
}
