<script>
  import { onMount } from "svelte";

  let currentWeather = {};
  let dailyWeather = {};
  let feelsLikeMax = [];
  let loaded = false;
  let time

  onMount(() => {
    navigator.geolocation.getCurrentPosition(positionSuccess, positionError);
    function positionSuccess({ coords }) {
      const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&hourly=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=auto`;

      fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
          currentWeather = data.current_weather;
          dailyWeather = data.daily;
          console.log(dailyWeather)
          feelsLikeMax = [...dailyWeather.apparent_temperature_max];
          time = [...dailyWeather.time]
          loaded = true
        });
    }
    function positionError() {}
  });
</script>

<main>
  <h1>Weather</h1>
  {#if loaded}
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
    {#each time as t}
      <p>{new Date(t)}</p>
    {/each}
  {/if}
</main>

<style>
</style>
