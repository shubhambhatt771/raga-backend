const caliberationsModel = require("../models/caliberations.model");
const sensorsModel = require("../models/sensors.model");
const SensorsModel = require("../models/sensors.model");
const moment = require('moment-timezone');


exports.viewSensorsData = async (req, res) => {
    try{
        let date = req.query.date || moment().format('DD-MM-YYYY');
        let time = req.query.time || '00:00:00';
        let result = await sensorsModel.aggregate([
            {
              $match: {
                date: {
                  $gte: date,  // Start date
                },
                time: {
                  $gte: time,    // Start time
                }
              }
            },
            {
                $group: {
                  _id: "$sensor_id",
                  data: {
                    $push: "$$ROOT"
                  }
                }
              },
              {
                $project: {
                  _id: 0,
                  sensor_id: "$_id",
                  data: 1
                }
              },
              {
                $group: {
                  _id: null,
                  sensorData: {
                    $push: {
                      k: "$sensor_id",
                      v: { data: "$data" }
                    }
                  }
                }
              },
              {
                $replaceRoot: {
                  newRoot: { $arrayToObject: "$sensorData" }
                }
              }
          ]);
        res.status(200).json({ data:result[0] });
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
