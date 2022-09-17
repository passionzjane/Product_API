const mongoose = require('mongoose')
const validator = require('validator')
const slugify = require('slugify')

const ProductSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, 'A product must have a name'],
            trim: true,
            maxlength: [40, 'A product name must be less or equal to 40 characters'],
            minlength: [3, 'A product name must have more or equal to 3 characters'],
        },
        slug: String,
        price: {
            type: Number,
            required: [true, 'A product must have a price']
        },
        description: {
            type: String,
            trim: true,
            required: [true, 'A product must have a description']
        },
        imageCover: {
            type: String,
            required: [true, 'A listing must have an image cover']
        },
        available_quantity: {
            type: Number,
            default: 0
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true,
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    })


// Document Middleware: runs before .save() $ .create()
ProductSchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true});
    next();
});

module.exports = mongoose.model('Product', ProductSchema);