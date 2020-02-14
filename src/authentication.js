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
        await jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
          if (error) {
            // TODO: verify error in console
            res.status(403).json({ message: 'Invalid token.' })
          } else {
            const { email, id } = decoded
            req.decoded = { email, id }
          }
        })
      } catch (error) {
        res.status(500).send({ message: 'Server error.' })
      }
    }
    next()
  }
}
