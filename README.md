# AMD
Routee-OpenWeather.

How to run:

git clone https://github.com/Thodoris-Rizoulis/AMD.git
git checkout master

cd into backend folder
npm install
node index.js

cd into frontend folder
npm install

Note:
Backend runs by default on 3000 port
In case something else is running on this port on your machine
go to frontend -> package.json -> edit the proxy field with the corrent port to avoid CORS issues

npm start
