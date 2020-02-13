const sha1 = require('sha1')

const database = require('../database')

const auth = {
  getUserByCredentials: ({ email, password }) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM user WHERE email = ? AND password = ?'
      database.all(query, [email, sha1(password)], (error, user) => {
        error && reject(new Error('Could not get the user.'))
        resolve(user)
      })
    })
  }
}

module.exports = auth
