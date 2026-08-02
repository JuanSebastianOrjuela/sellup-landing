
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");

  menuButton?.addEventListener("click", () => {
    const open = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });

  document.querySelectorAll(".main-nav a").forEach(link => {
    link.addEventListener("click", () => navigation.classList.remove("open"));
  });

  const benefitCards = [...document.querySelectorAll("[data-tree-benefit]")];
  let benefitIndex = 0;

  const activateBenefit = index => {
    benefitCards.forEach((card, currentIndex) => {
      card.classList.toggle("active", currentIndex === index);
    });
  };

  benefitCards.forEach((card, index) => {
    ["mouseenter", "focus", "click"].forEach(eventName => {
      card.addEventListener(eventName, () => {
        benefitIndex = index;
        activateBenefit(index);
      });
    });
  });

  if (benefitCards.length) {
    setInterval(() => {
      benefitIndex = (benefitIndex + 1) % benefitCards.length;
      activateBenefit(benefitIndex);
    }, 2600);
  }

  document.querySelectorAll(".service-card").forEach(card => {
    card.addEventListener("click", () => card.classList.toggle("open"));
    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        card.classList.toggle("open");
      }
    });
  });

  const businessTrack = document.querySelector(".business-track");
  if (businessTrack) {
    businessTrack.innerHTML += businessTrack.innerHTML;
  }

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        entry.target.classList.remove("is-leaving");
      } else if (entry.boundingClientRect.top < 0) {
        entry.target.classList.add("is-leaving");
      } else {
        entry.target.classList.remove("visible", "is-leaving");
      }
    });
  }, { threshold: [0.08, 0.24, 0.55], rootMargin: "-4% 0px -10% 0px" });

  document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});

const treeImage = document.querySelector(".tree-scene > img");
if (treeImage && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let ticking = false;
  const updateTreeParallax = () => {
    const scene = treeImage.parentElement;
    const rect = scene.getBoundingClientRect();
    const viewport = window.innerHeight || document.documentElement.clientHeight;
    const progress = Math.max(-1, Math.min(1, (viewport / 2 - (rect.top + rect.height / 2)) / viewport));
    treeImage.style.transform = `translateY(${progress * 14}px) scale(1.035)`;
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateTreeParallax);
      ticking = true;
    }
  }, { passive: true });
  updateTreeParallax();
}
