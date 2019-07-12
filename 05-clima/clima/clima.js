const axios = require('axios');


const getClima = async (lat, lng) => {
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=0082a0f9f63886311b6d9fe1510372a4&units=metric`);

    return res.data.main.temp;
}

module.exports = {
    getClima
}