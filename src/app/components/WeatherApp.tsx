'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weatherApi } from '../utils/weatherApi';
import { CombinedWeatherData } from '../types/weather';
import WeatherIcon from './WeatherIcon';
import SearchBar from './SearchBar';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';
import LoadingSpinner from './LoadingSpinner';

const WeatherApp: React.FC = () => {
  const [weatherData, setWeatherData] = useState<CombinedWeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchWeather = async (city: string) => {
    if (!city.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await weatherApi.getWeatherData(city);
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load default city on initial render
    searchWeather('London');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <motion.h1
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-5xl font-bold text-white mb-4"
          >
            🌤️ Weather Forecast
          </motion.h1>
          <p className="text-blue-100 text-lg">Get real-time weather updates for any city</p>
        </div>

        <SearchBar onSearch={searchWeather} loading={loading} />

        <AnimatePresence mode="wait">
          {loading && <LoadingSpinner />}
          
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-red-500 text-white p-4 rounded-lg shadow-lg text-center mb-6"
            >
              {error}
            </motion.div>
          )}

          {weatherData && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <CurrentWeather data={weatherData.current} />
              <Forecast data={weatherData.forecast} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default WeatherApp;