const mongoose = require('mongoose');
// const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const User = new Schema(
    {
        username: { type: String, unique: true },
        password: { type: String },
        email: { type: String },
        fullName: { type: String },
        avatar: { type: String },
        gender: { type: String },
        date: { type: String },
        numberPhone: { type: String },
        address: { type: String },
    },
    {
        timestamps: true,
    },
);

// Custom query
// User.query.sortable = function (req) {
//     if (req.query.hasOwnProperty('_sort')) {
//         const inValidType = ['asc', 'desc'].includes(req.query.type);
//         return this.sort({
//             [req.query.column]: inValidType ? req.query.type : 'desc',
//         });
//     }

//     return this;
// };

// soft delete
// User.plugin(mongooseDelete, {
//     deletedAt: true,
//     overrideMethods: 'all',
// });

module.exports = mongoose.model('User', User);
