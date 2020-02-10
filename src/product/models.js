const database = require('../database')

const product = {
  create: ({ name }) => {
    const createdAt = new Date().toISOString()
    const query = 'INSERT INTO product (name, created_at) VALUES (?, ?)'
    return new Promise((resolve, reject) => {
      database.run(query, [name, createdAt], error => {
        error && reject(new Error('Could not create product.'))
        resolve()
      })
    })
  },

  delete: ({ id }) => {
    return new Promise((resolve, reject) => {
      database.run('DELETE FROM product WHERE id = ?', [id], error => {
        error && reject(new Error(`Could not delete product with ID ${id}.`))
        resolve()
      })
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
