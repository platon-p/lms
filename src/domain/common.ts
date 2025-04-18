import { TaskType } from "./quiz";
import { SolutionReport } from "./review";

type VerifyTaskTypeCoverage<T> = {
  [K in TaskType]: Extract<T, { type: K }> extends never ? string : never;
}[TaskType] extends never
  ? string
  : never;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _solutionReportCheck: VerifyTaskTypeCoverage<SolutionReport> = "";
