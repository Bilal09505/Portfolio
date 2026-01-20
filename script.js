// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");

mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  const icon = mobileMenuBtn.querySelector("i");
  icon.className = navLinks.classList.contains("active")
    ? "fas fa-times"
    : "fas fa-bars";
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    mobileMenuBtn.querySelector("i").className = "fas fa-bars";
  });
});

// Header scroll effect
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Active nav link on scroll
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navItems.forEach((item) => {
          item.classList.remove("active");
          if (item.getAttribute("href") === `#${id}`) {
            item.classList.add("active");
          }
        });
      }
    });
  },
  { threshold: 0.3 }
);

sections.forEach((section) => observer.observe(section));

// Scroll animations
const animateElements = document.querySelectorAll(".animate");
const animateObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  },
  { threshold: 0.1 }
);

animateElements.forEach((element) => animateObserver.observe(element));

// Form submission
const contactForm = document.getElementById("contactForm");
if (!contactForm) {
  console.error("Form not found");
}
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  emailjs
    .sendForm("service_syronxp", "template_tilc503", contactForm)
    .then(() => {
      alert("Message sent successfully!");
      contactForm.reset();
    })
    .catch((error) => {
      alert("Failed to send message.");
      console.error(error);
    });
});

// Skill tag hover effect enhancement
const skillTags = document.querySelectorAll(".skill-tag");
skillTags.forEach((tag) => {
  tag.addEventListener("mouseenter", () => {
    tag.style.transform = "translateY(-5px) scale(1.05)";
  });

  tag.addEventListener("mouseleave", () => {
    tag.style.transform = "translateY(0) scale(1)";
  });
});

// Initialize EmailJS
(function () {
  emailjs.init("8WechvJQ6H6bEuOAx");
})();
