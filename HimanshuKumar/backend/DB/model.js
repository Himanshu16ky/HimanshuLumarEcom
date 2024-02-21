const { default: mongoose } = require('mongoose');
const { float } = require('webidl-conversions');
// const monooose = require('mongoose');

const userdata = new mongoose.Schema({
    username:String,
    firstName:String,
    lastName:String,
    email:String,
    cart:[],
    image:String,
    token:String
})
const shop = new mongoose.Schema({
    id:String,
    title:String,
    description:String,
    price:Number,
    discountPercentage:Number,
    rating:Number,
    stock:Number,
    brand:String,
    category:String,
    thumbnail:String,
    images:[String]
  });

// module.exports = mongoose.model("userdata",userdata);
const Userdata = mongoose.model('userdata', userdata);
const Products = mongoose.model('shop', shop);

module.exports = {
    Userdata,
    Products
  };