const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Cart = new Schema(
    {
        username: { type: String },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        items: [
            {
                nameProduct: { type: String },
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products',
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true,
        collection: 'carts',
    },
);

module.exports = mongoose.model('Cart', Cart);
