const Router = require('express').Router()
const Hub = require('./users.hub')
const Middlewares = require('../middlewares')

Router.post('/users/login', Hub.loginUser)

Router.post('/users', Hub.createUser)

Router.get('/users', Hub.getUsers)

Router.put('/users/:userId', Hub.updateUser)

Router.delete('/users/:userId', Hub.deleteUser)

module.exports = Router