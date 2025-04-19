let date = new Date();

// HK Observatory weather station info
const regions = [
    {"code":"CLK", "station": "Chek Lap Kok", "station_tc": "赤蠟角", "district": "Islands District", "district_tc": "離島區", "image_src": "./image/region/cheklapkok.jpg"},
    {"code":"CCH", "station": "Cheung Chau", "station_tc": "長洲", "district": "Islands District", "district_tc": "離島區", "image_src": "./image/region/cheungchau.jpeg"},
    {"code":"HVY", "station": "Happy Valley", "station_tc": "跑馬地", "district": "Wan Chai", "district_tc": "灣仔", "image_src": "./image/region/happyvalley.jpg"},
    {"code":"HKO", "station": "Hong Kong Observatory", "station_tc": "香港天文台", "district": "Yau Tsim Mong", "district_tc": "油尖旺", "image_src": "./image/region/hongkongobservatory.jpg"},
    {"code":"HKP", "station": "Hong Kong Park", "station_tc": "香港公園", "district": "Central & Western District", "district_tc": "中西區", "image_src": "./image/region/hongkongpark.jpg"},
    {"code":"KTR", "station": "Kai Tak Runway Park", "station_tc": "啟德跑道公園", "district": "Kowloon City", "district_tc": "九龍城", "image_src": "./image/region/kaitakrunwaypark.jpg"},
    {"code":"KP", "station": "King's Park", "station_tc": "京士柏", "district": "Yau Tsim Mong", "district_tc": "油尖旺", "image_src": "./image/region/kingspark.jpg"},
    {"code":"KLT", "station": "Kowloon City", "station_tc": "九龍城", "district": "Kowloon City", "district_tc": "九龍城", "image_src": "./image/region/kowlooncity.jpg"},
    {"code":"KWT", "station": "Kwun Tong", "station_tc": "觀塘", "district": "Kwun Tong", "district_tc": "觀塘", "image_src": "./image/region/kwuntong.jpg"},
    {"code":"LFS", "station": "Lau Fau Shan", "station_tc": "流浮山", "district": "Yuen Long", "district_tc": "元朗", "image_src": "./image/region/laufaushan.jpg"},
    {"code":"SKG", "station": "Sai Kung", "station_tc": "西貢", "district": "Sai Kung", "district_tc": "西貢", "image_src": "./image/region/saikung.jpg"},
    {"code":"SHA", "station": "Sha Tin", "station_tc": "沙田", "district": "Sha Tin", "district_tc": "沙田", "image_src": "./image/region/shatin.jpg"},
    {"code":"SSP", "station": "Sham Shui Po", "station_tc": "深水埗", "district": "Sham Shui Po", "district_tc": "深水埗", "image_src": "./image/region/shamshuipo.jpg"},
    {"code":"SKW", "station": "Shau Kei Wan", "station_tc": "筲箕灣", "district": "Eastern District", "district_tc": "東區", "image_src": "./image/region/shaukeiwan.jpg"},
    {"code":"SEK", "station": "Shek Kong", "station_tc": "石崗", "district": "Yuen Long", "district_tc": "元朗", "image_src": "./image/region/shekkong.jpg"},
    {"code":"STY", "station": "Stanley", "station_tc": "赤柱", "district": "Southern District", "district_tc": "南區", "image_src": "./image/region/stanley.jpg"},
    {"code":"TKL", "station": "Ta Kwu Ling", "station_tc": "打鼓嶺", "district": "North District", "district_tc": "北區", "image_src": "./image/region/takwuling.jpg"},
    {"code":"TMT", "station": "Tai Mei Tuk", "station_tc": "大美督", "district": "Tai Po", "district_tc": "大埔", "image_src": "./image/region/taipo.jpg"},
    {"code":"TPO", "station": "Tai Po", "station_tc": "大埔", "district": "Tai Po", "district_tc": "大埔", "image_src": "./image/region/taipo.jpg"},
    {"code":"JKB", "station": "Tseung Kwan O", "station_tc": "將軍澳", "district": "Sai Kung", "district_tc": "西貢", "image_src": "./image/region/tseungkwano.jpg"},
    {"code":"TYW", "station": "Tsing Yi", "station_tc": "青衣", "district": "Kwai Tsing", "district_tc": "葵青", "image_src": "./image/region/tsingyi.jpg"},
    {"code":"TWH", "station": "Tsuen Wan Ho Koon", "station_tc": "荃灣可觀", "district": "Tsuen Wan", "district_tc": "荃灣", "image_src": "./image/region/tsuenwanhokoon.jpg"},
    {"code":"TWN", "station": "Tsuen Wan Shing Mun Valley", "station_tc": "荃灣城門谷", "district": "Tsuen Wan", "district_tc": "荃灣", "image_src": "./image/region/tsuenwanshingmunvalley.jpg"},
    {"code":"TUN", "station": "Tuen Mun", "station_tc": "屯門", "district": "Tuen Mun", "district_tc": "屯門", "image_src": "./image/region/tuenmun.jpg"},
    {"code":"HKS", "station": "Wong Chuk Hang", "station_tc": "黃竹坑", "district": "Southern District", "district_tc": "南區", "image_src": "./image/region/wongchukhang.JPG"},
    {"code":"WTS", "station": "Wong Tai Sin", "station_tc": "黃大仙", "district": "Wong Tai Sin", "district_tc": "黃大仙", "image_src": "./image/region/wongtaisin.jpg"},
    {"code":"YLP", "station": "Yuen Long Park", "station_tc": "元朗公園", "district": "Yuen Long", "district_tc": "元朗", "image_src": "./image/region/yuenlongpark.jpg"}
];

