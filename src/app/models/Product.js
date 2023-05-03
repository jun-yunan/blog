const mongoose = require('mongoose');
const slugify = require('slugify');
const mongooseDelete = require('mongoose-delete');


const Schema = mongoose.Schema;

const Product = new Schema({
    nameProduct: {type: String},
    description: {type: String},
    price: {type: String},
    image: {type: String},
    type: {type: String},
    slug: { type: String, unique: true },
},
{
    timestamps: true
})

// Custom query
Product.query.sortable = function(req) {
    if (req.query.hasOwnProperty('_sort')) {
        const inValidType = ['asc', 'desc'].includes(req.query.type)
        return this.sort({
            [req.query.column]: inValidType ? req.query.type : 'desc',
        })
    }

    return this
}

// soft delete
Product.plugin(mongooseDelete, { 
    deletedAt : true,
    overrideMethods: 'all',
});

// thêm slug động
Product.pre('save', function (next) {
    if (this.isModified('nameProduct')) { // Kiểm tra nếu trường name được cập nhật
        this.slug = slugify(this.nameProduct + '-' + Math.random().toString(36).substr(2, 6), { lower: true, strict: true, replacement: '-', trim: true });
    }
    next();
});

Product.pre('updateOne', function (next) {
    const update = this.getUpdate();
    if (update.nameProduct) { // Kiểm tra nếu trường name được cập nhật
        update.slug = slugify(update.nameProduct + '-' + Math.random().toString(36).substr(2, 6), { lower: true, strict: true, replacement: '-', trim: true });
    }
    next();
});

module.exports = mongoose.model('Product', Product);