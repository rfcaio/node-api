const express = require('express')
const { check, validationResult } = require('express-validator')

const user = require('./models')

const routes = express.Router()

routes.get('/', async (req, res) => {
  try {
    const users = await user.list()
    res.json({ users })
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

routes.post(
  '/',
  [
    check('email')
      .isEmail()
      .withMessage('Invalid email.'),
    check('password')
      .isLength({ min: 6 })
      .withMessage('Password must have at least 6 characters.')
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    const { email, password } = req.body
    try {
      await user.create({ email, password })
      res.status(201).json({ message: 'Created with success.' })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }
)

routes.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    await user.delete({ id })
    res.status(200).json({ message: 'Deleted with success.' })
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

module.exports = routes
