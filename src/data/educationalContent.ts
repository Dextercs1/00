export interface Ingredient {
  id: string;
  name: string;
  icon: string;
  description: string;
  benefits: string[];
  tip: string;
  curiosity: string;
}

export interface MythTruth {
  id: string;
  statement: string;
  isTrue: boolean;
  explanation: string;
}

export interface DidYouKnow {
  id: string;
  fact: string;
  icon: string;
}

export const ingredients: Ingredient[] = [
  {
    id: "gengibre",
    name: "Gengibre",
    icon: "🫚",
    description:
      "Raiz milenar utilizada na medicina tradicional de diversas culturas. O gengibre contém gingerol, um composto bioativo com propriedades anti-inflamatórias e antioxidantes amplamente estudadas pela ciência moderna.",
    benefits: [
      "Pode auxiliar na aceleração do metabolismo, segundo estudos publicados em revistas de nutrição",
      "Estudos sugerem que possui propriedades anti-inflamatórias naturais",
      "Pode contribuir para a melhora da digestão e redução de náuseas",
      "Pesquisas indicam um possível efeito termogênico, que pode favorecer a queima calórica",
    ],
    tip: "Para potencializar os efeitos, rale o gengibre fresco diretamente na água quente e deixe em infusão por 5 a 10 minutos. Adicionar algumas gotas de limão pode melhorar a absorção de nutrientes.",
    curiosity:
      "O gengibre é usado há mais de 5.000 anos na medicina ayurvédica e na medicina tradicional chinesa. Ele era tão valorizado na Europa medieval que uma libra de gengibre custava o mesmo que uma ovelha.",
  },
  {
    id: "hibisco",
    name: "Hibisco",
    icon: "🌺",
    description:
      "A flor de hibisco (Hibiscus sabdariffa) produz uma infusão de cor vibrante e sabor levemente ácido. É rica em antocianinas, flavonoides e ácidos orgânicos que têm sido objeto de diversas pesquisas científicas.",
    benefits: [
      "Estudos sugerem que pode auxiliar no controle da pressão arterial",
      "Pesquisas indicam um potencial efeito diurético natural, ajudando a reduzir a retenção de líquidos",
      "Rico em antioxidantes que podem contribuir para o combate aos radicais livres",
      "Algumas pesquisas apontam que pode auxiliar no controle dos níveis de colesterol",
    ],
    tip: "Utilize água em temperatura de aproximadamente 100°C e deixe as flores em infusão por 5 a 8 minutos. O chá pode ser consumido quente ou gelado. Evite adoçar para manter os benefícios integrais.",
    curiosity:
      "No Egito, o chá de hibisco é conhecido como 'karkadé' e é considerado a bebida dos faraós. Em diversos países da América Latina e do Caribe, ele é consumido como refresco gelado.",
  },
  {
    id: "canela",
    name: "Canela",
    icon: "🫕",
    description:
      "Especiaria obtida da casca interna de árvores do gênero Cinnamomum. A canela é rica em cinamaldeído, o composto responsável pelo seu aroma característico e por diversas propriedades investigadas pela ciência.",
    benefits: [
      "Estudos sugerem que pode auxiliar na regulação dos níveis de glicose no sangue",
      "Pesquisas indicam propriedades antioxidantes e anti-inflamatórias",
      "Pode contribuir para a sensação de saciedade, auxiliando no controle do apetite",
      "Alguns estudos apontam que pode ajudar a melhorar a sensibilidade à insulina",
    ],
    tip: "Use a canela em pau para preparar infusões, fervendo por cerca de 10 minutos em fogo baixo. Combina muito bem com gengibre e cravo para um chá termogênico. Prefira a canela do tipo Ceilão (canela verdadeira).",
    curiosity:
      "Na antiguidade, a canela era mais valiosa que o ouro. Os comerciantes árabes mantinham suas rotas de origem em segredo, criando lendas fantásticas sobre pássaros gigantes que guardavam os caneleiros.",
  },
  {
    id: "curcuma",
    name: "Cúrcuma (Açafrão-da-terra)",
    icon: "🟡",
    description:
      "Raiz da família do gengibre, conhecida pela sua cor amarelo-dourada intensa. O principal composto ativo é a curcumina, amplamente estudada por suas propriedades anti-inflamatórias e antioxidantes.",
    benefits: [
      "A curcumina é uma das substâncias naturais mais estudadas por seu potencial anti-inflamatório",
      "Pesquisas sugerem que pode auxiliar na proteção das células contra o estresse oxidativo",
      "Estudos indicam que pode contribuir para a saúde digestiva",
      "Algumas pesquisas apontam potencial no auxílio ao metabolismo de gorduras",
    ],
    tip: "A curcumina tem baixa biodisponibilidade sozinha. Para potencializar a absorção, adicione uma pitada de pimenta-do-reino (a piperina aumenta a absorção em até 2.000%, segundo estudos) e uma pequena quantidade de gordura saudável, como óleo de coco.",
    curiosity:
      "A cúrcuma é usada há mais de 4.000 anos na Índia, não apenas como especiaria, mas também como corante natural para tecidos e em cerimônias religiosas. O consumo elevado de cúrcuma na dieta indiana é estudado como possível fator associado a menores índices de certas doenças crônicas na região.",
  },
  {
    id: "hortela",
    name: "Hortelã",
    icon: "🌿",
    description:
      "Planta aromática do gênero Mentha, conhecida pelo seu sabor refrescante e mentolado. O mentol presente nas folhas é responsável pela sensação de frescor e possui propriedades que vêm sendo estudadas pela ciência.",
    benefits: [
      "Tradicionalmente utilizada para auxiliar na digestão e aliviar desconfortos gastrointestinais",
      "Estudos sugerem que o aroma da hortelã pode contribuir para reduzir a sensação de apetite",
      "Pesquisas indicam propriedades que podem ajudar no alívio de dores de cabeça leves",
      "Pode contribuir para a melhora da respiração e descongestionamento nasal",
    ],
    tip: "Use folhas frescas sempre que possível para uma infusão mais aromática e rica em óleos essenciais. Amasse levemente as folhas antes de colocar na água quente para liberar mais compostos. Infusão ideal: 5 minutos.",
    curiosity:
      "Na mitologia grega, a hortelã recebeu seu nome da ninfa Minta, que foi transformada em planta por Perséfone. Os gregos antigos usavam hortelã para perfumar os braços e aromatizar suas mesas de banquete.",
  },
  {
    id: "camomila",
    name: "Camomila",
    icon: "🌼",
    description:
      "Planta medicinal da família Asteraceae, utilizada há séculos em diversas tradições medicinais. Contém apigenina e outros flavonoides que são associados a efeitos calmantes e anti-inflamatórios.",
    benefits: [
      "Amplamente reconhecida por seu potencial calmante que pode auxiliar na qualidade do sono",
      "Estudos sugerem que pode contribuir para a redução de sintomas de ansiedade leve",
      "Pesquisas indicam propriedades anti-inflamatórias que podem beneficiar a saúde digestiva",
      "A melhora na qualidade do sono pode indiretamente contribuir para o controle do peso, já que a privação de sono está associada ao ganho de peso",
    ],
    tip: "Para extrair o máximo dos compostos da camomila, tampe a xícara durante a infusão de 5 a 7 minutos, evitando que os óleos essenciais voláteis se percam com o vapor. Consuma preferencialmente à noite, cerca de 30 minutos antes de dormir.",
    curiosity:
      "A camomila é tão valorizada na Croácia que estampa uma das moedas do país. No antigo Egito, ela era considerada uma flor sagrada dedicada ao deus sol Rá, devido ao formato de seus pétalas que lembram raios solares.",
  },
  {
    id: "cha-verde",
    name: "Chá Verde",
    icon: "🍵",
    description:
      "Obtido das folhas da Camellia sinensis que passam por processamento mínimo, preservando altas concentrações de catequinas, especialmente a EGCG (epigalocatequina galato), um dos antioxidantes mais estudados do mundo.",
    benefits: [
      "A EGCG é amplamente estudada por seu potencial em auxiliar na oxidação de gorduras",
      "Pesquisas sugerem que a combinação de cafeína e catequinas pode contribuir para o aumento do gasto energético",
      "Estudos indicam propriedades antioxidantes que podem auxiliar na proteção celular",
      "Algumas pesquisas apontam potencial na melhora da função cognitiva e do foco mental",
    ],
    tip: "A temperatura da água é crucial: use entre 70°C e 80°C (nunca água fervente, que torna o chá amargo e destrói catequinas). Infusão de 2 a 3 minutos. Adicionar limão pode aumentar a absorção de catequinas em até 5 vezes, segundo estudos.",
    curiosity:
      "O chá verde é a segunda bebida mais consumida no mundo, perdendo apenas para a água. Uma única planta, a Camellia sinensis, dá origem ao chá verde, preto, branco e oolong — a diferença está apenas no processamento das folhas.",
  },
  {
    id: "mate",
    name: "Erva-Mate",
    icon: "🧉",
    description:
      "Planta nativa da América do Sul (Ilex paraguariensis), tradicionalmente consumida como chimarrão, tereré ou chá mate. É rica em xantinas, polifenóis, saponinas e minerais, sendo uma das plantas com maior diversidade de compostos bioativos.",
    benefits: [
      "Estudos sugerem que pode auxiliar na termogênese e no aumento do gasto energético",
      "Pesquisas indicam que os compostos da erva-mate podem contribuir para a redução do colesterol LDL",
      "Contém teobromina e cafeína, que podem ajudar a melhorar o foco e a disposição",
      "Alguns estudos apontam potencial no retardo do esvaziamento gástrico, o que pode prolongar a sensação de saciedade",
    ],
    tip: "Para o chá mate, utilize água entre 70°C e 80°C e deixe em infusão por 3 a 5 minutos. Evite consumir em temperaturas muito elevadas, pois o consumo de bebidas muito quentes está associado a riscos à saúde esofágica. Combine com limão e gengibre para um blend funcional.",
    curiosity:
      "A erva-mate era considerada uma dádiva divina pelos povos Guarani. O Paraguai, a Argentina, o Uruguai e o sul do Brasil compartilham a tradição do mate, e o chimarrão é a bebida oficial do Rio Grande do Sul desde 2003.",
  },
  {
    id: "boldo",
    name: "Boldo",
    icon: "🍃",
    description:
      "Existem duas plantas conhecidas como boldo: o boldo-do-chile (Peumus boldus) e o boldo-brasileiro (Plectranthus barbatus). Ambas são tradicionalmente utilizadas para problemas digestivos e hepáticos, contendo compostos como a boldina e a forscolina.",
    benefits: [
      "Tradicionalmente utilizado para auxiliar na digestão e no funcionamento hepático",
      "Estudos sugerem que a boldina possui propriedades antioxidantes e anti-inflamatórias",
      "Pode contribuir para o alívio de desconfortos estomacais como gases e má digestão",
      "Pesquisas preliminares indicam que a forscolina (presente no boldo-brasileiro) pode influenciar o metabolismo lipídico",
    ],
    tip: "O boldo tem sabor intenso e amargo. Use poucas folhas (2 a 3 folhas frescas ou 1 colher de chá das folhas secas) para 200ml de água. Infusão de no máximo 5 minutos. Não é recomendado para uso contínuo prolongado — faça pausas periódicas.",
    curiosity:
      "Segundo uma lenda chilena, um pastor percebeu que suas ovelhas melhoravam de problemas digestivos após comerem folhas de boldo, e assim começou a utilizá-lo como planta medicinal. O boldo-do-chile só cresce naturalmente na região central do Chile.",
  },
  {
    id: "cavalinha",
    name: "Cavalinha",
    icon: "🌾",
    description:
      "Planta do gênero Equisetum, uma das plantas mais antigas do planeta, existindo há mais de 300 milhões de anos. É rica em silício, potássio e flavonoides, sendo tradicionalmente conhecida por suas propriedades diuréticas.",
    benefits: [
      "Estudos sugerem propriedades diuréticas naturais que podem auxiliar na redução da retenção de líquidos",
      "Rica em silício orgânico, que pode contribuir para a saúde de cabelos, unhas e pele",
      "Pesquisas indicam que seus antioxidantes podem auxiliar na proteção celular",
      "Pode contribuir para a remineralização óssea devido ao seu conteúdo de minerais",
    ],
    tip: "Prepare o chá por decocção: ferva as hastes secas em água por 5 a 10 minutos para melhor extração dos minerais. É importante manter boa hidratação ao consumir cavalinha regularmente, devido ao efeito diurético. Não substitui medicamentos diuréticos prescritos.",
    curiosity:
      "A cavalinha é considerada um 'fóssil vivo' — seus ancestrais gigantes formavam florestas inteiras no período Carbonífero e se tornaram parte do carvão mineral que usamos hoje. Na época dos dinossauros, algumas espécies atingiam 30 metros de altura.",
  },
  {
    id: "dente-de-leao",
    name: "Dente-de-leão",
    icon: "🌻",
    description:
      "Planta do gênero Taraxacum, muitas vezes considerada apenas uma erva daninha, mas que possui longa tradição de uso medicinal. É rica em vitaminas A, C e K, além de minerais como ferro e potássio.",
    benefits: [
      "Tradicionalmente utilizado como diurético natural, podendo auxiliar na redução do inchaço",
      "Estudos sugerem que pode contribuir para a saúde hepática, auxiliando nos processos de desintoxicação natural do fígado",
      "Pesquisas indicam que a raiz pode ter efeito prebiótico por conter inulina",
      "Algumas evidências apontam potencial na regulação do apetite e na digestão",
    ],
    tip: "As folhas são ideais para infusão (chá), enquanto a raiz pode ser torrada e usada como substituto de café sem cafeína. Para a infusão, use 1 a 2 colheres de chá de folhas secas para cada xícara e deixe em infusão por 5 a 10 minutos.",
    curiosity:
      "Cada parte do dente-de-leão é comestível: as folhas podem ser usadas em saladas, as flores em geleias, e a raiz torrada como bebida. Na França, ele é cultivado como hortaliça nobre e usado em saladas gourmet.",
  },
  {
    id: "carqueja",
    name: "Carqueja",
    icon: "🌱",
    description:
      "Planta nativa da América do Sul (Baccharis trimera), amplamente utilizada na medicina popular brasileira. Possui sabor amargo característico e contém flavonoides, saponinas e óleos essenciais com propriedades estudadas pela ciência.",
    benefits: [
      "Tradicionalmente utilizada para auxiliar na digestão e no funcionamento do fígado",
      "Estudos sugerem propriedades que podem contribuir para o controle da glicemia",
      "Pesquisas indicam potencial anti-inflamatório e antioxidante",
      "Pode auxiliar no combate à sensação de estufamento e gases intestinais",
    ],
    tip: "Devido ao sabor amargo, comece com uma quantidade menor e vá ajustando. Use 1 colher de chá de folhas secas para 200ml de água quente, com infusão de 5 a 7 minutos. Pode ser combinada com hortelã ou limão para suavizar o amargor.",
    curiosity:
      "A carqueja é uma planta exclusiva da América do Sul. No Brasil, ela cresce espontaneamente em campos e beiras de estrada, sendo uma das plantas medicinais mais populares no país. Seus caules achatados e sem folhas aparentes lhe dão uma aparência única no reino vegetal.",
  },
];