// When the window loads, initialize the weather data
window.onload = function() {

    fetchDate();

    // Part 1: Fetch current weather data
    // Update weather image, condition, and report
    fetchLocalWeather(document.getElementById('c_icon'),document.getElementById('c_condition'),document.getElementById('c_report'));

    // Update temperature, humidity, UV index, and max rainfall
    fetchRegionalWeather("Hong Kong Observatory", "Yau Tsim Mong", document.getElementById('c_humidity'), document.getElementById('c_uv'), document.getElementById('c_temp'), document.getElementById('c_rainfall'));

    // Update sunrise and sunset times
    fetchSunriseSunset(document.getElementById('c_sunrise'), document.getElementById('c_sunset'));

    // Update moonrise and moonset times
    fetchMoonriseMoonset(document.getElementById('c_moonrise'), document.getElementById('c_moonset'));

    // Update visibility
    fetchVisibility("Central", document.getElementById('c_visibility'));

    // Update min-max temperature
    fetchMinMaxTemp("HKO", document.getElementById("c_min_temp"), document.getElementById("c_max_temp"));


    // Part 2: Fetch weather warning
    fetchWeatherWarning();


    // Part 3: Fetch regional weather data
    let station = "Sha Tin";
    let district = "Sha Tin";
    // Update rainfall
    fetchRainfall(station, document.getElementById('r_rainfall'));

    // Update weather data - initilize using ShaTin
    fetchRegionalWeather(station, district, document.getElementById('r_humidity'), document.getElementById('r_uv'), document.getElementById('r_temp'), document.getElementById('r_rainfall'));
    
    // Update visibility
    fetchVisibility(station, document.getElementById('r_visibility'));

    // Update min-max temperature
    fetchMinMaxTemp("ST", document.getElementById("r_min_temp"), document.getElementById("r_max_temp"));

    // Initialize the search engine
    regionDropdown();


    // Part 4: Forecast
    fetchForecast();
};

// Function to change style sheet
function toggleTheme() {
    style = document.getElementById("pagestyle").getAttribute("href");
    // Switch to dark mode
    if (style == "style_light.css"){
        document.getElementById("pagestyle").setAttribute("href", "style_dark.css");
        document.getElementById("switch_button").setAttribute("class", "fa fa-moon-o");

        document.querySelectorAll(".f_icon").forEach(fIcon => {
            fIcon.src = fIcon.src.replace("image/", "image/dark_mode/");
        });
    }

    // Switch to light mode
    else if (style == "style_dark.css"){
        document.getElementById("pagestyle").setAttribute("href", "style_light.css");
        document.getElementById("switch_button").setAttribute("class", "fa fa-sun-o");

        document.querySelectorAll(".f_icon").forEach(fIcon => {
            fIcon.src = fIcon.src.replace("image/dark_mode/", "image/");
        });
    }
}

// Function to fetch date and adjust into HK time zone
function fetchDate() {
    const fetch_date = document.getElementById('fetch_date');

    if (fetch_date) {
        const updateDate = () => {
            const now = new Date();
            now.setHours(now.getHours() + 8); 
            const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');
            fetch_date.textContent = formattedDate;};
        updateDate();
    }
}

// Function to fetch "current weather" data
function fetchLocalWeather(iconObj, conditionObj, reportObj) {
    getWeather('local').then(data => {
        let report = data.forecastDesc;
        let weather = determineWeather(report);
        let weatherImage = getWeatherImage(weather);

        if (weatherImage !== "unknown") {
            if (iconObj) iconObj.src = weatherImage; 
            if (conditionObj) conditionObj.innerText = weather;
            if (reportObj) reportObj.innerText = report;
        }
    }).catch(error => {
        console.error("Error fetching local weather data:", error);
    });
}

function fetchRegionalWeather(station, district, humidityObj, uvObj, tempObj, rainfallObj) {
    getRegionalWeather(station, district).then(data => {
        if (humidityObj) humidityObj.innerText = data.humidity + " %";
        if (uvObj) uvObj.innerText = data.uvIndex;
        if (tempObj) tempObj.innerText = data.temperature + " °C";
        if (rainfallObj) rainfallObj.innerText = data.rainfall + " mm";
    }).catch(error => {
        console.error("Error fetching regional weather data:", error);
    });
}

