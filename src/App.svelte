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
          console.log(typeof dailyWeather)
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
  <div id="current">

    <p>Temp: {currentWeather.temperature}</p>
    <p>Wind: {currentWeather.windspeed}</p>
    <p>Code: {currentWeather.weathercode}</p>
    <p>Date: {new Date().toDateString()}</p>
  </div>
  <hr />
  {/if}
</main>

<style>
  #current{
    display: flex;
    flex-direction: row;
  }
</style>
