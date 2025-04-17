import { sleepAndReturn } from "./mock";

export interface QualityAssessmentPage {
  name: string;
  teacher: string;
}

export function mockQualityAssessmentPages(): Promise<QualityAssessmentPage[]> {
  const data: QualityAssessmentPage[] = [
    {
      name: "Алгоритмы (лекции)",
      teacher: "Сиплюсплюсов",
    },
    { name: "Алгоритмы (семинары 231)", teacher: "Эрбэтришный" },
    {
      name: "Теория вероятностей (лекции)",
      teacher: "Гауссов",
    },
    {
      name: "Операционные системы (лекции)",
      teacher: "Регистров",
    },
    { name: "Операционные системы (семираны)", teacher: "Ассемблеров" },
  ];
  return sleepAndReturn(data, 1000);
}

type a = "not-ready" | "not-started" | "finished";
export async function mockLoadQAsShowcase(): Promise<
  {
    title: string;
    beginDate: Date;
    endDate: Date;
    status: a;
  }[]
> {
  const data = [
    {
      title: "Весенний период СОП",
      status: "not-started" as a,
      beginDate: new Date(),
      endDate: new Date(),
    },
  ];
  return sleepAndReturn(data, 1000);
}
