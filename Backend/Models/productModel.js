const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: Array,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    sizes: {
        type: Array,
        requires: true
    },
    bestseller: {
        type: Boolean
    },
    date: {
        type: Number,
        required: true
    }
}, {timestamps: true})

const ProductModel = mongoose.models.Product || mongoose.model("Product", ProductSchema)
module.exports = ProductModel