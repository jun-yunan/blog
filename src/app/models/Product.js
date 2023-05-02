const mongoose = require('mongoose');
const slugify = require('slugify');


const Schema = mongoose.Schema;

const Product = new Schema({
    nameProduct: {type: String},
    description: {type: String},
    price: {type: String},
    image: {type: String},
    slug: { type: String, unique: true },
},
{
    timestamps: true
})

// thêm slug động
Product.pre('save', function (next) {
    if (this.isModified('nameProduct')) { // Kiểm tra nếu trường name được cập nhật
        this.slug = slugify(this.nameProduct, { lower: true, strict: true, replacement: '-', trim: true });
    }
    next();
});

Product.pre('updateOne', function (next) {
    const update = this.getUpdate();
    if (update.nameProduct) { // Kiểm tra nếu trường name được cập nhật
        update.slug = slugify(update.nameProduct, { lower: true, strict: true, replacement: '-', trim: true });
    }
    next();
});

module.exports = mongoose.model('Product', Product);