const vehiclePhotos = {
  white: {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/2023_Range_Rover_Evoque_%28L551%29_IMG_3586.jpg/1280px-2023_Range_Rover_Evoque_%28L551%29_IMG_3586.jpg",
    alt: "White 2023 Range Rover Evoque, rear three-quarter view",
    meta: "RANGE ROVER EVOQUE · WHITE",
    author: "Alexander Migl",
    source: "https://commons.wikimedia.org/wiki/File:2023_Range_Rover_Evoque_(L551)_IMG_3586.jpg",
  },
  charcoal: {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/92/2023_Range_Rover_Evoque_%28L551%29_Auto_Zuerich_2023_1X7A1476.jpg/1280px-2023_Range_Rover_Evoque_%28L551%29_Auto_Zuerich_2023_1X7A1476.jpg",
    alt: "2023 Range Rover Evoque at Auto Zürich, rear three-quarter view",
    meta: "RANGE ROVER EVOQUE · CHARCOAL",
    author: "Alexander-93",
    source: "https://commons.wikimedia.org/wiki/File:2023_Range_Rover_Evoque_(L551)_Auto_Zuerich_2023_1X7A1476.jpg",
  },
  maroon: {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f0/2022_Range_Rover_Evoque.jpg/1280px-2022_Range_Rover_Evoque.jpg",
    alt: "2022 Range Rover Evoque, front three-quarter view",
    meta: "RANGE ROVER EVOQUE · MAROON",
    author: "Calreyn88",
    source: "https://commons.wikimedia.org/wiki/File:2022_Range_Rover_Evoque.jpg",
  },
  black: {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a8/Range_Rover_Evoque_%28L551%29_1X7A1765.jpg/1280px-Range_Rover_Evoque_%28L551%29_1X7A1765.jpg",
    alt: "Range Rover Evoque, front three-quarter view",
    meta: "RANGE ROVER EVOQUE · BLACK",
    author: "Alexander-93",
    source: "https://commons.wikimedia.org/wiki/File:Range_Rover_Evoque_(L551)_1X7A1765.jpg",
  },
};

const selectedColor = new URLSearchParams(window.location.search).get("paint") || "white";
const selectedVehicle = vehiclePhotos[selectedColor] || vehiclePhotos.white;

const vehicleImage = document.querySelector("[data-vehicle-image]");
vehicleImage.src = selectedVehicle.image;
vehicleImage.alt = selectedVehicle.alt;
vehicleImage.dataset.paintPreview = selectedColor in vehiclePhotos ? selectedColor : "white";
vehicleImage.dataset.photoAuthor = selectedVehicle.author;
vehicleImage.dataset.photoSource = selectedVehicle.source;
vehicleImage.dataset.photoLicense = "CC BY-SA 4.0";
document.querySelector("[data-vehicle-meta]").textContent = selectedVehicle.meta;
