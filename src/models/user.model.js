const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    id: {
        type: Number,
    },
    email: {
       type: String, 
    },
    password: {
        type: String, 
        required: true
    }
})

module.exports = mongoose.model("Users", userSchema);
