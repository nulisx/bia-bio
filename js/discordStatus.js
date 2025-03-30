function atualizarPerfilDiscord() {
    // Fazer solicitação à API do seu bot hospedado no Replit
    // A URL atual está incorreta - você está apontando para a página do Replit, não para o endpoint /status
    fetch('https://b508e4e9-bb95-4ace-a5af-a62760d7a8d7-00-pfeq9qyw7ur3.picard.replit.dev/status')
    .then(response => response.json())
    .then(data => {
        // Atualizar a foto do perfil (se disponível)
        if (data.avatarUrl) {
            document.querySelector('.avatarImage').src = data.avatarUrl;
        }
        
        // Atualizar o status
        const statusImg = document.querySelector('.discordStatus');
        if (statusImg) {
            // Usar o caminho correto da imagem baseado no status
            switch(data.status) {
                case 'online': statusImg.src = '/img/online.png'; break;
                case 'idle': statusImg.src = '/img/idle.png'; break;
                case 'dnd': statusImg.src = '/img/dnd.png'; break;
                default: statusImg.src = '/img/offline.png';
            }
            console.log('Status atualizado para:', data.status);
        } else {
            console.error('Elemento .discordStatus não encontrado no DOM');
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