import { RouteObject } from "react-router";
import AdminCourse from "./Course";
import CreateQAWave from "./CreateQAWave";
import Main from "./Main";
import QAWaveReview from "./QAWaveReview";

export const adminRoutes = [
  {
    index: true,
    Component: Main,
  },
  {
    path: "course/:courseId",
    Component: AdminCourse,
  },
  {
    path: "qa/create",
    Component: CreateQAWave,
  },
  {
    path: "qa/:qaWaveId",
    Component: QAWaveReview,
  },
] as const satisfies RouteObject[];
