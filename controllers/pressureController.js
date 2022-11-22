//importing modules
const bcrypt = require("bcrypt");
const db = require("../Models");
const jwt = require("jsonwebtoken");

// Assigning users to the variable User
const Pressure = db.pressure;

//creating a pressure for a user
const createPressure = async (req, res) => {
    try {
        //Get the jwt cookie
        const token = req.cookies.jwt;
        //Use the jwt to get the user id
        const decoded = jwt.verify(token, process.env.secretKey);
        const userId = decoded.id;

        const { systolicpressure, diastolicpressure } = req.body;
        const data = {
            systolicpressure,
            diastolicpressure,
            userId
        };
        //saving the pressure
        const pressure = await Pressure.create(data);

        //if pressure details is captured
        //send pressure details
        if (pressure) {
            console.log("pressure", JSON.stringify(pressure, null, 2));

        //Access the last 4 pressure readings of the user and check if they are in a downward trend send an alert to the user
        const lastFourReadings = await Pressure.findAll({
            where: {
                userId: userId,
            },
            order: [
                ['createdAt', 'DESC']
            ],
            limit: 4
        });

        //Check for a downward trend in the last 4 readings
        if(lastFourReadings.length === 4){
            if(lastFourReadings[0].systolicpressure < lastFourReadings[1].systolicpressure && lastFourReadings[1].systolicpressure < lastFourReadings[2].systolicpressure && lastFourReadings[2].systolicpressure < lastFourReadings[3].systolicpressure){
                //return a personalized response with the diagnosis and the source
                res.status(200).json({
                    message: "Your blood pressure is in a downward trend. Please consult a doctor",
                    source: "https://www.heart.org/en/health-topics/high-blood-pressure/understanding-blood-pressure-readings"
                });
            }
        }
        
        //Hypertensive Crisis
        //Pressure level for medical attention
        if(systolicpressure > 180 || diastolicpressure > 120){
            //TODO: Implement a call or message to the user's emergency contact
            res.status(200).json({
                message: "You are in a hypertensive crisis, please seek medical attention",
                source: "https://www.heart.org/en/health-topics/high-blood-pressure/understanding-blood-pressure-readings"
            });
        }

        //Hypertensive stage 1
        //Pressure level to suggest exercise
        if(systolicpressure > 130 || diastolicpressure > 80){
            res.status(200).json({
                message: "You are in a hypertensive stage 1, is suggested that you exercise more",
                source: "https://www.heart.org/en/health-topics/high-blood-pressure/understanding-blood-pressure-readings"
            });
        }

        //Very low pressure level
        //Pressure level to give CPR
        if(systolicpressure < 50 || diastolicpressure < 40){
            //TODO: Implement a call or message to the user's emergency contact
            res.status(200).json({
                message: "You should be given CPR immediately",
                source: "https://www.bjanaesthesia.org/article/S0007-0912(20)30051-9/fulltext"
            });
        } 


        } else {
            return res.status(409).send("Details are not correct");
        }
    } catch (error) {
        console.log(error);
    }
};

// async function evaluatePressure(systolicpressure, diastolicpressure, req, res) {
    
//   try {
      
//   } catch (error) {
//     console.log(error);
//   }

// }

module.exports = {
    createPressure
};