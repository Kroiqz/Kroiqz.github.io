const card = document.getElementById("floatingCard");

// Function to check if device is mobile
function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

// Function to keep card centered
function centerCard() {
  card.style.top = "50%";
  card.style.left = "50%";
  card.style.transform = "translate(-50%, -50%)";
}

// Center on load
window.addEventListener("load", centerCard);
window.addEventListener("resize", centerCard);

// Only enable dragging if NOT mobile
if (!isMobile()) {
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let currentY = 0;

  // Helper to get current transform values
  function getTranslateValues(element) {
    const style = window.getComputedStyle(element);
    const matrix = new WebKitCSSMatrix(style.transform);
    return { x: matrix.m41, y: matrix.m42 };
  }

  // ---------- Desktop dragging ----------
  card.addEventListener("mousedown", (e) => {
    isDragging = true;
    const pos = getTranslateValues(card);
    startX = e.clientX - pos.x;
    startY = e.clientY - pos.y;
    card.style.cursor = "grabbing";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    card.style.cursor = "grab";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    currentX = e.clientX - startX;
    currentY = e.clientY - startY;
    card.style.transform = `translate(${currentX}px, ${currentY}px)`;
  });
}
