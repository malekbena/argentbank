const accountService = require('../services/accountService')

module.exports.createAccount = async (req, res) => {
    try {
        const responseFromService = await accountService.createAccount(req)
        return res.status(200).json({message: 'Account successfully created', body: responseFromService})
    } catch (error) {
        console.error('Something went wrong in accountController.js', error)
        return res.status(400).json({message: error.message})
    }
    }