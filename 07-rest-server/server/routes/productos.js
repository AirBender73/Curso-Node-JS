const express = require('express');
const app = express();

// Models
const Producto = require('../models/productos');

// Middlewares
const { verificaToken } = require('../middlewares/autenticacion');

// GET | OBTENER TODOS LOS PRODUCTOS
app.get('/productos', verificaToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);


    Producto.find({ disponible: true })
        .skip(desde)
        .limit(limite)
        .sort('nombre')
        .populate('usuario', 'nombre email')
        .populate('categoria', 'nombre')
        .exec((err, productoDB) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            if (!productoDB) {
                return res.json({
                    ok: false,
                    msj: 'No se encontraron productos'
                });
            };

            Producto.count({ disponible: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    registros: conteo,
                    producto: productoDB
                });

            });

        });

});


// GET | OBTENER PRODUCTO POR ID
app.get('/productos/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    Producto.findById({ _id: id })
        .populate('usuario', 'nombre email')
        .populate('categoria', 'nombre')
        .exec((err, productoDB) => {

            if (err) {
                return res.json({
                    ok: false,
                    err
                });
            };

            if (!productoDB) {
                return res.json({
                    ok: false,
                    msj: 'No se encontró el producto'
                });
            };

            res.json({
                ok: true,
                producto: productoDB
            });

        });

});


// GET | OBTENER PRODUCTOS POR BUSQUEDA
app.get('/productos/buscar/:parametro', verificaToken, (req, res) => {

    let parametro = req.params.parametro;

    let regex = new RegExp(parametro, 'i');

    Producto.find({ nombre: regex })
        .populate('categoria', 'nombre')
        .exec((err, productos) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            };

            res.json({
                ok: true,
                productos
            });

        });

});


// POST | CREAR  PRODUCTO
app.post('/productos', verificaToken, (req, res) => {

    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precio,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: req.usuario._id
    });

    producto.save((err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        if (!productoDB) {
            return res.json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            producto: productoDB
        });

    });
});


// PUT | ACTUALIZA UN PRODUCTOS
app.put('/productos/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    let body = req.body;

    let producto = {
        nombre: body.nombre,
        precioUni: body.precio,
        descripcion: body.descripcion || '',
        disponible: body.disponible,
        categoria: body.categoria,
    };

    Producto.findByIdAndUpdate(id, producto, { new: true, runValidators: true, context: 'query' }, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                msj: 'Producto no encontrado'
            });
        };

        res.json({
            ok: true,
            producto: productoDB
        });

    });

});


// DELETE | MODIFICA EL ESTADO DE DISPONIBILIDAD DEL PRODUCTO
app.delete('/productos/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    let body = {
        disponible: false
    };

    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, productoEliminado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!productoEliminado) {
            return res.json({
                ok: false,
                msj: 'Producto no encontrado'
            });
        };

        res.json({
            ok: true,
            producto: productoEliminado
        });

    });

});

module.exports = app;