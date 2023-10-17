const mongoose = require('mongoose');

const caliberationsSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    sensor_id:{
        type:String,
    },
    temp:{
        type:Number,
    },
    flow:{
        type:Number,
    },
    psi:{
        type:Number,
    },
    remark:{
        type:String
    }
});

module.exports = mongoose.model("caliberations", caliberationsSchema);
