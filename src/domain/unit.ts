export type UnitType = "text" | "test";

export interface UnitHeader {
  id: string;
  title: string;
  type: UnitType;
}

export interface Chapter {
  name: string;
  units: UnitHeader[];
}

export interface Course {
    title: string;
    chapters: Chapter[];
}