const express = require('express')
const router = express.Router()
const accountController = require('../controllers/accountController')
const tokenValidation = require('../middleware/tokenValidation')

router.post(
    '/create',
    tokenValidation.validateToken,
    accountController.createAccount
)
    
module.exports = router