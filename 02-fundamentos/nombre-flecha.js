function sumar(a, b) {
    return a + b;
}

let sumarflecha = (a, b) => a + b;

function saludar(nombre) {
    return `Hola ${nombre}`;
}

let saludarflecha = nombre => `Hola ${nombre}`;

// console.log(sumar(10, 20));
// console.log(sumarflecha(10, 20));

console.log(saludar('David'));
console.log(saludarflecha('David'));
