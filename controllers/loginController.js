const User = require('../models/User');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

const loginController = async (req, res) =>{
    // validaciones
    const { error } = schemaLogin.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })
    const {email} = req.body;
    const emailSentive = email.toLowerCase()
    const user = await User.findOne({ email: emailSentive});
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' })
    
    const token = jwt.sign({
        email: user.email,
        id: user._id
    }, process.env.TOKEN_SECRET)

    res.header('auth-token', token).json({
        error: null,
        mensaje:'Bienvenido',
        data: {token}
    })
}

module.exports = loginController;