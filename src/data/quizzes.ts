export type QuizId = 'quiz-1' | 'quiz-2' | 'quiz-3';

export interface Option {
    id: 'A' | 'B' | 'C' | 'D';
    text: string;
    points: number;
}

export interface Question {
    id: number;
    text: string;
    options: Option[];
}

export interface ResultRange {
    min: number;
    max: number;
    status: string;
    description: string;
    nextStep: string;
    colorVar: string; // Ex: '--color-risk'
    bgVar: string; // Ex: '--color-risk-bg'
}

export interface Quiz {
    id: QuizId;
    title: string;
    subtitle: string;
    questions: Question[];
    results: ResultRange[];
}

export const quizzes: Record<QuizId, Quiz> = {
    'quiz-1': {
        id: 'quiz-1',
        title: 'Diagnóstico de Dependência',
        subtitle: 'Descubra se você está preso a um único caminho',
        questions: [
            {
                id: 1,
                text: 'Quando você recebe um caso de maxila atrófica, qual é sua primeira reação?',
                options: [
                    { id: 'A', text: 'Já penso direto em enxerto — é o que eu domino', points: 0 },
                    { id: 'B', text: 'Avalio se dá pra fazer enxerto ou encaminhar', points: 1 },
                    { id: 'C', text: 'Analiso algumas alternativas antes de decidir', points: 2 },
                    { id: 'D', text: 'Mapear múltiplas opções antes de decidir faz parte do meu processo', points: 3 },
                ]
            },
            {
                id: 2,
                text: 'Nos últimos 3 meses, quantos casos você deixou de fazer (ou encaminhou) por não ter segurança técnica?',
                options: [
                    { id: 'A', text: 'Mais de 5 casos', points: 0 },
                    { id: 'B', text: 'Entre 3 e 5 casos', points: 1 },
                    { id: 'C', text: 'Entre 1 e 2 casos', points: 2 },
                    { id: 'D', text: 'Nenhum — consigo resolver a maioria', points: 3 },
                ]
            },
            {
                id: 3,
                text: 'Se um paciente pergunta "Doutor, existe outra opção além do enxerto?", como você se sente?',
                options: [
                    { id: 'A', text: 'Desconfortável — não tenho muitas alternativas pra oferecer', points: 0 },
                    { id: 'B', text: 'Consigo explicar uma ou duas opções, mas sem muita segurança', points: 1 },
                    { id: 'C', text: 'Tenho algumas opções, mas gostaria de dominar mais', points: 2 },
                    { id: 'D', text: 'Seguro — consigo apresentar um leque de possibilidades', points: 3 },
                ]
            },
            {
                id: 4,
                text: 'Como você descreveria seu arsenal técnico atual para casos complexos?',
                options: [
                    { id: 'A', text: 'Limitado — basicamente enxertos e implantes convencionais', points: 0 },
                    { id: 'B', text: 'Razoável — conheço algumas técnicas mas não domino', points: 1 },
                    { id: 'C', text: 'Bom — tenho algumas opções que uso com frequência', points: 2 },
                    { id: 'D', text: 'Amplo — domino múltiplas técnicas e sei quando usar cada uma', points: 3 },
                ]
            },
            {
                id: 5,
                text: 'Quando surge uma complicação no meio de uma cirurgia, qual sua reação típica?',
                options: [
                    { id: 'A', text: 'Fico travado — geralmente não tenho plano B', points: 0 },
                    { id: 'B', text: 'Tento improvisar, mas nem sempre funciona', points: 1 },
                    { id: 'C', text: 'Tenho algumas alternativas, depende do caso', points: 2 },
                    { id: 'D', text: 'Já entro com planos A, B e C mapeados', points: 3 },
                ]
            },
            {
                id: 6,
                text: 'Se você pudesse resolver UM problema na sua prática clínica hoje, qual seria?',
                options: [
                    { id: 'A', text: 'Parar de depender tanto de enxertos demorados', points: 0 },
                    { id: 'B', text: 'Ter mais segurança para aceitar casos complexos', points: 1 },
                    { id: 'C', text: 'Aumentar meu repertório de técnicas', points: 2 },
                    { id: 'D', text: 'Aperfeiçoar o que já faço e ganhar mais previsibilidade', points: 3 },
                ]
            },
        ],
        results: [
            {
                min: 0,
                max: 6,
                status: '🔴 Zona de Risco',
                description: 'Você está preso a um único caminho. Sua prática atual depende muito de uma única abordagem — e isso está te limitando. Casos estão sendo perdidos, pacientes encaminhados, e a insegurança técnica está travando seu crescimento. A boa notícia? Você não precisa de mais cursos soltos. Precisa de um MÉTODO que te dê opções.',
                nextStep: 'Na próxima aula (Quarta, 04/02 às 20h), você vai descobrir O CAMINHO para sair dessa zona.',
                colorVar: '--color-risk',
                bgVar: '--color-risk-bg'
            },
            {
                min: 7,
                max: 12,
                status: '🟡 Em Desenvolvimento',
                description: 'Você já sabe que precisa de mais opções — mas ainda não tem um método. Você não está no zero. Já busca alternativas, já tenta se atualizar. Mas falta uma estrutura clara que conecte tudo isso em um sistema previsível. Você está no caminho certo, mas ainda operando com peças soltas.',
                nextStep: 'Na próxima aula (Quarta, 04/02 às 20h), vou mostrar como estruturar isso em 3 Pilares.',
                colorVar: '--color-dev',
                bgVar: '--color-dev-bg'
            },
            {
                min: 13,
                max: 18,
                status: '🟢 Pronto pra Evoluir',
                description: 'Você já tem consciência — agora precisa do método certo. Seu diagnóstico mostra que você entende a importância de ter opções e já não opera no "piloto automático". Isso te coloca à frente da maioria. O próximo passo é transformar essa consciência em um sistema estruturado de tomada de decisão.',
                nextStep: 'Na próxima aula (Quarta, 04/02 às 20h), você vai conhecer os 3 Pilares que vão organizar tudo isso.',
                colorVar: '--color-ready',
                bgVar: '--color-ready-bg'
            }
        ]
    },
    'quiz-2': {
        id: 'quiz-2',
        title: 'Mapa dos 3 Pilares',
        subtitle: 'Descubra qual pilar está travando sua evolução',
        questions: [
            {
                id: 1,
                text: 'Como você classificaria seu domínio TEÓRICO sobre técnicas avançadas (All-on-4, zigomático, pterigóide)?',
                options: [
                    { id: 'A', text: 'Superficial — ouvi falar mas nunca estudei a fundo', points: 0 },
                    { id: 'B', text: 'Básico — fiz um curso ou outro mas não fixou', points: 1 },
                    { id: 'C', text: 'Intermediário — entendo a teoria mas falta prática', points: 2 },
                    { id: 'D', text: 'Sólido — domino os conceitos e fundamentos', points: 3 },
                ]
            },
            {
                id: 2,
                text: 'Quando você assiste uma aula ou curso online, o que acontece depois?',
                options: [
                    { id: 'A', text: 'Esqueço a maior parte em poucas semanas', points: 0 },
                    { id: 'B', text: 'Lembro de alguns conceitos mas não aplico', points: 1 },
                    { id: 'C', text: 'Consigo aplicar parte do conteúdo', points: 2 },
                    { id: 'D', text: 'Tenho um sistema pra revisar e aplicar o que aprendo', points: 3 },
                ]
            },
            {
                id: 3,
                text: 'Antes de uma cirurgia complexa, qual seu nível de planejamento?',
                options: [
                    { id: 'A', text: 'Vou mais no feeling — confio na experiência', points: 0 },
                    { id: 'B', text: 'Faço um planejamento básico mental', points: 1 },
                    { id: 'C', text: 'Planejo com imagens mas sem simular cenários alternativos', points: 2 },
                    { id: 'D', text: 'Simulo múltiplos cenários e já tenho planos de contingência', points: 3 },
                ]
            },
            {
                id: 4,
                text: 'Você já treinou em modelos, cursos hands-on ou simuladores antes de executar uma técnica nova em paciente?',
                options: [
                    { id: 'A', text: 'Nunca — aprendo direto no paciente', points: 0 },
                    { id: 'B', text: 'Raramente — só quando surge oportunidade', points: 1 },
                    { id: 'C', text: 'Às vezes — quando é algo muito diferente', points: 2 },
                    { id: 'D', text: 'Sempre — não executo sem ter treinado antes', points: 3 },
                ]
            },
            {
                id: 5,
                text: 'Você já operou com supervisão/mentoria de alguém mais experiente em técnicas que estava aprendendo?',
                options: [
                    { id: 'A', text: 'Nunca — sempre aprendi sozinho', points: 0 },
                    { id: 'B', text: 'Uma ou duas vezes na faculdade/residência', points: 1 },
                    { id: 'C', text: 'Sim, em alguns cursos presenciais', points: 2 },
                    { id: 'D', text: 'Sim, tenho ou tive mentoria contínua', points: 3 },
                ]
            },
            {
                id: 6,
                text: 'Quando você tem dúvida sobre um caso complexo, o que você faz?',
                options: [
                    { id: 'A', text: 'Tento resolver sozinho ou encaminho', points: 0 },
                    { id: 'B', text: 'Pesquiso na internet / grupos de WhatsApp', points: 1 },
                    { id: 'C', text: 'Tenho alguns colegas que consulto informalmente', points: 2 },
                    { id: 'D', text: 'Tenho acesso a mentores/especialistas que me orientam', points: 3 },
                ]
            },
        ],
        results: [
            {
                min: 0,
                max: 6,
                status: '🔴 Zona de Risco',
                description: 'Seus 3 Pilares precisam de atenção urgente. O diagnóstico mostra gaps importantes em Conhecimento, Simulação e Experiência Guiada. Você está tentando evoluir sem a base necessária — é como construir um prédio sem fundação. Não é falta de vontade. É falta de MÉTODO.',
                nextStep: 'Na próxima aula (Quinta, 05/02 às 20h), vou revelar os 5 ERROS que estão te travando — e como evitá-los.',
                colorVar: '--color-risk',
                bgVar: '--color-risk-bg'
            },
            {
                min: 7,
                max: 12,
                status: '🟡 Em Desenvolvimento',
                description: 'Você tem alguns pilares mais fortes que outros — e isso cria desequilíbrio. Provavelmente você investe em conhecimento (cursos, conteúdos) mas falta simulação prática. Ou tem experiência mas falta atualização teórica. Esse desequilíbrio trava sua evolução.',
                nextStep: 'Na próxima aula (Quinta, 05/02 às 20h), você vai descobrir os erros que mantêm esse desequilíbrio.',
                colorVar: '--color-dev',
                bgVar: '--color-dev-bg'
            },
            {
                min: 13,
                max: 18,
                status: '🟢 Pronto pra Evoluir',
                description: 'Seus pilares estão bem estruturados — você está pronto pro próximo nível. Seu diagnóstico mostra que você já entende a importância de Conhecimento + Simulação + Experiência Guiada. Você não é mais iniciante. O próximo passo é acelerar essa evolução com o método certo.',
                nextStep: 'Na próxima aula (Quinta, 05/02 às 20h), vou mostrar os 5 erros que travam ATÉ profissionais experientes.',
                colorVar: '--color-ready',
                bgVar: '--color-ready-bg'
            }
        ]
    },
    'quiz-3': {
        id: 'quiz-3',
        title: 'Termômetro dos 5 Erros',
        subtitle: 'Descubra o que está sabotando sua evolução',
        questions: [
            {
                id: 1,
                text: '"Minha realidade é diferente" — Você já usou essa frase pra justificar por que uma técnica não funcionaria pra você?',
                options: [
                    { id: 'A', text: 'Sim, sempre — meus pacientes e estrutura são diferentes', points: 0 },
                    { id: 'B', text: 'Frequentemente — acho que minha cidade/público é diferente', points: 1 },
                    { id: 'C', text: 'Às vezes penso isso, mas tento adaptar', points: 2 },
                    { id: 'D', text: 'Raramente — sei que é mais sobre método do que contexto', points: 3 },
                ]
            },
            {
                id: 2,
                text: 'Você já tentou aplicar uma técnica avançada "pulando etapas" do aprendizado?',
                options: [
                    { id: 'A', text: 'Sim — fui direto pro avançado sem dominar o básico', points: 0 },
                    { id: 'B', text: 'Já tentei acelerar algumas vezes', points: 1 },
                    { id: 'C', text: 'Às vezes pulo quando me sinto confiante', points: 2 },
                    { id: 'D', text: 'Não — respeito a sequência de aprendizado', points: 3 },
                ]
            },
            {
                id: 3,
                text: 'Como está sua formação hoje: mais parecida com um MÉTODO estruturado ou com PEÇAS SOLTAS?',
                options: [
                    { id: 'A', text: 'Totalmente peças soltas — cursos aleatórios sem conexão', points: 0 },
                    { id: 'B', text: 'Mais peças soltas do que método', points: 1 },
                    { id: 'C', text: 'Meio a meio — tenho alguma estrutura', points: 2 },
                    { id: 'D', text: 'Tenho um método claro que conecta tudo', points: 3 },
                ]
            },
            {
                id: 4,
                text: 'Você já adiou uma decisão de investir na sua evolução esperando o "momento perfeito"?',
                options: [
                    { id: 'A', text: 'Sempre — nunca é o momento certo', points: 0 },
                    { id: 'B', text: 'Frequentemente — espero sobrar tempo/dinheiro', points: 1 },
                    { id: 'C', text: 'Às vezes adio, mas acabo fazendo', points: 2 },
                    { id: 'D', text: 'Não — quando decido, executo', points: 3 },
                ]
            },
            {
                id: 5,
                text: 'Você está tentando evoluir sozinho ou tem algum tipo de mentoria/acompanhamento?',
                options: [
                    { id: 'A', text: 'Totalmente sozinho — nunca tive mentor', points: 0 },
                    { id: 'B', text: 'Sozinho, mas assisto conteúdos online', points: 1 },
                    { id: 'C', text: 'Tenho alguns colegas que troco ideia', points: 2 },
                    { id: 'D', text: 'Tenho ou busco mentoria estruturada', points: 3 },
                ]
            },
            {
                id: 6,
                text: 'Olhando pra sua jornada dos últimos 2 anos, você diria que está evoluindo no ritmo que gostaria?',
                options: [
                    { id: 'A', text: 'Não — sinto que estou estagnado', points: 0 },
                    { id: 'B', text: 'Pouco — evoluo devagar demais', points: 1 },
                    { id: 'C', text: 'Razoável — mas poderia ser mais rápido', points: 2 },
                    { id: 'D', text: 'Sim — estou satisfeito com minha evolução', points: 3 },
                ]
            },
        ],
        results: [
            {
                min: 0,
                max: 6,
                status: '🔴 Zona de Risco',
                description: 'Você está cometendo vários dos 5 erros — e isso explica por que se sente travado. Não é falta de capacidade. É um padrão de comportamentos que sabota sua evolução sem você perceber: esperar o momento perfeito, pular etapas, aprender sozinho...',
                nextStep: 'Domingo (08/02 às 20h) — Vou apresentar O PLANO completo pra você sair dessa zona.',
                colorVar: '--color-risk',
                bgVar: '--color-risk-bg'
            },
            {
                min: 7,
                max: 12,
                status: '🟡 Em Desenvolvimento',
                description: 'Você reconhece alguns erros — e isso já te coloca em vantagem. Você não está no piloto automático. Já percebe que algumas coisas precisam mudar. Mas entre perceber e AGIR existe um gap que só um método estruturado resolve.',
                nextStep: 'Domingo (08/02 às 20h) — Vou mostrar O CAMINHO pra transformar consciência em resultado.',
                colorVar: '--color-dev',
                bgVar: '--color-dev-bg'
            },
            {
                min: 13,
                max: 18,
                status: '🟢 Pronto pra Evoluir',
                description: 'Você está consciente e pronto — só falta o veículo certo. Seu diagnóstico mostra que você já evita a maioria dos erros comuns. Você entende a importância de método, mentoria e consistência. Está no grupo dos que realmente podem acelerar.',
                nextStep: 'Domingo (08/02 às 20h) — Vou apresentar a oportunidade que você estava esperando.',
                colorVar: '--color-ready',
                bgVar: '--color-ready-bg'
            }
        ]
    }
};
