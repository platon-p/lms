import { createBrowserRouter } from "react-router";
import {
  AdminCourse,
  Auth,
  Course,
  CreateQAWave,
  QAWaveReview,
  QualityAssessment,
  StudentMain,
  TeacherCourse,
  TestUnitBuilderPage,
  TextUnitBuilderPage,
  Unit,
} from "./pages";
import { AdminMain } from "./pages/admin";
import QAReview from "./pages/QAReview";
import { UnitReview } from "./pages/teacher";

export const routes = createBrowserRouter([
  { path: "auth", Component: Auth },
  {
    path: "admin",
    children: [
      { index: true, Component: AdminMain },
      { path: "course/:id", Component: AdminCourse },
      { path: "qa/create", Component: CreateQAWave },
      { path: "qa/:id", Component: QAWaveReview },
    ],
  },
  { path: "qa", children: [{ path: ":id", Component: QAReview }] },
  {
    path: "student",
    children: [
      { index: true, Component: StudentMain },
      { path: "testing", Component: QualityAssessment },
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
          { index: true, Component: TeacherCourse },
          { path: "review/:unitId", Component: UnitReview },
          {
            path: "builder",
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
