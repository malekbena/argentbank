const express = require('express')
const router = express.Router()
const transactionController = require('../controllers/transactionController')
const tokenValidation = require('../middleware/tokenValidation')

router.post(
    '/create',
    tokenValidation.validateToken,
    transactionController.createTransaction
)

router.post(
    '/transactions',
    tokenValidation.validateToken,
    transactionController.getTransactions
)

router.patch(
    '/update',
    tokenValidation.validateToken,
    transactionController.updateTransaction
)

module.exports = router