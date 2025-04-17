import { RouteObject } from "react-router";
import Course from "./Course";
import Main from "./Main";
import QualityAssessment from "./QualityAssessment";
import Unit from "./Unit";

export const studentRoutes: RouteObject[] = [
  {
    index: true,
    Component: Main,
  },
  {
    path: "testing",
    Component: QualityAssessment,
  },
  {
    path: "course/:courseId",
    children: [
      {
        index: true,
        Component: Course,
      },
      {
        path: ":unitId",
        Component: Unit,
      },
    ],
  },
];
