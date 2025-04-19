const express = require('express');
const cors = require('cors');
const axios = require('axios');
const csv = require('csv-parser'); 
const { Readable } = require('stream');
const path = require('path'); // Add this line


const cool = require('cool-ascii-faces');



const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.get('/cool', (req, res) => {
    console.log(`Rendering a cool ascii face for route '/cool'`)
    res.send(cool())
  })



const PORT = process.env.PORT || 3000

app.use(cors());

const API_BASE_URL = 'https://data.weather.gov.hk/weatherAPI/opendata/weather.php';
const CLIMATE_API_URL = 'https://data.weather.gov.hk/weatherAPI/opendata/opendata.php';
const RAINFALL_API_URL = 'https://data.weather.gov.hk/weatherAPI/opendata/hourlyRainfall.php';
// Min-max temperature CSV API URL
const CSV_API_BASE_URL = 'https://data.weather.gov.hk/weatherAPI/hko_data/csdi/dataset/';
const UV_CSV_URL = `${CSV_API_BASE_URL}latest_15min_uvindex_csdi_0.csv`;

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const yesterdayFormatted = yesterday.toISOString().split('T')[0].replace(/-/g, '');


const STATIONS = {
    'CLK': { index: 0, name: 'Chek Lap Kok' },
    'CCH': { index: 1, name: 'Cheung Chau' },
    'CWB': { index: 2, name: 'Clear Water Bay' },
    'HVY': { index: 3, name: 'Happy Valley' },
    'HKO': { index: 4, name: 'Hong Kong Observatory' },
    'HKP': { index: 5, name: 'Hong Kong Park' },
    'KTR': { index: 6, name: 'Kai Tak Runway Park' },
    'KSC': { index: 7, name: 'Kau Sai Chau' },
    'KP': { index: 8, name: 'King\'s Park' },
    'KLT': { index: 9, name: 'Kowloon City' },
    'KWT': { index: 10, name: 'Kwun Tong' },
    'LFS': { index: 11, name: 'Lau Fau Shan' },
    'NP': { index: 12, name: 'Ngong Ping' },
    'PTC': { index: 13, name: 'Pak Tam Chung' },
    'PEN': { index: 14, name: 'Peng Chau' },
    'SKG': { index: 15, name: 'Sai Kung' },
    'SHA': { index: 16, name: 'Sha Tin' },
    'SSP': { index: 17, name: 'Sham Shui Po' },
    'SKW': { index: 18, name: 'Shau Kei Wan' },
    'SEK': { index: 19, name: 'Shek Kong' },
    'SSH': { index: 20, name: 'Sheung Shui' },
    'STY': { index: 21, name: 'Stanley' },
    'TKL': { index: 22, name: 'Ta Kwu Ling' },
    'TLG': { index: 23, name: 'Tai Lung' },
    'TMT': { index: 24, name: 'Tai Mei Tuk' },
    'TMS': { index: 25, name: 'Tai Mo Shan' },
    'TPO': { index: 26, name: 'Tai Po' },
    'TC': { index: 27, name: 'Tate\'s Cairn' },
    'TPK': { index: 28, name: 'The Peak' },
    'JKB': { index: 29, name: 'Tseung Kwan O' },
    'TYW': { index: 30, name: 'Tsing Yi' },
    'TWH': { index: 31, name: 'Tsuen Wan Ho Koon' },
    'TWN': { index: 32, name: 'Tsuen Wan Shing Mun Valley' },
    'TUN': { index: 33, name: 'Tuen Mun' },
    'WGL': { index: 34, name: 'Waglan Island' },
    'WLP': { index: 35, name: 'Wetland Park' },
    'HKS': { index: 36, name: 'Wong Chuk Hang' },
    'WTS': { index: 37, name: 'Wong Tai Sin' },
    'YLP': { index: 38, name: 'Yuen Long Park' }
};

const DEFAULT_STATION = 'HKO'; 

