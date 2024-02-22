const Account = require('../database/models/accountModel')

module.exports.createAccount = async serviceData => {
    try {
        let accountNumber
        let isAccountNumberUnique = false
        while (!isAccountNumberUnique) {
            accountNumber = Math.floor(Math.random() * (99999999999 - 1000000000 + 1)) + 10000000000
            const account = await Account.findOne({ accountNumber })
            if (!account) {
                isAccountNumberUnique = true
            }
        }
        const newAccount = new Account({
            userId: serviceData.user._id,
            accountName: serviceData.body.accountName,
            accountType: serviceData.body.accountType,
            balance: serviceData.body.balance,
            description: serviceData.body.description,
            accountNumber
        })
        let result = await newAccount.save()
        return result
    } catch (error) {
        console.error('Error in accountService.js', error)
        throw new Error(error)
    }
}

module.exports.getAccounts = async serviceData => {
    try {
        let result = await Account.find({ userId: serviceData.user._id })
        return result
    } catch (error) {
        console.log('Error in accountService.js', error)
        throw new Error(error)
    }
}

module.exports.updateAccount = async serviceData => {
    try {
        const account = await Account.findOne({ _id: serviceData.body.accountId })
        if (!account) {
            throw new Error('Account not found')
        }
        if (account.userId.toString() !== serviceData.user._id.toString()) {
            throw new Error('Unauthorized')
        }
        const accountUpdated = await Account.findOneAndUpdate(
            { _id: serviceData.body.accountId },
            {
                accountName: serviceData.body.accountName
            },
            { new: true }
        )
        return accountUpdated
    } catch (error) {
        console.error('Error in accountService.js', error)
        throw new Error(error)
    }
}