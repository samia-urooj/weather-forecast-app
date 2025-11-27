import React from 'react';

interface WeatherIconProps {
  icon: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ icon, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <img
      src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
      alt="Weather icon"
      className={`${sizeClasses[size]} ${className}`}
    />
  );
};

export default WeatherIcon;