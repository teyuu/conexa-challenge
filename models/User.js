const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
})

userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', userSchema);