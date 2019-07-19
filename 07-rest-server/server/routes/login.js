const express = require('express');
const app = express();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');


app.post('/login', (req, res) => {

    let body = req.body;

    console.log(body);

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        // Si hay error
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        console.log(usuarioDB);


        // Si no existe un usuario
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    msj: '(Usuario) y/o contraseña incorrectos'
                }
            });
        };

        // Si la contraseña es correcta
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    msj: 'Usuario y/o (contraseña) incorrectos'
                }
            });
        }

        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        })

    });

    // res.json({
    //     ok: true,

    // })
});






module.exports = app;