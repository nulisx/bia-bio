function atualizarPerfilDiscord(userId) {
    // Se nenhum userId for especificado, usar o ID da Bia por padrão
    const targetUserId = userId || '1263839346818289817';
    
    // Apenas funciona para o userId específico, sem precisar de site externo
    if (targetUserId !== '1263839346818289817') return;

    // Atualizar a foto do perfil (se disponível)
    const avatarImg = document.querySelector('.avatarImage');
    if (avatarImg) {
        // Discord avatar URL padrão (webp, tamanho 128)
        const avatarSrc = `https://cdn.discordapp.com/avatars/${targetUserId}/a_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX?size=128&t=${Date.now()}`;
        avatarImg.src = avatarSrc;
        console.log(`Avatar do usuário ${targetUserId} atualizado:`, avatarSrc);
    }
    
    // Atualizar o status
    const statusImg = document.querySelector('.discordStatus');
    if (statusImg) {
        statusImg.src = '/img/dnd.png';
        console.log(`Status do usuário ${targetUserId} atualizado para: dnd`);
    } else {
        console.error('Elemento .discordStatus não encontrado no DOM');
    }
    
    // Se você quiser mostrar o nome de usuário também
    const usernameElement = document.querySelector('.username');
    if (usernameElement) {
        usernameElement.textContent = 'Bia';
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
