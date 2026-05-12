'use client'

import { useState } from "react";

type TQuestion = {
  id: number;
  question: string;
  options: TOption[];
};

type TOption = {
  option: string;
  isSelected: boolean;
  isCorrect: boolean;
  color: string;
  disabled: boolean;
};

const questions: TQuestion[] = [
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

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);
  
  const currentQuestion = questions[current];

  const selectOption = (index: number) => {
    // const newAnswers = [...answers]; 
    // newAnswers[current] = index; 
    // setAnswers(newAnswers);
    currentQuestion.options[index].isSelected = true;
  };

  const evaluate = () => {
    console.log('EVALUATE BUTTON CLICKED');
    setDisabled(true)
    currentQuestion.options.map(option => {
      if (option.isCorrect) {
        option.color = "green";
      }

      if (!option.isCorrect && option.isSelected) {
        option.color = "red";
      }
    })
  };

  const next = () => {
    if (current < questions.length - 1) { 
      setCurrent(current + 1);            
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">

        {/* Pergunta */}
        <h2 className="text-xl font-semibold mb-6 text-center">
          {currentQuestion.question}
        </h2>

        {/* Opções */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, index) => {
            return (
              <button
                key={index}
                onClick={() => selectOption(index)}
                className={`cursor-pointer w-full text-left p-3 rounded-xl border transition 
                ${
                  option.isSelected
                    ? "bg-blue-500 text-white border-blue-500"
                    : `bg-gray-50 ${disabled ? "" : "hover:bg-gray-100"} border-gray-300`
                }`}
                disabled={disabled}
              >
                {option.option}
              </button>
            );
          })}
        </div>

        {/* Navegação */}
        <div className="flex justify-between">

          {current < questions.length - 1 ? (
            <>
              <button
                className="cursor-pointer px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600"
                onClick={evaluate}
              >
                Avaliar
              </button>

              <button
                onClick={next}
                className="cursor-pointer px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600"
                >
                Avançar
              </button>
            </>
          ) : (
            <button
              onClick={() => alert("Quiz finalizado!")}
              className="cursor-pointer px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600"
            >
              Finalizar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}