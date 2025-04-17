import { RichTask } from "./quiz";

export type QuizStatus =
  | "not-started"
  | "in-progress"
  | "reviewing"
  | "finished";

export type QuizUnitInfo = {
  type: "quiz";
  title: string;
  status: QuizStatus;
  deadline?: Date;
  tasks?: RichTask[];
};

export interface ArticleUnitInfo {
  type: "article";
  title: string;
  content: string;
}

export type UnitInfo = QuizUnitInfo | ArticleUnitInfo;
export type UnitType = UnitInfo["type"];
