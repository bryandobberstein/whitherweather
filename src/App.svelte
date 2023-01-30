<script>
  import { onMount } from "svelte";

  let currentWeather = {};
  let dailyWeather = {};
  let time = []
  let weathercode = []
  let maxTemp = []
  let minTemp = []
  let feelsLikeMax = [];
  let feelsLikeMin = []
  let sunriseTime = []
  let sunsetTime = []
  let totalPrecip = []
  let loaded = false;
  const dateFormat = new Intl.DateTimeFormat('en-us', {
    weekday: "long",
    month: "2-digit",
    day: "2-digit",
    year: "numeric"
  })
  const date = new Date()

  onMount(() => {
    navigator.geolocation.getCurrentPosition(positionSuccess, positionError);
    function positionSuccess({ coords }) {
      const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&hourly=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=auto`;

      fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
          currentWeather = data.current_weather;
          dailyWeather = data.daily
          time = [...dailyWeather.time]
          weathercode = [...dailyWeather.weathercode]
          maxTemp = [...dailyWeather.temperature_2m_max]
          minTemp = [...dailyWeather.temperature_2m_min]
          feelsLikeMax = [...dailyWeather.apparent_temperature_max];
          feelsLikeMin = [...dailyWeather.apparent_temperature_min]
          sunriseTime = [...dailyWeather.sunrise]
          sunsetTime = [...dailyWeather.sunset]
          totalPrecip = [...dailyWeather.precipitation_sum]
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
  <div id="daily">
    {#each time as day, idx }
    <div class="day">
      <h4>{dateFormat.format(date.setDate(date.getDate() + idx))}</h4>
      <p>Weathercode: {weathercode[idx]}</p>
      <p>High: {maxTemp[idx]}</p>
      <p>Low: {minTemp[idx]}</p>
      <p>FeelsHigh{feelsLikeMax[idx]}</p>
      <p>FeelsLow{feelsLikeMin[idx]}</p>
      <p>Rise:{sunriseTime[idx]}</p>
      <p>Set: {sunsetTime[idx]}</p>
      <p>Precip: {totalPrecip[idx]}</p>
      <hr>
    </div>
      
    {/each}
  </div>
  {/if}
</main>

<style>
  #current{
    display: flex;
    flex-direction: row;
  }
</style>
