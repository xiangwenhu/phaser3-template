/* eslint-disable no-undef */

const CONFIG = {
    API_SERVER: process.env.API_SERVER,
    API_SERVER_WEATHER: process.env.API_SERVER_WEATHER
};

export default function getConfig() {
    return CONFIG;
}
