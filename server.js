// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const moment = require('moment-timezone');
const cookieParser = require('cookie-parser')
moment.tz.setDefault("Asia/Kolkata");
app.use(bodyParser.json());
app.use(cookieParser(""));
app.use(cors());


app.get('/', (req, res, next)=>{
    return res.json(200);
});



const userRouter = require("./src/routes/user.route");
const sensorsRoute = require("./src/routes/sensors.route")

app.use("/api/users", userRouter);
app.use("/api/sensors", sensorsRoute);

const URL = `mongodb+srv://root:root1234@cluster0.oxgyoja.mongodb.net/?retryWrites=true&w=majority`
    try {
        mongoose.connect(URL);
        console.log('Database Connected Succesfully');
    } catch(error) {
        console.log('Error: ', error.message);
    }




// Start the server
const port = process.env.PORT || 5000;;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
