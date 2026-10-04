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

const gallerySlides = [
  {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/2023_Range_Rover_Evoque_%28L551%29_IMG_3586.jpg/1920px-2023_Range_Rover_Evoque_%28L551%29_IMG_3586.jpg",
    alt: "White 2023 Range Rover Evoque, rear three-quarter view",
    caption: "White · rear three-quarter view",
    paint: "white",
  },
  {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e5/2023_Range_Rover_Evoque_%28L551%29_IMG_3588.jpg/1920px-2023_Range_Rover_Evoque_%28L551%29_IMG_3588.jpg",
    alt: "White 2023 Range Rover Evoque, front three-quarter view",
    caption: "White · front three-quarter view",
    paint: "white",
  },
  {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/92/2023_Range_Rover_Evoque_%28L551%29_Auto_Zuerich_2023_1X7A1476.jpg/1280px-2023_Range_Rover_Evoque_%28L551%29_Auto_Zuerich_2023_1X7A1476.jpg",
    alt: "Charcoal 2023 Range Rover Evoque, rear three-quarter view at an auto show",
    caption: "Charcoal · rear three-quarter view",
    paint: "charcoal",
  },
  {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f0/2022_Range_Rover_Evoque.jpg/1280px-2022_Range_Rover_Evoque.jpg",
    alt: "Maroon 2022 Range Rover Evoque, front three-quarter view",
    caption: "Maroon · front three-quarter view",
    paint: "maroon",
  },
  {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a8/Range_Rover_Evoque_%28L551%29_1X7A1765.jpg/1280px-Range_Rover_Evoque_%28L551%29_1X7A1765.jpg",
    alt: "Black Range Rover Evoque, front three-quarter view",
    caption: "Black · front three-quarter view",
    paint: "black",
  },
];

const heroVisual = document.querySelector(".hero-visual");
const galleryImage = heroVisual.querySelector(".gallery-image");
const galleryCount = heroVisual.querySelector("[data-gallery-count]");
const galleryCaption = heroVisual.querySelector("[data-gallery-caption]");
const galleryDots = [...heroVisual.querySelectorAll(".gallery-dot")];
const paintSwatches = [...heroVisual.querySelectorAll(".paint-swatch")];
let currentSlide = 0;

function showSlide(index) {
  currentSlide = (index + gallerySlides.length) % gallerySlides.length;
  const slide = gallerySlides[currentSlide];
  galleryImage.classList.add("is-changing");
  galleryImage.src = slide.src;
  galleryImage.alt = slide.alt;
  galleryCount.textContent = `${String(currentSlide + 1).padStart(2, "0")} / ${String(gallerySlides.length).padStart(2, "0")}`;
  galleryCaption.textContent = slide.caption;

  galleryDots.forEach((dot, dotIndex) => {
    const isSelected = dotIndex === currentSlide;
    dot.classList.toggle("is-selected", isSelected);
    dot.setAttribute("aria-pressed", String(isSelected));
  });
  paintSwatches.forEach((swatch) => {
    const isSelected = swatch.dataset.paint === slide.paint;
    swatch.classList.toggle("is-selected", isSelected);
    swatch.setAttribute("aria-pressed", String(isSelected));
  });
}

galleryImage.addEventListener("load", () => galleryImage.classList.remove("is-changing"));
galleryImage.addEventListener("error", () => {
  galleryImage.classList.remove("is-changing");
  galleryCaption.textContent = "This photo is temporarily unavailable.";
});
heroVisual.querySelector("[data-gallery-prev]").addEventListener("click", () => showSlide(currentSlide - 1));
heroVisual.querySelector("[data-gallery-next]").addEventListener("click", () => showSlide(currentSlide + 1));
galleryDots.forEach((dot) => {
  dot.addEventListener("click", () => showSlide(Number(dot.dataset.slide)));
});
paintSwatches.forEach((swatch) => {
  swatch.addEventListener("click", () => {
    const matchingSlide = gallerySlides.findIndex((slide) => slide.paint === swatch.dataset.paint);
    if (matchingSlide !== -1) showSlide(matchingSlide);
  });
});

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".intro-main, .detail-strip, .feature-image, .feature-copy, .ownership-card, .estimate-band > div, .enquiry-copy, .enquiry-form, .visit-inner, .visit-image")
    .forEach((element, index) => {
      element.classList.add("reveal");
      if (element.matches(".ownership-card")) {
        element.style.setProperty("--reveal-delay", `${index % 3 * 90}ms`);
      }
      revealObserver.observe(element);
    });
}

const depositRange = document.querySelector("#deposit-range");
const depositValue = document.querySelector("#deposit-value");
const monthlyPayment = document.querySelector("#monthly-payment");
const vehiclePrice = 39850;
const annualRate = 0.089;
const termMonths = 60;
const monthlyRate = annualRate / 12;

function updateEstimate() {
  const deposit = Number(depositRange.value);
  const principal = vehiclePrice - deposit;
  const payment = principal * monthlyRate / (1 - (1 + monthlyRate) ** -termMonths);
  depositValue.textContent = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(deposit);
  monthlyPayment.textContent = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(payment);
}

depositRange.addEventListener("input", updateEstimate);
updateEstimate();

document.querySelector("#year").textContent = new Date().getFullYear();

const enquiryForm = document.querySelector("#enquiry-form");
const formStatus = document.querySelector("#form-status");

enquiryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!enquiryForm.reportValidity()) return;

  const formData = new FormData(enquiryForm);
  const subject = encodeURIComponent(`Evoque enquiry: ${formData.get("interest")}`);
  const body = encodeURIComponent([
    `Name: ${formData.get("name")}`,
    `Email: ${formData.get("email")}`,
    `Interested in: ${formData.get("interest")}`,
    "",
    `Message: ${formData.get("message") || "No additional message"}`,
  ].join("\n"));
  const salesEmail = "sales@madisonavenuemotors.example";

  formStatus.textContent = `Opening an email draft to ${salesEmail}. Replace this demo address with your dealership inbox before launch.`;
  window.location.href = `mailto:${salesEmail}?subject=${subject}&body=${body}`;
});
