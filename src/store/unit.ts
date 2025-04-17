import { studentApi } from "@/api";
import { Course } from "@/domain/course";
import { UnitInfo } from "@/domain/unit";
import { useEffect, useMemo, useState } from "react";

// FIXME: split to student / teacher
export function useUnit(
  courseId: string,
  unitId: string,
): UnitInfo | undefined {
  const [unit, setUnit] = useState<UnitInfo | undefined>();

  useMemo(() => {
    setUnit(undefined);
    return studentApi.getUnit(courseId, unitId).then(setUnit);
  }, [courseId, unitId]);
  return unit;
}

// FIXME: split to student / teacher
export function useCourse(courseId: string) {
  const [course, setCourse] = useState<Course | undefined>();
  useEffect(() => {
    studentApi.getCourseContent(courseId).then(setCourse);
  }, [courseId]);
  return course;
}
