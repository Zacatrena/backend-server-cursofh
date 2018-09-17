var mongosse = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongosse.Schema;

var rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} noes un rol permitido'
};

var usuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'El nobre es necesario'] },
    email: { type: String, unique: true, required: [true, 'El correo es necesario'] },
    password: { type: String, required: [true, 'La contraseña es obligatoria'] },
    img: { type: String, required: false },
    role: { type: String, required: [true, 'El rol es necesario'], default: "USER_ROLE", enum: rolesValidos },
    google: { type: Boolean, default: false }
});

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongosse.model('Usuario', usuarioSchema);