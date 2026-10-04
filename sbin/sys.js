// Clock initialization
function updateTime() {
  const timeEl = document.getElementById("timeElement");
  if (timeEl) {
    timeEl.textContent = new Date().toLocaleString("en-US");
  }
}

// Window management setup
const welcomeWin = document.getElementById("welcome");
const closeBtn = document.getElementById("welcomeclose");

if (welcomeWin) {
  dragElement(welcomeWin);
}

if (closeBtn && welcomeWin) {
  closeBtn.addEventListener("click", () => {
    welcomeWin.style.display = "none";
  });
}

// Make an HTML element draggable
function dragElement(element) {
  if (!element) return;

  let initialX = 0;
  let initialY = 0;
  let currentX = 0;
  let currentY = 0;

  const header = document.getElementById(element.id + "header");

  if (header) {
    header.onmousedown = startDragging;
  } else {
    element.onmousedown = startDragging;
  }

  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();

    initialX = e.clientX;
    initialY = e.clientY;

    document.onmouseup = stopDragging;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();

    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;

    initialX = e.clientX;
    initialY = e.clientY;

    element.style.top = `${element.offsetTop - currentY}px`;
    element.style.left = `${element.offsetLeft - currentX}px`;
  }

  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// Start clock
updateTime();
setInterval(updateTime, 1000);