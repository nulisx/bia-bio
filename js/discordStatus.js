function atualizarPerfilDiscord() {
    // Fazer solicitação à API do seu bot hospedado no Replit
    fetch('https://seu-replit-url.replit.app/status')
    .then(response => response.json())
    .then(data => {
        // Atualizar a foto do perfil (se disponível)
        if (data.avatarUrl) {
            document.querySelector('.avatarImage').src = data.avatarUrl;
        }
        
        // Atualizar o status
        const statusImg = document.querySelector('.discordStatus');
        statusImg.src = data.statusImage;
    })
    .catch(error => {
        console.error('Erro ao buscar status:', error);
    });
}

// Chamar a função periodicamente para manter atualizado
setInterval(atualizarPerfilDiscord, 60000); // A cada minuto