// Extract regional weather condition
async function getRegionalWeather(placeName = "Hong Kong Observatory", district = "Yau Tsim Mong") {
    return getWeather('current').then(data => {
        let humidity = data.humidity?.data?.[0]?.value ?? "-";
        let uvIndex = data.uvindex?.data?.[0]?.value ?? data.uvindex ?? "-";        
        uvIndex = uvIndex === "" ? "-" : uvIndex;
        let temperature = data.temperature.data.find(item => item.place === placeName) || "-";
        let rainfall = data.rainfall.data.find(item => item.place === district) || "-";

        return {
            humidity: humidity,
            uvIndex: uvIndex,
            temperature: temperature.value,
            rainfall: rainfall.max
        };

    }).catch(error => {
        console.error("Error fetching current weather data:", error);
    });
}

function fetchSunriseSunset(sunriseObj,sunsetObj){
    getWeather('sunriseSunset').then(data => {
        let today = date.toISOString().slice(0, 8) + date.getDate();
        const todayData = data.data.find(entry => entry[0] === today);

        if (todayData) {
            sunriseObj.innerText = todayData[1]  || "-";
            sunsetObj.innerText = todayData[3]  || "-";
        }
        else {
            console.log("Data not available for today.");
        }
    }).catch(error => {
        console.error("Error fetching sunrise/sunset data:", error);
    });
}

function fetchMoonriseMoonset(moonriseObj,moonsetObj){
    getWeather('moonriseMoonset').then(data => {
        let today = date.toISOString().slice(0, 8) + date.getDate();
        const todayData = data.data.find(entry => entry[0] === today);

        if (todayData) {
            moonriseObj.innerText = todayData[1]  || "-";
            moonsetObj.innerText = todayData[3] || "-";
        }
        else {
            console.log("Data not available for today.");
        }
    })
    .catch(error => {
        console.error("Error fetching moonrise/moonset data:", error);
    });
}

function fetchVisibility(station = "Central", visibilityObj){
    getVisibility(`${station}`).then(data => {
        visibilityObj.innerText = data.visibility;
    }
    ).catch(error => {
        console.error("Error fetching visibility data:", error);
    });
}

function fetchMinMaxTemp(station = "HKO", minTempObj, maxTempObj){
    getStationData(`${station}`).then(data => {
        maxTempObj.innerText = data.maxTemp + " °C";
        minTempObj.innerText = data.minTemp + " °C";
    }).catch(error => {
        console.error("Error fetching min-max temperature:", error);
    });
}

function fetchRainfall(station = "Sha Tin", rainfallObj){
    getRegionalRainfall(`${station}`).then(data => {
        rainfallObj.innerText = data.rainfall + " mm";
    }).catch(error => {
        console.error("Error fetching regional rainfall data:", error);
    });
}

function fetchWeatherWarning(){
    getWeatherWarning().then(data => {
        const warningList = document.getElementById('warning_list');
        if (warningList) {
            warningList.innerHTML = '';
    
            if (data && data.length > 0) {
                // Iterate through the data array and create unordered list
                data.forEach(item => {
                    const li = document.createElement('li'); 
                    const img = document.createElement('img');
                    img.src = getWarningImage(item.code);
                    img.alt = item.name;
                    img.id = `warn_icon`;
                    img.onclick = () => getWarningDetail(item.code, item.name);                    
                    li.appendChild(img);
                    warningList.appendChild(li);
                    document.getElementById('warn_name').style.display = "none";
                    document.getElementById('warn_statement').style.display = "none";
                });
            } else {
                // If no warnings, display message
                document.getElementById('warn_statement').style.display = "block";
                document.getElementById('warn_statement').innerText = document.documentElement.lang == "tc"? "沒有天氣警告。" : "No weather warning.";
            }
        }
    }).catch(error => {
        console.error("Error fetching weather warning data:", error);
    });
}

// Function to fetch 9-day weather forecast
function fetchForecast(){
    getWeather('forecast').then(data => {
        document.getElementById('forecast_report').innerText = data.generalSituation;
        generateForecastList(data.weatherForecast);

        const lang = document.documentElement.lang;

        fetch("translation.json")
        .then(response => response.json())
        .then(translations => {
            document.querySelectorAll("strong").forEach(item => {
                const key = item.getAttribute("data-i18n");
                if (translations[lang][key]) {
                    item.innerText = translations[lang][key];
                }
            });
        })
        .catch(error => {
            console.error("Error fetching translations:", error);
        });
    }).catch(error => {
        console.error("Error fetching forecast data:", error);
    });
}


