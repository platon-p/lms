import { Chapter, Course, CourseHeader } from "../domain/unit";

export function mockLoadCourse(): Promise<Course> {
  return new Promise((resolve) =>
    setTimeout(() => {
      const chapters: Chapter[] = Array.from({ length: 20 }).map((_, i) => ({
        name: `Глава ${i + 1}`,
        units: [
          { id: "123", type: "text", title: "Лекция" },
          { id: "456", type: "text", title: "Семинар" },
          { id: "789", type: "test", title: "Тест" },
        ],
      }));
      resolve({ chapters, title: "Алгоритмы и структуры данных-2" });
    }, 1000)
  );
}

export interface QualityAssessmentPageHeader {
  name: string;
  questions: string[];
}

export function mockQualityAssessmentPages(): Promise<
  QualityAssessmentPageHeader[]
> {
  return new Promise((resolve) =>
    setTimeout(() => {
      const pages: QualityAssessmentPageHeader[] = [
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
      ];
      resolve(pages);
    }, 1000)
  );
}

export function mockLoadCourses(): Promise<CourseHeader[]> {
  return new Promise((resolve) =>
    setTimeout(() => {
      const courses: CourseHeader[] = [
        {progress: 20, title: "Алгоритмы и структуры данных-2"},
        {progress: 50, title: "Теория вероятностей"},
        {progress: 80, title: "Операционные системы"},
        {progress: 100, title: "Групповая динамика"},
        {progress: 0, title: "Архитектура вычислительных систем"},
      ];
      resolve(courses);
    }, 1000)
  );
}
