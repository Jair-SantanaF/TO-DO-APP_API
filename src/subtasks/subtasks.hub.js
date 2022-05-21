const Fields = require('./subtasks.fields')
const Service = require('./subtasks.service')

module.exports = {
    createSubtask,
    getSubtasks,
    getSubtask,
    updateSubtask,
    deleteSubtask
}

async function createSubtask(req, res) {
    try {

        const subtasks = new Fields(req)

        const data = {

            taskId: subtasks.taskId.get(),
            name: subtasks.name.get(),
            description: subtasks.description.get(),

        }

        res.$data(await Service.createSubtask(data))

    } catch(error) {
        res.$error(error)
    }
}

async function getSubtasks(req, res) {
    try {

        const subtasks = new Fields(req)

        const query = {
            page: parseInt(req.query.page || 0),
            find: req.query.find
        }

        res.$data(await Service.getSubtasks(query))

    } catch(error) {
        res.$error(error)
    }
}

async function getSubtask(req, res) {
    try {

        const subtasks = new Fields(req)

        const data = {
            subtaskId: subtasks.subtaskId.get()
        }

        res.$data(await Service.getSubtask(data.subtaskId))

    } catch(error) {
        res.$error(error)
    }
}

async function updateSubtask(req, res) {
    try {

        const subtasks = new Fields(req)

        let data = {
            subtaskId: subtasks.subtaskId.get()
        }

        const fields = [

            'status',
            'name',
            'description',
        ]

        fields.forEach(field => req.body[field] && (data[field] = req.body[field]))
        
        res.$data(await Service.updateSubtask(data.subtaskId, data))

    } catch(error) {
        res.$error(error)
    }
}

async function deleteSubtask(req, res) {
    try {

        const subtasks = new Fields(req)

        const data = {
            subtaskId: subtasks.subtaskId.get()
        }

        res.$data(await Service.deleteSubtask(data.subtaskId))

    } catch(error) {
        res.$error(error)
    }
}