function generateForecastList(weatherForecast) {
    // Clear and generate the forecast list
    const lang = document.documentElement.lang;
    const forecastList = document.getElementById("forecast_list");
    forecastList.innerHTML = "";

    weatherForecast.forEach((day, index) => {
        // Create a list item for each forecast day
        const listItem = document.createElement("li");
        listItem.id = `day${index + 1}`;
        listItem.classList.add("forecast_item");

        // Display date
        const forecastDay = day.forecastDate.substring(6);
        const dateObj = new Date(`${day.forecastDate.slice(0, 4)}-${day.forecastDate.slice(4, 6)}-${forecastDay}`);
        const formattedDate =
        lang == "tc"
            ? `${day.week.slice(0, 3)}, ${dateObj.getMonth() + 1}月${dateObj.getDate()}日`
            : `${day.week.slice(0, 3)}, ${forecastDay} ${dateObj.toLocaleString("en-US", { month: "short" })}`;

        let style = document.getElementById("pagestyle").getAttribute("href");
        let imgPath = style == "style_dark.css"? "image/dark_mode/" : "image/";

        listItem.innerHTML = `
            <div class="forecast_summary">
                <span class="f_day">${formattedDate}</span>
                <span class="f_temp_range">
                    <img class="f_icon" src=${getWeatherImage(determineWeather(day.forecastWeather))} alt="Weather Icon">
                    <span class="r_min_temp">${day.forecastMintemp.value}</span> | 
                    <span class="r_max_temp">${day.forecastMaxtemp.value}</span>°C
                </span>
                <img class="f_icon" id="expand_button" src="${imgPath}close.png" alt="Click me to expand">
            </div>
            <div class="forecast_details" style="display: none;">
                <p><strong data-i18n="f_wind">Wind:</strong> ${day.forecastWind}</p>
                <p><strong data-i18n="f_weather">Weather:</strong> ${day.forecastWeather}</p>
                <p><strong data-i18n="f_max_humidity">Max Humidity:</strong> ${day.forecastMaxrh.value}%</p>
                <p><strong data-i18n="f_min_humidity">Min Humidity:</strong> ${day.forecastMinrh.value}%</p>
                <p><strong data-i18n="f_psr">Probability of Significant Rain:</strong> ${day.PSR}</p>
            </div>
        `;

        // Add click event to the expand the details
        const expandButton = listItem.querySelector("#expand_button");
        listItem.addEventListener("click", () => {
        const details = listItem.querySelector(".forecast_details");
        const style = document.getElementById("pagestyle").getAttribute("href");

            // Toggle the visibility of the details
            if (details.style.display === "none") {
                // Collapse all other details
                document.querySelectorAll(".forecast_details").forEach(detail => {
                    detail.style.display = "none";
                });
                
                details.style.display = "block"; // Expand the clicked item
                expandButton.src = style == "style_dark.css" ? "image/dark_mode/open.png" : "image/open.png";
            } else {
                details.style.display = "none"; // Collapse the clicked item
                expandButton.src = style == "style_dark.css" ? "image/dark_mode/close.png" : "image/close.png";
            }
        });

        forecastList.appendChild(listItem);
    });
}

// Determine the weather based on the forecast statement
function determineWeather(forecast){

    const forecastArray = forecast.toLowerCase().split(/\s+/); 
    let isSunny = false, isCloudy = false, isRainny = false, isRainstorm = false;


    if (document.documentElement.lang == "en") {
        for (const word of forecastArray) {
            if (word.includes("sun") || word.includes("hot")){
                isSunny = true;
            } 
            else if (word.includes("cloud") || word.includes("mist")) {
                isCloudy = true;
            }
            else if (word.includes("rainstorm") || word.includes("thunder")) {
                isRainstorm = true;
            }
            else if (word.includes("rain") || word.includes("shower") || word.includes("drizzle")) {
                isRainny = true;
            } 
        }
    }else if (document.documentElement.lang == "tc") {
        for (const word of forecastArray) {
            if (word.includes("陽") || word.includes("熱")){
                isSunny = true;
            } 
            if (word.includes("雲") || word.includes("霧")) {
                isCloudy = true;
            }
            if (word.includes("雷") || word.includes("暴雨")) {
                isRainstorm = true;
            }
            if (word.includes("雨")) {
                isRainny = true;
            } 
        }
    }

    if (isSunny){
        if(isRainny){
            return "Drizzle";
        }else if(isCloudy){
            return "Partly cloudy";
        }
        return "Sunny";
    }
    else if (isRainstorm){
        return "Rainstorm";
    }
    else if (isRainny){
        return "Shower rain";
    }
    else if (isCloudy){
        return "Cloudy";
    }
    return "unknown"; // If no keywords match
}

