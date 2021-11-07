const colorPickerContainer = document.getElementById("color-picker-container");
const colorInput = document.getElementById("color-input");
const colorButton = document.getElementById("color-button");
const pixelsContainer = document.getElementById("pixels-container");
const pixelsGridBuilder = document.getElementById("pixels-grid-builder");
const quantityOfPixelsInput = document.getElementById("quantity-of-pixels");
const sizeOfPixelInput = document.getElementById("size-of-pixel");

const colors = {
  white: "#ffffff",
  dark: "#3f3f3f",
  green: "#50cc50",
  red: "#ff6060",
};

let pixelSize = parseInt(sizeOfPixelInput.value) || 20;
let quantityOfPixels = parseInt(quantityOfPixelsInput.value) || 10;
let selectedColor = colors["dark"];
let color = "";
let newColorNumber = 0;

function addColor(color) {
  const newColorName = `color${++newColorNumber}`;

  colors[newColorName] = `${color}`;
}

function setSquaredSize(element, size) {
  element.style.height = size + "px";
  element.style.width = size + "px";
}

function createPixel(pixelSize) {
  let pixel = document.createElement("div");

  setSquaredSize(pixel, pixelSize);
  pixel.classList.add("pixel");
  pixel.addEventListener(
    "click",
    () => (pixel.style.backgroundColor = selectedColor)
  );

  return pixel;
}

function createRow(quantityOfPixels, gridSize, pixelSize) {
  const row = document.createElement("div");

  row.style.width = gridSize + "px";
  row.style.height = pixelSize + "px";
  row.classList.add("row");

  for (let columnIndex = 0; columnIndex < quantityOfPixels; columnIndex++) {
    const pixel = createPixel(pixelSize);

    row.appendChild(pixel);
  }

  return row;
}

function createColorPickerContainer(colorPickerContainer, colors) {
  for (color in colors) {
    const colorPick = document.createElement("div");

    setSquaredSize(colorPick, 20);

    colorPick.style.backgroundColor = colors[color];
    colorPick.classList.add("color-pick");

    colorPick.addEventListener(
      "click",
      () => (selectedColor = colorPick.style.backgroundColor)
    );

    colorPickerContainer.appendChild(colorPick);
  }
}
function refreshColorPickerContainer(colorPickerContainer, colors) {
  colorPickerContainer.innerHTML = "";

  createColorPickerContainer(colorPickerContainer, colors);
}

function createPixelsContainer(pixelsContainer, quantityOfPixels, pixelSize) {
  const gridSize = quantityOfPixels * pixelSize;

  setSquaredSize(pixelsContainer, gridSize);

  for (let rowIndex = 0; rowIndex < quantityOfPixels; rowIndex++) {
    const row = createRow(quantityOfPixels, gridSize, pixelSize);

    pixelsContainer.appendChild(row);
  }
}

function refreshPixelsContainer(pixelsContainer, quantityOfPixels, pixelSize) {
  pixelsContainer.innerHTML = "";

  createPixelsContainer(pixelsContainer, quantityOfPixels, pixelSize);
}

window.addEventListener("load", () => {
  createColorPickerContainer(colorPickerContainer, colors, pixelSize);
  createPixelsContainer(pixelsContainer, quantityOfPixels, pixelSize);
});

quantityOfPixelsInput.addEventListener("change", (e) => {
  quantityOfPixels = parseInt(e.target.value);

  refreshPixelsContainer(pixelsContainer, quantityOfPixels, pixelSize);
});

sizeOfPixelInput.addEventListener("change", (e) => {
  pixelSize = parseInt(e.target.value);

  refreshPixelsContainer(pixelsContainer, quantityOfPixels, pixelSize);
});

colorInput.addEventListener("change", (e) => {
  color = e.target.value;
});

colorButton.addEventListener("click", () => {
  addColor(color);

  refreshColorPickerContainer(colorPickerContainer, colors);

  colorInput.value = "";
  colorInput.focus();
});
