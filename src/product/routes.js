const express = require('express')

const product = require('./models')

const routes = express.Router()

routes.get('/', async (req, res) => {
  try {
    const products = await product.list()
    res.json({ products })
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

routes.post('/', async (req, res) => {
  const { name } = req.body
  try {
    await product.create({ name })
    res.status(201).json({ message: 'Created with success.' })
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

module.exports = routes
