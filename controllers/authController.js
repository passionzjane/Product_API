const User = require('../models/User')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const bcrypt = require('bcryptjs')


// @desc Register a user
// @route POST /api/v1/auth/register
// @access Private
exports.register = catchAsync(async (req, res, next) => {
    const {name, email, password, role} = req.body

    const user = await User.create({
        name, email, password, role
    })

    // Create token
    const token = user.getSignedJwtToken();
    res.status(200).json({
        success: true,
        token,
        Users: user
    })
})


// @desc    Login a user
// @route  POST /api/v1/auth/login
// @access  Public
exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // Validate email & password
    if(!email || !password) {
        return next(new AppError('Please provide an email and password', 400));
    }

    // Check for user
    const user = await User.findOne({ email}).select('+password');

    if(!user) {
        return next(new AppError("Invalid credentials", 401));
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password)

    if(!isMatch) {
        return next(new AppError("Invalid credentials", 401));
    }

   const token = user.getSignedJwtToken();

    res.status(200).json({
        Success: true,
        token
    })
})
