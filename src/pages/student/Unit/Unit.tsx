import { mockLoadCourse, mockLoadUnit } from "@/data/mock";
import { Chapter } from "@/domain/course";
import { TextUnitInfo, UnitInfo } from "@/domain/unit";
import Course from "@/layout/student/Course";
import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import TestUnit from "./TestUnit";

export default function Unit() {
  const lessSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));

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
  let component;
  if (unit.type === "text") {
    component = <TextUnitView unit={unit} />;
  }
  if (unit.type === "test") {
    component = <TestUnit unit={unit} />;
  }
  return (
    <Course
      sideBarProps={
        chapters && {
          chapters: chapters,
          selectedId: 1,
        }
      }
    >
      {component}
    </Course>
  );
}

function TextUnitView(_: { unit: TextUnitInfo }) {
  return "Text";
}
