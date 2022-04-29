
const router = require('express').Router()
const Users = require('./users-model')
const restricted = require('../auth/restricted-middleware')

router.get('/', restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users)
    })
    .catch(err => {
      res.send(err)
    })
})

router.get('/:id', restricted, (req, res) => {
  Users.findById(req.params.id)
    .then(user => {
      res.json(user)
    })
    .catch(err => res.send(err))
})

module.exports = router