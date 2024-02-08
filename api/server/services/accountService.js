const Account = require('../database/models/accountModel')
const User = require('../database/models/userModel')
const jwt = require('jsonwebtoken')

module.exports.createAccount = async serviceData => {
    try {
        const jwtToken = serviceData.headers.authorization.split('Bearer')[1].trim()
        const decodedJwtToken = jwt.decode(jwtToken)
        const user = await User.findOne({ _id: decodedJwtToken.id })
        if (!user) {
            throw new Error('User not found')
        }
        const newAccount = new Account({
            userId: user._id,
            accountName: serviceData.body.accountName,
            accountType: serviceData.body.accountType,
            balance: serviceData.body.balance
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
        const jwtToken = serviceData.headers.authorization.split('Bearer')[1].trim()
        const decodedJwtToken = jwt.decode(jwtToken)
        const user = await User.findOne({ _id: decodedJwtToken.id })
        if (!user) {
            throw new Error('User not found')
        }
        let result = await Account.find({ userId: user._id })
        return result
    } catch (error) {
        console.log('Error in accountService.js', error)
        throw new Error(error)
    }
}

module.exports.updateAccount = async serviceData => {
    try {
        const jwtToken = serviceData.headers.authorization.split('Bearer')[1].trim()
        const decodedJwtToken = jwt.decode(jwtToken)
        const user = await User.findOne({ _id: decodedJwtToken.id })
        if (!user) {
            throw new Error('User not found')
        }
        const account = await Account.findOne({ _id: serviceData.body.accountId })
        if (!account) {
            throw new Error('Account not found')
        }
        if (account.userId.toString() !== user._id.toString()) {
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