const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32,
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000,
  },
  price: {
    type: Number,
    trim: true,
    required: true,
    maxlength: 32,
  },
  image: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32,
  },
  category: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32,
  },
  shipping: {
    type: Boolean,
    required: false,
    
  },
  seller:{
    type: String,
    required: false,
  },
  stock:{
    type: Number,
    required: true,
  },
  reviews:{
    type: Number,
    required:false,
  },
  stars:{
    type: Number,
    required:false,
  }
});


//add test data
// const product = new Product({
//   name: 'test',
//   description: 'test',
//   price: 100,
//   image: 'test',
//   company: 'test',
//   category: 'test',
//   shipping: true,
//   seller: 'test',
//   stock: 100,
//   reviews: 100,
//   stars: 100
// });

// product.save().then(() => console.log('product added'));

const ProductModal = mongoose.model('Product', productSchema);

module.exports = ProductModal