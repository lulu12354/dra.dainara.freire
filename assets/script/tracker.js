(function () {
    // ==========================================
    // 1. DADOS DO CLIENTE (MODO DE TESTE)
    // ==========================================
    const CONFIG = {
        url: "https://cli-02-dainarafreire.frontlabstudio.workers.dev",
        timeout: 2000, // Aumentado para 2000ms para garantir a entrega durante testes
        cooldownHoras: 0 // ZERADO: Permite cliques contínuos sem bloqueio
    };

    // ==========================================
    // 2. MOTOR RASTREADOR (TRAVAS REMOVIDAS)
    // ==========================================
    document.addEventListener("click", async function (e) {
        const target = e.target.closest('[data-track="true"]');
        if (!target) return;

        const coluna = target.getAttribute("data-coluna");
        const href = target.getAttribute("href");
        const isBlank = target.getAttribute("target") === "_blank";

        if (!coluna) return;

        if (!isBlank && href && href !== '#') {
            e.preventDefault();
        }

        // [MUDANÇA]: Toda a lógica de bloqueio por localStorage (tempoBloqueioMs, lastClick) 
        // foi completamente removida aqui para garantir 100% de passagem livre.
        console.log(`[Frontlab Teste] Disparando evento para coluna: ${coluna}`);

        try {
            const fetchPromise = fetch(CONFIG.url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ [coluna]: 1 }),
                keepalive: true
            });

            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Timeout')), CONFIG.timeout)
            );

            await Promise.race([fetchPromise, timeoutPromise]);
            console.log(`[Frontlab Teste] Requisição disparada com sucesso!`);
        } catch (err) {
            console.warn("[Frontlab Teste] Timeout atingido ou log processado silenciosamente.");
        } finally {
            liberarNavegacao(isBlank, href);
        }
    });

    function liberarNavegacao(isBlank, href) {
        if (!isBlank && href && href !== '#') {
            window.location.href = href;
        }
    }
})();