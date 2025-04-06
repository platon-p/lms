import { Chapter, Course } from "../domain/unit";

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
