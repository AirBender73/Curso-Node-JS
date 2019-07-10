// Requires
const fs = require('fs');

let listar = (base, limite = 10) => {

    console.log('----------------------------'.green);
    console.log(`-------- TABLA DE ${base} --------`.green);
    console.log('----------------------------'.green);


    for (let i = 1; i <= limite; i++) {
        console.log(`${base} * ${i} = ${base * i}`);
    }

}

let crearArchivo = (base, limite = 10) => {
    return new Promise((resolve, reject) => {
        let data = '';

        if (!Number(base)) {
            reject(`El valor introducido ${base} no es un número`);
            return;
        }

        for (let i = 1; i <= limite; i++) {
            data += `${base} * ${i} = ${base * i}\n`;
            console.log(`${base} * ${i} = ${base * i}`);
        }

        fs.writeFile(`./tablas/Tabla-${base}.txt`, data, (err) => {
            if (err) reject(err);
            else resolve(`tabla-${base}.txt`)
        });
    });
}

module.exports = {
    crearArchivo,
    listar
}