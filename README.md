// set up
1. download node.js
2. cd weather-app
3. npm install express cors axios csv-parser
4. node backend/server.js
5. open browser and navigate https://myweather-f1eb2.web.app


server.js => backend
weather.html, script_weather.js => frontend
test.html, script_test.js => testing api

// test dynamic location by changing the station parameter (refer to VALID_STATIONS in server.js)
// only suitable for sunriseSunset, moonriseMoonset, dailyMeanTemp, dailyMaxTemp, dailyMinTemp,radiationReport dataset
localhost:3000/weather/sunriseSunset?station=HKO
