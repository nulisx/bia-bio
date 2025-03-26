const audio = document.getElementById('audioPlayer');
const playPauseBtn = document.querySelector('.play-pause');
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

// Carregar metadados do áudio
audio.addEventListener('loadedmetadata', () => {
    totalTime.textContent = formatTime(audio.duration);
});

// Controle Play/Pause
playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.style.display = 'none';
        pauseIcon.style.display = 'block';
    } else {
        audio.pause();
        playPauseBtn.style.display = 'block';
        pauseIcon.style.display = 'none';
    }
});

// Atualizar progresso
audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    timelineProgress.style.width = `${progress}%`;
    currentTime.textContent = formatTime(audio.currentTime);
});

// Controle por clique na timeline
timeline.addEventListener('click', (e) => {
    const timelineWidth = timeline.offsetWidth;
    const clickX = e.offsetX;
    const newTime = (clickX / timelineWidth) * audio.duration;
    audio.currentTime = newTime;
});

// Adicionar evento de término da música
audio.addEventListener('ended', () => {
    playPauseBtn.style.display = 'block';
    pauseIcon.style.display = 'none';
});