const Product = require('../models/product.model')
const Review = require('../models/review.model')
const User = require('../models/user.model')


module.exports = {
    findAllProducts: async (req, res) => {
        try {
            const allProducts = await Product.find();
            res.status(200).json(allProducts);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while retrieving products.' });
        }
    },
    createProduct: async (req, res) => {
        try {
            // Assuming req.body.image contains the Cloudinary URL after upload
            const newProduct = await Product.create({ ...req.body });
            res.status(201).json(newProduct);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while creating the product.' });
        }
    },
    findFeaturedProducts: async (req, res) => {
        try {
            const featuredProducts = await Product.find({ featured: true })
            res.status(200).json(featuredProducts)
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while retreiving featured products.' });
        }
    },
    findOneProduct: async (req, res) => {
        try {
            const oneProduct = await Product.findOne({ _id: req.params.id })
            res.status(200).json(oneProduct)
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while retrieving product.' });
        }
    },
    productsByCategory: async (req, res) => {
        try {
            const products = await Product.find({ category: req.params.category })
            res.status(200).json(products)
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while retrieving products.' });
        }
    },
    editProduct: async (req, res) => {
        try {
            let updateFields = { ...req.body };

            // Check if a new image file is uploaded
            if (req.body.image) {
                // Assuming req.body.image contains the Cloudinary URL after upload
                updateFields.image = req.body.image;
            }

            const product = await Product.findOneAndUpdate(
                { _id: req.params.id },
                updateFields,
                { new: true, runValidators: true }
            );
            
            res.status(200).json(product);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while updating product.' });
        }
    },
    deleteProduct: async (req, res) => {
        try{
            const result = await Product.deleteOne({ _id: req.params.id })
            res.status(200).json(result)
        }
        catch(err){
            console.log(err)
            res.status(500).json({ error: 'An error occured while attempting to delete the product.' })
        }
    }
};