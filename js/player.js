const audio = document.getElementById('audioPlayer');
const playIcon = document.querySelector('.play-pause');
const pauseIcon = document.querySelector('.pause-icon');
const timeline = document.querySelector('.timeline');
const timelineProgress = document.querySelector('.timeline-progress');
const currentTime = document.querySelector('.current-time');
const totalTime = document.querySelector('.total-time');

// Função para formatar tempo
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Carregar metadados
audio.addEventListener('loadedmetadata', () => {
    totalTime.textContent = formatTime(audio.duration);
});

// Função única para controle
function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    } else {
        audio.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    }
}

// Eventos em ambos os ícones
playIcon.addEventListener('click', togglePlayPause);
pauseIcon.addEventListener('click', togglePlayPause);

// Atualizar progresso
audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    timelineProgress.style.width = `${progress}%`;
    currentTime.textContent = formatTime(audio.currentTime);
});

// Clique na timeline
timeline.addEventListener('click', (e) => {
    const rect = timeline.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pos * audio.duration;
});

// Reset ao terminar
audio.addEventListener('ended', () => {
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
});
