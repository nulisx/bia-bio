function atualizarPerfilDiscord(userId) {
    // Se nenhum userId for especificado, usar o ID da Bia por padrão
    const targetUserId = userId || '1263839346818289817';
    
    // Atualizar a foto do perfil (somente para o userId específico)
    const avatarImg = document.querySelector('.avatarImage');
    if (avatarImg && targetUserId === '1263839346818289817') {
        // Adicionar parâmetro de tempo para evitar cache
        const avatarSrc = '/img/revoke-avatar.png?t=' + Date.now();
        avatarImg.src = avatarSrc;
        console.log(`Avatar do usuário ${targetUserId} atualizado:`, avatarSrc);
    }
    
    // Atualizar o status (somente para o userId específico)
    const statusImg = document.querySelector('.discordStatus');
    if (statusImg && targetUserId === '1263839346818289817') {
        statusImg.src = '/img/online.png';
        console.log(`Status do usuário ${targetUserId} atualizado para: online`);
    } else if (!statusImg) {
        console.error('Elemento .discordStatus não encontrado no DOM');
    }
    
    // Mostrar o nome de usuário também
    const usernameElement = document.querySelector('.username');
    if (usernameElement && targetUserId === '1263839346818289817') {
        usernameElement.textContent = 'Revoke';
    }
}

// Determinar qual usuário monitorar com base na página
function determinarUsuarioPagina() {
    // Você pode usar diferentes métodos para determinar qual usuário exibir
    // Por exemplo, baseado na URL ou em algum elemento na página
    
    // Exemplo: verificar se estamos na página específica do seu perfil
    const currentPath = window.location.pathname;
    if (currentPath.includes('meuperfil') || currentPath.includes('perfil2')) {
        // Seu ID de usuário
        return '682694935631233203';
    }
    
    // Por padrão, retornar o ID da Bia
    return '1263839346818289817';
}

// Forçar atualização completa quando o documento carrega
document.addEventListener('DOMContentLoaded', function() {
    // Limpar qualquer cache de imagem que possa existir
    const avatarImg = document.querySelector('.avatarImage');
    if (avatarImg) {
        avatarImg.src = '';
    }
    
    // Determinar qual usuário monitorar
    const userId = determinarUsuarioPagina();
    
    // Chamar a função para atualizar
    atualizarPerfilDiscord(userId);
    
    // Chamar a função periodicamente para manter atualizado
    setInterval(() => atualizarPerfilDiscord(userId), 5000); // 5sec
});

// Adicionar evento de clique manual para forçar atualização
const avatarImg = document.querySelector('.avatarImage');
if (avatarImg) {
    avatarImg.addEventListener('click', function() {
        console.log('Atualizando avatar manualmente...');
        const userId = determinarUsuarioPagina();
        atualizarPerfilDiscord(userId);
    });
}
