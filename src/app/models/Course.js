const mongoose = require('mongoose');
const slugify = require('slugify');
const mongooseDelete = require('mongoose-delete');
// const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Course = new Schema(
    {
        // _id: {type:Number},
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
        const inValidtype = ['asc', 'desc'].includes(req.query.type)
        return this.sort({
            [req.query.column]: inValidtype ? req.query.type : 'desc',
        })
    }

    return this
}

// Course.plugin(AutoIncrement);

Course.plugin(mongooseDelete, { 
    deletedAt : true,
    overrideMethods: 'all',
});

Course.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true,strict: true,replacement: '-',trim: true, });
    next();
});

module.exports = mongoose.model('Course', Course);