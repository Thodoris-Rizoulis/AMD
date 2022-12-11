# Routee-OpenWeather.

LIVE:
http://routee-weather.rizoulis.online/

**Possible delays are due to low specs server deployed**

OR

Run by yourself:

git clone -b master https://github.com/Thodoris-Rizoulis/AMD.git

cd AMD folder

cd into backend folder

npm install

create .env file and add below fields:

ROUTEE_APP_ID="your_routee_app_id"

ROUTEE_APP_SECRET="your_routee_app_secret"

WEATHER_APP_ID="your_openweather_app_id"

FRONTEND_URL="http://localhost:3001"

PORT=3000

node index.js

open new terminal 

cd into frontend folder

npm install

create .env file and add below fields:

PORT=3001

REACT_APP_BACKEND_URL="http://localhost:3000"

npm start
