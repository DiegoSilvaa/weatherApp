// src/components/HourlyChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { ForecastItem } from '../types/WeatherTypes';
import { format } from 'date-fns';
import type { ChartOptions } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface HourlyChartProps {
  data: ForecastItem[];
}

const HourlyChart: React.FC<HourlyChartProps> = ({ data }) => {
  const today = new Date().getDate();

  const hourlyData = data.filter((item) => new Date(item.dt * 1000).getDate() === today);

  const chartData = {
    labels: hourlyData.map((item) => format(new Date(item.dt * 1000), 'HH:mm')),
    datasets: [
      {
        label: 'Temperatura (°C)',
        data: hourlyData.map((item) => item.main.temp),
        fill: false,
        tension: 0.4,
        borderWidth: 2,
      },
    ],
  };

const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
  },
  scales: {
    y: {
      ticks: {
        callback: function (value) {
          return `${value}°`;
        },
      },
    },
  },
};

  return (
    <div className="card shadow p-4 rounded-4 mb-4">
      <h4 className="mb-3">Temperatura por horas (hoy)</h4>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default HourlyChart;
