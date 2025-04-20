## Localhost set up
1. download node.js
2. cd weather-app
3. npm install express cors axios csv-parser
4. node index.js
5. open browser and navigate http://localhost:3000
6. If testing with the weather warning part with sample data, please uncomment the line 422-450, 515-542 and re-run step 1-5.


## Structure
* index.js => backend
* public/index.html, script_weather.js => frontend
* test/test.html, script_test.js => testing api

// test dynamic location by changing the station parameter (refer to VALID_STATIONS in server.js)
// only suitable for sunriseSunset, moonriseMoonset, dailyMeanTemp, dailyMaxTemp, dailyMinTemp,radiationReport dataset


## Website hosting
* Heroku: https://guarded-fortress-41349-9b603c7d3f4d.herokuapp.com/
* Firebase(static): https://myweather-f1eb2.web.app


## Github Link
https://github.com/CandiceWong123/COMP3421_ver3
