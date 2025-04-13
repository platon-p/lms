import { createBrowserRouter } from "react-router";
import {
  Auth,
  Course,
  Courses,
  QualityAssessment,
  TestUnitBuilderPage,
  TextUnitBuilderPage,
  Unit,
} from "./pages";

export const routes = createBrowserRouter([
  { path: "auth", Component: Auth },
  {
    path: "student",
    children: [
      { path: "testing", Component: QualityAssessment },
      { path: "courses", Component: Courses },
      {
        path: "course/:id",
        children: [
          { index: true, Component: Course },
          { path: ":unitId", Component: Unit },
        ],
      },
    ],
  },
  {
    path: "teacher",
    children: [
      {
        path: "course/:id",
        children: [
          {
            path: "unit-builder",
            children: [
              { path: "test", Component: TestUnitBuilderPage },
              { path: "text", Component: TextUnitBuilderPage },
            ],
          },
        ],
      },
    ],
  },
]);
