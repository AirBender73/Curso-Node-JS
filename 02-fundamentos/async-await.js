/**
 * Async Await
 */

// let getNombre = async () => {

//     return 'David';
// };

// ASYNC = 
let getNombre = () => {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve('David Promise');
        }, 3000);

    });
};

let saludo = async () => {
    let nombre = await getNombre();

    return `Hola ${nombre}`;
}

saludo().then(msj => {
    console.log(msj);
});