const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  primaryNav.classList.toggle("is-open", !isOpen);
});

primaryNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    primaryNav.classList.remove("is-open");
  }
});

document.querySelectorAll("[data-current-year], #year").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealTargets = document.querySelectorAll([
    ".hero-copy > *",
    ".intro-main",
    ".detail-strip",
    ".feature-image",
    ".feature-copy",
    ".ownership-card",
    ".estimate-band > div",
    ".enquiry-copy",
    ".enquiry-form",
    ".visit-inner",
    ".visit-image",
    ".page-hero-inner > *",
    ".inventory-heading",
    ".inventory-toolbar",
    ".vehicle-card",
    ".inventory-notice",
    ".inventory-cta > *",
    ".breadcrumbs",
    ".vehicle-detail-image",
    ".vehicle-detail-copy > *",
    ".vehicle-detail-next > *",
  ].join(", "));

  revealTargets.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.setProperty("--reveal-delay", `${Math.min(index % 6, 3) * 100}ms`);
  });

  document.body.classList.add("motion-ready");

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

  revealTargets.forEach((element) => revealObserver.observe(element));
}
