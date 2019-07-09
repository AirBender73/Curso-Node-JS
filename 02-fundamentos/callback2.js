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

let getEmpleado = (id, callback) => {
    let empleadoDB = empleados.find(empleado => empleado.id === id);

    if (!empleadoDB) {
        callback(`No existe un empleado con el ID ${id}`);
    } else {
        callback(null, empleadoDB);
    };
};

let getSalario = (empleado, callback) => {

    let salarioDB = salarios.find(salario => empleado.id === salario.id);

    if (!salarioDB) {
        callback(`El empleado ${empleado.nombre}, no tiene salario`);
    } else {
        callback(null, {
            nombre: empleado.nombre,
            salario: salarioDB.salario
        });
    };
}

getEmpleado(1, (err, empleado) => {
    if (err) {
        return console.log(err);
    };

    console.log('Empleado', empleado.nombre, 'con id', empleado.id);

    getSalario(empleado, (err, empSalario) => {
        if (err) {
            return console.log(err);
        }
        console.log(`El salario de ${empSalario.nombre}, es de ${empSalario.salario}`);
    });

});