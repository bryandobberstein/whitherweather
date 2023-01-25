<script>
  import { onMount } from "svelte";
  onMount(() => {
    navigator.geolocation.getCurrentPosition(positionSuccess, positionError);
    function positionSuccess({ coords }) {
      const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${
        coords.latitude
      }&longitude=${
        coords.longitude
      }&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=${
        Intl.DateTimeFormat().resolvedOptions().timeZone
      }`;

      fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.current_weather);
          console.log(data.daily);
        });
    }
    function positionError() {}
  });
</script>

<main>
  <h1>Weather</h1>
</main>

<style>
</style>
