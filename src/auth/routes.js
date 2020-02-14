const express = require('express')
const jwt = require('jsonwebtoken')

const auth = require('./models')

const routes = express.Router()

routes.post('/', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await auth.getUserByCredentials({ email, password })
    if (user.length === 0) {
      res.status(400).json({ message: 'User not found.' })
    } else {
      const [{ email, id }] = user
      const token = jwt.sign({ email, id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
      })
      res.status(200).json({ token })
    }
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

module.exports = routes
