// --- 1. DOM ELEMENTS ---
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const themeToggle = document.getElementById("theme-toggle");
const toggleIcon = menuToggle.querySelector("i");
const body = document.body;
const navbar = document.querySelector(".navbar");

// --- 2. MOBILE MENU LOGIC ---
// This handles opening/closing the menu and changing the icon
const toggleMenu = () => {
  navLinks.classList.toggle("open");

  // Toggle between Hamburger (bars) and Close (times) icons
  if (navLinks.classList.contains("open")) {
    toggleIcon.classList.replace("fa-bars", "fa-times");
  } else {
    toggleIcon.classList.replace("fa-times", "fa-bars");
  }
};

menuToggle.addEventListener("click", toggleMenu);

// Auto-close mobile menu when any link is clicked
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks.classList.contains("open")) {
      toggleMenu();
    }
  });
});

// --- 3. SCROLL EVENTS (Combined for Performance) ---
window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY;

  // Change Navbar appearance on scroll
  if (scrollPos > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Active Link Highlighting
  highlightNavLink(scrollPos);

  // Trigger Animations
  revealOnScroll();
});

// --- 4. ACTIVE LINK HIGHLIGHT ---
function highlightNavLink(scrollPos) {
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-links a");
  let currentId = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150; // Offset for fixed navbar
    if (scrollPos >= sectionTop) {
      currentId = section.getAttribute("id");
    }
  });

  navItems.forEach((a) => {
    a.classList.remove("active");
    if (a.getAttribute("href").includes(currentId)) {
      a.classList.add("active");
    }
  });
}

// --- 5. DARK / LIGHT MODE ---
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  // Update emoji based on mode
  themeToggle.textContent = body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// --- 6. SMOOTH SCROLLING ---
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// --- 7. REVEAL ANIMATIONS ON SCROLL ---
function revealOnScroll() {
  // Target all elements that need to fade in
  const elements = document.querySelectorAll(
    ".home-text, .home-image, .about-image, .about-content, .service-card, .project-card",
  );

  elements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // Add 'visible' class when element enters 85% of the viewport
    if (elementTop < windowHeight * 0.85) {
      el.classList.add("visible");
    }
  });
}

// Initial calls on page load
revealOnScroll();
