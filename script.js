const sections = document.querySelectorAll(".scroll-section");
const dots = document.querySelectorAll(".section-dot");
const navUp = document.getElementById("nav-up");
const navDown = document.getElementById("nav-down");

let currentIndex = 0;

function updateNav() {
  dots.forEach((dot, i) => dot.classList.toggle("active", i === currentIndex));
  navUp.disabled = currentIndex === 0;
  navDown.disabled = currentIndex === sections.length - 1;
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        currentIndex = Array.from(sections).indexOf(entry.target);
        updateNav();
      }
    });
  },
  { threshold: 0.5 },
);

sections.forEach((section) => observer.observe(section));

navUp.addEventListener("click", () => {
  if (currentIndex > 0)
    sections[currentIndex - 1].scrollIntoView({ behavior: "smooth" });
});

navDown.addEventListener("click", () => {
  if (currentIndex < sections.length - 1)
    sections[currentIndex + 1].scrollIntoView({ behavior: "smooth" });
});

updateNav();
