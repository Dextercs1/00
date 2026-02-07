export type Category = 'termogenico' | 'detox' | 'relaxante' | 'energizante' | 'diuretico';
export type BestTime = 'manha' | 'tarde' | 'noite' | 'qualquer';
export type Difficulty = 'facil' | 'medio';

export interface Recipe {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  category: Category;
  prepTime: number;
  ingredients: { item: string; quantity: string }[];
  steps: string[];
  benefits: string[];
  bestTime: BestTime;
  restrictions: string[];
  difficulty: Difficulty;
  image: string;
  color: string;
  curiosity: string;
  premium?: boolean;
  unlockDay?: number;
}

export const recipes: Recipe[] = [
  // 1. Cha de Hibisco com Canela
  {
    id: 'hibisco-canela',
    name: 'Cha de Hibisco com Canela',
    subtitle: 'O classico termogenico brasileiro',
    description:
      'Uma combinacao poderosa que une o sabor marcante do hibisco com o aroma envolvente da canela. Essa infusao pode auxiliar na aceleracao do metabolismo e e uma otima opcao para comecar o dia com disposicao.',
    category: 'termogenico',
    prepTime: 5,
    ingredients: [
      { item: 'Flores secas de hibisco', quantity: '2 colheres de sopa' },
      { item: 'Canela em pau', quantity: '1 unidade' },
      { item: 'Agua filtrada', quantity: '250 ml' },
    ],
    steps: [
      'Ferva a agua filtrada em uma chaleira ou panela.',
      'Desligue o fogo e adicione as flores de hibisco e a canela em pau.',
      'Tampe e deixe em infusao por 5 minutos.',
      'Coe e sirva. Pode ser consumido quente ou gelado.',
    ],
    benefits: [
      'Pode auxiliar na reducao da retencao de liquidos',
      'A canela auxilia na regulacao dos niveis de acucar no sangue',
      'Rico em antioxidantes que combatem os radicais livres',
      'Pode ajudar a acelerar o metabolismo',
    ],
    bestTime: 'manha',
    restrictions: [],
    difficulty: 'facil',
    image: '\uD83C\uDF3A',
    color: '#e74c6e',
    curiosity:
      'O hibisco e originario da Africa e era usado no Egito Antigo para preparar bebidas refrescantes. No Brasil, ficou popular nos anos 2000 como aliado do emagrecimento.',
  },

  // 2. Cha Verde com Gengibre e Limao
  {
    id: 'verde-gengibre-limao',
    name: 'Cha Verde com Gengibre e Limao',
    subtitle: 'Trio poderoso para o metabolismo',
    description:
      'Uma infusao que combina as catequinas do cha verde com o poder termogenico do gengibre e a vitamina C do limao. Uma receita completa para quem busca mais energia e disposicao no dia a dia.',
    category: 'termogenico',
    prepTime: 5,
    ingredients: [
      { item: 'Cha verde (folhas ou sache)', quantity: '1 colher de cha ou 1 sache' },
      { item: 'Gengibre fresco ralado', quantity: '1 colher de cha' },
      { item: 'Suco de limao', quantity: '1/2 limao' },
      { item: 'Agua filtrada', quantity: '250 ml' },
    ],
    steps: [
      'Aqueca a agua ate cerca de 80\u00B0C (quando comecar a formar pequenas bolhas, antes de ferver completamente).',
      'Adicione o cha verde e o gengibre ralado.',
      'Deixe em infusao por 3 a 5 minutos com a xicara tampada.',
      'Coe, adicione o suco de limao e misture bem.',
      'Sirva imediatamente para preservar os nutrientes.',
    ],
    benefits: [
      'As catequinas do cha verde podem auxiliar na queima de gordura',
      'O gengibre possui propriedades anti-inflamatorias',
      'A vitamina C do limao pode ajudar na absorcao de nutrientes',
      'Pode contribuir para o aumento da disposicao e foco',
    ],
    bestTime: 'manha',
    restrictions: ['cafeina'],
    difficulty: 'facil',
    image: '\uD83C\uDF75',
    color: '#7cb342',
    curiosity:
      'O cha verde e consumido ha mais de 4.000 anos na China. Estudos mostram que ele contem L-teanina, um aminoacido que pode ajudar a melhorar a concentracao sem causar a ansiedade tipica da cafeina.',
  },

  // 3. Cha de Cavalinha
  {
    id: 'cavalinha',
    name: 'Cha de Cavalinha',
    subtitle: 'O diuretico natural mais tradicional',
    description:
      'A cavalinha e uma das plantas mais tradicionais da fitoterapia brasileira. Seu cha possui propriedades diureticas reconhecidas e pode auxiliar na reducao do inchaco e da retencao de liquidos.',
    category: 'diuretico',
    prepTime: 10,
    ingredients: [
      { item: 'Cavalinha seca', quantity: '2 colheres de sopa' },
      { item: 'Agua filtrada', quantity: '500 ml' },
    ],
    steps: [
      'Coloque a agua filtrada em uma panela e leve ao fogo.',
      'Quando a agua ferver, adicione a cavalinha seca.',
      'Reduza o fogo e deixe cozinhar por 5 minutos (deccoccao).',
      'Desligue o fogo, tampe e deixe descansar por mais 5 minutos.',
      'Coe e beba morno ao longo da tarde. Pode preparar ate 500 ml por dia.',
    ],
    benefits: [
      'Auxilia na eliminacao do excesso de liquidos retidos',
      'Rica em minerais como silicio, potassio e manganes',
      'Pode ajudar a fortalecer unhas e cabelos',
      'Tradicionalmente usada para auxiliar na saude dos rins',
    ],
    bestTime: 'tarde',
    restrictions: [],
    difficulty: 'facil',
    image: '\uD83C\uDF3F',
    color: '#66bb6a',
    curiosity:
      'A cavalinha e uma das plantas mais antigas do planeta, existindo ha mais de 300 milhoes de anos! Ela ja existia na epoca dos dinossauros e praticamente nao mudou desde entao.',
  },

  // 4. Cha de Camomila com Maca
  {
    id: 'camomila-maca',
    name: 'Cha de Camomila com Maca',
    subtitle: 'Relaxamento e sabor antes de dormir',
    description:
      'A combinacao da camomila com pedacos de maca cria uma bebida reconfortante e levemente adocicada, perfeita para o periodo noturno. Auxilia no relaxamento e pode contribuir para uma noite de sono mais tranquila.',
    category: 'relaxante',
    prepTime: 10,
    ingredients: [
      { item: 'Flores de camomila seca', quantity: '1 colher de sopa' },
      { item: 'Maca com casca cortada em fatias finas', quantity: '1/2 unidade' },
      { item: 'Canela em pau (opcional)', quantity: '1 pequena' },
      { item: 'Agua filtrada', quantity: '300 ml' },
    ],
    steps: [
      'Lave bem a maca e corte em fatias finas, mantendo a casca.',
      'Coloque a agua e as fatias de maca em uma panela e leve ao fogo medio.',
      'Quando ferver, desligue o fogo e adicione a camomila e a canela.',
      'Tampe e deixe em infusao por 8 a 10 minutos.',
      'Coe e sirva morno. Nao adoce para melhores resultados.',
    ],
    benefits: [
      'A camomila possui propriedades calmantes reconhecidas',
      'Pode ajudar a melhorar a qualidade do sono',
      'A maca adiciona fibras e vitaminas naturais',
      'Auxilia na reducao do estresse e da ansiedade leve',
    ],
    bestTime: 'noite',
    restrictions: [],
    difficulty: 'facil',
    image: '\uD83C\uDF3C',
    color: '#ffd54f',
    curiosity:
      'A camomila era chamada de "erva sagrada" pelos egipcios e era oferecida ao deus do sol Ra. No Brasil, e uma das plantas medicinais mais consumidas e e cultivada em diversas regioes do pais.',
  },

  // 5. Golden Milk (Curcuma)
  {
    id: 'golden-milk',
    name: 'Golden Milk (Curcuma)',
    subtitle: 'O leite dourado anti-inflamatorio',
    description:
      'Inspirado na tradicao ayurvedica indiana, o Golden Milk combina curcuma com especiarias e leite vegetal. A curcumina presente na curcuma e conhecida por suas propriedades anti-inflamatorias e antioxidantes.',
    category: 'termogenico',
    prepTime: 10,
    ingredients: [
      { item: 'Curcuma (acafrao-da-terra) em po', quantity: '1 colher de cha' },
      { item: 'Leite vegetal (coco, amendoas ou aveia)', quantity: '250 ml' },
      { item: 'Gengibre em po', quantity: '1/2 colher de cha' },
      { item: 'Canela em po', quantity: '1/2 colher de cha' },
      { item: 'Pimenta-do-reino moida', quantity: '1 pitada' },
      { item: 'Oleo de coco', quantity: '1/2 colher de cha' },
    ],
    steps: [
      'Em uma panela pequena, aqueca o leite vegetal em fogo baixo.',
      'Adicione a curcuma, o gengibre, a canela e o oleo de coco.',
      'Mexa bem com um fouet ou colher ate ficar homogeneo.',
      'Deixe aquecer por 5 minutos sem ferver, mexendo ocasionalmente.',
      'Finalize com uma pitada de pimenta-do-reino (ela potencializa a absorcao da curcumina).',
      'Sirva morno em uma caneca.',
    ],
    benefits: [
      'A curcumina possui potente acao anti-inflamatoria',
      'Pode auxiliar na melhora da digestao',
      'A pimenta-do-reino aumenta a biodisponibilidade da curcumina em ate 2.000%',
      'Pode ajudar a fortalecer o sistema imunologico',
    ],
    bestTime: 'noite',
    restrictions: [],
    difficulty: 'medio',
    image: '\uD83E\uDD5B',
    color: '#ffb300',
    curiosity:
      'Na India, o golden milk e chamado de "haldi doodh" e e usado ha seculos na medicina ayurvedica. A pitada de pimenta-do-reino nao e apenas sabor: ela contem piperina, que aumenta drasticamente a absorcao da curcumina pelo organismo.',
  },

  // 6. Cha Mate com Limao
  {
    id: 'mate-limao',
    name: 'Cha Mate com Limao',
    subtitle: 'Energia tipicamente brasileira',
    description:
      'O cha mate e uma bebida genuinamente sul-americana, feita a partir das folhas da erva-mate. Com limao, ganha frescor e um toque citrico que combina perfeitamente com as manhas brasileiras. Fonte natural de energia e disposicao.',
    category: 'energizante',
    prepTime: 5,
    ingredients: [
      { item: 'Erva-mate tostada', quantity: '1 colher de sopa' },
      { item: 'Suco de limao', quantity: '1/2 limao' },
      { item: 'Agua filtrada', quantity: '250 ml' },
      { item: 'Gelo (opcional para versao gelada)', quantity: 'a gosto' },
    ],
    steps: [
      'Ferva a agua filtrada.',
      'Desligue o fogo e adicione a erva-mate tostada.',
      'Tampe e deixe em infusao por 3 a 5 minutos.',
      'Coe e adicione o suco de limao.',
      'Para a versao gelada, espere esfriar e sirva com gelo.',
    ],
    benefits: [
      'Fonte natural de cafeina para mais energia e foco',
      'Rico em polifenois e antioxidantes',
      'Pode auxiliar na melhora da performance mental',
      'O limao adiciona vitamina C e melhora a absorcao de nutrientes',
    ],
    bestTime: 'manha',
    restrictions: ['cafeina'],
    difficulty: 'facil',
    image: '\uD83E\uDDC9',
    color: '#8d6e63',
    curiosity:
      'O Brasil e o maior produtor mundial de erva-mate. Os indigenas guaranis ja consumiam a erva-mate muito antes da chegada dos europeus, considerando-a uma dadiva dos deuses.',
  },

  // 7. Cha de Dente-de-Leao
  {
    id: 'dente-de-leao',
    name: 'Cha de Dente-de-Leao',
    subtitle: 'Desintoxicacao natural para o figado',
    description:
      'O dente-de-leao e uma planta frequentemente ignorada, mas com propriedades incriveis para a saude hepatica. Seu cha pode auxiliar na desintoxicacao do organismo e na melhora da digestao.',
    category: 'detox',
    prepTime: 10,
    ingredients: [
      { item: 'Raiz de dente-de-leao seca', quantity: '1 colher de sopa' },
      { item: 'Folhas de dente-de-leao secas (opcional)', quantity: '1 colher de cha' },
      { item: 'Agua filtrada', quantity: '300 ml' },
    ],
    steps: [
      'Coloque a agua filtrada em uma panela e adicione a raiz de dente-de-leao.',
      'Leve ao fogo e deixe ferver por 5 minutos.',
      'Desligue o fogo e adicione as folhas secas, se usar.',
      'Tampe e deixe em infusao por mais 5 minutos.',
      'Coe e beba morno, preferencialmente entre as refeicoes.',
    ],
    benefits: [
      'Pode auxiliar na desintoxicacao do figado',
      'Possui propriedades diureticas leves',
      'Rico em vitaminas A, C e K',
      'Pode ajudar a melhorar a digestao e reducao do inchaco',
    ],
    bestTime: 'tarde',
    restrictions: [],
    difficulty: 'facil',
    image: '\uD83C\uDF3B',
    color: '#aed581',
    curiosity:
      'O nome "dente-de-leao" vem do formato das folhas, que lembram dentes. Na Franca, a planta e chamada de "pissenlit" por causa de suas propriedades diureticas. Todas as partes da planta sao comestiveis!',
  },

  // 8. Agua de Gengibre com Hortela
  {
    id: 'gengibre-hortela',
    name: 'Agua de Gengibre com Hortela',
    subtitle: 'Refrescancia termogenica o dia todo',
    description:
      'Uma infusao leve e refrescante que combina o poder termogenico do gengibre com o frescor da hortela. Pode ser consumida ao longo de todo o dia, quente ou gelada, como substituta de bebidas acucaradas.',
    category: 'termogenico',
    prepTime: 5,
    ingredients: [
      { item: 'Gengibre fresco em rodelas', quantity: '3 a 4 rodelas finas' },
      { item: 'Folhas frescas de hortela', quantity: '8 a 10 folhas' },
      { item: 'Agua filtrada', quantity: '500 ml' },
      { item: 'Gelo (opcional)', quantity: 'a gosto' },
    ],
    steps: [
      'Lave as folhas de hortela e corte o gengibre em rodelas finas.',
      'Ferva a agua e desligue o fogo.',
      'Adicione o gengibre e a hortela.',
      'Tampe e deixe em infusao por 5 minutos.',
      'Coe ou deixe os ingredientes na garrafa para ir saborizando ao longo do dia.',
      'Pode ser servido quente, morno ou com gelo.',
    ],
    benefits: [
      'O gengibre pode auxiliar na aceleracao do metabolismo',
      'A hortela pode ajudar na melhora da digestao',
      'Hidratacao saborizada sem calorias adicionais',
      'Pode contribuir para a reducao de nauseas',
    ],
    bestTime: 'qualquer',
    restrictions: [],
    difficulty: 'facil',
    image: '\uD83C\uDF3F',
    color: '#e0e0e0',
    curiosity:
      'O gengibre e usado na medicina tradicional chinesa ha mais de 2.500 anos. Estudos recentes indicam que o gingerol, composto ativo do gengibre, pode ter efeito termogenico ao elevar levemente a temperatura corporal.',
  },

  // 9. Cha de Carqueja
  {
    id: 'carqueja',
    name: 'Cha de Carqueja',
    subtitle: 'Amargo que faz bem',
    description:
      'A carqueja e uma planta nativa do Brasil, muito usada na medicina popular para auxiliar na digestao e na desintoxicacao do figado. Seu sabor amargo e caracteristico, mas seus beneficios compensam.',
    category: 'detox',
    prepTime: 10,
    ingredients: [
      { item: 'Carqueja seca (folhas e hastes)', quantity: '1 colher de sopa' },
      { item: 'Agua filtrada', quantity: '300 ml' },
      { item: 'Gengibre ralado (para suavizar o amargor)', quantity: '1/2 colher de cha' },
    ],
    steps: [
      'Ferva a agua filtrada em uma panela.',
      'Adicione a carqueja e o gengibre ralado.',
      'Deixe ferver em fogo baixo por 3 minutos.',
      'Desligue o fogo, tampe e deixe em infusao por mais 7 minutos.',
      'Coe e beba morno. Evite adocar para manter as propriedades digestivas.',
    ],
    benefits: [
      'Tradicionalmente usada para auxiliar na funcao hepatica',
      'Pode ajudar na melhora da digestao',
      'Possui propriedades anti-inflamatorias',
      'Pode contribuir para o controle da glicemia',
    ],
    bestTime: 'tarde',
    restrictions: [],
    difficulty: 'medio',
    image: '\uD83C\uDF35',
    color: '#a5d6a7',
    curiosity:
      'A carqueja e exclusiva da America do Sul e e uma das plantas medicinais mais estudadas no Brasil. Seu nome cientifico e Baccharis trimera, e ela cresce abundantemente nos campos e cerrados brasileiros.',
  },

  // 10. Cha Branco com Frutas Vermelhas
  {
    id: 'branco-frutas-vermelhas',
    name: 'Cha Branco com Frutas Vermelhas',
    subtitle: 'Delicadeza com antioxidantes',
    description:
      'O cha branco e o menos processado entre os chas da Camellia sinensis, preservando mais antioxidantes. Combinado com frutas vermelhas, ganha cor, sabor e ainda mais nutrientes.',
    category: 'energizante',
    prepTime: 5,
    ingredients: [
      { item: 'Cha branco (folhas ou sache)', quantity: '1 colher de cha ou 1 sache' },
      { item: 'Morangos frescos fatiados', quantity: '3 unidades' },
      { item: 'Mirtilos (blueberries)', quantity: '1 colher de sopa' },
      { item: 'Agua filtrada', quantity: '250 ml' },
    ],
    steps: [
      'Aqueca a agua ate 75-80\u00B0C (antes de comecar a ferver).',
      'Adicione o cha branco e deixe em infusao por 3 a 4 minutos.',
      'Enquanto isso, corte os morangos em fatias.',
      'Coe o cha e adicione os morangos e mirtilos na xicara.',
      'Deixe as frutas liberar sabor por 1 minuto e sirva.',
    ],
    benefits: [
      'O cha branco e rico em catequinas e polifenois',
      'As frutas vermelhas sao fontes de vitamina C e antocianinas',
      'Pode auxiliar na protecao das celulas contra danos oxidativos',
      'Possui menos cafeina que o cha verde, sendo uma opcao mais suave',
    ],
    bestTime: 'manha',
    restrictions: ['cafeina'],
    difficulty: 'facil',
    image: '\uD83C\uDF53',
    color: '#ef9a9a',
    curiosity:
      'O cha branco era originalmente reservado apenas para os imperadores chineses e era colhido somente em dois dias do ano. Hoje, e considerado um dos chas mais nobres do mundo por seu processamento minimo.',
  },

  // 11. Cha de Boldo com Limao
  {
    id: 'boldo-limao',
    name: 'Cha de Boldo com Limao',
    subtitle: 'O classico digestivo brasileiro',
    description:
      'O boldo e provavelmente a planta medicinal mais popular do Brasil. Combinado com limao, esse cha e um aliado tradicional da digestao e pode auxiliar no alivio do desconforto apos refeicoes pesadas.',
    category: 'detox',
    prepTime: 5,
    ingredients: [
      { item: 'Folhas frescas de boldo-da-terra', quantity: '2 a 3 folhas' },
      { item: 'Suco de limao', quantity: '1/2 limao' },
      { item: 'Agua filtrada', quantity: '250 ml' },
    ],
    steps: [
      'Lave bem as folhas de boldo em agua corrente.',
      'Ferva a agua filtrada e desligue o fogo.',
      'Adicione as folhas de boldo e tampe.',
      'Deixe em infusao por 5 minutos (nao ultrapasse para evitar amargor excessivo).',
      'Coe, adicione o suco de limao e beba morno.',
    ],
    benefits: [
      'Tradicionalmente usado para auxiliar na digestao',
      'Pode ajudar no alivio do desconforto estomacal',
      'O limao contribui com vitamina C',
      'Pode auxiliar na funcao do figado e da vesicula biliar',
    ],
    bestTime: 'tarde',
    restrictions: [],
    difficulty: 'facil',
    image: '\uD83C\uDF43',
    color: '#c5e1a5',
    curiosity:
      'Existem dois tipos de boldo populares no Brasil: o boldo-da-terra (ou boldo-brasileiro), facilmente cultivado em quintais, e o boldo-do-chile, nativo dos Andes. Ambos sao usados para fins digestivos, mas sao plantas completamente diferentes!',
  },

  // 12. Cha de Canela com Cravo
  {
    id: 'canela-cravo',
    name: 'Cha de Canela com Cravo',
    subtitle: 'Especiarias que aquecem e aceleram',
    description:
      'Uma infusao quente e aromatica feita com duas das especiarias mais antigas do mundo. Alem do sabor envolvente, a combinacao de canela e cravo pode auxiliar no metabolismo e proporcionar sensacao de conforto.',
    category: 'termogenico',
    prepTime: 5,
    ingredients: [
      { item: 'Canela em pau', quantity: '2 unidades' },
      { item: 'Cravo-da-india', quantity: '4 a 5 unidades' },
      { item: 'Agua filtrada', quantity: '300 ml' },
    ],
    steps: [
      'Coloque a agua, a canela e o cravo em uma panela.',
      'Leve ao fogo medio e deixe ferver por 3 minutos.',
      'Desligue o fogo e tampe.',
      'Deixe em infusao por mais 2 a 3 minutos.',
      'Coe e sirva quente. O aroma ja e parte da experiencia!',
    ],
    benefits: [
      'A canela pode auxiliar na regulacao da glicemia',
      'O cravo possui propriedades antioxidantes e antimicrobianas',
      'A combinacao pode ajudar a acelerar o metabolismo',
      'Pode contribuir para a melhora da circulacao sanguinea',
    ],
    bestTime: 'qualquer',
    restrictions: [],
    difficulty: 'facil',
    image: '\u2615',
    color: '#d4a373',
    curiosity:
      'Na Idade Media, o cravo-da-india valia mais do que ouro! Ele era tao precioso que guerras foram travadas pelo controle de seu comercio. O Brasil chegou a ser um grande produtor de cravo no periodo colonial.',
  },

  // 13. Kombucha Caseira (premium, day 14)
  {
    id: 'kombucha-caseira',
    name: 'Kombucha Caseira',
    subtitle: 'Probiotico fermentado vivo',
    description:
      'A kombucha e uma bebida fermentada a base de cha que contem probioticos naturais. Esta versao simplificada ensina o preparo basico, que leva dias para fermentar, mas resulta em uma bebida refrescante e cheia de microrganismos beneficos.',
    category: 'detox',
    prepTime: 10,
    ingredients: [
      { item: 'Cha preto ou cha verde (sache ou folhas)', quantity: '2 saches ou 2 colheres de cha' },
      { item: 'Acucar cristal', quantity: '1/4 de xicara' },
      { item: 'SCOBY (cultura de kombucha)', quantity: '1 unidade' },
      { item: 'Liquido starter (kombucha pronta ou vinagre de maca)', quantity: '1/2 xicara' },
      { item: 'Agua filtrada', quantity: '1 litro' },
    ],
    steps: [
      'Ferva a agua e prepare o cha normalmente. Adicione o acucar e mexa ate dissolver completamente.',
      'Deixe o cha adocicado esfriar completamente ate a temperatura ambiente (muito importante para nao matar o SCOBY).',
      'Transfira para um pote de vidro de boca larga e adicione o liquido starter.',
      'Com as maos bem limpas, coloque o SCOBY sobre o liquido.',
      'Cubra com um pano limpo preso com elastico (nunca tampe hermeticamente, pois a fermentacao produz gas).',
      'Deixe fermentar em local arejado e sem luz direta por 7 a 14 dias.',
      'Prove a partir do 7o dia: quanto mais tempo, mais avinagrada fica.',
      'Quando estiver no ponto desejado, coe e armazene na geladeira.',
    ],
    benefits: [
      'Fonte natural de probioticos que podem auxiliar a saude intestinal',
      'Pode ajudar na melhora da digestao e absorcao de nutrientes',
      'Rica em acidos organicos e enzimas',
      'Pode contribuir para o fortalecimento do sistema imunologico',
    ],
    bestTime: 'qualquer',
    restrictions: [],
    difficulty: 'medio',
    image: '\uD83E\uDDCB',
    color: '#b39ddb',
    curiosity:
      'A kombucha tem origem na China antiga, por volta de 220 a.C., e era conhecida como "cha da imortalidade". O SCOBY e na verdade uma colonia simbiotica de bacterias e leveduras que forma uma especie de "disco gelatinoso" na superficie do cha.',
    premium: true,
    unlockDay: 14,
  },

  // 14. Cha de Sene
  {
    id: 'sene',
    name: 'Cha de Sene',
    subtitle: 'Uso moderado e consciente',
    description:
      'O sene e uma planta com propriedades laxativas reconhecidas pela ciencia. Seu uso deve ser feito com moderacao e por periodos curtos, nunca ultrapassando 7 dias consecutivos. Nao deve ser usado como rotina diaria. Consulte um profissional de saude antes do uso.',
    category: 'diuretico',
    prepTime: 10,
    ingredients: [
      { item: 'Folhas secas de sene', quantity: '1 colher de cha (nao exceder)' },
      { item: 'Agua filtrada', quantity: '200 ml' },
      { item: 'Erva-doce (para suavizar o sabor e reduzir colicas)', quantity: '1/2 colher de cha' },
    ],
    steps: [
      'Ferva a agua filtrada.',
      'Desligue o fogo e adicione as folhas de sene e a erva-doce.',
      'Tampe e deixe em infusao por 5 a 10 minutos.',
      'Coe e beba morno, preferencialmente a noite antes de dormir.',
      'IMPORTANTE: nao ultrapasse a dose recomendada e nao use por mais de 7 dias seguidos.',
      'Em caso de colicas intensas ou desconforto, suspenda o uso imediatamente.',
    ],
    benefits: [
      'Possui acao laxativa comprovada para alivio da constipacao eventual',
      'A erva-doce pode ajudar a reduzir desconfortos abdominais',
      'Pode auxiliar no alivio temporario do inchaco abdominal',
    ],
    bestTime: 'noite',
    restrictions: ['gestante'],
    difficulty: 'medio',
    image: '\uD83C\uDF3E',
    color: '#ffcc80',
    curiosity:
      'O sene e usado como laxativo ha mais de 3.500 anos e era uma das plantas favoritas dos medicos arabes medievais. Seus compostos ativos (senosideos) sao utilizados ate em medicamentos farmaceuticos. O uso prolongado pode causar dependencia intestinal, por isso a moderacao e fundamental.',
  },

  // 15. Matcha Latte Fit (premium, day 7)
  {
    id: 'matcha-latte-fit',
    name: 'Matcha Latte Fit',
    subtitle: 'Energia concentrada em verde vibrante',
    description:
      'O matcha e o cha verde em sua forma mais concentrada: as folhas sao moidas em po fino, o que significa que voce consome a folha inteira e todos os seus nutrientes. Esta versao latte usa leite vegetal para um resultado cremoso e saudavel.',
    category: 'energizante',
    prepTime: 5,
    ingredients: [
      { item: 'Matcha em po (de boa procedencia)', quantity: '1 colher de cha' },
      { item: 'Leite vegetal (aveia, amendoas ou coco)', quantity: '200 ml' },
      { item: 'Agua quente (nao fervente, cerca de 80\u00B0C)', quantity: '50 ml' },
      { item: 'Mel ou adocante natural (opcional)', quantity: 'a gosto' },
    ],
    steps: [
      'Peneire o matcha em po em uma xicara para evitar grumos.',
      'Adicione a agua quente (cerca de 80\u00B0C) ao matcha.',
      'Misture vigorosamente com um fouet ou chasen (batedor de bambu) ate formar uma pasta lisa e levemente espumosa.',
      'Aqueca o leite vegetal sem ferver.',
      'Despeje o leite sobre o matcha e misture delicadamente.',
      'Adoce se desejar e sirva imediatamente.',
    ],
    benefits: [
      'Contem ate 10 vezes mais antioxidantes que o cha verde convencional',
      'A L-teanina pode auxiliar no foco e concentracao sem agitacao',
      'Pode ajudar a acelerar o metabolismo de forma sustentada',
      'Rico em clorofila, que pode auxiliar na desintoxicacao',
    ],
    bestTime: 'manha',
    restrictions: ['cafeina'],
    difficulty: 'medio',
    image: '\uD83C\uDF75',
    color: '#69f0ae',
    curiosity:
      'No Japao, o matcha e preparado em uma cerimonia tradicional chamada "chanoyu" que pode durar ate 4 horas. Monges budistas usavam matcha para meditar por horas sem perder a concentracao, gracas a combinacao unica de cafeina e L-teanina.',
    premium: true,
    unlockDay: 7,
  },

  // 16. Cha de Erva-Cidreira com Maracuja
  {
    id: 'erva-cidreira-maracuja',
    name: 'Cha de Erva-Cidreira com Maracuja',
    subtitle: 'Dupla calmante brasileira',
    description:
      'Duas das plantas calmantes mais queridas do Brasil unidas em uma infusao relaxante. A erva-cidreira (melissa) e o maracuja possuem propriedades que podem auxiliar no relaxamento e na qualidade do sono.',
    category: 'relaxante',
    prepTime: 10,
    ingredients: [
      { item: 'Folhas frescas de erva-cidreira', quantity: '5 a 6 folhas' },
      { item: 'Polpa de maracuja (com sementes)', quantity: '1/2 unidade' },
      { item: 'Agua filtrada', quantity: '250 ml' },
    ],
    steps: [
      'Lave as folhas de erva-cidreira e corte o maracuja ao meio.',
      'Ferva a agua filtrada e desligue o fogo.',
      'Adicione as folhas de erva-cidreira e a polpa de maracuja com sementes.',
      'Tampe e deixe em infusao por 8 a 10 minutos.',
      'Coe bem (para remover as sementes) e sirva morno.',
      'Beba 30 a 40 minutos antes de dormir para melhores resultados.',
    ],
    benefits: [
      'A erva-cidreira possui propriedades calmantes e ansioliticas leves',
      'O maracuja contem compostos que podem auxiliar no relaxamento',
      'Pode ajudar a melhorar a qualidade do sono',
      'A combinacao pode contribuir para a reducao da ansiedade leve',
    ],
    bestTime: 'noite',
    restrictions: [],
    difficulty: 'facil',
    image: '\uD83C\uDF4B',
    color: '#ce93d8',
    curiosity:
      'O maracuja e nativo do Brasil e seu nome vem do tupi "mara kuya", que significa "alimento em forma de cuia". A flor do maracuja era chamada de "flor da paixao" pelos colonizadores portugueses, que viam nela simbolos da Paixao de Cristo.',
  },

  // 17. Cha de Roma
  {
    id: 'roma',
    name: 'Cha de Roma',
    subtitle: 'Antioxidantes da fruta milenar',
    description:
      'A roma e uma das frutas mais antigas cultivadas pela humanidade. Seu cha, feito com as cascas secas, e rico em taninos e antioxidantes, sendo uma opcao diferente e saborosa para incluir na rotina detox.',
    category: 'detox',
    prepTime: 10,
    ingredients: [
      { item: 'Cascas secas de roma', quantity: '1 colher de sopa' },
      { item: 'Sementes de roma frescas (para finalizar)', quantity: '1 colher de sopa' },
      { item: 'Canela em pau', quantity: '1 pequena' },
      { item: 'Agua filtrada', quantity: '300 ml' },
    ],
    steps: [
      'Coloque a agua, as cascas secas de roma e a canela em uma panela.',
      'Leve ao fogo e deixe ferver por 3 minutos.',
      'Desligue o fogo e tampe.',
      'Deixe em infusao por mais 7 minutos.',
      'Coe e sirva em uma xicara.',
      'Finalize com algumas sementes frescas de roma por cima para decorar e adicionar nutrientes.',
    ],
    benefits: [
      'As cascas de roma sao ricas em taninos e polifenois',
      'Pode auxiliar na protecao celular contra danos oxidativos',
      'Tradicionalmente usada para auxiliar na saude digestiva',
      'Pode contribuir para o fortalecimento do sistema imunologico',
    ],
    bestTime: 'tarde',
    restrictions: [],
    difficulty: 'medio',
    image: '\uD83E\uDED0',
    color: '#ef5350',
    curiosity:
      'A roma e mencionada em textos egipcios de 1.500 a.C. e e citada diversas vezes em textos religiosos antigos. Na Grecia Antiga, acreditava-se que a romeira havia brotado do sangue de Dionisio, o deus do vinho.',
  },

  // 18. Cha Termogenico Turbo (premium, day 21)
  {
    id: 'termogenico-turbo',
    name: 'Cha Termogenico Turbo',
    subtitle: 'A receita mais potente do app',
    description:
      'Esta receita combina os principais ingredientes termogenicos em uma unica xicara. E a infusao mais potente do app, ideal para quem ja tem experiencia com chas e busca intensificar os resultados. Use com moderacao.',
    category: 'termogenico',
    prepTime: 10,
    ingredients: [
      { item: 'Cha verde (folhas ou sache)', quantity: '1 colher de cha ou 1 sache' },
      { item: 'Gengibre fresco ralado', quantity: '1 colher de sopa' },
      { item: 'Canela em pau', quantity: '1 unidade' },
      { item: 'Pimenta caiena em po', quantity: '1 pitada pequena' },
      { item: 'Suco de limao', quantity: '1/2 limao' },
      { item: 'Curcuma em po', quantity: '1/2 colher de cha' },
      { item: 'Agua filtrada', quantity: '300 ml' },
    ],
    steps: [
      'Ferva a agua com o gengibre ralado e a canela em pau por 3 minutos.',
      'Desligue o fogo e espere a temperatura baixar para cerca de 80\u00B0C.',
      'Adicione o cha verde e a curcuma.',
      'Tampe e deixe em infusao por 4 minutos.',
      'Coe e adicione a pitada de pimenta caiena e o suco de limao.',
      'Mexa bem e sirva. Comece com uma pitada muito pequena de pimenta e aumente conforme sua tolerancia.',
    ],
    benefits: [
      'Combinacao de multiplos compostos termogenicos em uma so bebida',
      'O cha verde e o gengibre podem auxiliar na aceleracao do metabolismo',
      'A capsaicina da pimenta pode ajudar no aumento do gasto energetico',
      'A curcuma e o limao adicionam antioxidantes e anti-inflamatorios',
    ],
    bestTime: 'manha',
    restrictions: ['cafeina'],
    difficulty: 'medio',
    image: '\uD83D\uDD25',
    color: '#ff7043',
    curiosity:
      'Estudos publicados no International Journal of Obesity sugerem que a combinacao de cafeina, catequinas e capsaicina pode ter efeito sinergico na termogenese. Isso significa que juntos, esses compostos podem ter um efeito maior do que cada um separadamente.',
    premium: true,
    unlockDay: 21,
  },

  // 19. Cha de Alcachofra
  {
    id: 'alcachofra',
    name: 'Cha de Alcachofra',
    subtitle: 'Protetor hepatico natural',
    description:
      'A alcachofra e reconhecida por suas propriedades hepatoprotetoras e digestivas. Seu cha, feito com as folhas secas, pode auxiliar na saude do figado e na digestao, alem de contribuir para o controle do colesterol.',
    category: 'detox',
    prepTime: 10,
    ingredients: [
      { item: 'Folhas secas de alcachofra', quantity: '1 colher de sopa' },
      { item: 'Agua filtrada', quantity: '300 ml' },
      { item: 'Suco de limao (para amenizar o amargor)', quantity: 'algumas gotas' },
    ],
    steps: [
      'Coloque a agua filtrada em uma panela e leve ao fogo.',
      'Quando ferver, adicione as folhas secas de alcachofra.',
      'Deixe ferver em fogo baixo por 5 minutos.',
      'Desligue o fogo e tampe por mais 5 minutos.',
      'Coe e adicione algumas gotas de limao se desejar.',
      'Beba morno, preferencialmente apos o almoco.',
    ],
    benefits: [
      'Possui cinarina, composto que pode auxiliar na protecao do figado',
      'Pode ajudar na reducao do colesterol LDL',
      'Auxilia na melhora da digestao, especialmente de gorduras',
      'Pode contribuir para a reducao do inchaco abdominal',
    ],
    bestTime: 'tarde',
    restrictions: [],
    difficulty: 'facil',
    image: '\uD83E\uDD66',
    color: '#81c784',
    curiosity:
      'A alcachofra era considerada afrodisiaca na Grecia Antiga e era proibida para mulheres! Catarina de Medici levou a alcachofra da Italia para a Franca no seculo XVI, onde se tornou um ingrediente nobre da culinaria francesa.',
  },

  // 20. Infusao de Frutas Detox
  {
    id: 'infusao-frutas-detox',
    name: 'Infusao de Frutas Detox',
    subtitle: 'Hidratacao colorida e vitaminada',
    description:
      'Uma agua saborizada com frutas frescas, ervas e especiarias que transforma o habito de beber agua em um momento prazeroso. Sem calorias significativas, essa infusao e perfeita para manter a hidratacao ao longo do dia.',
    category: 'detox',
    prepTime: 5,
    ingredients: [
      { item: 'Pepino fatiado', quantity: '4 a 5 rodelas' },
      { item: 'Limao em rodelas', quantity: '1/2 unidade' },
      { item: 'Folhas de hortela fresca', quantity: '6 a 8 folhas' },
      { item: 'Morangos fatiados', quantity: '3 unidades' },
      { item: 'Gengibre em lascas finas', quantity: '2 lascas' },
      { item: 'Agua filtrada gelada', quantity: '1 litro' },
    ],
    steps: [
      'Lave bem todas as frutas e ervas.',
      'Corte o pepino e o limao em rodelas finas e os morangos ao meio.',
      'Coloque todos os ingredientes em uma jarra ou garrafa grande.',
      'Adicione a agua filtrada gelada.',
      'Deixe na geladeira por pelo menos 2 horas para as frutas liberarem sabor (quanto mais tempo, mais saborosa).',
      'Consuma ao longo do dia. Reponha a agua na jarra ate 2 vezes com os mesmos ingredientes.',
    ],
    benefits: [
      'Incentiva o aumento da ingestao de agua diaria',
      'O pepino e o limao podem auxiliar na hidratacao e eliminacao de toxinas',
      'Alternativa saudavel e sem acucar para refrigerantes e sucos industrializados',
      'As frutas adicionam vitaminas e minerais naturalmente a agua',
    ],
    bestTime: 'qualquer',
    restrictions: [],
    difficulty: 'facil',
    image: '\uD83E\uDDCA',
    color: '#4fc3f7',
    curiosity:
      'A chamada "agua aromatizada" ganhou popularidade mundial apos ser adotada por spas de luxo. Pesquisas mostram que pessoas que saborizam sua agua tendem a beber ate 40% mais liquidos por dia comparado a quem bebe apenas agua pura.',
  },
];
