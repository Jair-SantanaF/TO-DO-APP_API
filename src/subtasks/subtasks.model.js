const Schema = require('mongoose').Schema
const ObjectId = require('mongoose').Types.ObjectId
const Model = require('mongoose').model
const Messages = require('./subtasks.messages')

const schema = new Schema({

    taskId: {
        type: ObjectId
    },

    task: {
        type: ObjectId,
        ref: 'Tasks'
    },

    status: {
        type: String,
        enum: ['added', 'in-progress', 'completed'],
        default: 'added'
    },

    name: {
        type: String
    },

    description: {
        type: String
    },

    created: {
        type: Date,
        default: Date.now
    }
})

schema.pre('save', function(next) {

    this.task = this.taskId

    next()
})

schema.post('save', function(err, doc, next) {
    if(err) return next(Messages(err).subtaskSaveError)
    next()
})

schema.post('remove', function(err, doc, next) {
    if(err) return next(Messages(err).subtaskDeleteError)
    next()
})

schema.post('findOne', function(err, doc, next) {
    if(err) return next(Messages(err).subtaskGetError)
    next()
})

schema.post('find', function(err, doc, next) {
    if(err) return next(Messages(err).subtaskGetError)
    next()
})

module.exports = Model('Subtask', schema)