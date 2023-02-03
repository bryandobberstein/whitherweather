<script>
  export let currentWeather;
  
  const [temperature, time, weathercode, winddirection, windspeed] =
    currentWeather;

  const hourFormat = new Intl.DateTimeFormat("en-us", {
    hour: "numeric",
    minute: "numeric",
  });
</script>

<div class="current-weather">
  <span class="temperature">{temperature}</span>
  <span class="time">{hourFormat.format(time * 1000)}</span>
  <span class="wind-direction">{winddirection}</span>
  <span class="windspeed">{windspeed}</span>
</div>
