const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea por hacer'
}

const completado = {
    alias: 'c',
    default: true,
    desc: 'Marca como completado o pendiente la tarea'
}

const completados = {
    alias: 'c',
    default: false,
    desc: 'Muestra todos las tareas completadas'
}

const argv = require('yargs')
    .command('crear', 'Crear una nueva tarea por hacer', { descripcion })
    .command('listar', 'Muestra todas las tareas por hacer', { completados })
    .command('actualizar', 'Actualiza el estado completado de una tarea', { descripcion, completado })
    .command('borrar', 'Elimina una tarea de la lista', { descripcion })
    .help()
    .argv;

module.exports = {
    argv
}