import { UnitType } from "./unit";

interface Chapter {
  name: string;
  units: UnitHeader[];
}

interface CourseHeader {
  id: string;
  title: string;
}

interface Course {
  title: string;
  teacher: string;
  chapters: Chapter[];
}

interface UnitHeader {
  id: string;
  title: string;
  type: UnitType;
}

export type { Chapter, Course, CourseHeader, UnitHeader };
