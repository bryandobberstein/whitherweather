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
  const icons = {
    0: "/icons/sunny.svg",
    1: "/icons/cloud-sun.svg",
    2: "/icons/cloud-sun.svg",
    3: "/icons/cloud.svg",
    45: "/icons/smog.svg",
    48: "/icons/smog.svg",
    51: "/icons/cloud-rain-solid.svg",
    53: "/icons/cloud-rain-solid.svg",
    55: "/icons/cloud-rain-solid.svg",
    56: "/icons/cloud-rain-solid.svg",
    57: "/icons/cloud-rain-solid.svg",
    61: "/icons/cloud-rain-solid.svg",
    63: "/icons/cloud-rain-solid.svg",
    65: "/icons/cloud-showers-heavy.svg",
    66: "/icons/cloud-rain-solid.svg",
    67: "/icons/cloud-showers-heavy.svg",
    71: "/icons/snowflake.svg",
    73: "/icons/snowflake.svg",
    75: "/icons/snowflake.svg",
    77: "/icons/snowflake.svg",
    80: "/icons/cloud-rain-solid.svg",
    81: "/icons/cloud-showers-heavy.svg",
    82: "/icons/cloud-bolt.svg",
    85: "/icons/snowflake.svg",
    86: "/icons/snowflake.svg",
    95: "/icons/cloud-bolt.svg"
  }

  const dateFormat = new Intl.DateTimeFormat('en-us', {
    weekday: "long",
    month: "2-digit",
    day: "2-digit",
    year: "numeric"
  })
  const hourFormat = new Intl.DateTimeFormat('en-us', {
    hour: "numeric",
    minute: "numeric"
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
  <h1 id="header">Weather</h1>
  {#if loaded}
  <div id="current">
    <h2 id="currcon">Current</h2>
    <p id="temp">{currentWeather.temperature}°F</p>
    <p id="wind">Windspeed: {currentWeather.windspeed}MPH</p>
    <p id="icon"><img src="{icons[currentWeather.weathercode]}" alt=""></p>
    <p id="todaysDate">Date: {new Date().toDateString()}</p>
  </div>
  {#each time as day, idx }
  <div id="daily">
      <h4 id="date">{dateFormat.format(date.setDate(date.getDate() + idx))}</h4>
      <span id="weathercode"><img src="{icons[weathercode[idx]]}" alt=""></span>
      <span id="high"><img id="icons-small" src="/icons/temperature-high-solid.svg" alt=""> {maxTemp[idx]}</span>
      <span id="low"><img id="icons-small" src="/icons/temperature-low-solid.svg" alt=""> {minTemp[idx]}</span>
      <span id="feelsHigh">Feels like: {feelsLikeMax[idx]}</span>
      <span id="feelsLow">Feels like: {feelsLikeMin[idx]}</span>
      <span id="rise"><img id="icons-small" src="/icons/sunny.svg" alt=""> {hourFormat.format(new Date(sunriseTime[idx]))}</span>
      <span id="set"><img id="icons-small" src="/icons/moon-solid.svg" alt=""> {hourFormat.format(new Date(sunsetTime[idx]))}</span>
      <span id="precip">Precip: {totalPrecip[idx]}</span>
    </div>
    {/each}
  {/if}
</main>

<style>
  main {
    display: grid;
    width: 75vw;
    justify-content: center;
  }
  img {
    height: 64px;
    width: 64px;
  }
  #icons-small{
    height: 24px;
  }
  #header{
    border-bottom: 3px solid #9c8363;
  }
  #current{
    display: grid;
    grid-template-areas: ". head ."
                          "tdate tdate tdate"
                          "icon temp wind";
    border-bottom: 3px solid #9c8363;
  }
  #currcon{
    grid-area: head;
  }
  #temp {
    grid-area: temp;
  }
  #wind{
    grid-area: wind;
  }
  #icon{
    grid-area: icon;
  }
  #todaysDate{
    grid-area: tdate;
  }
  #daily {
    border-bottom: 3px solid #9c8363;
    display: grid;
    grid-template-areas: "date date date"
                          "code high low"
                          "code fhigh flow"
                          "code rise set";
  }
  #date{
    grid-area: date;
  }
  #weathercode {
    grid-area: code;
  }
  #high {
    grid-area: high;
  }
  #low {
    grid-area: low;
  }
  #feelsHigh {
    grid-area: fhigh;
  }
  #feelsLow {
    grid-area: flow;
  }
  #rise {
    grid-area: rise;
  }
  #set {
    grid-area: set;
  }
</style>
