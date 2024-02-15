const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        accountName: {
            type: String,
            required: true
        },
        accountType: {
            type: String,
            enum: ['Savings', 'Checking', 'Credit Card'],
            required: true
        },
        balance: {
            type: mongoose.Types.Decimal128,
            required: true
        },
    }
)

module.exports = mongoose.model('Account', accountSchema)