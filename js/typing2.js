const hiddenDiv = document.getElementById("typingTexts");
const textElement = document.getElementById("typingText");
const cursorChar = "|";
let currentTextIndex = 0;

// gets/grabs the raw text and decode any &lt; &gt;
let raw = hiddenDiv.innerHTML
  .replace(/&lt;/g, "<")
  .replace(/&gt;/g, ">");

// splits the content by the real "<>" separator
const parts = raw.split("<>").map(p => p.trim()).filter(p => p.length);

// converts parts to either text or link DOM nodes
const texts = parts.map(part => {
  // trying/trys to detect a link element
  const temp = document.createElement("div");
  temp.innerHTML = part;
  const link = temp.querySelector("a");
  return link ? link : part;
});

function typeWriter(content, i = 0) {
  if (typeof content !== "string") {
    // if it’s a link — fades in smoothly
    textElement.innerHTML = "";
    const clone = content.cloneNode(true);
    clone.style.opacity = 0;
    clone.style.transition = "opacity 0.8s ease";
    textElement.appendChild(clone);
    textElement.innerHTML += " " + cursorChar;

    requestAnimationFrame(() => {
      clone.style.opacity = 1;
    });

    setTimeout(() => eraseText(content), 1600);
    return;
  }

  // typing effects for normal text
  if (i <= content.length) {
    textElement.textContent = content.substring(0, i) + cursorChar;
    setTimeout(() => typeWriter(content, i + 1), 80);
  } else {
    setTimeout(() => eraseText(content), 900);
  }
}

function eraseText(content) {
  if (typeof content !== "string") {
    textElement.innerHTML = cursorChar;
    next();
    return;
  }

  if (content.length > 0) {
    textElement.textContent = content.substring(0, content.length - 1) + cursorChar;
    setTimeout(() => eraseText(content.substring(0, content.length - 1)), 35);
  } else {
    next();
  }
}

function next() {
  currentTextIndex = (currentTextIndex + 1) % texts.length;
  setTimeout(() => {
    const nextItem = texts[currentTextIndex];
    typeWriter(
      typeof nextItem === "object" ? nextItem.cloneNode(true) : nextItem,
      0
    );
  }, 300);
}

// starts the typing cycle
if (texts.length > 0) {
  const firstItem = texts[0];
  typeWriter(typeof firstItem === "object" ? firstItem.cloneNode(true) : firstItem, 0);
}
