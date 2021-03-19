import { weatherService } from "./common/base";


export function getWeatherByCity(city: string) {
    return weatherService.getBySimpleQuery("weather_mini", {
        city
    });
}

export default {
    getWeatherByCity
};
