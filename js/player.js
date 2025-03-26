document.addEventListener('DOMContentLoaded', () => {
    const audio = document.querySelector('.audioPlayer');
    const playIcon = document.querySelector('.play-pause');
    const pauseIcon = document.querySelector('.pause-icon');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
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

    // Variável para controlar o primeiro clique
    let firstClickHappened = false;

    // Função para reprodução automática com delay
    function autoPlayWithDelay() {
        if (!firstClickHappened) return;
        
        // Delay de 2 segundos após o primeiro clique
        setTimeout(() => {
            audio.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        }, 2000);
    }

    // Adiciona evento de clique no site para habilitar o autoplay
    document.addEventListener('click', () => {
        if (!firstClickHappened) {
            firstClickHappened = true;
            autoPlayWithDelay();
        }
    });

    // Função para pular para frente ou para trás
    function skipTime(direction) {
        const skipAmount = 5; // 5 segundos
        if (direction === 'forward') {
            // Pula para frente, mas não passa do final da música
            audio.currentTime = Math.min(audio.currentTime + skipAmount, audio.duration);
        } else {
            // Pula para trás, mas não vai antes do início da música
            audio.currentTime = Math.max(audio.currentTime - skipAmount, 0);
        }
    }

    // Adiciona eventos de pulo para prev e next
    prevButton.addEventListener('click', () => skipTime('backward'));
    nextButton.addEventListener('click', () => skipTime('forward'));

    // Carrega metadados
    audio.addEventListener('loadedmetadata', () => {
        totalTime.textContent = formatTime(audio.duration);
    });

    // Função de alternância entre play/pause
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

    // Eventos nos ícones
    playIcon.addEventListener('click', togglePlayPause);
    pauseIcon.addEventListener('click', togglePlayPause);

    // Atualiza progresso
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

    // Resetar ao terminar
    audio.addEventListener('ended', () => {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    });
});