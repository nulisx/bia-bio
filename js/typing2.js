const texts = document.getElementById('typingTexts').innerHTML.split(' &lt;&gt; ');
const textElement = document.getElementById('typingText');
const cursorChar = "|";
let currentTextIndex = 0;

function typeWriter(text, i = 0) {
    // if the text contains HTML tags (like <a>), dont type it char by char
    if (/<[a-z][\s\S]*>/i.test(text)) {
        textElement.innerHTML = text + cursorChar;
        setTimeout(() => eraseText(text), 1200);
        return;
    }

    if (i <= text.length) {
        textElement.textContent = text.substring(0, i) + cursorChar;
        setTimeout(() => typeWriter(text, i + 1), 92.5);
    } else {
        setTimeout(() => eraseText(text), 1000);
    }
}

function eraseText(text) {
    if (/<[a-z][\s\S]*>/i.test(text)) {
        // if it was/is a link or HTML chunk, removes it instantly
        textElement.innerHTML = cursorChar;
        next();
        return;
    }

    if (text.length > 0) {
        textElement.textContent = text.substring(0, text.length - 1) + cursorChar;
        setTimeout(() => eraseText(text.substring(0, text.length - 1)), 40);
    } else {
        next();
    }
}

function next() {
    currentTextIndex = (currentTextIndex + 1) % texts.length;
    setTimeout(() => typeWriter(texts[currentTextIndex], 0), 500);
}

typeWriter(texts[currentTextIndex], 0);
