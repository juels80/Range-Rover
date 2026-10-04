const filterButtons = [...document.querySelectorAll(".inventory-filter")];
const vehicleCards = [...document.querySelectorAll("[data-vehicle-card]")];
const inventoryCount = document.querySelector("[data-inventory-count]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    let visibleCount = 0;

    filterButtons.forEach((filterButton) => {
      const isSelected = filterButton === button;
      filterButton.classList.toggle("is-selected", isSelected);
      filterButton.setAttribute("aria-pressed", String(isSelected));
    });

    vehicleCards.forEach((card) => {
      const isVisible = filter === "all" || card.dataset.color === filter;
      card.hidden = !isVisible;
      if (isVisible) {
        visibleCount += 1;
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          card.classList.remove("filter-enter");
          void card.offsetWidth;
          card.classList.add("filter-enter");
        }
      }
    });

    inventoryCount.textContent = filter === "all"
      ? `${visibleCount} colors`
      : `${visibleCount} ${filter} Evoque${visibleCount === 1 ? "" : "s"}`;
  });
});

vehicleCards.forEach((card) => {
  card.addEventListener("animationend", (event) => {
    if (event.animationName === "filter-enter") card.classList.remove("filter-enter");
  });
});
