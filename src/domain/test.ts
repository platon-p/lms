type QuestionType = "text" | "checkbox" | "radio";

type RadioQuestion = {
  type: "radio";
  options: string[];
};
type CheckboxQuestion = {
  type: "checkbox";
  options: string[];
};
type TextQuestion = {
  type: "text";
};

type Question = RadioQuestion | CheckboxQuestion | TextQuestion;

type RichQuestion = { title: string } & Question;

export type {
  RadioQuestion,
  CheckboxQuestion,
  TextQuestion,
  Question,
  RichQuestion,
  QuestionType,
};
