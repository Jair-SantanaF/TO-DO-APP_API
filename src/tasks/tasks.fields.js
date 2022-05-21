const validator = require('../validator')

module.exports = function(req) {

    const props = {...req.headers, ...req.params, ...req.query, ...req.body}

    this.taskId = validator({
        type: 'objectId',
        value: props.taskId,
        name: 'identificador'
    })

    this.userId = validator({
        type: 'objectId',
        value: props.userId,
        name: 'identificador'
    })
    this.user = validator({
        type: 'objectId',
        value: props.user,
        name: 'identificador del usuario'
    })
    this.status = validator({
        type: 'string',
        value: props.status,
        name: 'estatus de la tarea'
    })
    this.name = validator({
        type: 'string',
        value: props.name,
        name: 'titulo de la tarea'
    })
    this.description = validator({
        type: 'string',
        value: props.description,
        name: 'descripcion'
    })

    return this
}