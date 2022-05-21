const validator = require('../validator')

module.exports = function(req) {

    const props = {...req.headers, ...req.params, ...req.query, ...req.body}

    this.subtaskId = validator({
        type: 'objectId',
        value: props.subtaskId,
        name: 'identificador'
    })

    this.taskId = validator({
        type: 'objectId',
        value: props.taskId,
        name: 'identificador'
    })
    this.task = validator({
        type: 'objectId',
        value: props.task,
        name: 'identificador de la tarea'
    })
    this.status = validator({
        type: 'string',
        value: props.status,
        name: 'estatus de la sub tarea'
    })
    this.name = validator({
        type: 'string',
        value: props.name,
        name: 'titulo de la sub tarea'
    })
    this.description = validator({
        type: 'string',
        value: props.description,
        name: 'descripcion'
    })

    return this
}