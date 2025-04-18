import { CourseHeader } from "@/domain/course";
import { StudentQuizReport } from "@/domain/review";
import { UnitInfo } from "@/domain/unit";
import { sleepAndReturn } from "./common";

const quizReportByStudent = {
  student: {
    id: "id",
    name: "Образцов Показ Примерович",
  },
  status: "reviewing",
  solutions: [
    {
      id: 1,
      type: "radio",
      title: "Текст задания с одним вариантом",
      options: ["вариант 1", "вариант 2"],
      correctId: 0,
      checkedId: 1,
      correct: false,
    },
    {
      id: 2,
      type: "checkbox",
      title: "Текст задания с несколькими вариантами",
      options: [
        { name: "вариант 1", isCorrect: true, isChecked: true },
        { name: "вариант 2", isCorrect: false, isChecked: true },
        { name: "вариант 2", isCorrect: false, isChecked: false },
      ],
      correct: true,
    },
    {
      id: 3,
      type: "text",
      title: "Текст задания с текстовым ответом",
      answer: "ответ студента",
      correctAnswer: "правильный ответ",
      correct: false,
    },
    {
      id: 4,
      type: "advanced",
      title: "Текст задания с развернутым ответом",
      answer: "ответ студента",
    },
  ],
  total: 10,
} satisfies StudentQuizReport;

export class TeacherApi {
  async getCourses(): Promise<CourseHeader[]> {
    return [
      { id: "algos1", title: "Алгоритмы и структуры данных-1" },
      { id: "algos2", title: "Алгоритмы и структуры данных-2" },
    ];
  }

  async getQuizReportByStudent(
    courseId: string /* eslint-disable-line @typescript-eslint/no-unused-vars */,
    unitId: string /* eslint-disable-line @typescript-eslint/no-unused-vars */,
    studentId: string /* eslint-disable-line @typescript-eslint/no-unused-vars */
  ): Promise<StudentQuizReport> {
    return sleepAndReturn(quizReportByStudent, 1000);
  }

  async getQuizReportByTask(
    courseId: string /* eslint-disable-line @typescript-eslint/no-unused-vars */,
    unitId: string /* eslint-disable-line @typescript-eslint/no-unused-vars */,
    taskId: string /* eslint-disable-line @typescript-eslint/no-unused-vars */
  ) {
    throw new Error("Not implemented");
  }

  async createChapter(
    courseId: string /* eslint-disable-line @typescript-eslint/no-unused-vars */,
    chapterName: string /* eslint-disable-line @typescript-eslint/no-unused-vars */
  ): Promise<void> {
    throw new Error("Not implemented");
  }

  async createUnit(
    courseId: string /* eslint-disable-line @typescript-eslint/no-unused-vars */,
    chapterId: string /* eslint-disable-line @typescript-eslint/no-unused-vars */,
    unit: UnitInfo /* eslint-disable-line @typescript-eslint/no-unused-vars */
  ) {
    throw new Error("Not implemented");
  }

  async removeUnit(
    courseId: string /* eslint-disable-line @typescript-eslint/no-unused-vars */,
    unitId: string /* eslint-disable-line @typescript-eslint/no-unused-vars */
  ) {
    throw new Error("Not implemented");
  }

  getCourseChapters(
    courseId: string /* eslint-disable-line @typescript-eslint/no-unused-vars */
  ): string[] {
    return ["Функции", "Множества", "Логика"]; // FIXME:
  }
}

export const teacherApi = new TeacherApi();
