const userService = require('../services/userService')

module.exports.createUser = async (req, res) => {
  let response = {}

  try {
    const responseFromService = await userService.createUser(req.body)
    return res.status(200).json({message: 'User successfully created', body: responseFromService})
  } catch (error) {
    console.error('Something went wrong in userController.js', error)
    return res.status(400).json({message: error.message})
  }
}

module.exports.loginUser = async (req, res) => {
  try {
    const responseFromService = await userService.loginUser(req.body)
    return res.status(200).json({message: 'User successfully logged in', body: responseFromService})
  } catch (error) {
    console.error('Error in loginUser (userController.js)')
    return res.status(400).json({message: error.message})
  }
}

module.exports.getUserProfile = async (req, res) => {
  try {
    const responseFromService = await userService.getUserProfile(req)
    return res.status(200).json({message: 'Succefully got user data', body: responseFromService})
  } catch (error) {
    console.log('Error in userController.js')
    return res.status(400).json({message: error.message})
  }
}

module.exports.updateUserProfile = async (req, res) => {
  try {
    const responseFromService = await userService.updateUserProfile(req)
    return res.status(200).json({message: 'Successfully updated user profile data', body: responseFromService})
  } catch (error) {
    console.log('Error in updateUserProfile - userController.js')
    return res.status(400).json({message: error.message})
  }
}
