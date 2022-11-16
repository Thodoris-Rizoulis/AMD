# AMD
Routee-OpenWeather.

How to run:

git clone https://github.com/Thodoris-Rizoulis/AMD.git

cd AMD folder

git checkout master

cd into backend folder

npm install

create .env file and add below fields:

ROUTEE_APP_ID="your_routee's_account_app_id"

ROUTEE_APP_SECRET="your_routee's_account_app_secret"

WEATHER_APP_ID="your_openweather_account_app_id"

node index.js

open a new terminal tab

cd into frontend folder

npm install

Note:

Backend runs by default on 3000 port

In case something else is running on this port on your machine

go to frontend -> package.json -> edit the proxy field with the corrent port to avoid CORS issues

npm start

press yes in case "Would you like to run the app on another port instead?" appear
