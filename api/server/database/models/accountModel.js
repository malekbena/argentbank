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
            type: Number,
            required: true,
            get: v => Math.round(v * 100) / 100,
            set: v => Math.round(v * 100) / 100
        },
        description: {
            type: String,
            enum: ['Available Balance', 'Current Balance'],
            required: true
        },
        accountNumber: {
            type: Number,
            required: true,
            unique: true
        }
    }
)

module.exports = mongoose.model('Account', accountSchema)