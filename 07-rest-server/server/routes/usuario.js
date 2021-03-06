const express = require('express');
const app = express();

const bcrypt = require('bcrypt');

const _ = require('underscore');

const Usuario = require('../models/usuario');

const { verificaToken, verifica_AdminRole } = require('../middlewares/autenticacion');

// --------- GET | OBTENER TODOS LOS USUARIOS
// {verificaToken}: Middleware (sigue la función gracias al next() )
app.get('/usuario', verificaToken, (req, res) => {


    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            Usuario.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    registros: conteo,
                    usuarios
                });

            });

        });

});


// --------- POST | CREAR UN USUARIO
app.post('/usuario', [verificaToken, verifica_AdminRole], (req, res) => {


    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        };

        // usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });


    // if (body.nombre === undefined) {

    //     res.status(400).json({
    //         ok: false,
    //         mensaje: 'El nombre es necesario'
    //     });

    // } else {
    //     res.json({
    //         persona: body
    //     });
    // };

});


// --------- PUT | ACTUALIZA UN USUARIO
app.put('/usuario/:id', [verificaToken, verifica_AdminRole], (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usuarioDB) => {


        if (err) {
            return res.json({
                ok: false,
                err
            });
        };


        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });


});


// --------- DELETE | CAMBIA EL ESTADO DEL USUARIO (LO COMENTADO SÍ LO ELIMINA)
app.delete('/usuario/:id/', [verificaToken, verifica_AdminRole], (req, res) => {

    let id = req.params.id;
    let usuarioEliminado = {
        estado: false
    }
    // let body = _.pick(req.body, ['estado']);


    Usuario.findByIdAndUpdate(id, usuarioEliminado, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });


    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         });
    //     };


    //     if (!usuarioBorrado) {
    //         return res.status(400).json({
    //             ok: false,
    //             err: {
    //                 message: 'Usuario no encontrado'
    //             }
    //         });
    //     }


    //     res.json({
    //         ok: true,
    //         usuario: usuarioBorrado
    //     });

    // });


});

module.exports = app;