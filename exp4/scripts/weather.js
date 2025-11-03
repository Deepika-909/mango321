const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // replace in execution
const chartCtx = document.getElementById('chart').getContext('2d');
let myChart = null;

const fetchWeather = async (city) => {
  try {
    // Use metric units to get Celsius directly
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    // Take 5 time-points for quick graph
    const slice = data.list.slice(0,5);
    const labels = slice.map(i => i.dt_txt.split(' ')[1]); // time part
    const temps  = slice.map(i => i.main.temp);
    return {labels, temps};
  } catch(e) { console.error('Weather fetch error', e); return null; }
};

const render = ({labels, temps}) => {
  if (myChart) myChart.destroy();
  myChart = new Chart(chartCtx, {
    type: 'line',
    data: { labels, datasets: [{ label: 'Temp (°C)', data: temps, fill:false }]},
    options: { responsive: true }
  });
};

// wire UI
document.getElementById('go').addEventListener('click', async () => {
  const city = document.getElementById('city').value;
  const d = await fetchWeather(city);
  if (d) render(d);
});

