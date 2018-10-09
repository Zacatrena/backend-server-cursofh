var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;




//===============================================
// Verificar token
//===============================================
exports.verificaToken = function(req, res, next) {

    var token = req.query.token;

    jwt.verify(token, SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                // token: token,
                mensaje: 'Token incorrecto!',
                errors: err
            });
        }

        req.usuario = decoded.usuario;
        next();

    });
};


//===============================================
// Verificar ADMIN
//===============================================
exports.verificaADMIN = function(req, res, next) {

    var usuario = req.body;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
        return;
    } else {
        return res.status(401).json({
            ok: false,
            mensaje: 'Token incorrecto - No es administrador',
            errors: { message: 'No es administrador, acción no permitida' }
        });
    }
};


//===============================================
// Verificar ADMIN o Mismo Usuario
//===============================================
exports.verificaADMIN_MismoUsuario = function(req, res, next) {

    var usuario = req.body;
    var id = req.params.id;
    var idUser = usuario._id;

    if (usuario.role === 'ADMIN_ROLE' || id === idUser) {
        next();
        return;
    } else {
        return res.status(401).json({
            ok: false,
            mensaje: 'Token incorrecto - No es administrador ni el mismo usuario',
            errors: { message: 'No es administrador, acción no permitida' }
        });
    }
};