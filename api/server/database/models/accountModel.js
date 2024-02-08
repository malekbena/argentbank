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
            enum: ['Savings', 'Checking', 'Credit'],
            required: true
        },
        balance: {
            type: Number,
            required: true
        },
    }
)

module.exports = mongoose.model('Account', accountSchema)