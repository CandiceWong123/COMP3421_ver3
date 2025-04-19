let lang = document.documentElement.lang;
lang = "tc"; 

function getWeather(type) {
    fetch(`http://localhost:3000/weather/${type}?lang=${lang}`)
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
            document.getElementById("output").innerText = "Failed to load weather data!";
        });
}

function getStationData() {
    const station = document.getElementById("stationSelector").value;
    
    fetch(`http://localhost:3000/weather/station-data?station=${station}`)
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
            document.getElementById("output").innerText = "Failed to load station data!";
        });
}

function getUVIndexData() {
    fetch(`http://localhost:3000/weather/uv-index`)
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