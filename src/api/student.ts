import { Course, CourseHeader } from "@/domain/course";
import { PendingQAWaveHeader, QualityAssessmentPage } from "@/domain/qa";
import { ArticleUnitInfo, QuizUnitInfo, UnitInfo } from "@/domain/unit";
import { sleepAndReturn } from "./common";

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
> **Цитата**
      
## Формула

$$F(x) = \\int e^{x^2}$$

| Заголовок | Таблицы |
|-----------|---------|
| Ячейка    | С $\\text{формулой}$|

@[rutube](https://rutube.ru/video/15aa007234864ee45477d4e6558a8aaf/)
`,
} satisfies ArticleUnitInfo;

const course = {
  chapters: [
    {
      name: `Глава 1`,
      units: [
        { id: "article11", type: "article", title: "Лекция" },
        { id: "article12", type: "article", title: "Семинар" },
        { id: "quiz13not-started", type: "quiz", title: "Новый тест" },
      ],
    },
    {
      name: "Глава 2",
      units: [
        { id: "article21", type: "article", title: "Еще одна лекция" },
        { id: "quiz22in-progress", type: "quiz", title: "Решаемый тест" },
      ],
    },
    {
      name: "Глава 3",
      units: [
        { id: "article31", type: "article", title: "Еще одна лекция" },
        { id: "quiz32reviewing", type: "quiz", title: "Тест на ревью" },
      ],
    },
    {
      name: "Глава 4",
      units: [
        { id: "article41", type: "article", title: "Еще одна лекция" },
        { id: "quiz42finished", type: "quiz", title: "Завершённый тест" },
      ],
    },
  ],
  title: "Алгоритмы и структуры данных-2",
  teacher: "Иван Петрович",
} satisfies Course;

const pendingQaWaves = [
  {
    id: "id1",
    title: "ПМИ Весна 24/25",
    status: "not-started",
    beginDate: new Date(),
    endDate: new Date(),
  },
] satisfies PendingQAWaveHeader[];

export const availableCourses = [
  { id: "alogs", title: "Алгоритмы и структуры данных-2" },
  { id: "teorvernew", title: "Теория вероятностей" },
  { id: "os", title: "Операционные системы" },
  { id: "group", title: "Групповая динамика" },
  { id: "avs", title: "Архитектура вычислительных систем" },
] satisfies CourseHeader[];

export class StudentApi {
  async getCourses(
    search: string /* eslint-disable-line @typescript-eslint/no-unused-vars */,
    limit?: number /* eslint-disable-line @typescript-eslint/no-unused-vars */,
    offset?: number /* eslint-disable-line @typescript-eslint/no-unused-vars */
  ): Promise<CourseHeader[]> {
    return sleepAndReturn(availableCourses, 1000);
  }

  async getCourseContent(
    courseId: string /* eslint-disable-line @typescript-eslint/no-unused-vars */
  ): Promise<Course> {
    return sleepAndReturn(course, 1000);
  }

  async getUnit(courseId: string, unitId: string): Promise<UnitInfo> {
    if (unitId.startsWith("article")) {
      return sleepAndReturn(articleUnit, 1000);
    }
    if (unitId.endsWith("finished")) {
      return sleepAndReturn({ ...quizUnit, status: "finished" }, 1000);
    }
    if (unitId.endsWith("not-started")) {
      return sleepAndReturn({ ...quizUnit, status: "not-started" }, 1000);
    }
    if (unitId.endsWith("reviewing")) {
      return sleepAndReturn({ ...quizUnit, status: "reviewing" }, 1000);
    }
    return sleepAndReturn(quizUnit, 1000);
  }

  async getPendingQAWaves(): Promise<PendingQAWaveHeader[]> {
    return sleepAndReturn(pendingQaWaves, 1000);
  }

  async getQAWaveContent(
    qaWaveId: string /* eslint-disable-line @typescript-eslint/no-unused-vars */
  ): Promise<QualityAssessmentPage[]> {
    const data = [
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
}

export const studentApi = new StudentApi();
