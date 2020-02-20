const express = require('express')
const { body, validationResult } = require('express-validator')

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

routes.post(
  '/',
  [
    body('name')
      .isLength({ min: 6 })
      .withMessage('Product name must have at least 6 characters.')
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    const { name } = req.body
    try {
      await product.create({ name })
      res.status(201).json({ message: 'Created with success.' })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }
)

routes.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    await product.delete({ id })
    res.status(200).json({ message: 'Deleted with success.' })
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

routes.put('/:id', async (req, res) => {
  const { name } = req.body
  const { id } = req.params
  try {
    await product.update({ id, name })
    res.status(200).json({ message: 'Updated with success.' })
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

module.exports = routes
