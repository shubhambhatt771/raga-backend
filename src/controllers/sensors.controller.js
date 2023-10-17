const caliberationsModel = require("../models/caliberations.model");
const SensorsModel = require("../models/sensors.model");



exports.viewSensorsData = async (req, res) => {
    try{
        let data = await SensorsModel.find({});

        res.status(200).json({ data });
        // else{
        //     res.json({ message: "No purchases found" });
        // }
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}

exports.createSensorsData = async (req, res) => {
    try{
        const sensorsData = req.body.data;
        sensorsData.forEach(async obj => {
            if (obj['remark'] === 'CALIBERATION'){
                // caliberation mode
                await caliberationsModel.findOneAndUpdate(
                    { sensor_id: obj.sensor_id },
                    {...obj},
                    { upsert: true, new: true, setDefaultsOnInsert: true }
                  );
            }
            else{
                let sensor_id = obj.sensor_id;
                let defaultSensorValues = await caliberationsModel.findOne({sensor_id});
                console.log(defaultSensorValues,'default vaules');
                let {temp, flow, psi} = obj;

                temp = temp !== 0 ? ((temp / 24.2) - 50) : 0;
                flow = flow !== defaultSensorValues.flow ? (flow - defaultSensorValues.flow) * 0.625 : 0;
                psi = psi !== defaultSensorValues.psi ? ( (psi / 27.07)-1.25 ) : 0;
                obj = {...obj, temp:temp.toFixed(2), flow: flow.toFixed(2), psi: psi.toFixed(2)};
                await SensorsModel.create({
                    ...obj
                });
            } 
        });
        res.status(201).json({ status: "success" });
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}

exports.setCaliberations = async (req, res) => {
    try{
        const sensorsData = req.body.data;
        sensorsData.forEach(async obj => {
            console.log(obj, 'object here');
            if (obj['remark'] === 'CALIBERATION'){
                // caliberation mode
                await caliberationsModel.findOneAndUpdate(
                    { sensor_id: obj.sensor_id },
                    {...obj},
                    { upsert: true, new: true, setDefaultsOnInsert: true }
                  );
            }
        });
        res.status(201).json({ status: "success" });
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}
