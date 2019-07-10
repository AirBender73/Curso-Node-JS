const colors = require('colors');
const argv = require('./config/yargs').argv;

const { crearArchivo, listar } = require('./multiplicar/multiplicar');

let comando = argv._[0];

console.log(argv.base);
console.log(argv.limite);

switch (comando) {
    case 'listar':
        console.log('Listar');
        listar(argv.base, argv.limite);
        break;
    case 'crear':
        console.log('Crear');
        crearArchivo(argv.base, argv.limite)
            .then(archivo => console.log('Archivo creado:'.yellow, `${archivo}`))
            .catch(err => console.log(`Ocurrió un error: ${err}`));
        break;

    default:
        console.log('Comando no reconocido');

        break;
}