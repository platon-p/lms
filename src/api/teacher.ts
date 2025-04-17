import { sleepAndReturn } from "@/data/mock";
import { StudentQuizReport } from "@/domain/review";
import { UnitInfo } from "@/domain/unit";

const quizReportByStudent = {
  student: {
    id: "id",
    name: "Образцов Пример Показович",
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
  async getQuizReportByStudent(
    courseId: string,
    unitId: string,
    studentId: string
  ): Promise<StudentQuizReport> {
    return sleepAndReturn(quizReportByStudent, 1000);
  }

  async getQuizReportByTask(courseId: string, unitId: string, taskId: string) {
    throw new Error("Not implemented");
  }

  async createChapter(courseId: string, chapterName: string): Promise<void> {
    throw new Error("Not implemented");
  }

  async createUnit(courseId: string, chapterId: string, unit: UnitInfo) {
    throw new Error("Not implemented");
  }
  getCourseChapters(courseId: string): string[] {
    return ["Функции", "Множества", "Логика"]; // FIXME:
  }
}

export const teacherApi = new TeacherApi();
