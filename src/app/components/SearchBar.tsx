import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SearchBarProps {
  onSearch: (city: string) => void;
  loading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, loading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(city);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      onSubmit={handleSubmit}
      className="mb-8"
    >
      <div className="flex gap-4">
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="text"
          value={city}
          onChange={(e:any) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="flex-1 px-6 py-4 rounded-full bg-white/20 backdrop-blur-lg border border-white/30 text-white placeholder-blue-100 focus:outline-none focus:ring-4 focus:ring-white/30 text-lg shadow-2xl"
          disabled={loading}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading}
          className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg shadow-2xl hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Searching...' : 'Search'}
        </motion.button>
      </div>
    </motion.form>
  );
};

export default SearchBar;