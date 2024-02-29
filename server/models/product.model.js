const mongoose = require('mongoose');
const Review = require('./review.model'); // Import the Review model
const User = require('./user.model'); // Import the User model

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'] 
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    category: {
        type: String,
        required: [true, 'Category is required'] 
    },
    quantity: {
        type: Number, 
        required: [true, 'Quantity is required'], 
        min: 0
    },
    image: {
        type: String,
        required: [true, 'Image is required']
    },
    featured: {
        type: Boolean,
        default: false
    },
    // reviews: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Review'
    // }],
    // relatedProducts: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Product'
    // }]
}, {timestamps: true})

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
