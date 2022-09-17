const Product = require('../models/product')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')


exports.createProduct = catchAsync(async (req, res, next) => {
    const {
        name, price, description, imageCover, available_quantity, user
    } = req.body

    if(!name || !price || !description || !available_quantity) {
        return next(new AppError('Fill all required fields', 400))
    }
    const newProduct = await Product.create({ name, price, description, imageCover, available_quantity })

    res.status(201).json({
        status: 'Success',
        subject: newProduct
    })
})


exports.getProducts = catchAsync(async (req, res, next) => {

    const products = await Product.find() //.populate({
    //     path: 'user',
    //     select: '-__v'
    // })

    res.status(200).json({
        status: 'success',
        count: products.length,
        data: products
    })
})


exports.getProduct = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const product = await Product.findById(id)//.populate({
    //     path: 'classArm',
    //     select: '-__v'
    // })

    if (!product) {
        return next(new AppError('No product found with that ID', 404))
    }

    res.status(200).json({
        status: 'success',
        data:product
    })
})


exports.updateProduct = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const product = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    });

    if (!product) {
        return next(new AppError('No product found with that ID', 404))
    }
    res.status(200).json({
        status: 'success',
        data: product
    })
})



// @desc Delete a product
// @route DELETE /api/v1/product/:id
// @access Private
exports.deleteProduct = catchAsync(async (req, res, next) => {

    const {id} = req.params

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
        return next(new AppError('Resource not found', 404))
    }

    res.status(204).json({})

})