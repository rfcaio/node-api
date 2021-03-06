const express = require('express')
require('dotenv/config')

const authentication = require('./authentication')

const authRoutes = require('./auth/routes')
const productRoutes = require('./product/routes')
const userRoutes = require('./user/routes')

const server = express()

const exclusions = ['/auth', '/user']

server.use(express.json())
server.use(authentication({ exclusions }))
server.use('/auth', authRoutes)
server.use('/product', productRoutes)
server.use('/user', userRoutes)

server.get('/', (req, res) => {
  res.json({ message: 'You will never win!' })
})

const port = process.env.PORT || 1337

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}.`)
})
