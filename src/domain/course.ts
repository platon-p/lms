import { UnitType } from "./unit";

interface Chapter {
  name: string;
  units: UnitHeader[];
}

interface CourseHeader {
  id: string;
  title: string;
  progress: number;
}

interface Course {
  title: string;
  chapters: Chapter[];
}

interface UnitHeader {
  id: string;
  title: string;
  type: UnitType;
}

export type { Course, Chapter, UnitHeader, CourseHeader };
