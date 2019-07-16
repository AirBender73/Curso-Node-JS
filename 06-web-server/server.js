const express = require('express');
const app = express();

const hbs = require('hbs');
require('./hbs/helpers/helpers');


app.use(express.static(__dirname + '/public'));

//Express HBS engine
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {

    res.render('home', {
        nombre: 'David',
    });
});

app.get('/about', (req, res) => {
    res.render('about');
});

// app.get('/', (req, res) => {
//     // res.send('Hola Mundo');
//     let salida = {
//         nombre: 'David',
//         edad: 32,
//         url: req.url
//     }

//     res.send(salida);

// });

// app.get('/data', (req, res) => {
//     res.send('Hola Data');
// });

app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${port}`);
});