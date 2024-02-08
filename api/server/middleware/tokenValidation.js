const jwt = require('jsonwebtoken')
const User = require('../database/models/userModel')

module.exports.validateToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error('Token is missing from header')
    }

    const userToken = req.headers.authorization.split('Bearer')[1].trim()
    const decodedToken = jwt.verify(
      userToken,
      process.env.SECRET_KEY || 'default-secret-key'
    )
    const user = await User.findOne({ _id: decodedToken.id })
    if (!user) {
      throw new Error('User not found')
    }
    req.user = user
    return next()
  } catch (error) {
    console.error('Error in tokenValidation.js', error)
    return next(error)
  }
}
