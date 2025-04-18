import { Student } from "./profiles";

export type QAStudentStatus = "done" | "not-started";
export type QAWaveStatus = "in-progress" | "finished";

export type PendingQAWaveHeader = Omit<QAWaveHeader, "status"> & {
  status: QAStudentStatus;
};

export interface QualityAssessmentPage {
  name: string;
  teacher: string;
}

export interface QAWaveHeader {
  id: string;
  title: string;
  beginDate: Date;
  endDate: Date;
  status: QAWaveStatus;
}

export type QAWaveReview = QAWaveHeader & {
  students: (Student & { status: QAStudentStatus })[];
};
