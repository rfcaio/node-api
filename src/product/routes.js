const express = require('express')

const routes = express.Router()

let products = []

routes.get('/', (req, res) => {
  res.json(products)
})

routes.post('/', (req, res) => {
  const { name } = req.body
  products = products.concat({ id: Date.now(), name })
  res.status(201).json({ message: 'Created.' })
})

module.exports = routes
