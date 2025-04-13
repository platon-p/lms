import { mockLoadCourse, mockLoadUnit } from "@/data/mock";
import { Chapter } from "@/domain/course";
import { UnitInfo } from "@/domain/unit";
import CourseLayout from "@/layout/student/Course";
import { ReactNode, useEffect, useState } from "react";

import TestUnit from "./Test";
import TextUnit from "./Text";

export default function Unit() {
  const [unit, setUnit] = useState<UnitInfo | undefined>();
  const [chapters, setChapters] = useState<Chapter[]>();
  useEffect(() => {
    mockLoadUnit().then(setUnit);
    mockLoadCourse().then((v) => {
      setChapters(v.chapters);
    });
  }, []);
  if (!unit) {
    return "loading";
  }
  return (
    <CourseLayout
      sideBarProps={
        chapters && {
          chapters: chapters,
          selectedId: 1,
        }
      }
    >
      <UnitView unit={unit} />
    </CourseLayout>
  );
}

function UnitView({ unit }: { unit: UnitInfo }): ReactNode {
  if (unit.type === "text") {
    return <TextUnit unit={unit} />;
  } else if (unit.type === "test") {
    return <TestUnit unit={unit} />;
  }
}
