const express = require('express')
require('dotenv/config')

const server = express()

server.get('/', (req, res) => {
  res.json({ message: 'You will never win!' })
})

const port = process.env.PORT || 1337

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}.`)
})
