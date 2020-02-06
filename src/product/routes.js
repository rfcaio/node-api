const express = require('express')

const routes = express.Router()

/* eslint-disable-next-line prefer-const */
let products = []

routes.get('/', (req, res) => {
  res.json(products)
})

module.exports = routes
