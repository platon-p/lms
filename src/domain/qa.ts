export type QAStatus = "done" | "in-progress";

export interface QAWaveHeader {
  id: string;
  title: string;
  status: QAStatus;
}
