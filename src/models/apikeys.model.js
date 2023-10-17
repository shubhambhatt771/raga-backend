const mongoose = require('mongoose');

const apiKeySchema = new mongoose.Schema({
    
    id: {
        type: Number,
    },
    key:{
        type:String,
        required: true,
        unique:true
    }
})

module.exports = mongoose.model("apikeys", apiKeySchema);
