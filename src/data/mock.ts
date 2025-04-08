import { Chapter, Course, CourseHeader } from "@/domain/course";
import { UnitInfo } from "../domain/unit";

function sleepAndReturn<T>(data: T, duraion: number): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, duraion);
  });
}

export function mockLoadCourse(): Promise<Course> {
  const title = "Алгоритмы и структуры данных-2";
  const chapters: Chapter[] = Array.from({ length: 20 }).map((_, i) => ({
    name: `Глава ${i + 1}`,
    units: [
      { id: "123", type: "text", title: "Лекция" },
      { id: "456", type: "text", title: "Семинар" },
      { id: "789", type: "test", title: "Тест" },
    ],
  }));
  return sleepAndReturn({ chapters, title: title }, 1000);
}

export interface QualityAssessmentPageHeader {
  name: string;
  questions: string[];
}

export function mockQualityAssessmentPages(): Promise<
  QualityAssessmentPageHeader[]
> {
  return sleepAndReturn(
    [
      {
        name: "Алгоритмы",
        questions: ["Лекции от Сиплюсплюсова", "Семинары от Эрбэтришного"],
      },
      {
        name: "Теорвер",
        questions: ["Лекции от Гауссова", "Семинары от Чебышева"],
      },
      {
        name: "Операционные системы",
        questions: ["Лекции от Регистрова", "Семинары от Ассемблеровича"],
      },
    ],
    1000
  );
}

export function mockLoadCourses(): Promise<CourseHeader[]> {
  return sleepAndReturn(
    [
      { progress: 20, title: "Алгоритмы и структуры данных-2" },
      { progress: 50, title: "Теория вероятностей" },
      { progress: 80, title: "Операционные системы" },
      { progress: 100, title: "Групповая динамика" },
      { progress: 0, title: "Архитектура вычислительных систем" },
    ],
    1000
  );
}

export function mockLoadUnit(): Promise<UnitInfo> {
  return sleepAndReturn(
    {
      title: "Название теста",
      type: "test",
      status: "in-progress",
      questions: [
        {
          type: "radio",
          options: ["Вариант 1", "Вариант 2"],
          title: "Выберите один вариант ответа",
        },
        {
          type: "checkbox",
          options: ["Вариант 1", "Вариант 2", "Вариант 3"],
          title: "Выберите несколько вариантов",
        },
        { type: "text", title: "Напишите любое слово" },
      ],
    },
    0
  );
}
