// Função para criar a lockscreen
function criarLockscreen() {
    // Criar elemento da lockscreen
    const lockscreen = document.createElement('div');
    lockscreen.id = 'lockscreen';
    lockscreen.classList.add('lockscreen');
    
    // Criar conteúdo interno da lockscreen
    const lockContent = document.createElement('div');
    lockContent.classList.add('lock-content');
    
    // Adicionar avatar na lockscreen também
    const avatarClone = document.createElement('img');
    avatarClone.src = '/img/bia.jpg';
    avatarClone.classList.add('lock-avatar');
    
    // Texto para clicar
    const clickText = document.createElement('div');
    clickText.classList.add('click-text');
    clickText.innerHTML = '[ click to unlock ]';
    
    // Montar estrutura
    lockContent.appendChild(avatarClone);
    lockContent.appendChild(clickText);
    lockscreen.appendChild(lockContent);
    
    // Adicionar ao body antes de qualquer outro conteúdo
    document.body.insertBefore(lockscreen, document.body.firstChild);
    
    // Esconder o conteúdo principal
    const container = document.getElementById('container');
    if (container) {
      container.style.opacity = '0';
      container.style.visibility = 'hidden';
      container.style.transition = 'opacity 1s ease, visibility 0s linear 1s';
    }
    
    // Garantir que os elementos para animar estejam inicialmente ocultos
    const elementosParaAnimar = document.querySelectorAll('.elemento-para-animar');
    elementosParaAnimar.forEach(elemento => {
      elemento.style.opacity = '0';
      elemento.style.transform = 'translateY(20px)';
      // Garantir que não haja animação automática
      elemento.classList.remove('animate-fade-in');
    });
    
    // Evento de clique para desbloquear
    let desbloqueado = false; // Flag para evitar múltiplas execuções
    lockscreen.addEventListener('click', () => {
      if (desbloqueado) return; // Se já foi desbloqueado, não faz nada
      desbloqueado = true; // Marca como desbloqueado

      // Animar a saída da lockscreen
      lockscreen.classList.add('unlock');
      
      // Mostrar o conteúdo principal com fade após a animação da lockscreen
      setTimeout(() => {
        if (container) {
          container.style.visibility = 'visible';
          container.style.opacity = '1';
          container.style.transition = 'opacity 1s ease';
        }
        
        // Executar animação dos elementos após desbloqueio
        setTimeout(() => {
          iniciarAnimacaoElementos(); // Chama a função de animação após o desbloqueio
        }, 300); // Pequeno delay para deixar o container aparecer primeiro
        
        // Remover lockscreen após completar a animação
        setTimeout(() => {
          lockscreen.remove();
        }, 1000);
      }, 500);
    });
  }
  
  // Animar elementos com classe "elemento-para-animar"
  function iniciarAnimacaoElementos() {
    const elementos = document.querySelectorAll('.elemento-para-animar');
    
    elementos.forEach((elemento, index) => {
      setTimeout(() => {
        elemento.style.opacity = '1';
        elemento.style.transform = 'translateY(0)';
        elemento.classList.add('animate-fade-in');
        elemento.style.animationDelay = `${index * 0.15}s`; // Delay crescente
      }, 200 * index);
    });
  }
  
  // Executar quando o documento estiver pronto
  document.addEventListener('DOMContentLoaded', () => {
    criarLockscreen();
  });