import { readable } from "svelte/store";


const altIcon = readable({
    0: "sunny",
    1: "partly cloudy",
    2: "partly cloudy",
    3: "cloudy",
    45: "fog",
    48: "fog",
    51: "rain",
    53: "rain",
    55: "rain",
    56: "rain",
    57: "rain",
    61: "rain",
    63: "rain",
    65: "heavy rain",
    66: "rain",
    67: "heavy rain",
    71: "snow",
    73: "snow",
    75: "snow",
    77: "snow",
    80: "rain",
    81: "heavy rain",
    82: "storms",
    85: "snow",
    86: "snow",
    95: "storms",
})

export default altIcon