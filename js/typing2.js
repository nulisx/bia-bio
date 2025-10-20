const texts = document.getElementById('typingTexts').innerHTML.split(' &lt;&gt; ');
const textElement = document.getElementById('typingText');
const cursorChar = "|";
let currentTextIndex = 0;

function typeWriter(text, i) {
    if (i <= text.length) {
        if (/<[a-z][\s\S]*>/i.test(text)) {
            textElement.innerHTML = text.substring(0, i) + cursorChar;
        } else {
            textElement.textContent = text.substring(0, i) + cursorChar;
        }
        i++;
        setTimeout(() => typeWriter(text, i), 92.5);
    } else {
        setTimeout(() => eraseText(text), 1000);
    }
}

function eraseText(text) {
    let length = text.length;
    if (length > 0) {
        if (/<[a-z][\s\S]*>/i.test(text)) {
            textElement.innerHTML = text.substring(0, length - 1) + cursorChar;
        } else {
            textElement.textContent = text.substring(0, length - 1) + cursorChar;
        }
        setTimeout(() => eraseText(text.substring(0, length - 1)), 40);
    } else {
        currentTextIndex = (currentTextIndex + 1) % texts.length;
        setTimeout(() => typeWriter(texts[currentTextIndex], 0), 500);
    }
}

typeWriter(texts[currentTextIndex], 0);
