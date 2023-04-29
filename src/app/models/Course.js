const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

const Course = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        image: { type: String },
        videoId: { type: String, required: true },
        slug: { type: String, unique: true },
    },
    {
        timestamps: true
    }
);

Course.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true,strict: true,replacement: '-',trim: true, });
    next();
});

module.exports = mongoose.model('Course', Course);