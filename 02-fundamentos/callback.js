// setTimeout(function () {
//     console.log('Hola mundo');
// }, 3000);

// setTimeout(() => {
//     console.log('Hola mundo');
// }, 3000);

let getUsuarioById = (id, callback) => {

    let usuario = {
        nombre: 'David',
        id
    };

    if (id === 20) {
        // Retornamos el error
        callback(`El usuario con id ${20}, no existe en la BD`);
    } else {
        // El error se envia nulo
        callback(null, usuario);
    }

}

getUsuarioById(10, (err, usuario) => {

    // Si hay un error detenemos la aplicación
    if (err) {
        return console.log(err);
    }

    console.log('Usuario de base de datos', usuario);

});