import { sleepAndReturn } from "@/data/mock";
import { CourseHeader } from "@/domain/course";

const qaWaves = {
  waves: [
    {
      title: "3-й модуль 2024 - 2025",
      beginDate: new Date(),
      endDate: new Date(),
    },
    {
      title: "2-й модуль 2024 - 2025",
      beginDate: new Date(),
      endDate: new Date(),
    },
    {
      title: "1-й модуль 2024 - 2025",
      beginDate: new Date(),
      endDate: new Date(),
    },
  ],
  count: 10,
};

export class AdminApi {
  async getQaWaves() {
    return sleepAndReturn(qaWaves, 1000);
  }
  async getCourseStudents(courseId: string): Promise<string[]> {
    const allStudents = [
      "Иванов Иван",
      "Петров Пётр",
      "asdasd",
      "ddd",
      "dasdasd",
    ];
    return allStudents;
  }

  async getCourses(): Promise<{ courses: CourseHeader[]; count: number }> {
    return sleepAndReturn(
      {
        count: 15,
        courses: [
          { id: "1", title: "Алгосы" },
          { id: "2", title: "Теорвер" },
        ],
      },
      1000
    );
  }

  async createCourse(name: string, teacher: string): Promise<void> {
    throw new Error("Not implemented");
  }

  async createQAWave(
    name: string,
    startDate: Date,
    endDate: Date,
    courses: CourseHeader["id"][]
  ): Promise<void> {
    throw new Error("Not implemented");
  }
}

export const adminApi = new AdminApi();
