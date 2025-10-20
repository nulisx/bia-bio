function atualizarPerfilDiscord(userId) {
    // Se nenhum userId for especificado, usar o ID da Bia por padrão
    const targetUserId = userId || '1263839346818289817';
    
    // URL atualizada para apontar para o endpoint específico do usuário
    fetch(`https://discorduserstatus-2-0.onrender.com/status/${targetUserId}`)
    .then(response => response.json())
    .then(data => {
        // Atualizar a foto do perfil (se disponível)
        const avatarImg = document.querySelector('.avatarImage');
        if (avatarImg && data.avatarUrl) {
            avatarImg.src = data.avatarUrl;
            console.log(`Avatar do usuário ${targetUserId} atualizado:`, data.avatarUrl);
        }
        
        // Atualizar o status
        const statusImg = document.querySelector('.discordStatus');
        if (statusImg) {
            // Usar o caminho correto da imagem baseado no status
            switch(data.status) {
                case 'online': statusImg.src = '/img/online.png'; break;
                case 'idle': statusImg.src = '/img/idle.png'; break;
                case 'offline': statusImg.src = '/img/offline.png'; break;
                default: statusImg.src = '/img/dnd.png';
            }
            console.log(`Status do usuário ${targetUserId} atualizado para:`, data.status);
        } else {
            console.error('Elemento .discordStatus não encontrado no DOM');
        }
        
        // Se você quiser mostrar o nome de usuário também
        const usernameElement = document.querySelector('.username');
        if (usernameElement && data.username) {
            usernameElement.textContent = data.username;
        }
    })
    .catch(error => {
        console.error('Erro ao buscar status:', error);
        // Adicionar tratamento de erro mais visível para debugging
        const statusElement = document.querySelector('.status-debugging');
        if (statusElement) {
            statusElement.textContent = 'Erro ao conectar: ' + error.message;
            statusElement.style.color = 'red';
        }
    });
}

// Determinar qual usuário monitorar com base na página
function determinarUsuarioPagina() {
    // Você pode usar diferentes métodos para determinar qual usuário exibir
    // Por exemplo, baseado na URL ou em algum elemento na página
    
    // Exemplo: verificar se estamos na página específica do seu perfil
    const currentPath = window.location.pathname;
    if (currentPath.includes('meuperfil') || currentPath.includes('perfil2')) {
        // Seu ID de usuário
        return '1263839346818289817';
    }
    
    // Por padrão, retornar o ID da Bia
    return '1263839346818289817';
}

// Chamar a função imediatamente ao carregar com o ID correto
const userId = determinarUsuarioPagina();
atualizarPerfilDiscord(userId);

// Chamar a função periodicamente para manter atualizado
setInterval(() => atualizarPerfilDiscord(userId), 5000); // 5sec
