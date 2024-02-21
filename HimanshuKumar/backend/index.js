console.log("________________________________________________________________________________")
const express = require("express");
require('./DB/config');
const {Userdata,Products} = require("./DB/model");
const cors = require("cors");
// const monooose = require('mongoose');
const app = express();
app.use(express.json());
app.use(cors());
app.post("/login", async (req, resp) => {
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          username: req.body.name,
          password: req.body.password,
        //   expiresInMins: 5, // optional
        })
      });
      if (response.status === 200) {
        console.log(response.status);
        const data = await response.json();
        // console.log('Data:', data);
        const existingUser = await Userdata.findOne({ username: data.username });
        if(!existingUser){
            let user = new Userdata({
                "username":data.username,
                "firstName":data.firstName,
                "lastName":data.lastName,
                "email":data.email,
                "cart":[],
                'token':"hidden",
                "image":data.image
            })
            await user.save();
            data["cart"] =[]; 
            resp.send(data);
        }
        else{
          existingUser.token = data.token;
          // console.log("existingUser",existingUser);
          resp.send(existingUser);
        }
        
      } else if (response.status === 400) {
        console.log(response.status, "Bad Request");
        resp.status(400).send({ error: 'Bad Request' });
      } else {
        console.error('Unexpected status:', response.status);
        resp.status(500).send({ error: 'Unexpected error' });
      }
    } catch (error) {
      console.error('Error:', error.message);
      resp.status(500).send({ error: 'Internal Server Error' });
    }
  });

app.post('/cart',async (req,resp)=>{
    try{
      const { userEmail, cart } = req.body;

    // console.log('User Email:', userEmail);
    // console.log('Cart:', cart);
    const updatedUser = await Userdata.updateOne(
      { email: userEmail }, // Find the user by email
      { $set:{ cart: cart || [] }  } // Set the 'cart' field with the new cart data
    );
    
    const existingUser = await Userdata.findOne({ email: userEmail });

    // console.log('Updated User:', existingUser);
    }
    catch(error){
        console.error('Error:', error.message);
        resp.status(500).send({ error: 'Internal Server Error' });  
    }
  })
  app.get('/cart/:product_id', async (req, resp) =>{
    try{
      const product_id = req.params.product_id.toString();
      console.log("product_id",product_id)
      // console.log(Products)
      const currentcart = await Products.findOne({ id: product_id });
      resp.json(currentcart);
      console.log("currentcart",currentcart)
    }
    catch(error){
      console.log(error)
    }
  });
  app.get('/products/:category', async (req, resp) => {
    try {
      const category = req.params.category;
      const searchQuery = req.query.search;
      const priceFilter = req.query.priceFilter; // Get the price filter from query parameters
  console.log(category,searchQuery,priceFilter)
      let query = { category: category };
  
      if (searchQuery && searchQuery !== '') {
        query.title = { $regex: new RegExp(searchQuery, 'i') };
      }
  
      if (priceFilter && priceFilter !== 'all') {
        query.price = { $lt:Number(priceFilter) };
      }
  
      const products = await Products.find(query);
      resp.json(products);
      // console.log(products)
      // if (products.length > 0) {
      //   resp.json(products);
      // } else {
      //   console.log(`No products found in the category ${category}`);
      //   resp.status(404).send({ error: 'No products found' });
      // }
    } catch (error) {
      console.error('Error fetching products:', error);
      resp.status(500).send({ error: 'Internal Server Error' });
    }
  });
  
// Add this route in index.js
app.post('/update-cart', async (req, resp) => {
  try {
    const { userEmail, updatedCart } = req.body;

    // Update the user's cart in the database
    const updatedUser = await Userdata.updateOne(
      { email: userEmail },
      { $set: { cart: updatedCart || [] } }
    );

    // You can send a success response if needed
    resp.send({ success: true });
  } catch (error) {
    console.error('Error updating cart:', error);
    resp.status(500).send({ error: 'Internal Server Error' });
  }
});
app.post('/clear-cart',async(req,resp)=>{
  const { userEmail } = req.body;
  try {
    const user = await Userdata.findOne({ email: userEmail });

    if (!user) {
        return resp.status(404).json({ message: 'User not found' });
    }

    // Clear the user's cart by setting it to an empty array
    user.cart = [];
    await user.save();

    return resp.status(200).json({ message: 'Cart cleared successfully' });
} catch (error) {
    console.error('Error clearing cart:', error);
    return resp.status(500).json({ message: 'Internal server error' });
}
})

app.listen(5000);
