const User = require('../models/User');

const listarController = async(req, res) =>{
    const {email} = req.params

    const page = req.query.page || 1
    const limit = req.query.limit || 5
    
    const options = {
        page,
        limit
    }
    try {
        if(!email){
            const users = await User.paginate({}, options)

                res.json({
                    users : users
            })

        }else{
            const emailSentive = email.toLowerCase()
            const user = await User.findOne({ email: emailSentive});
            if(user){
                res.json({
                    user
                })
            }else{
                res.json({
                    mensaje:'usuario no enconrtado'
                })
            }
        }
        
    } catch (err) {
        res.status(400).json({err})
    }
}

module.exports = listarController;