export const mythsTruths: MythTruth[] = [
  {
    id: "mt-01",
    statement: "Chá verde acelera o metabolismo.",
    isTrue: true,
    explanation:
      "Estudos científicos indicam que as catequinas e a cafeína presentes no chá verde podem aumentar levemente o gasto energético e a oxidação de gorduras. No entanto, o efeito é modesto e não substitui uma alimentação equilibrada e a prática de exercícios físicos.",
  },
  {
    id: "mt-02",
    statement: "Chá de hibisco emagrece sozinho, sem necessidade de mudanças na alimentação.",
    isTrue: false,
    explanation:
      "Nenhum chá é capaz de promover emagrecimento de forma isolada. O chá de hibisco pode ser um aliado em um plano de alimentação saudável, pois estudos sugerem que ele pode auxiliar no controle da retenção de líquidos e possuir propriedades antioxidantes, mas os resultados dependem de um estilo de vida equilibrado.",
  },
  {
    id: "mt-03",
    statement: "Tomar chá muito quente pode ser prejudicial à saúde.",
    isTrue: true,
    explanation:
      "A Organização Mundial da Saúde (OMS) classificou o consumo de bebidas muito quentes (acima de 65°C) como provavelmente carcinogênico para o esôfago. O ideal é aguardar a bebida atingir uma temperatura confortável antes de consumir.",
  },
  {
    id: "mt-04",
    statement: "Chás detox eliminam toxinas do corpo.",
    isTrue: false,
    explanation:
      "O conceito de 'detox' como limpeza de toxinas não possui respaldo científico sólido. O corpo humano já possui um sistema de desintoxicação eficiente composto pelo fígado, rins e outros órgãos. Chás podem contribuir para a hidratação e fornecer compostos bioativos benéficos, mas não 'eliminam toxinas' de forma mágica.",
  },
  {
    id: "mt-05",
    statement: "A qualidade do sono influencia diretamente no peso corporal.",
    isTrue: true,
    explanation:
      "Diversas pesquisas demonstram que a privação de sono está associada ao aumento dos hormônios da fome (grelina) e à redução dos hormônios da saciedade (leptina), podendo levar ao aumento da ingestão calórica. Chás calmantes como camomila podem auxiliar na melhora da qualidade do sono.",
  },
  {
    id: "mt-06",
    statement: "Quanto mais chá você tomar por dia, mais rápido vai emagrecer.",
    isTrue: false,
    explanation:
      "O consumo excessivo de chá não acelera o emagrecimento e pode trazer efeitos adversos, como irritação estomacal, insônia (no caso de chás com cafeína) e sobrecarga renal (no caso de chás diuréticos). A moderação é fundamental: 2 a 4 xícaras por dia é geralmente considerado um consumo adequado para a maioria das pessoas.",
  },
  {
    id: "mt-07",
    statement: "Gengibre pode auxiliar na termogênese do corpo.",
    isTrue: true,
    explanation:
      "Estudos publicados em periódicos científicos sugerem que o gingerol, principal composto bioativo do gengibre, pode promover um leve aumento na termogênese (produção de calor pelo corpo), o que pode contribuir modestamente para o gasto energético. O efeito é real, porém sutil.",
  },
  {
    id: "mt-08",
    statement: "Chá substitui a necessidade de beber água pura.",
    isTrue: false,
    explanation:
      "Embora os chás contribuam para a hidratação, eles não substituem a água pura. Alguns chás possuem efeito diurético e contêm compostos que em excesso podem não ser ideais. A recomendação é manter o consumo de água ao longo do dia e utilizar os chás como complemento, não como substituto.",
  },
  {
    id: "mt-09",
    statement: "A canela pode ajudar no controle dos níveis de açúcar no sangue.",
    isTrue: true,
    explanation:
      "Vários estudos clínicos sugerem que a canela pode melhorar a sensibilidade à insulina e auxiliar na regulação da glicemia, especialmente em pessoas com resistência à insulina ou diabetes tipo 2. No entanto, ela não substitui medicamentos prescritos e deve ser usada como complemento sob orientação profissional.",
  },
  {
    id: "mt-10",
    statement: "Chás naturais não possuem contraindicações porque são 'naturais'.",
    isTrue: false,
    explanation:
      "O fato de ser natural não significa que seja isento de riscos. Muitas plantas contêm compostos potentes que podem interagir com medicamentos, ser contraindicadas durante a gravidez ou causar reações adversas em pessoas com condições específicas de saúde. Sempre consulte um profissional de saúde, especialmente se estiver em tratamento médico.",
  },
  {
    id: "mt-11",
    statement: "A hidratação adequada pode auxiliar no processo de emagrecimento.",
    isTrue: true,
    explanation:
      "Estudos demonstram que a hidratação adequada pode contribuir para o emagrecimento de diversas formas: ajudando na sensação de saciedade, melhorando o funcionamento do metabolismo e auxiliando na eliminação de resíduos metabólicos. Beber água e chás sem açúcar contribui para manter uma boa hidratação.",
  },
  {
    id: "mt-12",
    statement: "Chá de boldo pode ser consumido diariamente sem limites.",
    isTrue: false,
    explanation:
      "O boldo contém compostos como a boldina que, em excesso ou uso prolongado, podem sobrecarregar o fígado — justamente o órgão que ele pretende ajudar. O consumo deve ser moderado e intermitente. Gestantes devem evitar o boldo completamente. Consulte um profissional para orientação sobre frequência e quantidade adequadas.",
  },
];