// Get the weather warning
async function getWeatherWarning() {
    return getWeather('warningSummary').then(data => {

        // Sample data for testing
        // if (document.documentElement.lang == "en") {
        //     data = {
        //         "WFROST": {"name": "Frost Warning", "code": "WFROST", "actionCode": "ISSUE", "issueTime": "2020-09-24T11:15:00+08:00"},
        //         "WHOT": {"name": "Very Hot Weather Warning", "code": "WHOT", "actionCode": "ISSUE", "issueTime": "2020-09-24T07:00:00+08:00"},
        //         "WCOLD": {"name": "Cold Weather Warning", "code": "WCOLD", "actionCode": "ISSUE", "issueTime": "2020-09-24T11:15:00+08:00"},
        //         "WFNTSA": {"name": "Flooding Announcement in Northern New Territories", "code": "WFNTSA", "actionCode": "ISSUE", "issueTime": "2020-09-24T11:40:00+08:00"},
        //         "WMSGNL": {"name": "Strong Monsoon Signal", "code": "WMSGNL", "actionCode": "ISSUE", "issueTime": "2020-09-24T11:15:00+08:00"},
        //         "WL": {"name": "Landslip Warning", "code": "WL", "actionCode": "ISSUE", "issueTime": "2020-09-24T11:15:00+08:00"},
        //         "WRAIN": {"name": "Rainstorm Warning Signal", "code": "WRAINR", "type": "Red", "actionCode": "ISSUE", "issueTime": "2020-09-24T11:15:00+08:00"},
        //         "WTMW": {"name": "Tsunami Warning", "code": "WTMW", "actionCode": "ISSUE", "issueTime": "2020-09-24T11:15:00+08:00"},
        //         "WTS": {"name": "Thunderstorm Warning", "code": "WTS", "actionCode": "EXTEND", "issueTime": "2020-09-24T11:40:00+08:00", "expireTime": "2020-09-24T19:30:00+08:00"},
        //         "WTCSGNL": {"name": "Tropical Cyclone Warning Signal", "code": "TC3", "actionCode": "ISSUE", "type": "Strong Wind Signal No. 3", "issueTime": "2020-09-24T11:15:00+08:00"},
        //         "WFIRE": {"name": "Fire Danger Warning", "code": "WFIRER", "type": "Red", "actionCode": "ISSUE", "issueTime": "2020-09-24T11:15:00+08:00"}
        //     }
        // } else {
        //     data = {
        //         "WFROST": {"name": "霜凍警告", "code": "WFROST", "actionCode": "ISSUE", "issueTime": "2020-09-24T11:15:00+08:00", "updateTime": "2020-09-24T11:15:00+08:00"},
        //         "WHOT": {"name": "酷熱天氣警告", "code": "WHOT", "actionCode": "ISSUE", "issueTime": "2020-09-24T07:00:00+08:00", "updateTime": "2020-09-24T07:00:00+08:00"},
        //         "WCOLD": {"name": "寒冷天氣警告", "code": "WCOLD", "actionCode": "ISSUE", "issueTime": "2020-09-24T11:15:00+08:00", "updateTime": "2020-09-24T11:15:00+08:00"},
        //         "WFNTSA": {"name": "新界北部水浸特別報告", "code": "WFNTSA", "actionCode": "ISSUE", "issueTime": "2020-09-24T11:40:00+08:00", "updateTime": "2020-09-24T11:40:00+08:00"},
        //         "WMSGNL": {"name": "強烈季候風信號", "code": "WMSGNL", "actionCode": "ISSUE", "issueTime": "2020-09-24T11:15:00+08:00", "updateTime": "2020-09-24T11:15:00+08:00"},
        //         "WL": {"name": "山泥傾瀉警告", "code": "WL", "actionCode": "ISSUE", "issueTime": "2020-09-24T11:15:00+08:00", "updateTime": "2020-09-24T11:15:00+08:00"},
        //         "WRAIN": {"name": "暴雨警告信號", "code": "WRAINR", "type": "紅色", "actionCode": "ISSUE", "issueTime": "2020-09-24T11:15:00+08:00", "updateTime": "2020-09-24T11:15:00+08:00"},
        //         "WTMW": {"name": "海嘯警告", "code": "WTMW", "actionCode": "ISSUE", "issueTime": "2020-09-24T11:15:00+08:00", "updateTime": "2020-09-24T11:15:00+08:00"},
        //         "WTS": {"name": "雷暴警告", "code": "WTS", "actionCode": "EXTEND", "issueTime": "2020-09-24T11:40:00+08:00", "expireTime": "2020-09-24T19:30:00+08:00", "updateTime": "2020-09-24T05:00:00+08:00"},
        //         "WTCSGNL": {"name": "熱帶氣旋警告信號", "code": "TC3", "actionCode": "ISSUE", "type": "三號強風信號", "issueTime": "2020-09-24T11:15:00+08:00", "updateTime": "2020-09-24T11:15:00+08:00"},
        //         "WFIRE": {"name": "火災危險警告", "code": "WFIRER", "type": "紅色", "actionCode": "ISSUE", "issueTime": "2020-09-24T11:15:00+08:00", "updateTime": "2020-09-24T11:15:00+08:00"}
        //     }
        // }

        // If there is no any warning
        if (Object.keys(data).length === 0){ 
            return null;
        }

        return Object.values(data).map(({ name, code }) => ({ name, code }));

    }).catch(error => {
        console.error("Error fetching weather warning data:", error);
    }
    );
}

