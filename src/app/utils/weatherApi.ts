import axios from 'axios';
import { WeatherData, ForecastData, CombinedWeatherData } from '../types/weather';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const weatherApi = {
  async getWeatherData(city: string): Promise<CombinedWeatherData> {
    try {
      const [currentResponse, forecastResponse] = await Promise.all([
        axios.get<WeatherData>(`${BASE_URL}/weather`, {
          params: {
            q: city,
            appid: API_KEY,
            units: 'metric',
          },
        }),
        axios.get<ForecastData>(`${BASE_URL}/forecast`, {
          params: {
            q: city,
            appid: API_KEY,
            units: 'metric',
          },
        }),
      ]);

      return {
        current: currentResponse.data,
        forecast: forecastResponse.data,
      };
    } catch (error) {
      console.error("API Error:", error);
      throw new Error('City not found. Please try again.');
    }
  },
};