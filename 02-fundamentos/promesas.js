let empleados = [
    {
        id: 1,
        nombre: 'David'
    },
    {
        id: 2,
        nombre: 'Melissa'
    },
    {
        id: 3,
        nombre: 'Juan'
    },
];

let salarios = [
    {
        id: 1,
        salario: 1000
    },
    {
        id: 2,
        salario: 2000
    }
];

let getEmpleado = (id) => {

    return new Promise((resolve, reject) => {
        let empleadoDB = empleados.find(empleado => empleado.id === id);

        if (!empleadoDB) {
            reject(`No existe un empleado con el ID ${id}`);
        } else {
            resolve(empleadoDB);
        };
    });
};

let getSalario = (empleado) => {

    return new Promise((resolve, reject) => {

        let salarioDB = salarios.find(salario => empleado.id === salario.id);

        if (!salarioDB) {
            reject(`El empleado ${empleado.nombre}, no tiene salario`);
        } else {
            resolve({ nombre: empleado.nombre, salario: salarioDB.salario });
        };
    });
}

getEmpleado(1).then(empleado => {

    console.log('Empleado de base de datos', empleado);
    return getSalario(empleado);

}).then(salario => {
    console.log(`El salario de ${salario.nombre}, es de ${salario.salario}`);
}).catch(err => {
    console.log(err);
})

// getEmpleado(3).then(empleado => {
//     console.log('Empleado de base de datos', empleado);

//     getSalario(empleado).then(salario => {
//         console.log(`El salario de ${salario.nombre}, es de ${salario.salario}`);
//     }, (err) => {
//         console.log(err);
//     });

// }, (err) => {
//     console.log(err);
// });