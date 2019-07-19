const jwt = require('jsonwebtoken');

// Verificar token
let verificaToken = (req, res, next) => {

    let token = req.get('token'); // 'token' nombre del header que pedimos

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    msj: 'Token inválido'
                }
            });
        };

        req.usuario = decoded.usuario;

        // Continua con la función
        next();
    });

};


let verifica_AdminRole = (req, res, next) => {

    // console.log(req.usuario);

    if (req.usuario.role != 'ADMIN_ROLE') {
        // conssole.log('No tienes permiso de administrador');
        return res.status(401).json({
            ok: false,
            err: {
                msj: 'No tienes permisos de administrador'
            }
        });
    }

    // Continua con la función
    next();

}

// Exportamos el módulo
module.exports = {
    verificaToken,
    verifica_AdminRole
}