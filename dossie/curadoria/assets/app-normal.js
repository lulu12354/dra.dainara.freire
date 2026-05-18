document.addEventListener('DOMContentLoaded', () => {
    // 1. Captura Única de Elementos (Evita reflow e colisões de variáveis)
    const videoSection = document.getElementById('experiencia');
    const video = document.getElementById('bg-video');
    const audioBtn = document.getElementById('audio-toggle');
    const statusText = document.getElementById('audio-status');
    const copyBtns = document.querySelectorAll('.location-card__btn--copy');
    
    /**
     * Função de alta performance para agendar atualizações no DOM.
     * Usa um 'double requestAnimationFrame' para garantir que as escritas (writes)
     * ocorram em um frame separado das leituras (reads), evitando "Reflow Forçado".
     * @param {Function} callback - A função que modifica o DOM.
     */
    const scheduleDOMUpdate = (callback) => {
        requestAnimationFrame(() => {
            requestAnimationFrame(callback);
        });
    };
    
    // Otimização de TBT: Envolvemos tarefas não-críticas para quando o navegador estiver ocioso
    const initNonCriticalTasks = () => {
        // 2. Lógica do Vídeo (Intersection Observer para Performance)
        if (videoSection && video) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        scheduleDOMUpdate(() => videoSection.classList.add('video-experience--unveiled'));
                        
                        const playPromise = video.play();
                        if (playPromise !== undefined) {
                            playPromise.catch(() => {});
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
                        scheduleDOMUpdate(() => btn.classList.add('is-copied'));
                        setTimeout(() => {
                            scheduleDOMUpdate(() => btn.classList.remove('is-copied'));
                        }, 2000); // 2 segundos para o feedback visual
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
            
            video.play().catch(() => {});
            
            // Agrupamos todas as atualizações de UI na função agendadora
            scheduleDOMUpdate(() => {
                const isAudioOn = !video.muted;
                videoSection.classList.toggle('video-experience--audio-on', isAudioOn);
                if (statusText) statusText.textContent = isAudioOn ? 'On' : 'Off';
                audioBtn.setAttribute('aria-pressed', String(isAudioOn));
            });
        });
    }
});