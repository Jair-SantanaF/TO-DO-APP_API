const Service = require('./tasks.service')
const Fields = require('./tasks.fields')

module.exports = {
    createTask,
    getTasks,
    getTask,
    getStatus,
    updateTask,
    deleteTask
}

async function createTask(req, res) {
    try {

        const tasks = new Fields(req)

        const data = {
            userId: req.userId,
            endDate: tasks.endDate.get(),
            status: tasks.status.get(),
            reminder: tasks.reminder.get(),
            category: tasks.category.get(),
            name: tasks.name.get(),
            description: tasks.description.get(),
        }

        res.$data(await Service.createTask(data))

    } catch(error) {
        res.$error(error)
    }
}

async function getTasks(req, res) {
    try {

        const tasks = new Fields(req)

        const query = {
            userId: req.userId,
            page: parseInt(req.query.page || 0),
            find: req.query.find,
        }

        res.$data(await Service.getTasks(query))

    } catch(error) {
        res.$error(error)
    }
}

async function getTask(req, res) {
    try {

        const tasks = new Fields(req)

        const data = {
            taskId: tasks.taskId.get()
        }

        res.$data(await Service.getTask(data.taskId))

    } catch(error) {
        res.$error(error)
    }
}

async function getStatus(req, res) {
    try {

        const data = {
            userId: req.userId
        }

        res.$data(await Service.getStatus(data))

    } catch(error) {
        res.$error(error)
    }
}

async function updateTask(req, res) {
    try {

        const tasks = new Fields(req)

        let data = {
            taskId: tasks.taskId.get()
        }

        const fields = [
            'category',
            'endDate',
            'reminder',
            'status',
            'name',
            'description',
        ]

        fields.forEach(field => req.body[field] != undefined && (data[field] = req.body[field]))

        res.$data(await Service.updateTask(data.taskId, data))

    } catch(error) {
        res.$error(error)
    }
}

async function deleteTask(req, res) {
    try {

        const tasks = new Fields(req)

        const data = {
            taskId: tasks.taskId.get()
        }

        res.$data(await Service.deleteTask(data.taskId))

    } catch(error) {
        res.$error(error)
    }
}