// Get the weather image path
function getWeatherImage(weather){
    let style = document.getElementById("pagestyle").getAttribute("href");
    let imgPath = style == "style_dark.css"? "image/dark_mode/" : "image/";

    const weatherImages = {
        "Sunny": `./${imgPath}weather/sunny.png`,
        "Cloudy": `./${imgPath}weather/cloudy.png`,
        "Shower rain": `./${imgPath}weather/rainny.png`,
        "Rainstorm": `./${imgPath}weather/rainstorm.png`,
        "Partly cloudy": `./${imgPath}weather/sunny_cloudy.png`,
        "Drizzle": `./${imgPath}weather/sunny_rainny.png`,
    };
    return weatherImages[weather] || "unknown";
}

// Get the weather image path
function getWarningImage(warncode){
    const warningImages = {
        "WMSGNL": "./image/warning/cold.png",
        "WFIRER": "./image/warning/firered.png",
        "WFIREY": "./image/warning/fireyellow.png",
        "WFROST": "./image/warning/frost.png",
        "WHOT": "./image/warning/hot.png",
        "WCOLD": "./image/warning/cold.png",
        "WL": "./image/warning/ls.png",
        "WRAINA": "./image/warning/rainamber.png",
        "WRAINR": "./image/warning/rainred.png",
        "WRAINB": "./image/warning/rainblack.png",
        "WMSGNL": "./image/warning/sms.png",
        "TC1": "./image/warning/tc1.png",
        "TC3": "./image/warning/tc3.png",
        "TC8NE": "./image/warning/tc08ne.png",
        "TC8NW": "./image/warning/tc08nw.png",
        "TC8SE": "./image/warning/tc08se.png",
        "TC8SW": "./image/warning/tc08sw.png",
        "TC9": "./image/warning/tc09.png",
        "TC10": "./image/warning/tc10.png",
        "WTS": "./image/warning/ts.png",
        "WTMW": "./image/warning/tsunami.png",
        "WFNTSA": "./image/warning/northflood.png",
    };
    return warningImages[warncode] || console.log("unknown warning code ", warncode);
}

