const colors = require('colors');

const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');

const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Dirección de la ciudad para obtener el clima',
        demand: true
    }
}).argv;

// MANERA EN QUE LO RESOLVÍ
// getInfo = () => {

//     lugar.getLugarLatLng(argv.direccion)
//         .then(res => {

//             clima.getClima(res.lat, res.lng)
//                 .then(res => {
//                     console.log(`El clima de ${argv.direccion} es ${res}°`.yellow);
//                 })
//                 .catch(err => console.log(err));
//         })
//         .catch(err => console.log(err))
// }

// getInfo();

//MANERA DEL PROFESOR

const getInfo = async (direccion) => {

    try {
        const coords = await lugar.getLugarLatLng(direccion);
        const temp = await clima.getClima(coords.lat, coords.lng);
        return `El clima de ${direccion} es de ${temp}°`
    } catch (err) {
        return `No se pudo determinar el clima de ${direccion}`
    }

}

getInfo(argv.direccion)
    .then(res => console.log(res.yellow))
    .catch(console.log)