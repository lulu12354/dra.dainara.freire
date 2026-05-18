// ==========================================================================
// BANCO DE DADOS DA CLÍNICA (Edite pacientes, laudos e imagens aqui)
// REGRA IMPORTANTE: Nunca coloque a extensão da imagem (.jpeg, .png, .webp) no caminho.
// O nosso "Motor" adicionará a extensão correta automaticamente para garantir nota 90+.
// ==========================================================================

const clinicData = [
    {
        sectionId: "harmonizacao",
        sectionNumber: "01",
        sectionTitle: "Harmonização <br><em>Facial</em>",
        sectionDesc: "O reequilíbrio arquitetônico dos terços da face. Restauramos a simetria sem perder a essência da identidade.",
        whatsappMsg: "Olá, Dra. Dainara! Vi os resultados do Dossiê de Harmonização Facial no seu site e gostaria de entender como a Ciência da Autoestima pode ser aplicada para restaurar as proporções do meu rosto. Poderia me passar informações sobre a avaliação?",
        patients: [
            {
                identity: { name: "Embreve", quote: "Embreve" },
                clinical: { id: "ID_409", tech: "ANG_106.5°", laudo: "Embreve" },
                media: {
                    bg: "/shared/img/img/protocolo/teste/ana-combinada",
                    before: "",
                    after: "",
                    combined: "/shared/img/img/protocolo/teste/ana-combinada"
                }
            }
        ]
    },
    {
        sectionId: "Arquitetura de Contornos",
        sectionNumber: "02",
        sectionTitle: "Arquitetura de <br><em> Contornos</em>",
        sectionDesc: "Definição estratégica dos pilares da face — malar, mandíbula e mento.",
        whatsappMsg: "Olá! Fiquei impressionado(a) com a técnica de Arquitetura de Contornos que vi no seu site. Gostaria de agendar uma consulta para analisar a estruturação do meu malar e mandíbula. Como funcionam os próximos passos?",
        patients: [
            {
                identity: { name: "Embreve", quote: "Embreve" },
                clinical: { id: "ID_550", tech: "ANG_106.5°", laudo: "Embreve" },
                media: {
                    bg: "assets/media/img/",
                    before: "assets/media/img/arquitetura/",
                    after: "assets/media/img/arquitetura/",
                    combined: ""
                }
            }
        ]
    },
    {
        sectionId: "rinomodelacao",
        sectionNumber: "03",
        sectionTitle: "Rinomodelação <br><em>Avançada</em>",
        sectionDesc: "A engenharia do perfil perfeito. Ajustes milimétricos no dorso e elevação da ponta nasal sem a necessidade de intervenção cirúrgica.",
        whatsappMsg: "Dra. Dainara, vi o capítulo de Rinomodelação Avançada no seu dossiê clínico. Tenho interesse em realizar ajustes milimétricos no meu perfil com essa técnica de engenharia nasal. Você teria disponibilidade para uma análise?",
        patients: [
            {
                identity: { name: "Gabriela", quote: "O ossinho no nariz sempre me fez odiar fotos de perfil. Eu tentava esconder de todo jeito." },
                clinical: { id: "ID_402", tech: "ANG_106.5°", laudo: "Retificação do dorso nasal com camuflagem de giba óssea e elevação da ponta." },
                media: {
                    bg: "assets/midia/img/resultados/rinomodelacao/gabriela-antes",
                    before: "assets/midia/img/resultados/rinomodelacao/gabriela-antes",
                    after: "assets/midia/img/resultados/rinomodelacao/gabriela-depois",
                    combined: ""
                }
            },
            {
                identity: { name: "Maria Eduarda", quote: "Fotos de perfil eram um desafio constante. O calo ósseo no nariz quebrava a harmonia que eu buscava." },
                clinical: { id: "ID_400", tech: "ANG_106.5°", laudo: "Retificação do dorso nasal com camuflagem de giba óssea e elevação da ponta." },
                media: {
                    bg: "assets/midia/img/resultados/rinomodelacao/maria-eduarda-antes",
                    before: "assets/midia/img/resultados/rinomodelacao/maria-eduarda-antes",
                    after: "assets/midia/img/resultados/rinomodelacao/maria-eduarda-depois",
                    combined: ""
                }
            }
        ]
    },
    {
        sectionId: "bioestimuladores",
        sectionNumber: "04",
        sectionTitle: "Banco de <br><em>Colágeno</em>",
        sectionDesc: "O despertar da firmeza. Induzimos a produção natural de colágeno da pele para um efeito de sustentação progressivo e duradouro.",
        whatsappMsg: "Olá! Estava navegando pelo seu site e li sobre o Banco de Colágeno. Gostaria de iniciar um protocolo de bioestimuladores para tratar a firmeza da minha pele e gostaria de saber mais sobre esse tratamento de sustentação progressiva.",
        patients: [
            {
                identity: { name: "Tainá Cipriano", quote: "A sensação de flacidez no rosto me dava uma fisionomia cansada que não combinava com minha energia." },
                clinical: { id: "ID_104", tech: "COL_300%", laudo: "Aplicação de bioestimulador de colágeno (Radiesse/Sculptra) focada no terço inferior para melhora da tração e firmeza tecidual." },
                media: {
                    bg: "assets/midia/img/resultados/colageno/taina-cipriano-antes",
                    before: "assets/midia/img/resultados/colageno/taina-cipriano-antes",
                    after: "assets/midia/img/resultados/colageno/taina-cipriano-depois",
                    combined: ""
                }
            }
        ]
    },
    {
        sectionId: "preenchimento-labial",
        sectionNumber: "05",
        sectionTitle: "Preenchimento <br><em>Labial</em>",
        sectionDesc: "Escultura e hidratação profunda. Desenhamos contornos precisos e devolvemos a projeção ideal com respeito à naturalidade da face.",
        whatsappMsg: "Olá, Dra. Dainara! Gostei muito da abordagem de naturalidade no seu Dossiê de Preenchimento Labial. Gostaria de agendar uma avaliação para trabalhar o contorno e a hidratação dos meus lábios seguindo esse conceito.",
        patients: [
            {
                identity: { name: "Rafaela", quote: "Eu sentia que meu rosto estava derretendo com o tempo, parecia sempre cansada." },
                clinical: { id: "ID_772", tech: "PHI_1.618", laudo: "Reestruturação do terço médio com 2ml de ácido hialurônico para sustentação malar, devolvendo o contorno perdido e eliminando o aspecto de cansaço." },
                media: {
                    bg: "assets/midia/img/resultados/labial/rafaela-antes",
                    before: "assets/midia/img/resultados/labial/rafaela-antes",
                    after: "assets/midia/img/resultados/labial/rafaela-depois",
                    combined: ""
                }
            }
        ]
    }
];