// Function to get warning details
async function getWarningDetail(warncode, warnName) {

    return getWeather('warningInfo').then(data => {
        // Sample data for testing
        // if (document.documentElement.lang == "en") {
        //     data = {
        //         "details": [
        //             {"contents": ["Thunderstorm Warning issued at 11:40 a.m. on 24 Sep 2020 has been extended until 7:30 p.m. today.", "Thunderstorms are expected to occur over Hong Kong.", "Precautions:", "1. Stay indoors.", "2. Keep away from conductive objects, trees, or masts."], "warningStatementCode": "WTS", "updateTime": "2020-09-24T05:00:00+08:00"},
        //             {"contents": ["The Strong Monsoon Signal was issued at 11:15 a.m."], "warningStatementCode": "WMSGNL", "updateTime": "2020-09-24T11:15:00+08:00"},
        //             {"contents": ["Landslip Warning issued at 11:15 a.m."], "warningStatementCode": "WL", "updateTime": "2020-09-24T11:15:00+08:00"},
        //             {"contents": ["The Very Hot Weather Warning has been issued at 07:00.", "The Hong Kong Observatory forecasts hot weather with light winds today.", "Precautions:", "1. Drink plenty of water and avoid overexertion.", "2. If feeling unwell, rest in a cool place.", "3. Ensure adequate indoor ventilation.", "4. Wear loose clothing, hats, and UV-blocking sunglasses.", "5. Use sunscreen SPF 15 or above and reapply frequently.", "6. Check on the elderly or persons with chronic illnesses."], "warningStatementCode": "WHOT", "updateTime": "2020-09-24T07:00:00+08:00"},
        //             {"contents": ["The Cold Weather Warning has been issued at 11:15 a.m.", "Cold weather is expected in Hong Kong.", "Precautions:", "1. Wear warm clothing and ensure indoor ventilation.", "2. Wind chill may lead to hypothermia.", "3. Check on elderly or persons with chronic illnesses.", "4. Beware of icy conditions in Tai Mo Shan.", "5. Ensure heaters are safe and placed away from combustibles.", "6. Avoid lighting fires indoors.", "7. Ensure fresh air when using old gas water heaters."], "warningStatementCode": "WCOLD", "updateTime": "2020-09-24T11:15:00+08:00"}
        //         ]
        //     }
        // } else {
        //     data = {
        //         "details": [
        //             {"contents": ["雷暴警告", "天文台在 9 月 24 日上午 11 時 40 分發出之雷暴警告，有效時間延長至今日下午 7 時 30 分，預料香港有雷暴。", "雷暴發生時，請採取以下預防措施：", "1. 留在室內。在室外的人士應躲入建築物內。", "2. 切勿站立於高地或接近導電的物體、樹木或桅杆。"], "warningStatementCode": "WTS", "updateTime": "2020-09-24T05:00:00+08:00"},
        //             {"contents": ["強烈季候風信號在 11 時 15 分發出。"], "warningStatementCode": "WMSGNL", "updateTime": "2020-09-24T11:15:00+08:00"},
        //             {"contents": ["山泥傾瀉警告：\n\n 天文台在 11:15 發出山泥傾瀉警告。"], "warningStatementCode": "WL", "updateTime": "2020-09-24T11:15:00+08:00"},
        //             {"contents": ["香港天文台在 07 時 00 分發出酷熱天氣警告。", "天文台預料今日本港天氣酷熱，加上風勢輕微，市民應提高警惕，以防中暑。", "在戶外工作或活動的人士，應多喝水和不要過度勞累。於感覺不適時，應盡快到陰涼的地方休息。"], "warningStatementCode": "WHOT", "updateTime": "2020-09-24T07:00:00+08:00"},
        //             {"contents": ["香港天文台在上午 11 時 15 分發出寒冷天氣警告。", "天文台預測本港今明兩日早晚天氣寒冷。"], "warningStatementCode": "WCOLD", "updateTime": "2020-09-24T11:15:00+08:00"},
        //             {"contents": ["天文台提醒農友及有關人士，明日清晨在新界北部可能出現地面霜。"], "warningStatementCode": "WFROST", "updateTime": "2020-09-24T11:15:00+08:00"},
        //             {"contents": ["天文台在上午 11 時 15 分發出紅色暴雨警告信號。"], "subtype": "WRAINR", "warningStatementCode": "WRAIN", "updateTime": "2020-09-24T11:15:00+08:00"},
        //             {"contents": ["香港天文台在 9 月 24 日 11:40 發出之新界北部水浸特別報告。"], "warningStatementCode": "WFNTSA", "updateTime": "2020-09-24T11:40:00+08:00"},
        //             {"contents": ["三號強風信號在上午 11 時 15 分發出。"], "subtype": "TC3", "warningStatementCode": "WTCSGNL", "updateTime": "2020-09-24T11:15:00+08:00"},
        //             {"contents": ["香港天文台宣布預計在今天（9 月 24 日）下午 4 時 07 分或以前發出八號熱帶氣旋警告信號，本港風勢將會加強。"], "warningStatementCode": "WTCPRE8", "updateTime": "2020-09-24T14:10:00+08:00"},
        //             {"contents": ["香港天文台在 2020 年 9 月 24 日上午 11 時 15 分發出海嘯警告。"], "warningStatementCode": "WTMW", "updateTime": "2020-09-24T11:15:00+08:00"},
        //             {"contents": ["現時之火災危險警告為紅色，表示火災危險性極高。"], "warningStatementCode": "WFIRE", "subtype": "WFIRER", "updateTime": "2020-09-24T11:15:00+08:00"}
        //         ]
        //     };    
        // }

        const name = document.getElementById('warn_name');
        const statement = document.getElementById('warn_statement');
        
        name.style.display = "block";
        statement.style.display = "block";

        name.innerText = warnName;
        const warningInfo = data.details.find(item => item.warningStatementCode === warncode);
        const noWarningText = document.documentElement.lang == 'tc'? "關於此警告暫無詳情。": "No details available for this warning."
        statement.innerText = warningInfo ? warningInfo.contents.join(" ") : noWarningText;

    }).catch(error => {
        console.error("Error fetching warning details:", error);
    });
}

async function getRegionalRainfall(placeName = "Sha Tin") {
    return getWeather('rainfallPastHour').then(data => {
        if (!data || !data.hourlyRainfall) {
            throw new Error("Rainfall data is unavailable.");
        }

        const station = data.hourlyRainfall.find(station => station.automaticWeatherStation === placeName);

        if (!station || station.value === undefined) {
            console.log(`No rainfall data found for station: ${placeName}`);
            return { rainfall: "-" };
        }

        return {
            rainfall: station.value
        };
    }).catch(error => {
        console.error("Error fetching regional rainfall data:", error);
        return { rainfall: "-" };
    });
}

async function getVisibility(station = "Central") {
    return getWeather('visibility').then(data => {
        let visibility = data.data.find(entry => entry[1] === station) || "-";

        return {
            visibility: visibility[2] || "-"
        };
    }).catch(error => {
        console.error("Error fetching current weather data:", error);
    });
}

