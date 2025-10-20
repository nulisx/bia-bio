const hiddenDiv = document.getElementById('typingTexts');
const textElement = document.getElementById('typingText');
const cursorChar = "|";
let currentTextIndex = 0;

// extracts items safely
const texts = [];
hiddenDiv.childNodes.forEach(node => {
    if (node.nodeType === 3) {
        // splits the text nodes by <>
        node.textContent.split('<>').forEach(t => {
            const trimmed = t.trim();
            if (trimmed) texts.push(trimmed);
        });
    } else if (node.nodeName === "A") {
        texts.push(node.cloneNode(true)); // keeps the actual link element
    }
});

function typeWriter(content, i = 0) {
    if (typeof content !== "string") {
        // if it's a link element, it shows instantly
        textElement.innerHTML = "";
        textElement.appendChild(content);
        textElement.innerHTML += " " + cursorChar;
        setTimeout(() => eraseText(content), 1200);
        return;
    }

    if (i <= content.length) {
        textElement.textContent = content.substring(0, i) + cursorChar;
        setTimeout(() => typeWriter(content, i + 1), 90);
    } else {
        setTimeout(() => eraseText(content), 800);
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
        if (typeof nextItem === "object") {
            // recreated the DOM node so links stay clickable
            typeWriter(nextItem.cloneNode(true));
        } else {
            typeWriter(nextItem, 0);
        }
    }, 400);
}

// starts typing
if (texts.length > 0) {
    const firstItem = texts[0];
    typeWriter(typeof firstItem === "object" ? firstItem.cloneNode(true) : firstItem, 0);
}
