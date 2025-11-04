const API_KEY = 'your_api_key';

export const getCurrentWeather = async (city) =>
  (await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)).json();

export const getHistoricalWeather = async (lat, lon, dt) =>
  (await fetch(`https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${dt}&appid=${API_KEY}`)).json();