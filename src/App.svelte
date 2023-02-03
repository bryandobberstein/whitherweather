<script>
  import { onMount } from "svelte";
  import Current from "./Current.svelte";
  import Daily from "./Daily.svelte";

  let currentWeather = {};
  let hourlyWeather= {}
  let time
  let weathercode
  let temperature_2m_max
  let temperature_2m_min
  let apparent_temperature_max
  let apparent_temperature_min
  let sunrise
  let sunset
  let precipitation_sum
  let loaded = false;
  let loadFail = false;
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
      const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&hourly=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=auto`;

      fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
          currentWeather = data.current_weather;
          console.log(data.daily)
          time = data.daily.time
          weathercode = data.daily.weathercode
          temperature_2m_max = data.daily.temperature_2m_max
          temperature_2m_min = data.daily.temperature_2m_min
          apparent_temperature_max = data.daily.apparent_temperature_max
          apparent_temperature_min = data.daily.apparent_temperature_min
          sunrise = data.daily.sunrise
          sunset = data.daily.sunset
          precipitation_sum = data.daily.precipitation_sum
          hourlyWeather = data.hourly
          loaded = true;
        });
    }
    function positionError() {
      loadFail = true;
    }
  });
</script>

<main>
  <p id="header">Weather</p>
  {#if loaded}
    <div id="current">
      <Current currentWeather = {currentWeather} />
    </div>
    <div id="daily">
      {#each Array(6) as _, idx}
        <Daily 
        time={time[idx]}
        weathercode={weathercode[idx]}
        temperature_2m_max={temperature_2m_max[idx]}
        temperature_2m_min={temperature_2m_min[idx]}
        apparent_temperature_max={apparent_temperature_max[idx]}
        apparent_temperature_min={apparent_temperature_min[idx]}
        sunrise={sunrise[idx]}
        sunset={sunset[idx]}
        precipitation_sum={precipitation_sum[idx]}/>
      {/each}
    </div>
  {/if}
  {#if loadFail}
    <div id="error">Failed to load location</div>
  {/if}
</main>

<style>
  main {
    display: grid;
    width: 95vw;
    justify-content: center;
    align-content: center;
  }
  #header {
    border-bottom: 3px solid #000;
  }
  #current {    
    border: 3px solid #000;
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.5);
    justify-self: center;
  }
  #daily {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }
  #error {
    color: rgb(128, 2, 2);
  }
</style>
