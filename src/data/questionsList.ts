type Questions = {
  question: string;
  answers: string;
  id: number;
};

export const questionsList: Array<Questions> = [
  {
    question: 'faq:questions.opening_hours',
    answers: 'faq:answers.opening_hours',
    id: 1
  },
  {
    question: 'faq:questions.winter_excursion',
    answers: 'faq:answers.winter_excursion',
    id: 2
  },
  {
    question: 'faq:questions.max_guests',
    answers: 'faq:answers.max_guests',
    id: 3
  },
  { question: 'faq:questions.prise', answers: 'faq:answers.prise', id: 4 },
  {
    question: 'faq:questions.kind_help',
    answers: 'faq:answers.kind_help',
    id: 5
  }
];
