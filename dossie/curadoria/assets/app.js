document.addEventListener('DOMContentLoaded', () => {
    // 1. Captura Única de Elementos (Evita reflow e colisões de variáveis)
    const videoSection = document.getElementById('experiencia');
    const video = document.getElementById('bg-video');
    const audioBtn = document.getElementById('audio-toggle');
    const statusText = document.getElementById('audio-status');
    const copyBtns = document.querySelectorAll('.location-card__btn--copy');

    // 2. Lógica do Vídeo (Intersection Observer para Performance)
    if (videoSection && video) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    videoSection.classList.add('video-experience--unveiled');
                    video.play();
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(videoSection);
    }

    // 3. Lógica do Botão de Áudio
    if (audioBtn && video && videoSection) {
        audioBtn.addEventListener('click', (e) => {
            e.preventDefault();
            video.muted = !video.muted;
            
            // Alterna a classe e atualiza a interface
            const isActive = videoSection.classList.toggle('video-experience--audio-on');
            if (statusText) statusText.textContent = isActive ? 'On' : 'Off';
            audioBtn.setAttribute('aria-pressed', isActive);
        });
    }

    // 4. Lógica de Cópia de Endereço (Event Delegation otimizado)
    if (copyBtns.length > 0) {
        copyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const addressText = btn.getAttribute('data-address');
                
                navigator.clipboard.writeText(addressText).then(() => {
                    btn.classList.add('is-copied');
                    setTimeout(() => btn.classList.remove('is-copied'), 2000);
                });
            });
        });
    }
});