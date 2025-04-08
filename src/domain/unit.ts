import { RichQuestion } from "./test";

type UnitType = "text" | "test";

interface TestUnitInfo {
  type: "test";
  title: string;
  deadline?: Date;
  questions?: RichQuestion[];
  status: "not-started" | "in-progress" | "finished";
}

interface TextUnitInfo {
  type: "text";
  title: string;
  content: string;
}

type UnitInfo = TextUnitInfo | TestUnitInfo;

export type { UnitInfo, UnitType, TestUnitInfo, TextUnitInfo };