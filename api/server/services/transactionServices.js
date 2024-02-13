const Transaction = require('../database/models/transactionModel')

module.exports.createTransaction = async serviceData => {
    try {
        const newTransaction = new Transaction({
            userId: serviceData.user._id,
            accountId: serviceData.body.accountId,
            amount: serviceData.body.amount,
            description: serviceData.body.description,
            type: serviceData.body.type,
            category: serviceData.body.category,
            date: serviceData.body.date,
            note: serviceData.body.note
        })
        let result = await newTransaction.save()
        return result
    } catch (error) {
        console.error('Error in transactionService.js', error)
        throw new Error(error)
    }
}

module.exports.getTransactions = async serviceData => {
    try {
        let result = await Transaction.find({ userId: serviceData.user._id })
        return result
    } catch (error) {
        console.log('Error in transactionService.js', error)
        throw new Error(error)
    }
}

module.exports.updateTransaction = async serviceData => {
    try {
        const transaction = await Transaction.findOne({ _id: serviceData.body.transactionId })
        if (!transaction) {
            throw new Error('Transaction not found')
        }
        if (transaction.userId.toString() !== serviceData.user._id.toString()) {
            throw new Error('Unauthorized')
        }
        const transactionUpdated = await Transaction.findOneAndUpdate(
            { _id: serviceData.body.transactionId },
            {
                category: serviceData.body.category,
                note: serviceData.body.note
            },
            { new: true }
        )
        return transactionUpdated
    } catch (error) {
        console.error('Error in transactionService.js', error)
        throw new Error(error)
    }
}