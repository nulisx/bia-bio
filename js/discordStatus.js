// Este é um pseudocódigo simplificado
function atualizarPerfilDiscord() {
    // Fazer solicitação à API do Discord com o token de autorização
    fetch('https://discord.com/api/v10/users/874517110678765618', {
        headers: {
            'Authorization': 'Bot SEU_TOKEN_AQUI'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Atualizar a foto do perfil
        document.querySelector('.avatarImage').src = `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png?size=2048`;
        
        // Atualizar o status (se estiver disponível na resposta da API)
        const statusImg = document.querySelector('.discordStatus');
        if (data.status === 'online') statusImg.src = '/img/online.png';
        else if (data.status === 'idle') statusImg.src = '/img/idle.png';
        else if (data.status === 'dnd') statusImg.src = '/img/dnd.png';
        else statusImg.src = '/img/offline.png';
    });
}

// Chamar a função periodicamente para manter atualizado
setInterval(atualizarPerfilDiscord, 60000); // A cada minuto