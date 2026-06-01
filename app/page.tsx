'use client'

import { useEffect, useMemo, useState } from "react";
import { questions } from "./utils/questions";
import { TOption, TQuestion } from "./models/TQuestion";
import { Button } from "@/components/ui/button";
import { TDiscipline } from "./models/TDiscipline";
import { TSubject } from "./models/TSubject";

export default function Home() {
  const [disciplines, setDisciplines] = useState<TDiscipline[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [quizQuestions, setQuizQuestions] = useState<TQuestion[]>([]);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [disabledFinish, setDisabledFinish] = useState<boolean>(true);
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>();
  const [hasSubjects, setHasSubjects] = useState<boolean>(false);
  const [selectedSubject, setSelectedSubject] = useState<string>();
  const [subjects, setSubjects] = useState<TSubject[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchQuestions(disciplineId: string | null, subjectId: string | null) {
    disciplineId = disciplineId ?? selectedDiscipline!;
    subjectId = subjectId ?? selectedSubject!;

    setLoading(true);

    const params = new URLSearchParams();

    if (disciplineId) {
      params.append("disciplineId", disciplineId);
    }

    if (subjectId) {
      params.append("subjectId", subjectId);
    }

    const response = await fetch(`http://localhost:8080/api/v1/questions?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const questions = await response.json();
    setQuizQuestions(questions);

    setLoading(false);
  }

  async function fetchDisciplines() {
    const response = await fetch("http://localhost:8080/api/v1/disciplines", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setDisciplines(data);
  }

  useEffect(() => {
    fetchDisciplines();
  }, []);

  const currentQuestion: TQuestion = quizQuestions[current];

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
    setDisabledFinish(false);
  };

  const next = () => {
    if (current < questions.length - 1) { 
      setCurrent(current + 1);            
    }

    setDisabled(false);
    setDisabledFinish(true);
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

  function checkSelectedDiscipline(event: any) {
    const disciplineId: string = event.target.value;
    setSelectedDiscipline(disciplineId);

    const discipline: TDiscipline | undefined = disciplines.find(discipline => discipline.id === disciplineId);

    if (discipline === undefined) { return } // TODO: pensar em como tratar esse caso

    const hasSubjects: boolean = discipline.subjects !== null && discipline.subjects?.length > 0;

    if (hasSubjects) {
      setHasSubjects(true); // Vai exibir o select de assunto
      setSubjects(discipline.subjects); // Preenchendo o select de assunto subject
    } else {
      setHasSubjects(false); // Não vai exibir o select de assunto
      fetchQuestions(disciplineId, null); // Vai buscar as questões da disciplina selecionada, e como essa disciplina não tem assunto o id de assunto vai ser passado como null.
    }
  }

  function getQuestionsBySubject(event: any) {
    const subjectId: string = event.target.value;
    setSelectedSubject(subjectId)
    fetchQuestions(null, subjectId);
  }

  const showQuestion: boolean = useMemo(() => {
    return !loading && quizQuestions.length > 0;
  }, [loading, quizQuestions]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">
        <div className="w-full text-center">
          <h1 className="text-xl mb-6">Escolha uma disciplina para responder às questões</h1>
        </div>

        <select
          className="border rounded-xl px-4 py-2 w-full mb-5"
          value={selectedDiscipline}
          onChange={checkSelectedDiscipline}
          id="disciplineSelect">
          <option>Selecione uma disciplina</option>
          {disciplines.map((discipline: TDiscipline) => (
            <option
              key={discipline.id}
              value={discipline.id}
            >
              {discipline.discipline}
            </option>
          ))}
        </select>

        {hasSubjects && (
          <div>
            <div className="w-full text-center">
              <h1 className="text-xl mb-6">Escolha um assunto</h1>
            </div>

            <select
              className="border rounded-xl px-4 py-2 w-full mb-5"
              value={selectedSubject}
              onChange={getQuestionsBySubject}
              id="subjectSelect">
              <option>Selecione um assunto</option>
              {subjects.map((subject: TSubject) => (
                <option
                  key={subject.id}
                  value={subject.id}
                >
                  {subject.subject}
                </option>
              ))}
            </select>
          </div>
        )}

        {showQuestion && (
          <div>
            {/* Pergunta */}
            <h2 className="text-xl font-semibold mb-6 text-center">
              {currentQuestion?.question}
            </h2>

            {/* Opções */}
            <div className="space-y-3 mb-6">
              {currentQuestion?.options?.map((option, index) => {
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
              <Button 
                onClick={evaluate}
                className="cursor-pointer px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600"
                disabled={disabledButton}
              >
                Avaliar
              </Button>

              {current < questions.length - 1 ? (
                <Button
                  onClick={next}
                  className="cursor-pointer px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600"
                  disabled={disabledFinish}
                >
                  Avançar
                </Button>
              ) : (
                <Button
                  onClick={() => alert("Quiz finalizado!")}
                  className="cursor-pointer px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600"
                  disabled={disabledFinish}
                >
                  Finalizar
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
