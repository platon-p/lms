import { RouteObject } from "react-router";
import AdminCourse from "./Course";
import CreateQAWave from "./CreateQAWave";
import Main from "./Main";
import QAWaveReview from "./QAWaveReview";
import QAReview from "../QAReview";

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
    children: [
      { index: true, Component: QAWaveReview },
      { path: "course/:courseId", Component: QAReview },
    ],
  },
] as const satisfies RouteObject[];
