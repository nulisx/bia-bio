function atualizarPerfilDiscord() {
    // URL atualizada para apontar para o seu serviço no Render
    fetch('https://discorduserstatus.onrender.com/status')
    .then(response => response.json())
    .then(data => {
        // Atualizar a foto do perfil
        const avatarImg = document.querySelector('.avatarImage');
        if (avatarImg && data.avatarUrl) {
            avatarImg.src = data.avatarUrl;
            console.log('Avatar atualizado:', data.avatarUrl);
        }
        
        // Atualizar o status
        const statusImg = document.querySelector('.discordStatus');
        if (statusImg) {
            // Determinar qual imagem de status usar
            let statusImgPath;
            switch(data.status) {
                case 'online': statusImgPath = '/img/online.png'; break;
                case 'idle': statusImgPath = '/img/idle.png'; break;
                case 'dnd': statusImgPath = '/img/dnd.png'; break;
                default: statusImgPath = '/img/offline.png';
            }
            statusImg.src = statusImgPath;
            console.log('Status atualizado para:', data.status);
        }
        
        // Se você quiser mostrar o nome de usuário também
        const usernameElement = document.querySelector('.username');
        if (usernameElement && data.username) {
            usernameElement.textContent = data.username;
        }
    })
    .catch(error => {
        console.error('Erro ao buscar status:', error);
        // Adicionar tratamento de erro mais visível
        const debugElement = document.querySelector('.debug-info');
        if (debugElement) {
            debugElement.textContent = 'Erro de conexão: ' + error.message;
            debugElement.style.color = 'red';
        }
    });
}

// Chamar a função imediatamente ao carregar
atualizarPerfilDiscord();

// Chamar a função periodicamente para manter atualizado
setInterval(atualizarPerfilDiscord, 5000); // 5sec
