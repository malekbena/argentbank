const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema(
    {
        userId: {
        type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        accountId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account',
            required: true
        },
        amount: {
            type: mongoose.Types.Decimal128,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        category: {
            type: String,
            enum: ['Food', 'Transport', 'Shopping', 'Bills', 'Others'],
            required: true,
        },
        date: {
            type: Date,
            required: true
        },
        note: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
)
module.exports = mongoose.model('Transaction', transactionSchema)