function atualizarPerfilDiscord() {
    // Substitua pelo URL correto do seu Replit
    fetch('https://b508e4e9-bb95-4ace-a5af-a62760d7a8d7-00-pfeq9qyw7ur3.picard.replit.dev/status')
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
    });
}

// Chamar a função imediatamente ao carregar
atualizarPerfilDiscord();

// Chamar a função periodicamente para manter atualizado
setInterval(atualizarPerfilDiscord, 5000); // 5sec