export type TQuestion = {
  id: number;
  question: string;
  options: TOption[];
};

export type TOption = {
  option: string;
  isSelected: boolean;
  isCorrect: boolean;
  color: string;
  disabled: boolean;
};
