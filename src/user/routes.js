const express = require('express')

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

routes.post('/', async (req, res) => {
  const { email, password } = req.body
  try {
    await user.create({ email, password })
    res.status(201).json({ message: 'Created with success.' })
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

module.exports = routes
