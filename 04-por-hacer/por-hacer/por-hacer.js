const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile(`./db/data.json`, data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });

}

const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }

    // console.log(listadoPorHacer);

}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer
}

const getListado = (completado) => {
    cargarDB();

    console.log(completado);


    if (completado) {
        console.log('Completados');

        //USANDO FILTER
        let completados = listadoPorHacer.filter(tarea => tarea.completado === true);

        // MI MÉTODO
        // let completados = [];

        // for (let i = 0; i < listadoPorHacer.length; i++) {
        //     if (listadoPorHacer[i].completado) {
        //         completados.push(listadoPorHacer[i]);
        //     }
        // }

        return completados;

    } else {
        return listadoPorHacer;
    }
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion)

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    console.log(descripcion);

    //MANERA EN QUE YO LO HICE
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    console.log(index);


    if (index >= 0) {
        listadoPorHacer.splice(index);

        guardarDB();
        return true;
    } else {
        return false;
    }

    // FORMA DEL PROFESOR
    // let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion)

    // if (listadoPorHacer.length === nuevoListado.length) {
    //     return false;
    // } else {
    //     listadoPorHacer = nuevoListado;
    //     guardarDB();
    //     return true;
    // }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}