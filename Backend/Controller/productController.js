const ProductModel = require("../Models/productModel")
const cloudinary = require('cloudinary')

const addProductController = async(req, res) =>{
    try{
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body
        
        const image1 = req?.files?.image1?.[0]
        const image2 = req?.files?.image2?.[0]
        const image3 = req?.files?.image3?.[0]
        const image4 = req?.files?.image4?.[0]

        if(!name || !description || !price || !category || !subCategory){
            return res.status(200).json({success: false, message: "Enter every detail"})
        }

        const images = [image1, image2, image3, image4].filter((element) =>element !== undefined)
        
        let imagesUrl = await Promise.all(
            images.map(async(element) =>{
                let result = await cloudinary.v2.uploader.upload(element.path, {resource_type: 'image'})
                return result.secure_url
            })
        )

        const newProduct = ProductModel({
            name: name,
            description: description,
            price: Number(price),
            image: imagesUrl,
            category: category,
            subCategory: subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller == "true" ? true : false,
            date: Date.now()
        })
        await newProduct.save()
        return res.status(200).json({success: true, message: "Product Added"})
    }
    catch(err){
        console.log(`Error in Add Product Controller - ${err}`)
        return res.status(200).json({message: 'Internal Server Error'})
    }
}

const removeProductController = async(req, res) =>{
    try{
        const { id } = req.params
        await ProductModel.findByIdAndDelete(id)
        return res.status(200).json({success: true, message: "Product Deleted Successfully"})
    }
    catch(err){
        console.log(`Error in Remove Product Controller - ${err}`)
        return res.status(200).json({message: 'Internal Server Error'})
    }
}

const getAllProductController = async(req, res) =>{
    try{
        const products = await ProductModel.find()
        return res.status(200).json({success: true, products: products})
    }
    catch(err){
        console.log(`Error in Get All Product Controller - ${err}`)
        return res.status(200).json({message: 'Internal Server Error'})
    }
}

const getEachProductController = async(req, res) =>{
    try{
        const { id } = req.params
        const product = await ProductModel.findById({_id: id})
        return res.status(200).json({success: true, product: product})
    }
    catch(err){
        console.log(`Error in Get Each Product Controller - ${err}`)
        return res.status(200).json({message: 'Internal Server Error'})
    }
}

module.exports = { addProductController, removeProductController, getAllProductController, getEachProductController }