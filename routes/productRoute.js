const express = require('express')
const {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController')
const router = express.Router();

const { protect } = require('../utils/auth')

router
    .route('/')
    .post( protect, createProduct)
    .get(getProducts)


router
    .route('/:id')
    .get( protect, getProduct)
    .put( protect, updateProduct)
    .delete( protect, deleteProduct)

module.exports = router;