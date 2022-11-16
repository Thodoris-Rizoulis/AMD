import fetch from "node-fetch";
import express, { json } from "express";
import * as dotenv from "dotenv/config";

var routeeAccessToken;
const app = express();
app.use(express.json());

//Exchange Routee APP KEYS for Access Token
fetch("https://auth.routee.net/oauth/token?grant_type=client_credentials", {
  method: "POST",
  headers: {
    authorization: `Basic ${Buffer.from(process.env.ROUTEE_APP_ID + ":" + process.env.ROUTEE_APP_SECRET).toString("base64")}`,
    "content-type": "application/x-www-form-urlencoded",
  },
})
  .then((response) => response.json())
  .then((data) => {
    //Set the access token to use it on API calls to Routee platform
    routeeAccessToken = data.access_token;
  })
  .catch((error) => {
    console.error("Error:", error);
  });

//Call Routee's Number Validator
app.get("/amd-assesment-api/validate", (req, res) => {
  fetch("https://connect.routee.net/numbervalidator", {
    method: "POST",
    headers: {
      authorization: `Bearer ${routeeAccessToken}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ to: req.query.number }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.valid) {
        //Send 200 status in case of valid number
        res.send(JSON.stringify(200));
      } else {
        //Return 404 to handle number error
        res.send(JSON.stringify(404));
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

app.get("/amd-assesment-api", (req, res) => {
  // Try to call Open Weather API with the given city and take lat and lon parameters
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${req.query.city}&limit=1&appid=${process.env.WEATHER_APP_ID}`)
    .then((locationResponse) => locationResponse.json())
    .then((locationData) =>
      Promise.all([
        //Call both Open Weather and Routee APIs
        //Call Open Weather API with lat and lon values we got from previous call
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${locationData[0].lat}&lon=${locationData[0].lon}&units=metric&appid=${process.env.WEATHER_APP_ID}&units=metric`),
        //Call Routee API to send SMS
        fetch("https://connect.routee.net/sms", {
          method: "POST",
          headers: {
            authorization: `Bearer ${routeeAccessToken}`,
            "content-type": "application/json",
          },
          body: JSON.stringify({ body: "A new game has been posted to the MindPuzzle. Check it out", to: req.query.number, from: "amdTelecom" }),
        }),
      ]).then(([weatherResponse, SMSResponse]) =>
        Promise.all([weatherResponse.json(), SMSResponse.json()]).then(([weatherData, SMSData]) => {
          //Send object to frontend with temperature of the city and SMS payload
          res.send({ temp: JSON.stringify(weatherData.main.temp), smsPaylod: JSON.stringify(SMSData) });
        })
      )
    )
    .catch(() => {
      //Return 404 to handle city error
      res.send(JSON.stringify(404));
    });
});

//Starting server localy on port 3000
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
