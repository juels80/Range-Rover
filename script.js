const gallerySlides = [
  {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/2023_Range_Rover_Evoque_%28L551%29_IMG_3586.jpg/1920px-2023_Range_Rover_Evoque_%28L551%29_IMG_3586.jpg",
    alt: "White 2023 Range Rover Evoque, rear three-quarter view",
    caption: "White · rear three-quarter view",
    paint: "white",
    author: "Alexander Migl",
    source: "https://commons.wikimedia.org/wiki/File:2023_Range_Rover_Evoque_(L551)_IMG_3586.jpg",
  },
  {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e5/2023_Range_Rover_Evoque_%28L551%29_IMG_3588.jpg/1920px-2023_Range_Rover_Evoque_%28L551%29_IMG_3588.jpg",
    alt: "White 2023 Range Rover Evoque, front three-quarter view",
    caption: "White · front three-quarter view",
    paint: "white",
    author: "Alexander Migl",
    source: "https://commons.wikimedia.org/wiki/File:2023_Range_Rover_Evoque_(L551)_IMG_3588.jpg",
  },
  {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/92/2023_Range_Rover_Evoque_%28L551%29_Auto_Zuerich_2023_1X7A1476.jpg/1280px-2023_Range_Rover_Evoque_%28L551%29_Auto_Zuerich_2023_1X7A1476.jpg",
    alt: "2023 Range Rover Evoque at Auto Zürich, rear three-quarter view",
    caption: "Charcoal · rear three-quarter view",
    paint: "charcoal",
    author: "Alexander-93",
    source: "https://commons.wikimedia.org/wiki/File:2023_Range_Rover_Evoque_(L551)_Auto_Zuerich_2023_1X7A1476.jpg",
  },
  {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f0/2022_Range_Rover_Evoque.jpg/1280px-2022_Range_Rover_Evoque.jpg",
    alt: "2022 Range Rover Evoque, front three-quarter view",
    caption: "Maroon · front three-quarter view",
    paint: "maroon",
    author: "Calreyn88",
    source: "https://commons.wikimedia.org/wiki/File:2022_Range_Rover_Evoque.jpg",
  },
  {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a8/Range_Rover_Evoque_%28L551%29_1X7A1765.jpg/1280px-Range_Rover_Evoque_%28L551%29_1X7A1765.jpg",
    alt: "Range Rover Evoque, front three-quarter view",
    caption: "Black · front three-quarter view",
    paint: "black",
    author: "Alexander-93",
    source: "https://commons.wikimedia.org/wiki/File:Range_Rover_Evoque_(L551)_1X7A1765.jpg",
  },
];

const heroVisual = document.querySelector(".hero-visual");
const galleryImage = heroVisual.querySelector(".gallery-image");
const galleryCount = heroVisual.querySelector("[data-gallery-count]");
const galleryCaption = heroVisual.querySelector("[data-gallery-caption]");
const galleryDots = [...heroVisual.querySelectorAll(".gallery-dot")];
const paintSwatches = [...heroVisual.querySelectorAll(".paint-swatch")];
let currentSlide = 0;
let galleryTransition = 0;

function showSlide(index) {
  currentSlide = (index + gallerySlides.length) % gallerySlides.length;
  const slide = gallerySlides[currentSlide];
  const transitionId = ++galleryTransition;
  heroVisual.dataset.paintPreview = slide.paint;
  heroVisual.querySelectorAll(".gallery-image-incoming").forEach((image) => image.remove());
  const incomingImage = document.createElement("img");
  incomingImage.className = "gallery-image gallery-image-incoming";
  incomingImage.alt = "";
  incomingImage.setAttribute("aria-hidden", "true");
  incomingImage.dataset.paintPreview = slide.paint;
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

  incomingImage.addEventListener("load", () => {
    if (transitionId !== galleryTransition) {
    incomingImage.remove();
    return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    galleryImage.src = slide.src;
    galleryImage.alt = slide.alt;
    galleryImage.dataset.paintPreview = slide.paint;
    galleryImage.dataset.photoAuthor = slide.author;
    galleryImage.dataset.photoSource = slide.source;
    galleryImage.dataset.photoLicense = "CC BY-SA 4.0";
    incomingImage.remove();
    return;
    }

    const fade = incomingImage.animate(
    [
      { opacity: 0, transform: "scale(1.055)" },
      { opacity: 1, transform: "scale(1)" },
    ],
    { duration: 850, easing: "cubic-bezier(.2,.7,.2,1)", fill: "forwards" },
    );
    fade.onfinish = () => {
    if (transitionId !== galleryTransition) return;
    galleryImage.src = slide.src;
    galleryImage.alt = slide.alt;
    galleryImage.dataset.paintPreview = slide.paint;
    galleryImage.dataset.photoAuthor = slide.author;
    galleryImage.dataset.photoSource = slide.source;
    galleryImage.dataset.photoLicense = "CC BY-SA 4.0";
    incomingImage.remove();
    };
  }, { once: true });

  incomingImage.addEventListener("error", () => {
    incomingImage.remove();
    if (transitionId === galleryTransition) {
    galleryCaption.textContent = "This photo is temporarily unavailable.";
    }
  }, { once: true });
  heroVisual.insertBefore(incomingImage, heroVisual.querySelector(".image-caption"));
  incomingImage.src = slide.src;
}

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
