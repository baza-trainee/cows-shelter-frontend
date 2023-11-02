import { nanoid } from 'nanoid';
export const excursions = [
  {
    id: nanoid(),
    title: 'excursions:excursion.title_1',
    description: 'excursions:excursion.description_1',
    mainImgSrc: '/excursion1.jpg',
    imagesSrs: [
      '/excursion_modal_1_1.jpg',
      '/excursion_modal_1_2.jpg',
      '/excursion_modal_1_3.jpg'
    ]
  },
  {
    id: nanoid(),
    title: 'excursions:excursion.title_2',
    description: 'excursions:excursion.description_2',
    mainImgSrc: '/excursion2.jpg',
    imagesSrs: [
      '/excursion2.jpg',
      '/excursion_modal_1_2.jpg',
      '/excursion_modal_1_3.jpg'
    ]
  },
  {
    id: nanoid(),
    title: 'excursions:excursion.title_3',
    description: 'excursions:excursion.description_3',
    mainImgSrc: '/excursion3.jpg',
    imagesSrs: [
      '/excursion3.jpg',
      '/excursion_modal_1_2.jpg',
      '/excursion_modal_1_3.jpg'
    ]
  }
];
