const mongoose = require('mongoose');
const slugify = require('slugify');
const mongooseDelete = require('mongoose-delete'); //soft delete
// const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Course = new Schema(
    {
        // id: {type:Number},
        name: { type: String, required: true },
        description: { type: String },
        image: { type: String },
        videoId: { type: String, required: true },
        slug: { type: String, unique: true },
    },
    {
        // _id: false,
        timestamps: true
    }
);

// Custom query
Course.query.sortable = function(req) {
    if (req.query.hasOwnProperty('_sort')) {
        const inValidType = ['asc', 'desc'].includes(req.query.type)
        return this.sort({
            [req.query.column]: inValidType ? req.query.type : 'desc',
        })
    }

    return this
}

// Course.plugin(AutoIncrement,{inc_field: 'id',disable_hooks: true});


// soft delete
Course.plugin(mongooseDelete, { 
    deletedAt : true,
    overrideMethods: 'all',
});


// thêm slug động
Course.pre('save', function (next) {
    const course = this;
    if (course.isModified('name')) { // Kiểm tra nếu trường name được cập nhật
        course.slug = slugify(course.name, { lower: true, strict: true, replacement: '-', trim: true });
    }
    next();
});

Course.pre('updateOne', function (next) {
    const update = this.getUpdate();
    if (update.name) { // Kiểm tra nếu trường name được cập nhật
        update.slug = slugify(update.name, { lower: true, strict: true, replacement: '-', trim: true });
    }
    next();
});

module.exports = mongoose.model('Course', Course);