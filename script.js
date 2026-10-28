const starField = document.querySelector("#star-field");
const starCount = window.matchMedia("(max-width: 600px)").matches ? 18 : 34;

for (let index = 0; index < starCount; index += 1) {
  const star = document.createElement("span");
  star.className = index % 6 === 0 ? "star star--sparkle" : "star";
  star.style.left = `${Math.random() * 100}%`;
  star.style.setProperty("--size", `${1 + Math.random() * 2}px`);
  star.style.setProperty("--duration", `${10 + Math.random() * 17}s`);
  star.style.setProperty("--delay", `${-Math.random() * 26}s`);
  star.style.setProperty("--drift", `${Math.round(Math.random() * 100 - 50)}px`);
  star.style.setProperty("--opacity", `${0.25 + Math.random() * 0.55}`);
  star.style.setProperty("--twinkle-delay", `${-Math.random() * 2.8}s`);
  starField.append(star);
}

document.querySelector("#year").textContent = new Date().getFullYear();

const revealSections = document.querySelectorAll("main > section:not(.hero)");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealSections.forEach((section) => section.classList.add("scroll-reveal-visible"));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("scroll-reveal-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealSections.forEach((section) => {
    section.classList.add("scroll-reveal");
    revealObserver.observe(section);
  });
}

document.querySelectorAll(".education-card").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") return;
    const bounds = card.getBoundingClientRect();
    card.style.setProperty("--glow-x", `${event.clientX - bounds.left}px`);
    card.style.setProperty("--glow-y", `${event.clientY - bounds.top}px`);
  });
});

const socialToast = document.querySelector("#social-toast");
let toastTimeout;
let countdownInterval;

document.querySelectorAll(".delayed-social").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const destination = link.href;
    const socialName = link.dataset.social;

    window.clearTimeout(toastTimeout);
    window.clearInterval(countdownInterval);
    socialToast.hidden = false;
    let secondsRemaining = 3;
    socialToast.textContent = `Opening ${socialName} in ${secondsRemaining} seconds…`;

    countdownInterval = window.setInterval(() => {
      secondsRemaining -= 1;
      if (secondsRemaining > 0) {
        socialToast.textContent = `Opening ${socialName} in ${secondsRemaining} seconds…`;
      } else {
        window.clearInterval(countdownInterval);
      }
    }, 1000);

    toastTimeout = window.setTimeout(() => {
      window.location.assign(destination);
    }, 3000);
  });
});
