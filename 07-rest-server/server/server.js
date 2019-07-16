require('./config/config');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
// El app.use significa que son middlewares
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
// El app.use significa que son middlewares
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.json('Hello World');
});

app.post('/usuario', function (req, res) {

    let body = req.body;

    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        });
    } else {
        res.json({
            usuario: body
        });
    }

    // res.json(body);
});

app.put('/usuario/:id', function (req, res) {

    let id = req.params.id;

    res.json({
        id
    });

    res.json('put Usuario');
});

app.delete('/usuario', function (req, res) {
    res.json('delete Usuario');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});