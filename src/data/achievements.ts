export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: {
    type:
      | 'streak'
      | 'total_teas'
      | 'category_count'
      | 'recipes_tried'
      | 'challenge_complete'
      | 'early_bird'
      | 'first_tea';
    value: number;
    category?: string;
  };
  rarity: 'comum' | 'raro' | 'epico' | 'lendario';
}

export const achievements: Achievement[] = [
  {
    id: 'primeira-xicara',
    name: 'Primeira Xicara',
    description: 'Registre seu primeiro cha. Toda grande jornada comeca com o primeiro gole!',
    icon: '\u2615',
    requirement: {
      type: 'first_tea',
      value: 1,
    },
    rarity: 'comum',
  },
  {
    id: 'tres-dias-seguidos',
    name: 'Tres Dias Seguidos',
    description: 'Mantenha uma sequencia de 3 dias consecutivos tomando cha. A consistencia e a chave!',
    icon: '\uD83D\uDD25',
    requirement: {
      type: 'streak',
      value: 3,
    },
    rarity: 'comum',
  },
  {
    id: '7-dias-de-fogo',
    name: '7 Dias de Fogo',
    description: 'Uma semana inteira sem falhar! Voce esta pegando fogo com seus chas diarios.',
    icon: '\uD83C\uDF1F',
    requirement: {
      type: 'streak',
      value: 7,
    },
    rarity: 'raro',
  },
  {
    id: '14-dias-imparavel',
    name: '14 Dias Imparavel',
    description: 'Duas semanas seguidas de dedicacao ao cha. Ninguem te para!',
    icon: '\uD83D\uDCAA',
    requirement: {
      type: 'streak',
      value: 14,
    },
    rarity: 'epico',
  },
  {
    id: '21-dias-de-transformacao',
    name: '21 Dias de Transformacao',
    description: 'Completou o desafio de 21 dias! Dizem que e o tempo necessario para formar um habito. Voce conseguiu!',
    icon: '\uD83C\uDFC6',
    requirement: {
      type: 'challenge_complete',
      value: 21,
    },
    rarity: 'lendario',
  },
  {
    id: 'mestre-do-detox',
    name: 'Mestre do Detox',
    description: 'Tomou 10 chas da categoria detox. Seu corpo agradece pela limpeza!',
    icon: '\uD83C\uDF3F',
    requirement: {
      type: 'category_count',
      value: 10,
      category: 'detox',
    },
    rarity: 'raro',
  },
  {
    id: 'rei-termogenico',
    name: 'Rei Termogenico',
    description: 'Tomou 10 chas termogenicos. O metabolismo esta a todo vapor!',
    icon: '\uD83D\uDD25',
    requirement: {
      type: 'category_count',
      value: 10,
      category: 'termogenico',
    },
    rarity: 'raro',
  },
  {
    id: 'alma-tranquila',
    name: 'Alma Tranquila',
    description: 'Tomou 5 chas relaxantes. A paz interior comeca com uma boa xicara de cha.',
    icon: '\uD83E\uDDD8',
    requirement: {
      type: 'category_count',
      value: 5,
      category: 'relaxante',
    },
    rarity: 'comum',
  },
  {
    id: 'energia-pura',
    name: 'Energia Pura',
    description: 'Tomou 5 chas energizantes. Disposicao e o seu segundo nome!',
    icon: '\u26A1',
    requirement: {
      type: 'category_count',
      value: 5,
      category: 'energizante',
    },
    rarity: 'comum',
  },
  {
    id: 'explorador',
    name: 'Explorador',
    description: 'Experimentou 15 receitas diferentes. Voce e um verdadeiro aventureiro dos chas!',
    icon: '\uD83E\uDDED',
    requirement: {
      type: 'recipes_tried',
      value: 15,
    },
    rarity: 'epico',
  },
  {
    id: 'cha-da-madrugada',
    name: 'Cha da Madrugada',
    description: 'Registrou um cha antes das 6 da manha. Quem madruga, toma cha!',
    icon: '\uD83C\uDF05',
    requirement: {
      type: 'early_bird',
      value: 1,
    },
    rarity: 'raro',
  },
  {
    id: '50-xicaras',
    name: '50 Xicaras',
    description: 'Tomou 50 xicaras de cha no total. Meio centenario de sabor e saude!',
    icon: '\uD83C\uDF75',
    requirement: {
      type: 'total_teas',
      value: 50,
    },
    rarity: 'epico',
  },
  {
    id: '100-xicaras',
    name: '100 Xicaras',
    description: 'Tomou 100 xicaras de cha! Voce e uma lenda viva do mundo dos chas.',
    icon: '\uD83D\uDC51',
    requirement: {
      type: 'total_teas',
      value: 100,
    },
    rarity: 'lendario',
  },
  {
    id: 'colecionador',
    name: 'Colecionador',
    description: 'Experimentou 10 receitas diferentes. Sua colecao de sabores esta crescendo!',
    icon: '\uD83D\uDCDA',
    requirement: {
      type: 'recipes_tried',
      value: 10,
    },
    rarity: 'raro',
  },
  {
    id: 'drenagem-total',
    name: 'Drenagem Total',
    description: 'Tomou 5 chas diureticos. Eliminando toxinas e retencao com estilo!',
    icon: '\uD83D\uDCA7',
    requirement: {
      type: 'category_count',
      value: 5,
      category: 'diuretico',
    },
    rarity: 'comum',
  },
];