const datasets = {
    forecast: { type: 'fnd' },
    current: { type: 'rhrread' },
    local: { type: 'flw' },
    warningInfo: { type: 'warningInfo' },
    warningSummary: { type: 'warnsum' },
    specialTips: { type: 'swt' },
    sunriseSunset: { type: 'SRS', params: { year: currentYear, month: currentMonth, lang: 'en', rformat: 'json' } }, 
    moonriseMoonset: { type: 'MRS', params: { year: currentYear, month: currentMonth, lang: 'en', rformat: 'json' } },
    visibility: { type: 'LTMV', params: { lang: 'en', rformat: 'json' } },
    dailyMeanTemp: { type: 'CLMTEMP', params: { year: currentYear, lang: 'en', rformat: 'json' } },
    dailyMaxTemp: { type: 'CLMMAXT', params: { year: currentYear, lang: 'en', rformat: 'json' } },
    dailyMinTemp: { type: 'CLMMINT', params: { year: currentYear, lang: 'en', rformat: 'json' } },
    radiationReport: { type: 'RYES', params: { date: yesterdayFormatted, lang: 'en', rformat: 'json' } },
    rainfallPastHour: { params: { lang: 'en' } } 
};

const fetchWeatherData = async (lang = 'en', dataset, isClimateData, extraParams = {}, isRainfallData = false) => {
    try {
        // decide which API to use
        const baseUrl = isRainfallData ? RAINFALL_API_URL : (isClimateData ? CLIMATE_API_URL : API_BASE_URL);
        
        const queryParams = new URLSearchParams({ lang: lang, rformat: 'json', ...(dataset ? { dataType: dataset } : {}), ...extraParams }).toString();
        const url = `${baseUrl}?${queryParams}`;

        console.log(`Fetching data from: ${url}`); 
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return { error: 'Failed to fetch data' };
    }
};

// fetch and parse CSV data
const fetchCSVData = async (url) => {
    try {
        console.log(`Fetching CSV data from: ${url}`);
        
        const response = await axios.get(url, { responseType: 'text' });
        const csvData = response.data;
        
        const results = [];
        return new Promise((resolve, reject) => {
            Readable.from(csvData)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', () => {
                    resolve(results);
                })
                .on('error', (error) => {
                    reject(error);
                });
        });
    } catch (error) {
        console.error('Error fetching or parsing CSV data:', error);
        return { error: 'Failed to fetch or parse CSV data' };
    }
};

// fetch and parse CSV data (for Min-max temperature CSV API URL)
const fetchStationCSVData = async (stationIndex) => {
    const url = `${CSV_API_BASE_URL}latest_since_midnight_maxmin_csdi_${stationIndex}.csv`;
    return fetchCSVData(url);
};

// endpoint for UV index data
app.get('/weather/uv-index', async (req, res) => {
    try {
        const uvData = await fetchCSVData(UV_CSV_URL);
        res.json({
            type: "UV Index",
            data: uvData
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error fetching UV index data',
            message: error.message
        });
    }
});

// endpoint for CSV-based station data
app.get('/weather/station-data', async (req, res) => {
    const station = req.query.station && STATIONS[req.query.station] ? 
        req.query.station : DEFAULT_STATION;
    
    try {
        const csvData = await fetchStationCSVData(STATIONS[station].index);
        res.json({
            station: station,
            stationName: STATIONS[station].name,
            data: csvData
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error fetching station data',
            message: error.message
        });
    }
});

// endpoints
app.get('/weather/:type', async (req, res) => {
    const type = req.params.type;
    const lang = req.query.lang || 'en';

    const station = req.query.station && STATIONS[req.query.station] ? 
        req.query.station : DEFAULT_STATION;
    
    if (datasets[type]) {
        const isClimateData = ['sunriseSunset', 'moonriseMoonset', 'visibility', 'dailyMeanTemp', 'dailyMaxTemp', 'dailyMinTemp', 'radiationReport'].includes(type);
        const isRainfallData = type === 'rainfallPastHour';
        
        const extraParams = { ...datasets[type].params, station };
        
        const data = await fetchWeatherData(lang, datasets[type].type, isClimateData, extraParams, isRainfallData);
        res.json(data);
    } else {
        res.status(400).json({ error: 'Invalid dataset type' });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
