const KEY = "a6521695adf4c8970b1b14cbee64aadc";
const ctx = document.getElementById("chart").getContext("2d");
let chart;

async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${KEY}`;
  const r = await fetch(url);
  const d = await r.json();
  if (!r.ok) return alert(d.message), null;

  const s = d.list.slice(0, 5);
  return {
    labels: s.map(i => i.dt_txt.split(" ")[1]),
    temps: s.map(i => i.main.temp)
  };
}

function render({ labels, temps }) {
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: "line",
    data: { labels, datasets: [{ label: "Temp", data: temps }] }
  });
}

document.getElementById("go").onclick = async () => {
  const d = await fetchWeather(document.getElementById("city").value);
  if (d) render(d);
};
