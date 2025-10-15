console.log("Hello World!");

// =========================
// GREETING
// =========================
function getTimeGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}
function showGreeting(name) {
  return `${getTimeGreeting()}, my name is ${name}! Welcome to my portfolio!`;
}

document.addEventListener("DOMContentLoaded", () => {
  const greetingText = document.getElementById("greetingText");
  if (greetingText) greetingText.textContent = showGreeting("Matt Schultz");
});

// =========================
// THEME TOGGLE
// =========================
const toggleButton = document.getElementById("themeToggle");
if (toggleButton) {
  toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggleButton.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  });
}

// =========================
// DOWNLOAD RESUME (alert once, delayed 2s)
// =========================
let hasDownloadedResume = false;
const downloadBtn = document.getElementById("downloadBtn");
if (downloadBtn) {
  downloadBtn.addEventListener("click", (e) => {
    if (!hasDownloadedResume) {
      // prevent leaving the page so the alert can fire
      e.preventDefault();
      hasDownloadedResume = true;

      // trigger the actual download manually
      const a = document.createElement("a");
      a.href = downloadBtn.getAttribute("href");
      a.download = "";
      document.body.appendChild(a);
      a.click();
      a.remove();

      // delayed confirmation
      setTimeout(() => {
        alert("Your resume was downloaded successfully!");
      }, 2000);
    }
  });
}

// =========================
/* SCROLL TO TOP BUTTON */
// =========================
const toTopBtn = document.getElementById("toTop");
if (toTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) toTopBtn.classList.add("show");
    else toTopBtn.classList.remove("show");
  });
  toTopBtn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
}

// =========================
// SECTION FADE/SLIDE-IN ANIMATIONS
// =========================
const cards = document.querySelectorAll(".card");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  cards.forEach((card, i) => {
    // small stagger for a nice effect
    card.style.transitionDelay = `${i * 80}ms`;
    observer.observe(card);
  });
} else {
  // fallback: show all if IO not supported
  cards.forEach((c) => c.classList.add("visible"));
}
