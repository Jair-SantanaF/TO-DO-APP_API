module.exports = function($details, $message) {
    return {

        subtaskSaveError: {
            code: 503,
            key: 'subtaskSaveError',
            message: $message || 'Error al guardar la información de la sub tarea',
            $details
        },

        subtaskGetError: {
            code: 503,
            key: 'subtaskGetError',
            message: $message || 'Error al obtener la sub tarea',
            $details
        },

        subtaskNotFound: {
            code: 404,
            key: 'subtaskNotFound',
            message: $message || 'El registro de la sub tarea no fue encontrado',
            $details
        },

        subtaskDeleteError: {
            code: 503,
            key: 'subtaskDeleteError',
            message: $message || 'Error al borrar la información de la sub tarea',
            $details
        },
    }
}