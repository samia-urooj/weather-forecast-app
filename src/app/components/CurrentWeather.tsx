import React from 'react';
import { motion } from 'framer-motion';
import { WeatherData } from '../types/weather';
import WeatherIcon from './WeatherIcon';

interface CurrentWeatherProps {
  data: WeatherData;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 mb-8 shadow-2xl border border-white/30"
    >
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <div className="text-center lg:text-left mb-6 lg:mb-0">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-white mb-2"
          >
            {data.name}, {data.sys.country}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="text-blue-100 text-lg capitalize"
          >
            {data.weather[0].description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center lg:justify-start mt-4"
          >
            <WeatherIcon icon={data.weather[0].icon} size="xl" />
            <span className="text-6xl font-bold text-white ml-4">
              {Math.round(data.main.temp)}°C
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 gap-6 text-white"
        >
          <div className="text-center">
            <p className="text-blue-100">Feels like</p>
            <p className="text-2xl font-semibold">{Math.round(data.main.feels_like)}°C</p>
          </div>
          <div className="text-center">
            <p className="text-blue-100">Humidity</p>
            <p className="text-2xl font-semibold">{data.main.humidity}%</p>
          </div>
          <div className="text-center">
            <p className="text-blue-100">Wind</p>
            <p className="text-2xl font-semibold">{data.wind.speed} m/s</p>
          </div>
          <div className="text-center">
            <p className="text-blue-100">Pressure</p>
            <p className="text-2xl font-semibold">{data.main.pressure} hPa</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex justify-center gap-8 mt-6 pt-6 border-t border-white/30"
      >
        <div className="text-center">
          <p className="text-blue-100">Sunrise</p>
          <p className="text-white font-semibold">{formatTime(data.sys.sunrise)}</p>
        </div>
        <div className="text-center">
          <p className="text-blue-100">Sunset</p>
          <p className="text-white font-semibold">{formatTime(data.sys.sunset)}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CurrentWeather;