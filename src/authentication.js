const jwt = require('jsonwebtoken')

module.exports = ({ exclusions }) => {
  return async (req, res, next) => {
    if (req.method !== 'POST' || !exclusions.includes(req.url)) {
      const token = req.headers['x-api-token']

      if (!token) {
        res.status(403).json({ message: 'Missing API token.' })
        return
      }

      try {
        const { email, id } = jwt.verify(token, process.env.JWT_SECRET)
        req.decoded = { email, id }
      } catch (error) {
        res.status(403).json({ message: 'Invalid token.' })
        return
      }
    }
    next()
  }
}
