<script>
  import { onMount } from "svelte";

  let currentWeather = {};
  let dailyWeather = {};
  let time = [];
  let weathercode = [];
  let maxTemp = [];
  let minTemp = [];
  let feelsLikeMax = [];
  let feelsLikeMin = [];
  let sunriseTime = [];
  let sunsetTime = [];
  let totalPrecip = [];
  let loaded = false;
  let loadFail = false
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
    95: "/icons/cloud-bolt.svg",
  };

  const dateFormat = new Intl.DateTimeFormat("en-us", {
    weekday: "long",
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
  const hourFormat = new Intl.DateTimeFormat("en-us", {
    hour: "numeric",
    minute: "numeric",
  });
  const date = new Date();

  onMount(() => {
    navigator.geolocation.getCurrentPosition(positionSuccess, positionError);
    function positionSuccess({ coords }) {
      const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&hourly=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=auto`;

      fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
          currentWeather = data.current_weather;
          dailyWeather = data.daily;
          time = [...dailyWeather.time];
          weathercode = [...dailyWeather.weathercode];
          maxTemp = [...dailyWeather.temperature_2m_max];
          minTemp = [...dailyWeather.temperature_2m_min];
          feelsLikeMax = [...dailyWeather.apparent_temperature_max];
          feelsLikeMin = [...dailyWeather.apparent_temperature_min];
          sunriseTime = [...dailyWeather.sunrise];
          sunsetTime = [...dailyWeather.sunset];
          totalPrecip = [...dailyWeather.precipitation_sum];
          loaded = true;
        });
    }
    function positionError() {
      loadFail = true
    }
  });
</script>

<main>
  <h1 id="header">Weather</h1>
  {#if loaded}
    <div id="current">
      <p id="temp">
        <img id="icons-small" src="/icons/temperature-half-solid.svg" alt="" />
        {currentWeather.temperature}°F
      </p>
      <p id="wind">Windspeed: {currentWeather.windspeed}MPH</p>
      <p id="icon"><img src={icons[currentWeather.weathercode]} alt="" /></p>
      <p id="time">{hourFormat.format(date.setDate(date.getDate()))}</p>
    </div>
    {#each time as day, idx}
      <div id="daily">
        <h4 id="date">
          {dateFormat.format(date.setDate(date.getDate() + idx))}
        </h4>
        <span id="weathercode"
          ><img src={icons[weathercode[idx]]} alt="" /></span
        >
        <span id="high"
          ><img
            id="icons-small"
            src="/icons/temperature-arrow-up-solid.svg"
            alt=""
          />
          {maxTemp[idx]}°F</span
        >
        <span id="low"
          ><img
            id="icons-small"
            src="/icons/temperature-arrow-down-solid.svg"
            alt=""
          />
          {minTemp[idx]}°F</span
        >
        <span id="feelsHigh">Feels like: {feelsLikeMax[idx]}°F</span>
        <span id="feelsLow">Feels like: {feelsLikeMin[idx]}°F</span>
        <span id="rise"
          ><img id="icons-small" src="/icons/sunny.svg" alt="" />
          {hourFormat.format(new Date(sunriseTime[idx]))}</span
        >
        <span id="set"
          ><img id="icons-small" src="/icons/moon-solid.svg" alt="" />
          {hourFormat.format(new Date(sunsetTime[idx]))}</span
        >
        <span id="precip"><img id="icons-small" src="/icons/droplet-solid.svg" alt="" /> {totalPrecip[idx]} in</span>
      </div>
    {/each}
  {/if}
  {#if loadFail}
    <div id="error">Failed to load location</div>
  {/if}
</main>

<style>
  main {
    display: grid;
    width: 75vw;
    justify-content: center;
    align-content: center;
  }
  img {
    height: 64px;
    width: 64px;
  }
  #icons-small {
    height: 24px;
  }
  #header {
    border-bottom: 3px solid #000;
  }
  #current {
    display: grid;
    grid-template-areas:
      "time time time"
      "icon icon icon"
      ". temp ."
      "wind wind wind";
    border: 3px solid #000;
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.5);
    justify-self: center;
  }
  #temp {
    grid-area: temp;
    margin: 0;
  }
  #wind {
    grid-area: wind;
    margin: 0 0 2px 0;
  }
  #icon {
    grid-area: icon;
    margin: 0;
  }
  #time {
    margin: 0;
    grid-area: time;
  }
  #daily {
    border-bottom: 3px solid #000;
    display: grid;
    grid-template-areas:
      "date date date"
      "code high fhigh"
      "code low flow"
      "code rise set"
      ". precip precip";
    align-items: center;
    justify-items: start;
  }
  #date {
    grid-area: date;
    justify-self: center;
  }
  #weathercode {
    grid-area: code;
  }
  #high {
    grid-area: high;
    margin-bottom: 5px;
  }
  #low {
    grid-area: low;
    margin-bottom: 5px;
  }
  #feelsHigh {
    grid-area: fhigh;
    margin-bottom: 5px;
  }
  #feelsLow {
    grid-area: flow;
    margin-bottom: 5px;
  }
  #rise {
    grid-area: rise;
    margin-bottom: 5px;
  }
  #set {
    grid-area: set;
    margin-bottom: 5px;
  }
  #precip{
    grid-area: precip;
  }
  #error{
    color: rgb(128, 2, 2);
  }
</style>
