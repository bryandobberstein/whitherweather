<script>
  import { onMount } from "svelte";
  import { time_ranges_to_array } from "svelte/internal";

  let currentWeather = {}
  let dailyWeather = {}
  let feelsLikeMax = []

  onMount(() => {
    navigator.geolocation.getCurrentPosition(positionSuccess, positionError);
    function positionSuccess({ coords }) {
      const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${
        coords.latitude
      }&longitude=${
        coords.longitude
      }&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=auto`;

      fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.current_weather);
          console.log(data.daily);
          currentWeather = data.current_weather
          dailyWeather = data.daily
          feelsLikeMax = [...dailyWeather.apparent_temperature_max]
        });
    }
    function positionError() {}
  });
</script>

<main>
  <h1>Weather</h1>
  <p>Temp: {currentWeather.temperature}</p>
  <p>Wind: {currentWeather.windspeed}</p>
  <p>Code: {currentWeather.weathercode}</p>
  <p>Time: {new Date().toLocaleString()}</p>
  <hr />
  <p>Apparent Max: {dailyWeather.apparent_temperature_max}</p>
  <p>Apparent Min: {dailyWeather.apparent_temperature_min}</p>
  <p>Precip: {dailyWeather.precipitation_sum}</p>
  <p>Max: {dailyWeather.temperature_2m_max}</p>
  <p>Max: {dailyWeather.temperature_2m_min}</p>
  <p>Code: {dailyWeather.weathercode}</p>
  {#each feelsLikeMax as feelMax}
    <p>{feelMax}</p>
  {/each}
  
  
</main>

<style>
</style>
