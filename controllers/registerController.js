const User = require('../models/User');

const Joi = require('@hapi/joi');

const bcrypt = require('bcrypt');

const schemaRegister = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
}) 

const registerController = async (req,res) =>{
    //validaciones de usuario
    const { error } = schemaRegister.validate(req.body);

    if (error) {
        return res.status(400).json(
            {error: error.details[0].message}
        )
    }

    //chequeamos si el email existe
    const existeEmail = await User.findOne({email:req.body.email});
    if(existeEmail) return res.status(400).json({error:true, mensaje:'Email ya se encuentra registrado'});

   // hash contraseña
   const salt = await bcrypt.genSalt(10);
   const password = await bcrypt.hash(req.body.password, salt);

    //informacion obtenida del body/usuario 
    
    const {email} = req.body;
    const emailSentive = email.toLowerCase()
    
    const user = new User({
        email: emailSentive,
        password: password
    });
    try {
        const savedUser = await user.save();
        res.json({
            error: null,
            data: savedUser
        })
    } catch (error) {
        res.status(400).json({error})
    }
}

module.exports = registerController;