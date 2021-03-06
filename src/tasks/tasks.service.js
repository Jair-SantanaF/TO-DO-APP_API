const Model = require('./tasks.model')
const Messages = require('./tasks.messages')
const Methods = require('../methods')

module.exports = {
    createTask,
    getTasks,
    getTask,
    getStatus,
    updateTask,
    deleteTask,
    Model,
    Messages
}

async function createTask(data) {
    try {

        const task = new Model(data)

        return await task.save()

    } catch(error) {
        throw error
    }
}

async function getTasks(query) {
    try {
        const options = {}
        const limit = 100
        const page = query.page

        if(query.find) {
            const regexp = new RegExp(query.find, 'i')
            options.$or = [                
                {name: regexp},
                {description: regexp},
                {category: regexp}
            ]
        }

        if(query.userId)
            options.userId = query.userId

        const tasks = await Model.find(options)
            .skip(page * limit)
            .limit(limit)
            .sort({created: -1})
            .populate({
                path: 'user',
                select: {
                    name: true,
                    email: true
                }
            })

        const total = await Model.countDocuments(options)

        return {
            tasks,
            metadata: Methods.metadata(page, limit, total, tasks.length),
            query
        }

    } catch(error) {
        throw error
    }
}

async function getTask(taskId) {
    try {

        const task = await Model.findOne({_id: taskId})

        if(!task)
            throw Messages(taskId).taskNotFound

        return task

    } catch(error) {
        throw error
    }
}

async function getStatus(data) {
    try {

        const sumStatus = await Model.aggregate(
            [
                {$match: {userId: data.userId}},
                {$match: {$or: [{status:true},{status:false}]}},
                {$group: {_id: '$status', total: {$sum: 1}}}
            ]
        )
        
        return sumStatus

    } catch(error) {
        throw error
    }
}

async function updateTask(taskId, data) {
    try {

        const task = await getTask(taskId)
        const keys = Object.keys(data)

        keys.forEach(key => {
            task[key] = data[key]
        })

        return await task.save()

    } catch(error) {
        throw error
    }
}

async function deleteTask(taskId) {
    try {

        await Model.deleteOne({_id: taskId})

        return taskId

    } catch(error) {
        throw error
    }
}