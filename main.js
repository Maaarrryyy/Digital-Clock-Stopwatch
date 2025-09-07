// ------------------ DIGITAL CLOCK ------------------
const dateEl = document.getElementById("dateDay");
const timeEl = document.getElementById("timeDisplay");

function updateClock() {
  const now = new Date();
  const dateOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  dateEl.textContent = now.toLocaleDateString(undefined, dateOptions);
  timeEl.textContent = now.toLocaleTimeString(undefined, timeOptions);
}
setInterval(updateClock, 1000);
updateClock(); // Initialize immediately

// ------------------ STOPWATCH ------------------
const stopwatchEl = document.getElementById("stopwatchTime");
const displayTimesEl = document.getElementById("displayTimes");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const showBtn = document.getElementById("showBtn");
const clearBtn = document.getElementById("clearBtn");

let stopwatchInterval;
let time = { h: 0, m: 0, s: 0, ms: 0 };
let running = false;

function formatTime({ h, m, s, ms }) {
  const pad = (num) => String(num).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}:${pad(ms)}`;
}

function updateStopwatch() {
  time.ms++;
  if (time.ms === 100) {
    time.ms = 0;
    time.s++;
  }
  if (time.s === 60) {
    time.s = 0;
    time.m++;
  }
  if (time.m === 60) {
    time.m = 0;
    time.h++;
  }

  stopwatchEl.textContent = formatTime(time);
}

startBtn.addEventListener("click", () => {
  if (!running) {
    running = true;
    stopwatchInterval = setInterval(updateStopwatch, 10);
  }
});

stopBtn.addEventListener("click", () => {
  clearInterval(stopwatchInterval);
  running = false;
});

resetBtn.addEventListener("click", () => {
  clearInterval(stopwatchInterval);
  running = false;
  time = { h: 0, m: 0, s: 0, ms: 0 };
  stopwatchEl.textContent = formatTime(time);
});

showBtn.addEventListener("click", () => {
  const p = document.createElement("p");
  p.textContent = `Time: ${formatTime(time)}`;
  displayTimesEl.appendChild(p);
});

clearBtn.addEventListener("click", () => {
  displayTimesEl.innerHTML = "";
});
