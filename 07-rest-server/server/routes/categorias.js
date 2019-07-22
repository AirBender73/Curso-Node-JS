const express = require('express');
const app = express();

const _ = require('underscore');

// Models
const Categoria = require('../models/categorias');

// Middlewares (Autentucación)
const { verificaToken, verifica_AdminRole } = require('../middlewares/autenticacion');


// --------- GET | OBTENER TODAS LAS CATEGORÍAS
app.get('/categoria', verificaToken, (req, res) => {

    Categoria.find()
        .sort('nombre')
        .populate('usuario', 'nombre email')
        .exec((err, categoriaDB) => {

            if (err) {
                res.json({
                    ok: false,
                    err
                });
            };

            Categoria.count((err, conteo) => {

                res.json({
                    ok: true,
                    registros: conteo,
                    categoria: categoriaDB
                });

            });

        });

});


// --------- GET | OBTENER CATEGORÍA POR ID
app.get('/categoria/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    Categoria.find({ _id: id }).exec((err, categoriaDB) => {

        if (err) {
            res.json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            categoria: categoriaDB
        });


    });

});


// POST | CREAR NUEVA CATEGORIA
app.post('/categoria', [verificaToken, verifica_AdminRole], (req, res) => {

    let body = req.body;

    let categoria = new Categoria({
        nombre: body.nombre,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });

});


// PUT | ACTUALIZA UNA CATEGORÍA CON BASE EN SU ID
app.put('/categoria/:id', [verificaToken, verifica_AdminRole], (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre']);

    Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, categoriaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });

});


// DELETE | ELIMINA DE LA BD UNA CATEGORÍA
app.delete('/categoria/:id', [verificaToken, verifica_AdminRole], (req, res) => {

    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaBorrada) => {


        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!categoriaBorrada) {
            return res.status(400).json({
                ok: false,
                msj: 'Categoría no encontrada'
            });
        };

        res.json({
            ok: true,
            msj: 'Categoría borrada',
            categoria: categoriaBorrada
        });

    });
});


module.exports = app;