// Function to populate the dropdown list for searching regions
function regionDropdown(){
    const searchInput = document.querySelector('.search_input'); 
    const dropdownList = document.querySelector('.dropdown_list'); 

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        dropdownList.innerHTML = '';

        if (query) {
            // Filter regions based on the query
            const filteredRegions = regions.filter(region =>
                region.station.toLowerCase().includes(query) || region.district.toLowerCase().includes(query) || region.station_tc.includes(query) || region.district_tc.includes(query)
            );

            // Populate the dropdown list
            filteredRegions.forEach(region => {
                const li = document.createElement('li');
                if (document.documentElement.lang == 'tc'){
                    li.textContent = `${region.station_tc} (${region.district_tc})`;
                }else{
                    li.textContent = `${region.station} (${region.district})`;
                }

                li.classList.add('dropdown_item');

                // Populate the search bar with selected region
                li.addEventListener('click', () => {
                    searchInput.value = document.documentElement.lang == 'tc'? region.station_tc:region.station;
                    dropdownList.innerHTML = '';
                });
                dropdownList.appendChild(li);
            });
        }
    });      
}

function searchRegion(){
    const searchInput = document.querySelector('.search_input'); 
    const lang = document.documentElement.lang;

    if (!searchInput.value) {
        console.log("The region field is null.");
        return;
    }

    // Get region json with station name in english or chinese
    const selectedRegion = regions.find(region => region.station === searchInput.value || region.station_tc === searchInput.value);

    searchInput.value = "";

    // Return if no region is found
    if (!selectedRegion){
        searchInput.placeholder = lang == 'tc'? "沒有發現搜索地區。": "No region found.";
        setTimeout(() => {searchInput.placeholder = "Search region";}, 1500);
        return;
    }
    else{
        let station;

        if(lang == 'tc'){
            station = selectedRegion.station_tc;
            document.getElementById('r_region').innerText = selectedRegion.station_tc;
        }else{
            station = selectedRegion.station;
            document.getElementById('r_region').innerText = selectedRegion.station;
        }

        let district = selectedRegion.district;
        document.getElementById('region_image').src = selectedRegion.image_src;
        fetchRainfall(selectedRegion.station , document.getElementById('r_rainfall'));
        fetchRegionalWeather(station, district, document.getElementById('r_humidity'), document.getElementById('r_uv'), document.getElementById('r_temp'), null);
        fetchVisibility(station, document.getElementById('r_visibility'));
        fetchMinMaxTemp(selectedRegion.code, document.getElementById("r_min_temp"), document.getElementById("r_max_temp"));
    }   
}

// Upate website language into Chinese or English
async function loadTranslations(lang) {

    // Set the document language
    document.documentElement.lang = lang;

    // Update static text
    const response = await fetch("translation.json");
    const translations = await response.json();
    document.querySelectorAll("[data-i18n]").forEach(item => {
        const key = item.getAttribute("data-i18n");
        if (translations[lang][key]) {
            item.innerText = translations[lang][key];
        }
    });

    // Refetch data in another language version dataset
    fetchLocalWeather(null,null,document.getElementById('c_report'));

    fetchWeatherWarning();

    const currentRegion = document.getElementById('r_region').innerText;
    let region = regions.find(region => region.station === currentRegion || region.station_tc === currentRegion);
    if (lang == 'tc'){
        document.getElementById('r_region').innerText = region.station_tc;
        document.getElementById('search_input').placeholder = "搜尋分區";
    }else{
        document.getElementById('r_region').innerText = region.station;
        document.getElementById('search_input').placeholder = "Search region";
    }

    fetchForecast();
}


// Fetch data from HK Observatory API
async function getWeather(type) {
    return fetch(`${window.location.origin}/weather/${type}?lang=${document.documentElement.lang}`)
    // return fetch(`https://myweather-f1eb2.web.app/weather/${type}?lang=${document.documentElement.lang}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error("Error:", error);
            document.getElementById("output").innerText = "Failed to load weather data!";
        });
}

async function getStationData(station) {
    
    return fetch(`${window.location.origin}/weather/station-data?station=${station}`)
    // return fetch(`https://myweather-f1eb2.web.app/weather/station-data?station=${station}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const maxTemp = data.data[0]["Maximum Air Temperature Since Midnight(degree Celsius)"];
            const minTemp = data.data[0]["Minimum Air Temperature Since Midnight(degree Celsius)"];
            return {"minTemp":parseFloat(minTemp), "maxTemp":parseFloat(maxTemp)}
            // return {"minTemp":Math.round(parseFloat(minTemp)), "maxTemp":Math.round(parseFloat(maxTemp))}

        })
        .catch(error => {
            console.error("Error:", "Failed to load station data!");
        });
}

async function getUVIndexData() {
    return fetch(`${window.location.origin}/weather/uv-index`)
    // return fetch(`https://myweather-f1eb2.web.app/weather/uv-index`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("output").innerText = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error("Error:", error);
            document.getElementById("output").innerText = "Failed to load UV index data!";
        });
}