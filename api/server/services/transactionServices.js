const Transaction = require('../database/models/transactionModel')
const Account = require('../database/models/accountModel')

module.exports.createTransaction = async serviceData => {
    try {
        const account = await Account.findOne({ _id: serviceData.body.accountId })
        if (!account) {
            throw new Error('Account not found')
        }
        if (account.userId.toString() !== serviceData.user._id.toString()) {
            throw new Error('Unauthorized')
        }

        if (serviceData.body.amount.toString().split('.')[1] && serviceData.body.amount.toString().split('.')[1].length > 2) {
            throw new Error('Amount should have less than 2 decimal places')
        }

        let newBalance = 0
        if (serviceData.body.operation === 'Expense') {
            if (account.balance < serviceData.body.amount) {
                throw new Error('Insufficient balance')
            }
            const accountUpdated = await Account.findOneAndUpdate(
                { _id: serviceData.body.accountId },
                {
                    $inc: { balance: -serviceData.body.amount }
                },
                { new: true }
            )
            newBalance = accountUpdated.balance
        }
        if (serviceData.body.operation === 'Income') {
            const accountUpdated = await Account.findOneAndUpdate(
                { _id: serviceData.body.accountId },
                {
                    $inc: { balance: serviceData.body.amount }
                },
                { new: true }
            )
            newBalance = accountUpdated.balance

        }
        const newTransaction = new Transaction({
            userId: serviceData.user._id,
            accountId: serviceData.body.accountId,
            amount: serviceData.body.amount,
            description: serviceData.body.description,
            type: serviceData.body.type,
            category: serviceData.body.category,
            note: serviceData.body.note,
            operation: serviceData.body.operation,
            accountBalance: newBalance
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
        const dateBeg = new Date(new Date().getFullYear(), new Date().getMonth(), 1, 0, 0, 0)
        const dateEnd = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59)

        let result = await Transaction.find({
            accountId: serviceData.body.accountId,
            createdAt: { $gte: dateBeg, $lt: dateEnd }
        }).sort({ createdAt: -1 })
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
        if (transaction.accountId.toString() !== serviceData.body.accountId.toString()) {
            throw new Error('Unauthorized')
        }
        const transactionUpdated = await Transaction.findOneAndUpdate(
            { _id: serviceData.body.transactionId },
            {
                category: serviceData.body.category ? serviceData.body.category : transaction.category,
                note: serviceData.body.note ? serviceData.body.note : transaction.note
            },
            { new: true }
        )
        return transactionUpdated
    } catch (error) {
        console.error('Error in transactionService.js', error)
        throw new Error(error)
    }
}