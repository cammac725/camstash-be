const router = require('express').Router()
const bcrypt = require('bcryptjs')

const Users = require('../users/users-model')
const tokenService = require('../auth/token-service')

router.post('/register', (req, res) => {
  let user = req.body
  const hash = bcrypt.hashSync(user.password, 10)
  user.password = hash
  Users.addUser(user)
    .then(added => {
      const token = tokenService.generateToken(added)
      res.status(200).json({
        message: `Welcome ${added.username}!`, token
      })
    })
    .catch(() => {
      res.status(500).json({
        message: 'The server could not add the user'
      })
    })
})

router.post('/login', (req, res) => {
  let { username, password } = req.body
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = tokenService.generateToken(user)
        res.status(200).json({
          message: `Welcome ${user.username}!`, token
        })
      } else {
        res.status(401).json({
          message: 'Invalid credentials'
        })
      }
    })
    .catch(() => {
      res.status(500).json({
        message: 'The server could not find the user'
      })
    })
})

module.exports = router