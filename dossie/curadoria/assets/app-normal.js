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

            // RE-VALIDAÇÃO DE PLAYBACK:
            // Mesmo que o vídeo já esteja em loop, muitos navegadores exigem uma
            // chamada `play()` dentro do mesmo evento de clique que desativa o 'muted'
            // para permitir a reprodução com som.
            video.play().catch(() => {
                // Se falhar, é provável que o vídeo não tenha áudio.
                // Silenciamos o erro para não quebrar a experiência.
            });

            // rAF para evitar Layout Thrashing e garantir fluidez máxima
            requestAnimationFrame(() => {
                const isAudioOn = !video.muted;
                videoSection.classList.toggle('video-experience--audio-on', isAudioOn);
                if (statusText) statusText.textContent = isAudioOn ? 'On' : 'Off';
                audioBtn.setAttribute('aria-pressed', isAudioOn);
            });
        });
    }
});