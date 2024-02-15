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
        let newBalance = 0
        if (serviceData.body.operation === 'Expense') {
            if (parseFloat(account.balance) < parseFloat(serviceData.body.amount)) {
                throw new Error('Insufficient balance')
            }
            let res = parseFloat(account.balance) - parseFloat(serviceData.body.amount)
            const accountUpdated = await Account.findOneAndUpdate(
                { _id: serviceData.body.accountId },
                {
                    balance: res.toFixed(2)
                },
                { new: true }
            )
            newBalance = accountUpdated.balance
        }
        if (serviceData.body.operation === 'Income') {
            let res = parseFloat(account.balance) + parseFloat(serviceData.body.amount)
            const accountUpdated = await Account.findOneAndUpdate(
                { _id: serviceData.body.accountId },
                {
                    balance: res.toFixed(2) 
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
        if (transaction.accountId.toString() !== serviceData.body.accountId.toString()) {
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