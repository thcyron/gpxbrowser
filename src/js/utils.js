export function formatDuration(seconds) {
  let h = Math.floor(seconds / 60 / 60);
  let m = Math.floor(seconds / 60 % 60);
  let s = seconds % 60;

  var components = [];
  if (h > 0) {
    components.push(`${String(h)} hr`);
  }
  if (m > 0) {
    components.push(`${String(m)} min`);
  }
  if (s > 1) {
    components.push(`${String(s)} sec`);
  }

  return components.join(" ");
}

export function formatDistance(meters) {
  if (meters >= 1000) {
    return String(Math.round(meters / 10) / 100)  + " km";
  }
  return String(meters) + " m";
}

export function formatPace(seconds, meters) {
  let pace = (seconds) / (meters / 1000); // sec per km
  return `${Math.floor(pace / 60)}:${padNumber(Math.round(pace % 60))} min/km`;
}

export function formatSpeed(meters, seconds) {
  let speed = (meters / 1000) / (seconds / 60 / 60);
  return String(Math.round(speed * 100) / 100) + " km/h";
}

export function padNumber(number, length = 2, padding = "0") {
  var s = String(number);
  while (s.length < length) {
    s = padding + s
  }
  return s;
}
