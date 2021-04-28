import { getWeatherByCity } from "../services/weather";

 (async () => {
    try {
      const res = await getWeatherByCity("北京");

      console.log("天气预报", res);
    } catch (err) {
      console.log(err);
    }
  })();
