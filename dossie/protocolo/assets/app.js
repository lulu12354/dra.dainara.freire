"use strict";

// Gerenciamento do Vídeo Hero (Autoplay)
window.addEventListener("load", () => {
    const heroVideo = document.getElementById("hero-video");
    if (heroVideo) {
        const playVideo = () => {
            heroVideo.play().catch(() => console.log("Autoplay em espera."));
        };
        if ("requestIdleCallback" in window) {
            requestIdleCallback(playVideo);
        } else {
            setTimeout(playVideo, 500);
        }
    }
});

// Lógica Principal do Dossiê
document.addEventListener("DOMContentLoaded", () => {
    const dossierContainer = document.getElementById("dossier-container");

    if (!dossierContainer || typeof clinicData === "undefined") return;

    // 1. Função de Renderização com Lazy-Loading (Intersection Observer)
    const renderDossier = () => {
        const fragment = document.createDocumentFragment();

        // Criamos o Observador: ele vigia quando as seções vazias entram na tela
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const section = entry.target;
                    const index = section.getAttribute("data-index");
                    const data = clinicData[index];

                    // Só montamos o HTML interno quando o usuário chega perto (400px de margem)
                    let htmlContent = `
                        <div class="dossier-chapter__container">
                            <header class="dossier-chapter__intro">
                                <div class="dossier-chapter__sticky">
                                    <span class="dossier-chapter__number">${data.sectionNumber}</span>
                                    <h2 class="dossier-chapter__title" id="title-${data.sectionId}">
                                        ${data.sectionTitle}
                                    </h2>
                                    <p class="dossier-chapter__desc">${data.sectionDesc}</p>
                                    <div class="dossier-chapter__scroll-hint" aria-hidden="true">
                                        <span>Deslize para explorar</span>
                                        <div class="dossier-chapter__scroll-line"></div>
                                    </div>
                                </div>
                            </header>
                            <div class="dossier-chapter__track">`;

                    data.patients.forEach(patient => {
                        const patientData = encodeURIComponent(JSON.stringify(patient));
                        const background = patient.media.bg || patient.media.combined || patient.media.before || "assets/midia/fallback-bg";

                        htmlContent += `
                            <button class="mystery-card" aria-label="Analisar ${patient.identity.name}" data-patient="${patientData}">
                                <div class="mystery-card__bg">
                                    <picture>
                                        <source srcset="${background}.avif" type="image/avif">
                                        <source srcset="${background}.webp" type="image/webp">
                                        <img src="${background}.jpeg" alt="" loading="lazy" decoding="async" width="400" height="550">
                                    </picture>
                                </div>
                                <div class="mystery-card__glass">
                                    <header class="mystery-card__meta">
                                        <span>${patient.clinical.id}</span>
                                        <span>${patient.clinical.tech}</span>
                                    </header>
                                    <div class="mystery-card__body">
                                        <h3 class="mystery-card__name">${patient.identity.name}</h3>
                                        <p class="mystery-card__quote">"${patient.identity.quote}"</p>
                                    </div>
                                    <footer class="mystery-card__footer">
                                        <span class="mystery-card__action-text">Analisar Dossiê</span>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="mystery-card__icon" aria-hidden="true">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </footer>
                                </div>
                            </button>`;
                    });

                    htmlContent += `</div></div>`;
                    const cleanTitle = data.sectionTitle.replace(/<[^>]*>?/gm, '');

                    htmlContent += `
                            <div class="dossier-chapter__cta">
                                <a href="https://wa.me/554497739970?text=${encodeURIComponent(data.whatsappMsg)}" 
                                   target="_blank" 
                                   rel="noopener noreferrer" 
                                   class="btn-whatsapp tracking-whatsapp-lead" 
                                   id="cta-whats-capitulo-${data.sectionId}"
                                   aria-label="Agendar avaliação para ${cleanTitle} no WhatsApp" 
                                   data-track="true" 
                                   data-coluna="conv_whatsapp">
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                                    </svg>
                                    <span>Agendar Avaliação</span>
                                </a>
                            </div>
                        </div>`; // Fecha o dossier-chapter__container
                    // Injeta o conteúdo e para de observar esta seção
                    section.innerHTML = htmlContent;
                    obs.unobserve(section);
                }
            });
        }, { rootMargin: "400px" }); // Antecipa o carregamento em 400px

        // Cria inicialmente apenas as "cascas" (seções vazias)
        clinicData.forEach((sectionData, index) => {
            const section = document.createElement("section");
            section.className = "dossier-chapter";
            section.id = sectionData.sectionId;
            section.setAttribute("aria-labelledby", `title-${sectionData.sectionId}`);
            section.setAttribute("data-index", index);

            fragment.appendChild(section);
            observer.observe(section); // Começa a vigiar esta seção
        });

        dossierContainer.appendChild(fragment);
    };

    // 2. Injeção do HTML do Modal
    const injectModalMarkup = () => {
        const modalHTML = `
            <div class="dossier-modal" id="dossier-modal" aria-hidden="true">
                <div class="dossier-modal__overlay" id="close-modal-bg"></div>
                <div class="dossier-modal__content" role="dialog" aria-modal="true" aria-labelledby="modal-name">
                    <button class="dossier-modal__close" id="close-modal-btn" aria-label="Fechar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                    </button>
                    <div class="dossier-modal__body">
                        <div class="dossier-modal__gallery" id="modal-gallery">
                            <div class="dossier-modal__photo" id="modal-photo-antes">
                                <span class="dossier-modal__tag">Antes</span>
                                <picture>
                                    <source id="modal-avif-antes" srcset="" type="image/avif">
                                    <source id="modal-webp-antes" srcset="" type="image/webp">
                                    <img src="" id="modal-img-antes" alt="" loading="lazy" width="800" height="1000">
                                </picture>
                            </div>
                            <div class="dossier-modal__photo" id="modal-photo-depois">
                                <span class="dossier-modal__tag">Depois</span>
                                <picture>
                                    <source id="modal-avif-depois" srcset="" type="image/avif">
                                    <source id="modal-webp-depois" srcset="" type="image/webp">
                                    <img src="" id="modal-img-depois" alt="" loading="lazy" width="800" height="1000">
                                </picture>
                            </div>
                            <div class="dossier-modal__photo" id="modal-photo-combined" style="display: none;">
                                <picture>
                                    <source id="modal-avif-combined" srcset="" type="image/avif">
                                    <source id="modal-webp-combined" srcset="" type="image/webp">
                                    <img src="" id="modal-img-combined" alt="" loading="lazy" width="800" height="1000">
                                </picture>
                            </div>
                        </div>
                        <div class="dossier-modal__info">
                            <h3 class="dossier-modal__name" id="modal-name"></h3>
                            <p class="dossier-modal__laudo" id="modal-laudo"></p>
                        </div>
                    </div>
                </div>
            </div>`;
        document.body.insertAdjacentHTML("beforeend", modalHTML);
    };

    // 3. Configuração do Modal
    const setupModalLogic = () => {
        const modal = document.getElementById("dossier-modal");
        const modalName = document.getElementById("modal-name");
        const modalLaudo = document.getElementById("modal-laudo");
        const imgAntes = document.getElementById("modal-img-antes");
        const imgDepois = document.getElementById("modal-img-depois");
        const imgCombined = document.getElementById("modal-img-combined");
        const photoAntes = document.getElementById("modal-photo-antes");
        const photoDepois = document.getElementById("modal-photo-depois");
        const photoCombined = document.getElementById("modal-photo-combined");
        const gallery = document.getElementById("modal-gallery");

        const openModal = (data) => {
            modalName.innerText = data.identity.name;
            modalLaudo.innerText = data.clinical.laudo;

            if (data.media.combined) {
                gallery.classList.add("is-single");
                photoAntes.style.display = "none";
                photoDepois.style.display = "none";
                photoCombined.style.display = "block";

                document.getElementById("modal-avif-combined").srcset = data.media.combined + ".avif";
                document.getElementById("modal-webp-combined").srcset = data.media.combined + ".webp";
                imgCombined.src = data.media.combined + ".jpeg";
            } else {
                gallery.classList.remove("is-single");
                photoAntes.style.display = "block";
                photoDepois.style.display = "block";
                photoCombined.style.display = "none";

                document.getElementById("modal-avif-antes").srcset = data.media.before + ".avif";
                document.getElementById("modal-webp-antes").srcset = data.media.before + ".webp";
                imgAntes.src = data.media.before + ".jpeg";

                document.getElementById("modal-avif-depois").srcset = data.media.after + ".avif";
                document.getElementById("modal-webp-depois").srcset = data.media.after + ".webp";
                imgDepois.src = data.media.after + ".jpeg";
            }

            document.body.style.overflow = "hidden";
            modal.classList.add("is-active");
            modal.setAttribute("aria-hidden", "false");
        };

        const closeModal = () => {
            modal.classList.remove("is-active");
            modal.setAttribute("aria-hidden", "true");
            document.body.style.overflow = "";
            setTimeout(() => {
                // Limpa a tag img
                imgAntes.src = imgDepois.src = imgCombined.src = "";

                // Limpa as tags source (avif e webp)
                document.getElementById("modal-avif-antes").srcset = "";
                document.getElementById("modal-webp-antes").srcset = "";
                document.getElementById("modal-avif-depois").srcset = "";
                document.getElementById("modal-webp-depois").srcset = "";
                document.getElementById("modal-avif-combined").srcset = "";
                document.getElementById("modal-webp-combined").srcset = "";
            }, 400);
        };

        // Escuta cliques no container (funciona mesmo para conteúdo injetado depois)
        dossierContainer.addEventListener("click", (e) => {
            // 1. Força o tracking de conversão (Garante o registro mesmo em botões gerados dinamicamente)
            const btnWhats = e.target.closest('.btn-whatsapp');
            if (btnWhats && btnWhats.getAttribute("data-track") === "true") {
                if (typeof window.dataLayer !== 'undefined') {
                    window.dataLayer.push({
                        'event': 'track_conversion',
                        'coluna': btnWhats.getAttribute("data-coluna") || 'conv_whatsapp'
                    });
                }
            }

            // 2. Abertura do Modal dos Cards
            const card = e.target.closest(".mystery-card");
            if (card) {
                const data = JSON.parse(decodeURIComponent(card.getAttribute("data-patient")));
                openModal(data);
            }
        });

        document.getElementById("close-modal-btn").addEventListener("click", closeModal);
        document.getElementById("close-modal-bg").addEventListener("click", closeModal);
    };

    renderDossier();
    injectModalMarkup();
    setupModalLogic();
});