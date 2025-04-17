import { sleepAndReturn } from "@/data/mock";
import { Course, CourseHeader } from "@/domain/course";
import { QAWaveHeader } from "@/domain/qa";
import { ArticleUnitInfo, QuizUnitInfo, UnitInfo } from "@/domain/unit";

const quizUnit = {
  title: "Тест по алгоритмам",
  type: "quiz",
  status: "in-progress",
  tasks: [
    {
      type: "radio",
      options: ["Вариант 1", "Вариант 2"],
      title: "Выберите один вариант ответа",
    },
    {
      type: "radio",
      options: ["Вариант 1", "Вариант 2"],
      title:
        "Что выведет код?\n```cpp\n#include<iostream>\nusing namespace std;\nint main() {\n    cout << 11;\n}\n```",
    },
    {
      type: "checkbox",
      options: ["Вариант 1", "Вариант 2", "Вариант 3"],
      title: "Выберите несколько вариантов",
    },
    { type: "text", title: "Напишите любое слово" },
    { type: "advanced", title: "Опишите свои мысли" },
  ],
} satisfies QuizUnitInfo;

const articleUnit = {
  type: "article",
  title: "Название статьи",
  content: `
# Заголовок
> Цитата
      
## Формула

$$F(x) = \\int e^{x^2}$$

| Заголовок | Таблицы |
|-----------|---------|
| Ячейка    | С $\\text{формулой}$|`,
} satisfies ArticleUnitInfo;

const course = {
  chapters: Array.from({ length: 4 }).map((_, i) => ({
    name: `Глава ${i + 1}`,
    units: [
      { id: "article123", type: "article", title: "Лекция" },
      { id: "article456", type: "article", title: "Семинар" },
      { id: "quiz789", type: "quiz", title: "Тест" },
    ],
  })),
  title: "Алгоритмы и структуры данных-2",
  teacher: "Преподбек",
} satisfies Course;

const pendingQaWaves = [
  {
    id: "id",
    status: "done",
    title: "title",
  },
] satisfies QAWaveHeader[];

const availableCourses = [
  { id: "alogs", progress: 20, title: "Алгоритмы и структуры данных-2" },
  { id: "teorver", progress: 50, title: "Теория вероятностей" },
  { id: "os", progress: 80, title: "Операционные системы" },
  { id: "group", progress: 100, title: "Групповая динамика" },
  { id: "avs", progress: 0, title: "Архитектура вычислительных систем" },
] satisfies CourseHeader[];

export class StudentApi {
  async getCourses(
    search: string,
    limit?: number,
    offset?: number,
  ): Promise<CourseHeader[]> {
    return sleepAndReturn(availableCourses, 1000);
  }

  async getCourseContent(courseId: string): Promise<Course> {
    return sleepAndReturn(course, 1000);
  }

  async getUnit(courseId: string, unitId: string): Promise<UnitInfo> {
    const unit = unitId.startsWith("quiz") ? quizUnit : articleUnit;
    return sleepAndReturn(unit, 1000);
  }

  async getPendingQAWaves(): Promise<QAWaveHeader[]> {
    return sleepAndReturn(pendingQaWaves, 1000);
  }

  async getQAWaveContent(qaWaveId: string): Promise<void> {}
}

export const studentApi = new StudentApi();
