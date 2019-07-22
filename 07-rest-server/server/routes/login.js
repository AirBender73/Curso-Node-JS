const express = require('express');
const app = express();

const bcrypt = require('bcrypt'); // Requiere de encriptación para las contraseñas
const jwt = require('jsonwebtoken'); // Requiere para la creación/validación de tokens

// GOOGLE
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

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

});


// Configuraciones de google
async function verify(token) { // Verifica al usuario basándose en el token
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];

    // Devolvemos las siguientes propiedades
    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }

}
// verify().catch(console.error);

// POST USANDO EL GOOGLE SIGN IN
app.post('/google', async (req, res) => {

    let token = req.body.idtoken;

    let googleUser = await verify(token) // Retorna un obj googleUser con información del usuario
        .catch(err => {
            return res.status(403).json({
                ok: false,
                err: err
            });
        });

    // Revisamos si en mi BD existe algún usuario con el correo
    // Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

    Usuario.findOne({ email: googleUser.email }, (err, usuarioDB) => {

        // Si ocurre un error
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        };

        // Si existe un usuario en la BD con el mismo correo
        if (usuarioDB) {

            // Existe el usuario y no se autenticó mediante google
            if (usuarioDB.google === false) {

                return res.status(400).json({
                    ok: false,
                    err: {
                        msj: 'Debe usar la autenticación normal'
                    }
                });

            } else {
                // Si se autenticó mediante google

                // Le creamos un nuevo token personalizado
                let token = jwt.sign({
                    usuario: usuarioDB
                }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });


                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token: token
                });

            };

        } else {
            // Si el usuario no existe en la BD (es la primera vez que se registra)

            // Creamos un nuevo usuario con las propiedades del modelo
            let usuario = new Usuario();

            // Le asignamos las propiedades traìdas por google
            usuario.nombre = googleUser.nombre;
            usuario.email = googleUser.email;
            usuario.img = googleUser.img;
            usuario.google = true;
            usuario.password = ':)'; // Se asigna una contraseña para pasar nuestras validaciones (de todas maneras se encriptará así que no se podrán logear con ella)

            // Se guarda en la BD
            usuario.save((err, usuarioDB) => {

                // Si ocurre un error
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err: err
                    });
                };

                // Creación de token
                let token = jwt.sign({
                    usuario: usuarioDB
                }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token
                });

            });

        };

    });

});


module.exports = app;