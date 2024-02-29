const multer = require('multer');
const fs = require('fs');
const cloudinary = require('../config/cloudinary'); // Adjust the path based on your project structure
const { authenticate } = require('../config/jwt.config');
const ProductController = require('../controllers/product.controller');
const path = require('path');

// Configure Multer for temporary storage of uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}.${file.originalname.split('.').pop()}`);
    },
});

const upload = multer({ storage });

// Middleware to handle image upload to Cloudinary
async function uploadImageToCloudinary(req, res, next) {
    if (!req.file) {
        return next();
    }

    try {
        // The path to the temporary file stored by multer
        const filePath = req.file.path;

        // Upload the file to Cloudinary
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'e-commerce' // Optional: specify a folder in your Cloudinary account
        });

        // Remove the local file if it's no longer needed
        fs.unlinkSync(filePath);

        // Attach the Cloudinary URL to the request object
        req.body.image = result.secure_url;

        next();
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        res.status(500).send('Error uploading image to Cloudinary');
    }
}

// Define routes


module.exports = app => {
    app.get('/api/allProducts', ProductController.findAllProducts);
    app.post('/api/createProduct', authenticate, upload.single('image'), uploadImageToCloudinary, ProductController.createProduct);
    app.get('/api/featuredProducts', ProductController.findFeaturedProducts);
    app.get('/api/oneProduct/:id', ProductController.findOneProduct);
    app.get('/api/oneCategory/:category', ProductController.productsByCategory);
    app.post('/api/editProduct/:id', authenticate, upload.single('image'), uploadImageToCloudinary, ProductController.editProduct);
    app.delete('/api/deleteProduct/:id', authenticate, ProductController.deleteProduct);
};
