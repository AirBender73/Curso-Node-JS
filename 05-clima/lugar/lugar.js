const axios = require('axios');

const getLugarLatLng = async (dir) => {

    const encodeULR = encodeURI(dir);

    const instance = axios.create({
        baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encodeULR}`,
        headers: { 'X-RapidAPI-Key': 'd17babfc46msh1f1838e5db465a3p135cefjsn060b65ce763e' }
    });

    const res = await instance.get();

    if (res.data.Results.length === 0) {
        throw new Error(`No hay resultados para ${dir}`);
    }

    const data = res.data.Results[0];
    const direccion = data.name;
    const lat = data.lat;
    const lng = data.lon;

    return {
        direccion,
        lat,
        lng
    }
}

module.exports = {
    getLugarLatLng
}