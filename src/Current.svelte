<script>
  import icons from "./stores/icon";
  import altIcon from "./stores/altIcon"

  export let currentWeather;
  
  const {temperature, weathercode, windspeed} =
    currentWeather;

  const hourFormat = new Intl.DateTimeFormat("en-us", {
    hour: "numeric",
    minute: "numeric",
  });
  
</script>
<!-- TODO: Store for alt on weather icon -->
<div class="current-weather">
  <p class="icon"><img src={$icons[weathercode]} alt={altIcon[weathercode]}></p>
  <p class="temperature">{temperature}°F</p>
  <p class="time">{hourFormat.format(new Date())}</p>
  <p class="windspeed">Wind: {windspeed} MPH</p>
</div>

<style>
  img {
    height: 80px;
  }
  .current-weather{
    width: 18em;
    display: grid;
    grid-template-areas:
      "time time time"
      "icon icon icon"
      "temp . wind";
  }
  .icon{
    grid-area: icon;
  }
  .temperature {
    grid-area: temp;
  }
  .time {
    grid-area: time;
  }
  .windspeed {
    grid-area: wind;
  }
</style>