const Service = require('./users.service')
// const Fields = require('./users.fields')

module.exports = {
    // loginUser,
    createUser,
    // getUsers,
    // updateUser,
    // deleteUser,
}

async function loginUser(req, res) {
    try {

        const fields = new Fields(req)

        const data = {
            email: fields.email.get(),
            password: fields.password.get(),
        }

        res.$data(await Service.loginTeacher(data))

    } catch(error) {
        res.$error(error)
    }
}

async function createUser(req, res) {
    try {

        // const fields = new Fields(req)

        const data = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            description: req.body.description,
            // firstName: fields.firstName.get(),
            // lastName: fields.lastName.get(),
            // email: fields.email.get(),
            // password: fields.password.get(),
            // phone: fields.phone.get(),
            // description: fields.description.get(),
        }

        res.$data(await Service.createUser(data))

    } catch(error) {
        res.$error(error)
    }
}

async function getUsers(req, res) {
    try {

        const query = {
            page: parseInt(req.query.page || 0),
            find: req.query.find,
            status: req.query.status,
        }

        res.$data(await Service.getTeachers(query))

    } catch(error) {
        res.$error(error)
    }
}

async function updateUser(req, res) {
    try {

        const data = {
            teacherId: req.params.teacherId
        }

        const fields = [
            'firstName',
            'lastName',
            'phone',
            'description',
            'created',
        ]

        fields.forEach(field => req.body[field] && (data[field] = req.body[field]))

        res.$data(await Service.updateTeacher(data.teacherId, data))

    } catch(error) {
        res.$error(error)
    }
}

async function deleteUser(req, res) {
    try {

        const data = {
            teacherId: req.params.teacherId
        }

        res.$data(await Service.deleteTeacher(data.teacherId))

    } catch(error) {
        res.$error(error)
    }
}