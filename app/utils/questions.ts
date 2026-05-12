import { TQuestion } from "../models/TQuestion";

export const questions: TQuestion[] = [
  {
    id: 1,
    question: "Qual é a capital do Brasil?",
    options: [
      {
        option: "São Paulo",
        isSelected: false,
        isCorrect: false,
        color: "",
        disabled: false
      },
      {
        option: "Rio de Janeiro",
        isSelected: false,
        isCorrect: false,
        color: "",
        disabled: false
      },
      {
        option: "Brasília",
        isSelected: false,
        isCorrect: true,
        color: "",
        disabled: false 
      },
      {
        option: "Salvador",
        isSelected: false,
        isCorrect: false,
        color: "",
        disabled: false
      }
    ]
  },

  {
    id: 2,
    question: "Qual linguagem é usada no Next.js?",
    options: [
      {
        option: "PHP",
        isSelected: false,
        isCorrect: false,
        color: "",
        disabled: false
      },
      {
        option: "Java",
        isSelected: false,
        isCorrect: false,
        color: "",
        disabled: false
      },
      {
        option: "Javascript",
        isSelected: false,
        isCorrect: true,
        color: "",
        disabled: false
      },
      {
        option: "Python",
        isSelected: false,
        isCorrect: false,
        color: "",
        disabled: false
      }
    ]
  },
  {
    id: 3,
    question: "O que é Tailwind?",
    options: [
      {
        option: "Framework JS",
        isSelected: false,
        isCorrect: false,
        color: "",
        disabled: false
      },
      {
        option: "Banco de dados",
        isSelected: false,
        isCorrect: false,
        color: "",
        disabled: false
      },
      {
        option: "Biblioteca CSS",
        isSelected: false,
        isCorrect: true,
        color: "",
        disabled: false
      },
      {
        option: "Linguagem de programação",
        isSelected: false,
        isCorrect: false,
        color: "",
        disabled: false
      }
    ],
  },
];
