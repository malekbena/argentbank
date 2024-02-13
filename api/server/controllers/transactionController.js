const transactionServices = require('../services/transactionServices')

module.exports.createTransaction = async (req, res) => {
    try {
        const responseFromService = await transactionServices.createTransaction(req)
        return res.status(200).json({message: 'Transaction successfully created', body: responseFromService})
    } catch (error) {
        console.error('Something went wrong in transactionController.js', error)
        return res.status(400).json({message: error.message})
    }
}

module.exports.getTransactions = async (req, res) => {
    try {
        const responseFromService = await transactionServices.getTransactions(req)
        return res.status(200).json({message: 'Successfully got transaction data', body: responseFromService})
    } catch (error) {
        console.log('Error in transactionController.js', error)
        return res.status(400).json({message: error.message})
    }
}

module.exports.updateTransaction = async (req, res) => {
    try {
        const responseFromService = await transactionServices.updateTransaction(req)
        return res.status(200).json({message: 'Transaction successfully updated', body: responseFromService})
    } catch (error) {
        console.error('Something went wrong in transactionController.js', error)
        return res.status(400).json({message: error.message})
    }
}