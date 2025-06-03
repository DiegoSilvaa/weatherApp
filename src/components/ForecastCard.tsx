import React from 'react';

interface ForecastCardProps {
  date: string;
  min: number;
  max: number;
  icon: string;
  description: string;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ date, min, max, icon, description }) => {
  return (
    <div className="card text-center p-3 shadow-sm rounded-4">
      <h6 className="text-muted">{date}</h6>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
        style={{ width: '60px', height: '60px' }}
      />
      <p className="mb-1">{description}</p>
      <p className="fw-bold">
        {Math.round(min)}° / {Math.round(max)}°
      </p>
    </div>
  );
};

export default ForecastCard;
