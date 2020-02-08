const database = require('../database')

const product = {
  create: ({ name }) => {
    const createdAt = new Date().toISOString()
    return new Promise((resolve, reject) => {
      database.all(
        'INSERT INTO product (name, created_at) VALUES (?, ?)',
        [name, createdAt],
        (error, products) => {
          error && reject(new Error('Could not create product.'))
          resolve('Created with success.')
        }
      )
    })
  },

  list: () => {
    return new Promise((resolve, reject) => {
      database.all('SELECT * FROM product', (error, products) => {
        error && reject(new Error('Could not list products'))
        resolve(products)
      })
    })
  }
}

module.exports = product