export const didYouKnow: DidYouKnow[] = [
  {
    id: "dyk-01",
    fact: "O chá é a bebida mais consumida no mundo depois da água. Estima-se que mais de 2 bilhões de pessoas bebam chá diariamente em todo o planeta.",
    icon: "🌍",
  },
  {
    id: "dyk-02",
    fact: "A Camellia sinensis, planta que dá origem ao chá verde, preto, branco e oolong, pode viver por mais de 100 anos. A diferença entre esses chás está apenas no processamento das folhas, não na planta.",
    icon: "🌳",
  },
  {
    id: "dyk-03",
    fact: "A temperatura da água influencia diretamente os compostos extraídos do chá. Água fervente pode destruir catequinas delicadas do chá verde, enquanto temperaturas mais baixas preservam esses antioxidantes.",
    icon: "🌡️",
  },
  {
    id: "dyk-04",
    fact: "Estudos sugerem que beber de 2 a 3 xícaras de chá verde por dia pode fornecer uma quantidade significativa de catequinas (240-320mg), quantidade associada a benefícios à saúde em diversas pesquisas.",
    icon: "📊",
  },
  {
    id: "dyk-05",
    fact: "A erva-mate contém 196 compostos ativos, sendo uma das plantas com maior diversidade de nutrientes e compostos bioativos já catalogados pela ciência.",
    icon: "🧪",
  },
  {
    id: "dyk-06",
    fact: "O estresse crônico eleva os níveis de cortisol no corpo, o que está associado ao acúmulo de gordura abdominal. Chás calmantes como camomila podem ajudar na gestão do estresse como parte de uma rotina de autocuidado.",
    icon: "🧠",
  },
  {
    id: "dyk-07",
    fact: "A piperina presente na pimenta-do-reino pode aumentar a absorção da curcumina (composto ativo da cúrcuma) em até 2.000%, segundo estudo publicado no periódico Planta Medica.",
    icon: "🔬",
  },
  {
    id: "dyk-08",
    fact: "O Brasil é um dos maiores produtores e consumidores de erva-mate do mundo, com a região Sul concentrando a maior parte da produção. A cultura do chimarrão é patrimônio cultural imaterial do Rio Grande do Sul.",
    icon: "🇧🇷",
  },
  {
    id: "dyk-09",
    fact: "A cavalinha é uma das plantas mais antigas do planeta, com fósseis datando de mais de 300 milhões de anos. No período Carbonífero, seus ancestrais gigantes podiam atingir 30 metros de altura.",
    icon: "🦕",
  },
  {
    id: "dyk-10",
    fact: "O ato de preparar e beber chá pode por si só contribuir para o bem-estar. Estudos de psicologia mostram que rituais diários de autocuidado ajudam a reduzir a ansiedade e promovem uma relação mais consciente com o corpo.",
    icon: "☕",
  },
  {
    id: "dyk-11",
    fact: "Dormir bem é tão importante para o controle de peso quanto a alimentação e o exercício. Pesquisas mostram que pessoas que dormem menos de 6 horas por noite têm 55% mais chance de desenvolver obesidade.",
    icon: "😴",
  },
  {
    id: "dyk-12",
    fact: "O gengibre contém mais de 400 compostos químicos diferentes, sendo o gingerol e o shogaol os mais estudados por seus efeitos anti-inflamatórios e termogênicos.",
    icon: "🔎",
  },
];
