const mongoose = require('mongoose');

const sensorsDataSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    date:{
        type: String,
    },
    time:{
        type: String,
    },
    sensor_id:{
        type:String
    },
    temp:{
        type:Number,
    },
    flow:{
        type: Number,
    },
    psi:{
        type:Number
    },
    remark:{
        type:String
    }
})

module.exports = mongoose.model("sensors", sensorsDataSchema);
