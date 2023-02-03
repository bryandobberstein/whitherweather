<script>
  import icons from "./stores/icon";
  import altIcon from "./stores/altIcon";

  export let time
  export let weathercode;
  export let temperature_2m_max;
  export let temperature_2m_min;
  export let apparent_temperature_max;
  export let apparent_temperature_min;
  export let sunrise;
  export let sunset;
  export let precipitation_sum;

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
</script>

<div id="section">
  <p id="date">{dateFormat.format(time * 1000)}</p>
  <p id="weathercode"><img class="icons-large" src={$icons[weathercode]} alt={altIcon[weathercode]}></p>
  <p id="high"><img class="icons-small" src="/icons/temperature-arrow-up-solid.svg" alt="high temperature">{temperature_2m_max}°F</p>
  <p id="low"><img class="icons-small" src="/icons/temperature-arrow-down-solid.svg" alt="low temperature">{temperature_2m_min}°F</p>
  <p id="feels-high">Feels Like: {apparent_temperature_max}°F</p>
  <p id="feels-low">Feels Like: {apparent_temperature_min}°F</p>
  <p id="sunrise">Sunrise: {hourFormat.format(sunrise * 1000)}</p>
  <p id="sunset">Sunset: {hourFormat.format(sunset * 1000)}</p>
  <p id="precip">{precipitation_sum} in</p>
</div>

<style>
  #section {
    border: 3px solid #000;
    margin: 10px;
    padding: 5px;
    display: grid;
    grid-template-areas:
      "date date date"
      "code high fhigh"
      "code low flow"
      ". rise ."
      ". set ."
      ". precip precip";
    align-items: center;
    justify-items: start;
  }
  #date{
    grid-area: date;
    justify-self: center;
  }
  .icons-large{
    margin-right: 50px;
    height: 2.5em;
  }
  .icons-small {
    height: 1em;
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
  #feels-high {
    grid-area: fhigh;
    margin-bottom: 5px;
  }
  #feels-low {
    grid-area: flow;
    margin-bottom: 5px;
  }
  #sunrise {
    grid-area: rise;
    margin-bottom: 5px;
  }
  #sunset {
    grid-area: set;
    margin-bottom: 5px;
  }
  #precip {
    grid-area: precip;
  }
</style>
