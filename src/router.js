const Router = require('express').Router()

Router.get('/', async(req, res) => {
    res.send({
        success: true,
        data: {
            message: 'Prueba to-do app'
        }
    })
})

module.exports = [
    Router,
    require('./users/users.router'),
    require('./tasks/tasks.router'),
    // require('./courses/courses.router'),
    // require('./sessions/sessions.router'),
]