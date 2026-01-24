const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Responsive menu toggle
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  menuToggle.textContent = navLinks.classList.contains("open") ? "✖" : "☰";
});

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Dark/Light mode toggle
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  themeToggle.textContent = body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// ====== ACTIVE LINK HIGHLIGHT ======
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((a) => {
    a.classList.remove("active");
    if (a.getAttribute("href").includes(current)) {
      a.classList.add("active");
    }
  });
});

/* ========== SMOOTH SCROLL EFFECT ========== */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* ========== CUSTOM FADE-IN ON SCROLL ========== */
const elements = document.querySelectorAll(".home-text, .home-image");

function fadeInOnScroll() {
  elements.forEach((el) => {
    const position = el.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;
    if (position < screenHeight - 100) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", fadeInOnScroll);
fadeInOnScroll(); // initial check

// script.js
const aboutElements = document.querySelectorAll(".about-image, .about-content");

function revealOnScroll() {
  aboutElements.forEach((el) => {
    const rect = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (rect < windowHeight - 100) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();
