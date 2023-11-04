import { nanoid } from 'nanoid';
export const excursions = [
  {
    id: nanoid(),
    title: 'excursions:excursion.title_1',
    description: 'excursions:excursion.description_1',
    mainImgSrc: '/excursions/excursion1.jpg',
    imagesSrs: [
      'excursions/excursion_modal_1_1.jpg',
      'excursions/excursion_modal_1_2.jpg',
      'excursions/excursion_modal_1_3.jpg'
    ]
  },
  {
    id: nanoid(),
    title: 'excursions:excursion.title_2',
    description: 'excursions:excursion.description_2',
    mainImgSrc: '/excursions/excursion2.jpg',
    imagesSrs: [
      'excursions/excursion2.jpg',
      'excursions/excursion_modal_1_2.jpg',
      'excursions/excursion_modal_1_3.jpg'
    ]
  },
  {
    id: nanoid(),
    title: 'excursions:excursion.title_3',
    description: 'excursions:excursion.description_3',
    mainImgSrc: '/excursions/excursion3.jpg',
    imagesSrs: [
      'excursions/excursion3.jpg',
      'excursions/excursion_modal_1_2.jpg',
      'excursions/excursion_modal_1_3.jpg'
    ]
  }
];
