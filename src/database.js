const sqlite3 = require('sqlite3').verbose()

const database = new sqlite3.Database('product.db', error => {
  console.log(error || 'Database opened.')
})

database.run(
  `
    CREATE TABLE IF NOT EXISTS product (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at TEXT NOT NULL,
      name TEXT NOT NULL
    )
  `,
  error => error && console.log(error)
)

database.run(
  `
    CREATE TABLE IF NOT EXISTS user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL
    )
  `,
  error => error && console.log(error)
)

module.exports = database
