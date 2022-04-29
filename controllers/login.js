const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../models/user')
const { jsParser } = require('config/parser')

loginRouter.post('/', async(req, res) => {
  const body = req.body
  const user = await User.findOne({ usernmae: body.username })
  const passwordCorrect = 
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }
  const userForToken = {
    username: user.username,
    id: user._id
  }
  const token = jwt.sign(userForToken, process.env.SECRET)

  res.status(200).send({
    token, username: user.username, email: user.email
  })
})

module.exports = loginRouter