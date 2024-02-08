const express = require('express')
const router = express.Router()
const accountController = require('../controllers/accountController')
const tokenValidation = require('../middleware/tokenValidation')

router.post(
    '/create',
    tokenValidation.validateToken,
    accountController.createAccount
)

router.post(
    '/accounts',
    tokenValidation.validateToken,
    accountController.getAccount
)

router.patch(
    '/update',
    tokenValidation.validateToken,
    accountController.updateAccount
)
module.exports = router