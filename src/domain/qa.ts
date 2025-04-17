export type QAStatus = "done" | "in-progress" | "not-started";

export interface QAWaveHeader {
  id: string;
  title: string;
  status: QAStatus;
}
