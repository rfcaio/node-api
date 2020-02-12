const sha1 = require('sha1')

const database = require('../database')

const user = {
  create: ({ email, password }) => {
    const createdAt = new Date().toISOString()
    const query =
      'INSERT INTO user (created_at, email, password) VALUES (?, ?, ?)'
    return new Promise((resolve, reject) => {
      database.run(query, [createdAt, email, sha1(password)], error => {
        error && reject(new Error('Could not create user.'))
        resolve()
      })
    })
  },

  list: () => {
    return new Promise((resolve, reject) => {
      database.all('SELECT id, email, created_at FROM user', (error, users) => {
        error && reject(new Error('Could not list users.'))
        resolve(users)
      })
    })
  }
}

module.exports = user
