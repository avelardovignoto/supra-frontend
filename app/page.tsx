'use client'

import { useState } from "react";
import { questions } from "./utils/questions";
import { TOption, TQuestion } from "./models/TQuestion";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [quizQuestions, setQuizQuestions] = useState<TQuestion[]>(questions);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);

  const currentQuestion = quizQuestions[current];

  const selectOption = (index: number) => {
    const updatedQuestions = [...quizQuestions];

    updatedQuestions[current].options =
      updatedQuestions[current].options.map((option, i) => ({
        ...option,
        isSelected: i === index
      }));

    setQuizQuestions(updatedQuestions);

    setDisabledButton(false);
  };

  const evaluate = () => {
    setDisabled(true);

    currentQuestion.options.map(option => {
      if (option.isCorrect) {
        option.color = "green";
      }

      if (!option.isCorrect && option.isSelected) {
        option.color = "red";
      }
    });

    setDisabledButton(true);
  };

  const next = () => {
    if (current < questions.length - 1) { 
      setCurrent(current + 1);            
    }

    setDisabled(false)
  };

  const actionsStyles = (option: TOption) => {
    if (option.color === 'green') {
      return 'bg-green-500 text-white border-green-500';
    }

    if (option.color === 'red') {
      return 'bg-red-500 text-white border-red-500'
    }

    if (option.isSelected) {
      return 'bg-blue-500 text-white border-blue-500';
    }

    return `bg-gray-50 ${disabled ? "" : "hover:bg-gray-100"} border-gray-300`;
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
                className={`cursor-pointer w-full text-left p-3 rounded-xl border transition ${actionsStyles(option)}`}
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
              {/* <button
                className="cursor-pointer px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600"
                onClick={evaluate}
              >
                Avaliar
              </button> */}
              <Button 
                onClick={evaluate}
                className="cursor-pointer px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600"
                variant="outline"
                disabled={disabledButton}
              >
                  Avaliar
              </Button>

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
