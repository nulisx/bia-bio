const stickyPlayer = document.querySelector('.sticky-player');

// Alternar expansão ao clicar no player
stickyPlayer.addEventListener('click', () => {
    stickyPlayer.classList.toggle('expanded');
});

// Fechar o player ao clicar fora dele
document.addEventListener('click', (event) => {
    if (!stickyPlayer.contains(event.target)) {
        stickyPlayer.classList.remove('expanded');
    }
});

const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause-btn');
const progressBar = document.querySelector('.progress-bar');

// Função para alternar entre play e pause
playPauseBtn.addEventListener('click', (event) => {
    event.stopPropagation(); // Impede a propagação do evento para o container
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = '⏸';
    } else {
        audio.pause();
        playPauseBtn.textContent = '▶';
    }
});

// Atualizar a barra de progresso conforme a música toca
audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;
});

// Função para retroceder a música
document.getElementById('prev-btn').addEventListener('click', (event) => {
    event.stopPropagation(); // Impede a propagação do evento para o container
    audio.currentTime -= 10; // Retrocede 10 segundos
});

// Função para avançar a música
document.getElementById('next-btn').addEventListener('click', (event) => {
    event.stopPropagation(); // Impede a propagação do evento para o container
    audio.currentTime += 10; // Avança 10 segundos
});