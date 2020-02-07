const express = require('express')

const product = require('./models')

const routes = express.Router()

routes.get('/', (req, res) => {
  res.json({ products: [] })
})

routes.post('/', (req, res) => {
  const { name } = req.body
  product
    .create({ name })
    .then(message => res.status(201).json({ message }))
    .catch(error => res.status(500).json({ message: error }))
})

module.exports = routes