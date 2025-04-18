import { Student } from "./profiles";
import { QuizStatus } from "./unit";

export interface RadioSolutionReport {
  type: "radio";
  options: string[];
  correctId: number;
  checkedId: number;
}

export interface CheckboxSolutionReport {
  type: "checkbox";
  options: {
    name: string;
    isChecked: boolean;
    isCorrect: boolean; // means correctness in general, not a match
  }[];
}

export interface TextSolutionReport {
  type: "text";
  answer: string;
  correctAnswer: string;
}

export type AutoReport = (
  | RadioSolutionReport
  | CheckboxSolutionReport
  | TextSolutionReport
) & { correct: boolean };

export interface AdvancedSolutionReport {
  type: "advanced";
  answer: string;
  correct?: boolean;
}

type SolutionReportType = AutoReport | AdvancedSolutionReport;

export type SolutionReport = {
  id: number;
  title: string;
} & SolutionReportType;

export interface StudentQuizReport {
  student: Student;
  status: QuizStatus;
  solutions?: SolutionReport[];
  total?: number;
}

export type StudentQuizReportPreview = Omit<StudentQuizReport, "solutions"> & {
  solutions?: {
    id: number;
    correct?: boolean;
  }[];
};

export type AllStudentsQuizReport = {
  tasks: number[];
  reports: StudentQuizReportPreview[];
};
