import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const WeatherChart = ({ data }) => {
  const labels = data.map((_, i) => `Day -${i + 1}`);
  const temps = data.map(d => d.current.temp - 273.15);

  return (
    <Line data={{
      labels,
      datasets: [{ label: 'Temp (°C)', data: temps, borderColor: 'blue' }]
    }} />
  );
};

export default WeatherChart;
