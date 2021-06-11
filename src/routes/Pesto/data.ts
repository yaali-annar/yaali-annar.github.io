import { PestoComponent } from './type'

const defaultComponents: PestoComponent[] = [
  {
    name: 'Herb',
    mandatory: true,
    options: ['Basil', 'Parsley', 'Cilantro', 'Mint', 'Kale (Cooked)'],
  },
  {
    name: 'Aromatics',
    options: ['Lemon Zest', 'Garlic', 'Lime Zest', 'Shallots'],
  },
  {
    name: 'Acidity',
    options: [
      'Lemon Juice',
      'Lime Juice',
      'White Wine Vinegar',
      'Malt Vinegar',
      'Balsamic Vinegar',
    ],
  },
  {
    name: 'Thickener',
    options: [
      'Pine Nuts',
      'Walnuts',
      'Pistachios',
      'Almonds',
      'Cashews',
      'Macadamia',
      'Sesame Seeds',
      'Bread Crumbs',
    ],
  },
  {
    name: 'Umami',
    options: ['Parmesan', 'Pecorino', 'Feta', 'Capers', 'Anchovies'],
  },
  { name: 'Fat', mandatory: true, options: ['Olive Oil', 'Butter'] },
]

export { defaultComponents }
