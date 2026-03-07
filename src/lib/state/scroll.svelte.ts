let currentY = $state(0);
let lastY = $state(0);

export const scroll = $state({
  currentY: 0,
  lastY: 0,
  goingDown: false
});

let listening = false;
let rafRunning = false;

function update() {
  rafRunning = false;

  if (!listening) {
    return;
  }

  const y = window.scrollY; // or window.pageYOffset || document.documentElement.scrollTop

  if (y !== currentY) {
    lastY = currentY;
    currentY = y;
  }

  // Throttle ourselves via requestAnimationFrame
  if (!rafRunning) {
    rafRunning = true;
    requestAnimationFrame(update);
  }

  if (currentY > lastY) {
    scroll.goingDown = true;
  }
}

function start() {
  if (typeof window === 'undefined') {
    return;
  }

  listening = true;
  update(); // initial read
  window.addEventListener('scroll', update, { passive: true });
}

function stop() {
  listening = false;
  window.removeEventListener('scroll', update);
  rafRunning = false;
}

// Auto start if browser
if (typeof window !== 'undefined') {
  start();

  // Cleanup on Svelte's hot-module-reload / full page navigation
  if (import.meta.hot) {
    import.meta.hot.dispose(stop);
  }
}
