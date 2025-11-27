import React from 'react';
import { motion } from 'framer-motion';
import { ForecastData } from '../types/weather';
import WeatherIcon from './WeatherIcon';

interface ForecastProps {
  data: ForecastData;
}

const Forecast: React.FC<ForecastProps> = ({ data }) => {
  // Group forecast by day and get one reading per day
  const dailyForecasts = data.list.filter((item, index) => index % 8 === 0).slice(0, 5);

  const getDayName = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30"
    >
      <h3 className="text-2xl font-bold text-white mb-6 text-center">5-Day Forecast</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {dailyForecasts.map((day, index) => (
          <motion.div
            key={day.dt}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 rounded-2xl p-4 text-center backdrop-blur-sm border border-white/20"
          >
            <p className="text-white font-semibold mb-2">
              {index === 0 ? 'Today' : getDayName(day.dt_txt)}
            </p>
            <WeatherIcon icon={day.weather[0].icon} size="lg" className="mx-auto my-2" />
            <div className="flex justify-center gap-2 mt-2">
              <span className="text-white font-bold text-lg">
                {Math.round(day.main.temp_max)}°
              </span>
              <span className="text-blue-100 text-lg">
                {Math.round(day.main.temp_min)}°
              </span>
            </div>
            <p className="text-blue-100 text-sm mt-2 capitalize">
              {day.weather[0].description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Forecast;