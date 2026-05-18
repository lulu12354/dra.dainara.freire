document.addEventListener('DOMContentLoaded', () => {
    // 1. Captura Única de Elementos (Evita reflow e colisões de variáveis)
    const videoSection = document.getElementById('experiencia');
    const video = document.getElementById('bg-video');
    const audioBtn = document.getElementById('audio-toggle');
    const statusText = document.getElementById('audio-status');
    const copyBtns = document.querySelectorAll('.location-card__btn--copy');

    // Otimização de TBT: Envolvemos tarefas não-críticas para quando o navegador estiver ocioso
    const initNonCriticalTasks = () => {
        // 2. Lógica do Vídeo (Intersection Observer para Performance)
        if (videoSection && video) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        requestAnimationFrame(() => videoSection.classList.add('video-experience--unveiled'));
                        
                        // Tratamento da Promise para evitar erros no console (que gastam processamento)
                        const playPromise = video.play();
                        if (playPromise !== undefined) {
                            playPromise.catch(() => { /* Autoplay bloqueado silenciosamente */ });
                        }
                    } else {
                        video.pause();
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(videoSection);
        }

        // 4. Lógica de Cópia de Endereço
        if (copyBtns.length > 0) {
            copyBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const addressText = btn.getAttribute('data-address');
                    
                    navigator.clipboard.writeText(addressText).then(() => {
                        requestAnimationFrame(() => btn.classList.add('is-copied'));
                        setTimeout(() => {
                            requestAnimationFrame(() => btn.classList.remove('is-copied'));
                        }, 2000);
                    });
                });
            });
        }
    };

    // Executa as tarefas não críticas quando a thread principal estiver livre
    if ('requestIdleCallback' in window) {
        requestIdleCallback(initNonCriticalTasks);
    } else {
        setTimeout(initNonCriticalTasks, 1);
    }

    // 3. Lógica do Botão de Áudio (Mantido síncrono e fora do Idle pois requer resposta imediata ao clique)
    if (audioBtn && video && videoSection) {
        audioBtn.addEventListener('click', (e) => {
            e.preventDefault();
            video.muted = !video.muted;
            
            // rAF para evitar Layout Thrashing e garantir fluidez máxima
            requestAnimationFrame(() => {
                const isActive = videoSection.classList.toggle('video-experience--audio-on');
                if (statusText) statusText.textContent = isActive ? 'On' : 'Off';
                audioBtn.setAttribute('aria-pressed', isActive);
            });
        });
    }
});