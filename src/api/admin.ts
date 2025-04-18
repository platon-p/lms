import { CourseHeader } from "@/domain/course";
import { Student } from "@/domain/profiles";
import { QAWaveHeader, QAWaveReview } from "@/domain/qa";
import { matchSorter } from "match-sorter";
import { sleepAndReturn } from "./common";
import { availableCourses } from "./student";

const qaWaves = {
  waves: [
    {
      id: "wave1progress",
      title: "3-й модуль 2024 - 2025",
      beginDate: new Date(),
      endDate: new Date(),
      status: "in-progress",
    },
    {
      id: "wave2finished",
      title: "2-й модуль 2024 - 2025",
      beginDate: new Date(),
      endDate: new Date(),
      status: "finished",
    },
    {
      id: "wave3finished",
      title: "1-й модуль 2024 - 2025",
      beginDate: new Date(),
      endDate: new Date(),
      status: "finished",
    },
  ] satisfies QAWaveHeader[],
  count: 10,
};

const students = [
  { name: "Иванов Иван", id: "studentId1" },
  { name: "Петров Пётр", id: "studentId2" },
  { name: "Васильев Василий", id: "studentId3" },
  { name: "Айзенштайн Альберт", id: "studentId18" },
  { name: "Магомедов Ровшан", id: "studentId4" },
  { name: "Спанч Боб", id: "studentId5" },
  { name: "Патрик Стар", id: "studentId6" },
  { name: "Гаспарян Сархан", id: "studentId7" },
  // { name: "Ахмед Абду Ахмед Амр Эль Усман", id: "studentId8" },
  { name: "Садык Аль Шади", id: "studentId9" },
] satisfies Student[];

const engine = (value: string) =>
  matchSorter(students, value, { keys: ["name"] });

export class AdminApi {
  async getCourse(courseId: string): Promise<
    CourseHeader & {
      teacher: string;
      students: Student[];
      qaWaves: QAWaveHeader[];
    }
  > {
    const isNew = courseId.endsWith("new");
    const res = {
      id: courseId,
      title: "Теория вероятностей",
      teacher: "Иван Петрович",
      students: isNew ? [] : students.slice(0, 3),
      qaWaves: isNew ? [] : qaWaves["waves"],
    };
    return sleepAndReturn(res);
  }

  async findQaWaves(
    /* eslint-disable @typescript-eslint/no-unused-vars */
    query: string
    /* eslint-enable @typescript-eslint/no-unused-vars */
  ): Promise<{ waves: QAWaveHeader[]; count: number }> {
    return sleepAndReturn(qaWaves, 1000);
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  async getQaWavesByCourse(courseId: string): Promise<QAWaveHeader[]> {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    return sleepAndReturn(qaWaves["waves"], 1000);
  }
  /* eslint-disable @typescript-eslint/no-unused-vars */
  async getCourseStudents(courseId: string): Promise<Student[]> {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    const courseStudents = [
      { name: "Иванов Иван", id: "studentId1" },
      { name: "Петров Пётр", id: "studentId2" },
    ] satisfies Student[];
    return sleepAndReturn(courseStudents, 1000);
  }

  async searchStudents(query: string): Promise<Student[]> {
    return sleepAndReturn(engine(query), 300);
  }

  async getCourses(): Promise<{ courses: CourseHeader[]; count: number }> {
    return sleepAndReturn(
      {
        count: availableCourses.length,
        courses: availableCourses,
      },
      1000
    );
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  async createCourse(name: string, teacher: string): Promise<void> {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    throw new Error("Not implemented");
  }

  async createQAWave(
    /* eslint-disable @typescript-eslint/no-unused-vars */
    name: string,
    startDate: Date,
    endDate: Date,
    courses: CourseHeader["id"][]
    /* eslint-enable @typescript-eslint/no-unused-vars */
  ): Promise<void> {
    throw new Error("Not implemented");
  }

  async getQaWaveReview(qaWaveId: string): Promise<QAWaveReview> {
    const status = qaWaveId.endsWith("finished") ? "finished" : "in-progress";
    return sleepAndReturn(
      {
        id: qaWaveId,
        title: "3-й модуль 2024 - 2025",
        beginDate: new Date(),
        endDate: new Date(),
        status: status,
        students: [
          {
            id: "studentId1",
            name: "Иванов Иван",
            status: "done",
          },
          {
            id: "studentId2",
            name: "Петров Пётр",
            status: "not-started",
          },
          {
            id: "studentId3",
            name: "Васильев Василий",
            status: "not-started",
          },
          {
            id: "studentId4",
            name: "Магомедов Ровшан",
            status: "done",
          },
        ],
      } satisfies QAWaveReview,
      1000
    );
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  async getQaWaveCourses(qaWaveId: string): Promise<CourseHeader[]> {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    return sleepAndReturn(availableCourses.slice(0, 3), 1000);
  }

  async searchCourses(query: string): Promise<CourseHeader[]> {
    return availableCourses;
  }
}

export const adminApi = new AdminApi();
