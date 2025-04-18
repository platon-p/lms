import { RouteObject } from "react-router";
import ArticleBuilder from "./ArticleBuilder";
import Course from "./Course";
import QuizBuilder from "./QuizBuilder";
import UnitReview from "./review/UnitReview";
import ReviewByStudent from "./review/quiz/Student";
import ReviewByTask from "./review/quiz/Task";
import Main from "./Main";

export const teacherRoutes = [
  { index: true, Component: Main },
  {
    path: "course/:courseId",
    children: [
      {
        index: true,
        Component: Course,
      },
      {
        path: "review/:unitId",
        children: [
          { index: true, Component: UnitReview },
          {
            path: "student/:studentId",
            Component: ReviewByStudent,
          },
          {
            path: "task/:taskId",
            Component: ReviewByTask,
          },
        ],
      },
      {
        path: "builder",
        children: [
          {
            path: "quiz",
            Component: QuizBuilder,
          },
          {
            path: "article",
            Component: ArticleBuilder,
          },
        ],
      },
    ],
  },
] as const satisfies RouteObject[];
